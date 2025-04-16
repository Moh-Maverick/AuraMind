import os
from flask import Flask, request, jsonify, render_template_string
from groq import Groq
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
from flask_cors import CORS
import time

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Firebase with retry logic
def initialize_firebase(max_retries=3, retry_delay=2):
    for attempt in range(max_retries):
        try:
            cred = credentials.Certificate("serviceAccountKey.json")
            firebase_admin.initialize_app(cred)
            return firestore.client()
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"Firebase initialization attempt {attempt+1} failed: {e}")
                time.sleep(retry_delay)
            else:
                print(f"Failed to initialize Firebase after {max_retries} attempts: {e}")
                return None

# Initialize Firebase
db = initialize_firebase()

# Fallback in-memory storage if Firebase is unavailable
fallback_storage = {}

# Initialize Groq client
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Chatbot personality and system prompt
SYSTEM_PROMPT = (
    "You are AuroMind, a warm, empathetic AI mental health assistant. "
    "You provide emotional support, helpful advice, and practical tips. "   
    "You are especially helpful to girls needing period care support and respond calmly to emergencies. "
    "Format your responses using markdown for better readability: "
    "- Use **bold** for emphasis and important points "
    "- Use numbered lists (1., 2., etc.) for steps or sequences "
    "- Use bullet points for related items "
    "- Use headers (# or ##) for section titles "
    "- Keep paragraphs short and well-spaced for readability"
)

# Emergency keywords
EMERGENCY_KEYWORDS = ["suicidal", "panic", "kill myself", "self-harm", "end my life"]

# Mood detection logic
def detect_mood(message):
    if any(word in message.lower() for word in ["sad", "depressed", "unhappy"]):
        return "sad"
    elif any(word in message.lower() for word in ["anxious", "nervous", "worried"]):
        return "anxious"
    elif any(word in message.lower() for word in ["angry", "mad", "frustrated"]):
        return "angry"
    elif any(word in message.lower() for word in ["happy", "joyful", "excited"]):
        return "happy"
    else:
        return "neutral"

# Handle period care support
def handle_period_care():
    return (
        "It sounds like you might need some period care support. "
        "Make sure to stay hydrated and consider using hygiene products like pads or tampons. "
        "For mood swings, try relaxing activities or a warm drink. "
        "If you're craving snacks, healthy options like dark chocolate or nuts can help!"
    )

# Handle emergency situations
def handle_emergency():
    return (
        "I'm so sorry you're feeling this way. Please know that you're not alone. "
        "If you're in immediate danger, please contact a trusted person or a local emergency service. "
        "You can also reach out to a mental health hotline for support. "
        "Contact your parents or a trusted adult immediately. "
        "If you are suicidal, please call the suicide prevention hotline at 1-800-273-8255"
    )

# Firebase functions for chat history with fallback
def get_chat_history(session_id):
    if db:
        try:
            chat_ref = db.collection('chats').document(session_id)
            chat_doc = chat_ref.get()
            if chat_doc.exists:
                return chat_doc.to_dict().get('messages', [])
        except Exception as e:
            print(f"Error getting chat history from Firebase: {e}")
            return fallback_storage.get(session_id, [])
    return fallback_storage.get(session_id, [])

def save_chat_history(session_id, messages):
    if db:
        try:
            chat_ref = db.collection('chats').document(session_id)
            chat_ref.set({'messages': messages})
        except Exception as e:
            print(f"Error saving chat history to Firebase: {e}")
            fallback_storage[session_id] = messages
    else:
        fallback_storage[session_id] = messages

# Generate chatbot response
def generate_response(user_message, session_id):
    # Get chat history
    chat_history = get_chat_history(session_id)
    
    # Detect mood
    mood = detect_mood(user_message)

    # Check for emergency keywords
    if any(keyword in user_message.lower() for keyword in EMERGENCY_KEYWORDS):
        response = handle_emergency()
        chat_history.append({"role": "user", "content": user_message})
        chat_history.append({"role": "assistant", "content": response})
        save_chat_history(session_id, chat_history)
        return response

    # Check for period care-related messages
    if "period" in user_message.lower() or "cramps" in user_message.lower():
        response = handle_period_care()
        chat_history.append({"role": "user", "content": user_message})
        chat_history.append({"role": "assistant", "content": response})
        save_chat_history(session_id, chat_history)
        return response

    # Add user message to history
    chat_history.append({"role": "user", "content": user_message})

    # Prepare messages for Groq API
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + chat_history

    # Query Groq Cloud API
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",
        )
        bot_response = chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error querying Groq API: {e}")
        bot_response = "I'm sorry, I couldn't process your request right now. Please try again later."

    # Add bot response to history and save
    chat_history.append({"role": "assistant", "content": bot_response})
    save_chat_history(session_id, chat_history)

    return bot_response

# Flask route for chatbot interaction
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")
    session_id = data.get("session_id", "default")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        response = generate_response(user_message, session_id)
        return jsonify({"response": response})
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({"error": "An error occurred processing your request"}), 500

# Route to get chat history
@app.route("/api/chat/history/<session_id>", methods=["GET"])
def get_history(session_id):
    try:
        chat_history = get_chat_history(session_id)
        return jsonify({"history": chat_history})
    except Exception as e:
        print(f"Error in history endpoint: {e}")
        return jsonify({"error": "An error occurred retrieving chat history"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
