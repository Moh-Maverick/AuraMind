# AuraMind - Mental Health & Wellness Chatbot

## 🌟 Overview
AuraMind is a comprehensive mental health and wellness platform that combines AI-powered chat support with period care tracking and wellness tools. The platform aims to make mental health support more accessible, personalized, and effective while providing specialized features for menstrual health management.

## 🎯 Problem Statement
Mental health support is often inaccessible, expensive, or stigmatized. Additionally, there's a lack of integrated solutions that address both mental wellness and menstrual health. AuraMind bridges this gap by providing:
- 24/7 AI-powered mental health support
- Period tracking and symptom management
- Integrated wellness tools
- Crisis detection and emergency resources

## 🛠️ Tech Stack

### Frontend
- **Next.js & React**: For building the user interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling
- **React Markdown**: For rendering markdown content

### Backend
- **Flask**: Python web framework for the backend API
- **Groq AI**: For AI model integration and chat responses
- **Firebase Admin SDK**: For user management and data storage

### Database
- **Firebase**: For storing user data, chat history, and analytics

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn
- Firebase account
- Groq AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mental-health-chatbot.git
   cd mental-health-chatbot
   ```

2. **Frontend Setup**
   ```bash
   # Install dependencies
   npm install
   # or
   yarn install

   # Create .env.local file and add your environment variables
   cp .env.example .env.local
   ```

3. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend

   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

   # Install dependencies
   pip install -r requirements.txt

   # Set up environment variables
   cp .env.example .env
   ```

4. **Configure Firebase**
   - Create a new Firebase project
   - Download your Firebase service account key
   - Add it to your backend directory as `firebase-service-account.json`

### Running the Application

1. **Start the Frontend**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at `http://localhost:3000`

2. **Start the Backend**
   ```bash
   # From the backend directory with virtual environment activated
   python app.py
   ```
   The backend API will be available at `http://localhost:5000`

## 🌟 Features

### Mental Health Support
- AI-powered chat interface
- Context-aware responses
- Crisis detection and support
- Emotion analysis

### Period Care
- Period tracking
- Symptom logging
- Health tips
- Recipe suggestions

### Wellness Tools
- Meditation exercises
- Breathing techniques
- Affirmations
- Timer
- Mood-lifting jokes

### Additional Features
- User authentication
- Customizable themes
- Profile management
- Data privacy
- Emergency resources

## 🔒 Security & Privacy
- End-to-end encryption for chat messages
- Secure data storage with Firebase
- GDPR compliant
- Regular security audits
- No personal data sharing

## 🤝 Contributing
We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Groq AI for providing the AI model
- Firebase for backend services
- The open-source community for various tools and libraries

## 📞 Support
For support, please email [support@auramind.com](mailto:support@auramind.com) or open an issue in the GitHub repository.

## 🔄 Updates
We regularly update our platform with new features and improvements. Stay tuned! 