"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Send, Clock, Heart, Wind, Timer, Smile, Droplet } from "lucide-react"
import Header from "@/components/header"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import PeriodCarePanel from "@/components/period-care/period-care-panel"
import HistoryPanel from "@/components/history-panel"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface Conversation {
  id: number
  date: string
  preview: string
  messages: Message[]
}

export default function Chat() {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your mental health companion. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  // States for feature dialogs
  const [meditationOpen, setMeditationOpen] = useState(false)
  const [affirmationsOpen, setAffirmationsOpen] = useState(false)
  const [breathingOpen, setBreathingOpen] = useState(false)
  const [timerOpen, setTimerOpen] = useState(false)
  const [jokeOpen, setJokeOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [periodCareOpen, setPeriodCareOpen] = useState(false)

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState(5)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerInterval, setTimerIntervalState] = useState<NodeJS.Timeout | null>(null)

  // Breathing exercise state
  const [breathingPhase, setBreathingPhase] = useState("inhale")
  const [breathingCount, setBreathingCount] = useState(4)

  // Chat history
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      date: "Yesterday",
      preview: "I've been feeling anxious about my upcoming presentation...",
      messages: [
        {
          id: 1,
          content: "Hello! How can I help you today?",
          sender: "bot",
          timestamp: new Date(Date.now() - 86400000), // yesterday
        },
        {
          id: 2,
          content: "I've been feeling anxious about my upcoming presentation at work.",
          sender: "user",
          timestamp: new Date(Date.now() - 86400000 + 60000),
        },
        {
          id: 3,
          content:
            "I understand how that can be stressful. What specifically about the presentation makes you feel anxious?",
          sender: "bot",
          timestamp: new Date(Date.now() - 86400000 + 120000),
        },
        {
          id: 4,
          content: "I'm worried I'll forget what to say or that people will judge me harshly.",
          sender: "user",
          timestamp: new Date(Date.now() - 86400000 + 180000),
        },
        {
          id: 5,
          content:
            "Those are common concerns. Have you considered practicing your presentation with a friend or recording yourself? This can help build confidence and identify areas to improve.",
          sender: "bot",
          timestamp: new Date(Date.now() - 86400000 + 240000),
        },
      ],
    },
    {
      id: 2,
      date: "Last Week",
      preview: "I had trouble sleeping last night and feel exhausted...",
      messages: [
        {
          id: 1,
          content: "Hello! How are you feeling today?",
          sender: "bot",
          timestamp: new Date(Date.now() - 7 * 86400000), // last week
        },
        {
          id: 2,
          content: "I had trouble sleeping last night and feel exhausted today.",
          sender: "user",
          timestamp: new Date(Date.now() - 7 * 86400000 + 60000),
        },
        {
          id: 3,
          content:
            "I'm sorry to hear that. Disrupted sleep can definitely affect your mood and energy. Was there something specific keeping you awake?",
          sender: "bot",
          timestamp: new Date(Date.now() - 7 * 86400000 + 120000),
        },
        {
          id: 4,
          content: "I was thinking about work and couldn't shut my mind off.",
          sender: "user",
          timestamp: new Date(Date.now() - 7 * 86400000 + 180000),
        },
        {
          id: 5,
          content:
            "That's common. Would you like to try some relaxation techniques that might help you sleep better tonight? I can also suggest some ways to manage work-related stress.",
          sender: "bot",
          timestamp: new Date(Date.now() - 7 * 86400000 + 240000),
        },
      ],
    },
    {
      id: 3,
      date: "Last Month",
      preview: "I've been feeling down lately and don't know why...",
      messages: [
        {
          id: 1,
          content: "Hello! How can I assist you today?",
          sender: "bot",
          timestamp: new Date(Date.now() - 30 * 86400000),
        },
        {
          id: 2,
          content: "I've been feeling down lately and don't know why.",
          sender: "user",
          timestamp: new Date(Date.now() - 30 * 86400000 + 60000),
        },
        {
          id: 3,
          content:
            "I'm sorry to hear you're feeling down. Sometimes our emotions can be complex. Have there been any changes in your life recently?",
          sender: "bot",
          timestamp: new Date(Date.now() - 30 * 86400000 + 120000),
        },
      ],
    },
  ])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      const sessionId = localStorage.getItem('chatSessionId');
      if (!sessionId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/chat/history/${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to load chat history');
        }

        const data = await response.json();
        if (data.history && data.history.length > 0) {
          // Convert the history format to match our Message interface
          const formattedMessages: Message[] = data.history.map((msg: any, index: number) => ({
            id: index + 1,
            content: msg.content,
            sender: msg.role === "user" ? "user" : "bot",
            timestamp: new Date(), // You might want to store and retrieve actual timestamps
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Generate a session ID if not already set
      const sessionId = localStorage.getItem('chatSessionId') ||
        `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('chatSessionId', sessionId);

      // Send message to Flask backend
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: messages.length + 2,
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "I'm sorry, I couldn't process your request right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  // Save current conversation to history when component unmounts
  useEffect(() => {
    return () => {
      if (messages.length > 1) {
        // Only save if there's more than the initial bot message
        const newConversation: Conversation = {
          id: Date.now(),
          date: "Today",
          preview: messages.find((m) => m.sender === "user")?.content.slice(0, 50) + "..." || "New conversation",
          messages: [...messages],
        }
        setConversations((prev) => [newConversation, ...prev])
      }
    }
  }, [])

  // Load selected conversation
  const loadConversation = (conversation: Conversation) => {
    setMessages(conversation.messages)
  }

  // Start timer function
  const startTimer = () => {
    if (timerRunning) return

    setTimerRunning(true)
    const interval = setInterval(() => {
      setTimerSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setTimerMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              clearInterval(interval)
              setTimerRunning(false)
              return 0
            }
            return prevMinutes - 1
          })
          return 59
        }
        return prevSeconds - 1
      })
    }, 1000)

    setTimerIntervalState(interval)
  }

  // Stop timer function
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
    }
    setTimerRunning(false)
  }

  // Reset timer function
  const resetTimer = () => {
    stopTimer()
    setTimerMinutes(5)
    setTimerSeconds(0)
  }

  // Start breathing exercise
  const startBreathingExercise = () => {
    let count = 0
    const interval = setInterval(() => {
      count++
      if (count <= 4) {
        setBreathingPhase("inhale")
        setBreathingCount(4 - count + 1)
      } else if (count <= 8) {
        setBreathingPhase("hold")
        setBreathingCount(8 - count + 1)
      } else if (count <= 12) {
        setBreathingPhase("exhale")
        setBreathingCount(12 - count + 1)
      } else {
        count = 0
      }
    }, 1000)

    return () => clearInterval(interval)
  }

  // Get random joke
  const getRandomJoke = () => {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "What did the ocean say to the beach? Nothing, it just waved.",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "How does a penguin build its house? Igloos it together!",
      "Why don't eggs tell jokes? They'd crack each other up.",
      "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
      "I'm reading a book about anti-gravity. It's impossible to put down!",
      "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
      "Why did the bicycle fall over? Because it was two-tired!",
    ]
    return jokes[Math.floor(Math.random() * jokes.length)]
  }

  // Get random affirmation
  const getRandomAffirmation = () => {
    const affirmations = [
      "I am worthy of love and respect.",
      "I trust my journey and am open to the lessons life offers me.",
      "I am resilient and can handle whatever comes my way.",
      "My potential is limitless, and I can achieve my goals.",
      "I am enough just as I am right now.",
      "I choose to focus on what I can control.",
      "I am growing and learning every day.",
      "I deserve peace and happiness in my life.",
      "My thoughts and feelings are valid.",
      "I am capable of overcoming challenges.",
    ]
    return affirmations[Math.floor(Math.random() * affirmations.length)]
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-900">
      <Header onHistoryClick={() => setHistoryOpen(true)} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-slate-900">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 shadow-sm ${message.sender === "user"
                  ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white dark:from-purple-600 dark:to-purple-700"
                  : "bg-white dark:bg-slate-800 dark:text-slate-100 border border-purple-100 dark:border-slate-700"
                  }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 bg-purple-100 dark:bg-purple-800 ring-2 ring-purple-200 dark:ring-purple-700 overflow-hidden">
                      <img
                        src="/bot-avatar.png"
                        alt="Bot Avatar"
                        className="h-full w-full object-cover"
                      />
                    </Avatar>
                  )}
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        strong: ({ node, ...props }) => <span className="font-bold text-purple-100" {...props} />,
                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-2" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%] rounded-lg p-3 bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700">
                <div className="flex items-start gap-2">
                  <Avatar className="h-8 w-8 bg-purple-100 dark:bg-purple-800 ring-2 ring-purple-200 dark:ring-purple-700 overflow-hidden">
                    <img
                      src="/bot-avatar.png"
                      alt="Bot Avatar"
                      className="h-full w-full object-cover"
                    />
                  </Avatar>
                  <div className="flex space-x-1 items-center h-6">
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Feature buttons */}
      <div className="px-4 py-2 bg-white dark:bg-slate-800 border-t border-purple-100 dark:border-slate-700 overflow-x-auto shadow-[0_-2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="flex space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
              onClick={() => setMeditationOpen(true)}
            >
              <Clock className="h-4 w-4 mr-1" /> Meditation
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
              onClick={() => setAffirmationsOpen(true)}
            >
              <Heart className="h-4 w-4 mr-1" /> Affirmations
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
              onClick={() => setBreathingOpen(true)}
            >
              <Wind className="h-4 w-4 mr-1" /> Breathing
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
              onClick={() => setTimerOpen(true)}
            >
              <Timer className="h-4 w-4 mr-1" /> Timer
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
              onClick={() => setJokeOpen(true)}
            >
              <Smile className="h-4 w-4 mr-1" /> Quick Joke
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
              onClick={() => setPeriodCareOpen(true)}
            >
              <Droplet className="h-4 w-4 mr-1" /> Period Care
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="p-4 border-t border-purple-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-purple-200 focus-visible:ring-purple-500 focus:border-purple-400 dark:border-slate-700 dark:focus:border-purple-500 shadow-sm"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              size="icon"
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-500 dark:hover:to-purple-600 shadow-md"
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        </form>
      </div>

      {/* Meditation Dialog */}
      <Dialog open={meditationOpen} onOpenChange={setMeditationOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-purple-700 dark:text-purple-300">Meditation Exercises</DialogTitle>
            <DialogDescription>
              Select a meditation exercise to help calm your mind and reduce stress.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Card className="p-4 cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md">
              <h3 className="font-medium text-purple-600 dark:text-purple-300">Body Scan Meditation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                A 5-minute meditation to bring awareness to each part of your body, releasing tension as you go.
              </p>
            </Card>
            <Card className="p-4 cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md">
              <h3 className="font-medium text-purple-600 dark:text-purple-300">Loving-Kindness Meditation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Develop feelings of goodwill, kindness and warmth towards others and yourself.
              </p>
            </Card>
            <Card className="p-4 cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md">
              <h3 className="font-medium text-purple-600 dark:text-purple-300">Mindful Breathing</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Focus on your breath to anchor yourself in the present moment and calm your mind.
              </p>
            </Card>
            <Card className="p-4 cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md">
              <h3 className="font-medium text-purple-600 dark:text-purple-300">Gratitude Meditation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Reflect on things you're grateful for to cultivate a positive mindset.
              </p>
            </Card>
          </div>
          <DialogClose asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Affirmations Dialog */}
      <Dialog open={affirmationsOpen} onOpenChange={setAffirmationsOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-purple-700 dark:text-purple-300">Positive Affirmations</DialogTitle>
            <DialogDescription>Repeat these affirmations to yourself to promote positive thinking.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 p-6 rounded-lg text-center shadow-inner">
              <p className="text-xl font-medium text-purple-600 dark:text-purple-300">{getRandomAffirmation()}</p>
            </div>
            <div className="mt-4 text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => setAffirmationsOpen(true)}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
                >
                  New Affirmation
                </Button>
              </motion.div>
            </div>
          </div>
          <DialogClose asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Breathing Dialog */}
      <Dialog
        open={breathingOpen}
        onOpenChange={(open) => {
          setBreathingOpen(open)
          if (open) {
            const cleanup = startBreathingExercise()
            return () => cleanup()
          }
        }}
      >
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-purple-700 dark:text-purple-300">Breathing Exercise</DialogTitle>
            <DialogDescription>Follow the 4-4-4 breathing technique to reduce anxiety and stress.</DialogDescription>
          </DialogHeader>
          <div className="py-8">
            <div
              className={`
              w-48 h-48 mx-auto rounded-full flex items-center justify-center
              transition-all duration-1000 ease-in-out shadow-lg
              ${breathingPhase === "inhale"
                  ? "bg-gradient-to-br from-purple-100 to-purple-200 scale-100 dark:from-purple-900/30 dark:to-purple-900/50"
                  : breathingPhase === "hold"
                    ? "bg-gradient-to-br from-purple-200 to-purple-300 scale-110 dark:from-purple-900/50 dark:to-purple-900/70"
                    : "bg-gradient-to-br from-purple-100 to-purple-200 scale-90 dark:from-purple-900/30 dark:to-purple-900/50"
                }
            `}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">{breathingPhase}</p>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-300">{breathingCount}</p>
              </div>
            </div>
            <p className="text-center mt-6 text-slate-600 dark:text-slate-300">
              {breathingPhase === "inhale"
                ? "Breathe in slowly through your nose"
                : breathingPhase === "hold"
                  ? "Hold your breath"
                  : "Exhale slowly through your mouth"}
            </p>
          </div>
          <DialogClose asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Timer Dialog */}
      <Dialog
        open={timerOpen}
        onOpenChange={(open) => {
          setTimerOpen(open)
          if (!open && timerRunning) {
            stopTimer()
          }
        }}
      >
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-purple-700 dark:text-purple-300">Meditation Timer</DialogTitle>
            <DialogDescription>Set a timer for your meditation or mindfulness practice.</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
              </div>
            </div>

            {!timerRunning && (
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[1, 3, 5, 10].map((min) => (
                  <motion.div key={min} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className={`border-purple-300 ${timerMinutes === min ? "bg-purple-100 text-purple-700" : "text-purple-600"} hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700`}
                      onClick={() => {
                        setTimerMinutes(min)
                        setTimerSeconds(0)
                      }}
                    >
                      {min} min
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {timerRunning ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-slate-700"
                      onClick={stopTimer}
                    >
                      Stop
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
                      onClick={resetTimer}
                    >
                      Reset
                    </Button>
                  </motion.div>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md"
                    onClick={startTimer}
                  >
                    Start
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Joke Dialog */}
      <Dialog open={jokeOpen} onOpenChange={setJokeOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-purple-700 dark:text-purple-300">Quick Joke</DialogTitle>
            <DialogDescription>A little humor can brighten your day!</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 p-6 rounded-lg text-center shadow-inner">
              <p className="text-xl font-medium text-purple-600 dark:text-purple-300">{getRandomJoke()}</p>
            </div>
            <div className="mt-4 text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => setJokeOpen(true)}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-slate-700"
                >
                  Another Joke
                </Button>
              </motion.div>
            </div>
          </div>
          <DialogClose asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Period Care Dialog */}
      <Dialog open={periodCareOpen} onOpenChange={setPeriodCareOpen}>
        <div className="max-w-4xl">
          <DialogContent className="p-0 bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-700">
            <PeriodCarePanel />
          </DialogContent>
        </div>
      </Dialog>

      {/* History Panel */}
      <HistoryPanel
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        conversations={conversations}
        onSelectConversation={loadConversation}
      />
    </div>
  )
}
