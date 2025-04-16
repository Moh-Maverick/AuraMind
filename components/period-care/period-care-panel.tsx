"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Droplet,
  AlertCircle,
  Bell,
  BookOpen,
  MessageCircle,
  ShoppingBag,
  Smile,
  Coffee,
  Activity,
  History,
  Download,
  Settings,
  HelpCircle,
  Phone,
  EyeOff,
  Plus,
  Edit,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export default function PeriodCarePanel() {
  const [activeTab, setActiveTab] = useState("track")
  const [showPrivacyMode, setShowPrivacyMode] = useState(false)
  const [flowIntensity, setFlowIntensity] = useState(2)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    }
  }

  const handleShowRecipe = (recipe: string) => {
    setSelectedRecipe(recipe)
    setShowRecipeModal(true)
  }

  const togglePrivacyMode = () => {
    setShowPrivacyMode(!showPrivacyMode)
  }

  // Mock data for calendar view
  const calendarData = {
    currentDay: 14,
    cycleLength: 28,
    periodStart: 1,
    periodEnd: 5,
    fertileStart: 12,
    fertileEnd: 16,
    pmsStart: 25,
    pmsEnd: 28,
    predictedNextPeriod: "May 15-20",
  }

  // Mood options
  const moodOptions = [
    { name: "Happy", icon: "😊" },
    { name: "Sad", icon: "😢" },
    { name: "Anxious", icon: "😰" },
    { name: "Irritable", icon: "😠" },
    { name: "Calm", icon: "😌" },
    { name: "Energetic", icon: "⚡" },
    { name: "Tired", icon: "😴" },
    { name: "Emotional", icon: "🥺" },
  ]

  // Symptom options
  const symptomOptions = [
    "Cramps",
    "Headache",
    "Bloating",
    "Backache",
    "Breast Tenderness",
    "Acne",
    "Fatigue",
    "Nausea",
  ]

  // Healthy snack alternatives
  const healthySnacks = [
    { name: "Dark Chocolate", description: "Rich in magnesium and antioxidants" },
    { name: "Yogurt with Berries", description: "Calcium and antioxidants" },
    { name: "Nuts and Seeds", description: "Healthy fats and protein" },
    { name: "Banana with Peanut Butter", description: "Potassium and protein" },
    { name: "Hummus with Veggies", description: "Protein and fiber" },
  ]

  // Easy recipes
  const easyRecipes = [
    {
      name: "Chocolate Banana Smoothie",
      ingredients: ["1 banana", "1 tbsp cocoa powder", "1 cup almond milk", "1 tbsp honey", "Ice cubes"],
      instructions: "Blend all ingredients until smooth. Enjoy immediately.",
    },
    {
      name: "Avocado Toast with Egg",
      ingredients: [
        "1 slice whole grain bread",
        "1/2 avocado",
        "1 egg",
        "Salt and pepper",
        "Red pepper flakes (optional)",
      ],
      instructions:
        "Toast bread. Mash avocado and spread on toast. Cook egg as desired (fried or poached recommended). Place egg on top of avocado toast. Season with salt, pepper, and red pepper flakes if desired.",
    },
  ]

  // Gentle exercises for cramp relief
  const crampExercises = [
    { name: "Child's Pose", description: "Kneel and sit back on heels, stretch arms forward, rest forehead on floor" },
    { name: "Cat-Cow Stretch", description: "On hands and knees, alternate between arching and rounding back" },
    {
      name: "Supine Twist",
      description: "Lie on back, bring knees to chest, then lower to one side while keeping shoulders flat",
    },
    {
      name: "Butterfly Stretch",
      description: "Sit with soles of feet together, knees out to sides, gently press knees down",
    },
  ]

  return (
    <div
      className={`relative bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${showPrivacyMode ? "blur-lg" : ""}`}
    >
      <AnimatePresence>
        {showPrivacyMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
          >
            <Button
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-50 shadow-lg"
              onClick={togglePrivacyMode}
            >
              Tap to Show Content
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-900/20">
        <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 flex items-center">
          <Droplet className="mr-2 h-5 w-5" />
          Period Care
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/30"
          onClick={togglePrivacyMode}
        >
          <EyeOff className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="track" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 overflow-x-auto">
          <TabsList className="mt-2 mb-4 grid grid-cols-3 md:grid-cols-6 gap-1">
            <TabsTrigger value="track" className="text-xs md:text-sm">
              Track
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs md:text-sm">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="text-xs md:text-sm">
              Symptoms
            </TabsTrigger>
            <TabsTrigger value="reminders" className="text-xs md:text-sm">
              Reminders
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-xs md:text-sm">
              Tips
            </TabsTrigger>
            <TabsTrigger value="talk" className="text-xs md:text-sm">
              Talk
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)] md:h-[500px]">
          {/* Track My Period Tab */}
          <TabsContent value="track" className="p-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-purple-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90 border-b border-purple-100 dark:border-slate-700">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Track My Period
                  </CardTitle>
                  <CardDescription>Log your period details and symptoms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
                        <Calendar className="mr-2 h-4 w-4" />
                        Log Period Start
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
                        <Calendar className="mr-2 h-4 w-4" />
                        Log Period End
                      </Button>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Flow Intensity</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Light</span>
                      <Slider
                        defaultValue={[2]}
                        max={5}
                        step={1}
                        className="flex-1"
                        onValueChange={(value) => setFlowIntensity(value[0])}
                      />
                      <span className="text-xs text-gray-500">Heavy</span>
                    </div>
                    <div className="flex justify-center mt-1">
                      <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300 shadow-sm">
                        {flowIntensity === 1
                          ? "Very Light"
                          : flowIntensity === 2
                            ? "Light"
                            : flowIntensity === 3
                              ? "Medium"
                              : flowIntensity === 4
                                ? "Heavy"
                                : "Very Heavy"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Add Notes</Label>
                    <Textarea
                      placeholder="How are you feeling today? Any symptoms or mood changes?"
                      className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-500 shadow-sm"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
                      <Save className="mr-2 h-4 w-4" />
                      Save Entry
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Calendar View Tab */}
          <TabsContent value="calendar" className="p-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-purple-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90 border-b border-purple-100 dark:border-slate-700">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Cycle Calendar
                  </CardTitle>
                  <CardDescription>View your cycle phases and predictions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-5">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-4 rounded-lg shadow-inner">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-purple-700 dark:text-purple-300">Current Cycle Status</h3>
                      <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 shadow-sm">
                        Day {calendarData.currentDay}
                      </Badge>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-700"
                        style={{ width: `${(calendarData.currentDay / calendarData.cycleLength) * 100}%` }}
                      ></div>
                      <div className="absolute top-0 left-0 h-full flex items-center justify-center w-full text-xs font-medium">
                        {calendarData.currentDay} of {calendarData.cycleLength} days
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/10 dark:to-red-900/5 p-3 rounded-lg shadow-sm"
                    >
                      <h3 className="font-medium text-red-600 dark:text-red-300 mb-1">Period Phase</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Days {calendarData.periodStart}-{calendarData.periodEnd}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Next predicted: {calendarData.predictedNextPeriod}
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/5 p-3 rounded-lg shadow-sm"
                    >
                      <h3 className="font-medium text-blue-600 dark:text-blue-300 mb-1">Fertile Window</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Days {calendarData.fertileStart}-{calendarData.fertileEnd}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Higher chance of conception</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/10 dark:to-yellow-900/5 p-3 rounded-lg shadow-sm"
                    >
                      <h3 className="font-medium text-yellow-600 dark:text-yellow-300 mb-1">PMS Phase</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Days {calendarData.pmsStart}-{calendarData.pmsEnd}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Watch for mood changes</p>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 text-purple-500 hover:bg-purple-50 shadow-sm"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Cycle Length
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Symptoms & Mood Tracker Tab */}
          <TabsContent value="symptoms" className="p-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-purple-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90 border-b border-purple-100 dark:border-slate-700">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Symptoms & Mood
                  </CardTitle>
                  <CardDescription>Track how you're feeling today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Your Mood</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {moodOptions.map((mood) => (
                        <motion.div key={mood.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant={selectedMood === mood.name ? "default" : "outline"}
                            className={`flex flex-col items-center h-16 ${selectedMood === mood.name
                              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md"
                              : "border-purple-200 hover:bg-purple-50 shadow-sm"
                              }`}
                            onClick={() => setSelectedMood(mood.name)}
                          >
                            <span className="text-xl">{mood.icon}</span>
                            <span className="text-xs mt-1">{mood.name}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Symptoms (if any)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {symptomOptions.map((symptom) => (
                        <motion.div key={symptom} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                            className={`justify-start w-full ${selectedSymptoms.includes(symptom)
                              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md"
                              : "border-purple-200 hover:bg-purple-50 shadow-sm"
                              }`}
                            onClick={() => handleSymptomToggle(symptom)}
                          >
                            {selectedSymptoms.includes(symptom) ? <span className="mr-2">✓</span> : null}
                            {symptom}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Additional Notes</Label>
                    <Textarea
                      placeholder="Any other symptoms or details you want to track..."
                      className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-500 shadow-sm"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
                      <Save className="mr-2 h-4 w-4" />
                      Save Symptoms & Mood
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Reminders & Notifications Tab */}
          <TabsContent value="reminders" className="p-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-purple-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90 border-b border-purple-100 dark:border-slate-700">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Reminders & Notifications
                  </CardTitle>
                  <CardDescription>Set up helpful reminders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-5">
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-purple-100 dark:border-slate-700"
                    >
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium">Pill Reminder</p>
                          <p className="text-xs text-gray-500">Daily at 9:00 AM</p>
                        </div>
                      </div>
                      <Switch />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-purple-100 dark:border-slate-700"
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium">Period Start Reminder</p>
                          <p className="text-xs text-gray-500">2 days before predicted start</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-purple-100 dark:border-slate-700"
                    >
                      <div className="flex items-center space-x-2">
                        <Droplet className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium">Hydration Check-in</p>
                          <p className="text-xs text-gray-500">Every 3 hours during period</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-purple-100 dark:border-slate-700"
                    >
                      <div className="flex items-center space-x-2">
                        <Smile className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium">Mood Check-in</p>
                          <p className="text-xs text-gray-500">Daily at 7:00 PM</p>
                        </div>
                      </div>
                      <Switch />
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 text-purple-500 hover:bg-purple-50 mt-4 shadow-sm"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Reminder
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Tips & Advice Tab */}
          <TabsContent value="tips" className="p-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-purple-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90 border-b border-purple-100 dark:border-slate-700">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Tips & Advice
                  </CardTitle>
                  <CardDescription>Helpful information for your period</CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="nutrition" className="border-purple-200 dark:border-slate-700">
                      <AccordionTrigger className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md">
                        <div className="flex items-center">
                          <Coffee className="mr-2 h-4 w-4" />
                          Nutrition During Periods
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gradient-to-r from-purple-50/50 to-white dark:from-purple-900/10 dark:to-slate-900 rounded-md mt-1 p-3">
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Iron-rich foods:</strong> Leafy greens, beans, and lean meats help replenish iron
                            lost during menstruation.
                          </p>
                          <p>
                            <strong>Calcium:</strong> Dairy products or fortified alternatives can help reduce cramps
                            and mood swings.
                          </p>
                          <p>
                            <strong>Magnesium:</strong> Dark chocolate, nuts, and seeds may help reduce bloating and
                            cramps.
                          </p>
                          <p>
                            <strong>Hydration:</strong> Drink plenty of water to reduce bloating and headaches.
                          </p>
                          <p>
                            <strong>Limit:</strong> Caffeine, alcohol, and salty foods which can worsen symptoms.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="pain-relief" className="border-purple-200 dark:border-slate-700">
                      <AccordionTrigger className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md">
                        <div className="flex items-center">
                          <Activity className="mr-2 h-4 w-4" />
                          Pain Relief Tips
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gradient-to-r from-purple-50/50 to-white dark:from-purple-900/10 dark:to-slate-900 rounded-md mt-1 p-3">
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Heat therapy:</strong> Apply a heating pad to your lower abdomen or lower back.
                          </p>
                          <p>
                            <strong>Gentle massage:</strong> Massage your abdomen in a circular motion with essential
                            oils.
                          </p>
                          <p>
                            <strong>OTC medication:</strong> Ibuprofen or naproxen can help reduce inflammation and
                            pain.
                          </p>
                          <p>
                            <strong>Herbal teas:</strong> Ginger, chamomile, or peppermint tea may provide relief.
                          </p>
                          <p>
                            <strong>Rest:</strong> Give yourself permission to rest when needed.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="exercise" className="border-purple-200 dark:border-slate-700">
                      <AccordionTrigger className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md">
                        <div className="flex items-center">
                          <Activity className="mr-2 h-4 w-4" />
                          Exercise Suggestions
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gradient-to-r from-purple-50/50 to-white dark:from-purple-900/10 dark:to-slate-900 rounded-md mt-1 p-3">
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Light walking:</strong> Improves circulation and releases endorphins.
                          </p>
                          <p>
                            <strong>Yoga:</strong> Gentle poses can help relieve tension and cramps.
                          </p>
                          <p>
                            <strong>Swimming:</strong> Low-impact exercise that can ease discomfort.
                          </p>
                          <p>
                            <strong>Stretching:</strong> Focus on hip and lower back stretches.
                          </p>
                          <p>
                            <strong>Listen to your body:</strong> Reduce intensity if needed, it's okay to take it easy.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Talk to Me Tab */}
          <TabsContent value="talk" className="p-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-purple-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90 border-b border-purple-100 dark:border-slate-700">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Talk to Me
                  </CardTitle>
                  <CardDescription>Get help or ask questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Ask a Question</Label>
                    <Textarea
                      placeholder="Type your question about periods, symptoms, or reproductive health..."
                      className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-500 shadow-sm"
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Send Question
                      </Button>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant="outline"
                        className="w-full border-purple-500 text-purple-500 hover:bg-purple-50 shadow-sm"
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        I'm Not Feeling Well
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant="outline"
                        className="w-full border-red-500 text-red-500 hover:bg-red-50 shadow-sm"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Emergency Info
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </ScrollArea>

        {/* Additional Support Sections */}
        <div className="p-4 border-t border-purple-100 dark:border-slate-700 bg-gradient-to-b from-white to-purple-50/30 dark:from-slate-900 dark:to-slate-900">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="hygiene" className="border-purple-200 dark:border-slate-700">
              <AccordionTrigger className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md">
                <div className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Hygiene Product Suggestions
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card className="border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                      <CardHeader className="py-3 px-4 bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90">
                        <CardTitle className="text-sm font-medium">Pads</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <p className="text-xs">External protection, good for beginners and overnight use.</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card className="border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                      <CardHeader className="py-3 px-4 bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90">
                        <CardTitle className="text-sm font-medium">Tampons</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <p className="text-xs">Internal protection, good for swimming and active lifestyles.</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card className="border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                      <CardHeader className="py-3 px-4 bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90">
                        <CardTitle className="text-sm font-medium">Menstrual Cups</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <p className="text-xs">Reusable, eco-friendly option that can be worn for up to 12 hours.</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card className="border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                      <CardHeader className="py-3 px-4 bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/90">
                        <CardTitle className="text-sm font-medium">Period Underwear</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <p className="text-xs">Absorbent underwear, good as backup or for light days.</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mood" className="border-purple-200 dark:border-slate-700">
              <AccordionTrigger className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md">
                <div className="flex items-center">
                  <Smile className="mr-2 h-4 w-4" />
                  Mood Swing Support
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-3 rounded-lg shadow-inner"
                  >
                    <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300 mb-1">
                      Calming Activities
                    </h4>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>Journaling your thoughts and feelings</li>
                      <li>Listening to soothing music</li>
                      <li>Taking a warm bath with essential oils</li>
                      <li>Gentle yoga or stretching</li>
                      <li>Meditation or deep breathing exercises</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-3 rounded-lg shadow-inner"
                  >
                    <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300 mb-1">
                      Quick Grounding Exercise
                    </h4>
                    <p className="text-xs">
                      Try the 5-4-3-2-1 technique: Identify 5 things you can see, 4 things you can touch, 3 things you
                      can hear, 2 things you can smell, and 1 thing you can taste.
                    </p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md">
                      Start Guided Meditation
                    </Button>
                  </motion.div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cravings" className="border-purple-200 dark:border-slate-700">
              <AccordionTrigger className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md">
                <div className="flex items-center">
                  <Coffee className="mr-2 h-4 w-4" />
                  Craving Support
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300">
                    Healthy Snack Alternatives
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {healthySnacks.map((snack, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-2 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 rounded-lg shadow-sm"
                      >
                        <div>
                          <p className="font-medium text-sm">{snack.name}</p>
                          <p className="text-xs text-gray-500">{snack.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300 mt-2">Easy Recipes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {easyRecipes.map((recipe, index) => (
                      <motion.div key={index} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-purple-200 hover:bg-purple-50 shadow-sm"
                          onClick={() => handleShowRecipe(recipe.name)}
                        >
                          <span>{recipe.name}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cramps" className="border-purple-200 dark:border-slate-700">
              <AccordionTrigger className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md">
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4" />
                  Cramps Relief
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300">Gentle Stretches</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {crampExercises.map((exercise, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="p-2 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 rounded-lg shadow-sm"
                      >
                        <p className="font-medium text-sm">{exercise.name}</p>
                        <p className="text-xs text-gray-500">{exercise.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-3 rounded-lg shadow-inner mt-2"
                  >
                    <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300 mb-1">Additional Tips</h4>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>Apply a warm compress to your lower abdomen</li>
                      <li>Stay hydrated throughout the day</li>
                      <li>Take a warm bath with Epsom salts</li>
                      <li>Try over-the-counter pain relievers if needed</li>
                      <li>Avoid caffeine and alcohol which can worsen cramps</li>
                    </ul>
                  </motion.div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Extras Section */}
        <div className="p-4 border-t border-purple-100 dark:border-slate-700 bg-gradient-to-b from-purple-50/30 to-white dark:from-slate-900 dark:to-slate-900">
          <div className="flex flex-wrap gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm"
              >
                <History className="mr-1 h-3 w-3" />
                Cycle History
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm"
              >
                <Download className="mr-1 h-3 w-3" />
                Export Data
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm"
              >
                <Settings className="mr-1 h-3 w-3" />
                Settings
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm"
              >
                <HelpCircle className="mr-1 h-3 w-3" />
                FAQs
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm"
              >
                <Phone className="mr-1 h-3 w-3" />
                Talk to a Doctor
              </Button>
            </motion.div>
          </div>
        </div>
      </Tabs>

      {/* Recipe Modal */}
      <Dialog open={showRecipeModal} onOpenChange={setShowRecipeModal}>
      <DialogContent className="p-0 bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-700 max-h-[80vh] overflow-hidden flex flex-col">
  <div className="overflow-y-auto px-4 py-4 flex-1">
    <PeriodCarePanel />
  </div>
</DialogContent>


      </Dialog>
    </div>
  )
}
