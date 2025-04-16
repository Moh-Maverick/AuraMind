"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import Header from "@/components/header"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark")

  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)
    setTheme(newTheme)
  }

  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <div className="container mx-auto py-6 px-4 max-w-3xl">
        <h1 className="text-2xl font-bold text-lightBlue-600 dark:text-lightBlue-300 mb-6 flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="details">Edit Details</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>View and manage your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full bg-lightBlue-200 dark:bg-lightBlue-800 flex items-center justify-center">
                    <span className="text-lightBlue-700 dark:text-lightBlue-200 text-xl font-bold">JD</span>
                  </div>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">john.doe@example.com</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium mb-2">Account Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Member since</span>
                      <span>January 15, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Last login</span>
                      <span>Today, 2:30 PM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Edit Details</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>

                <Button className="mt-4 bg-lightBlue-600 hover:bg-lightBlue-700 dark:bg-lightBlue-700 dark:hover:bg-lightBlue-600">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact Information</CardTitle>
                <CardDescription>Add contacts who can be reached in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contact Name</Label>
                  <Input id="emergencyName" placeholder="Enter name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">Relationship</Label>
                  <Input id="emergencyRelation" placeholder="E.g., Family, Friend, Therapist" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone Number</Label>
                  <Input id="emergencyPhone" type="tel" placeholder="Enter phone number" />
                </div>

                <div className="pt-4">
                  <h4 className="font-medium mb-2">Crisis Resources</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    National Suicide Prevention Lifeline: 988 or 1-800-273-8255
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Crisis Text Line: Text HOME to 741741</p>
                </div>

                <Button className="mt-4 bg-lightBlue-600 hover:bg-lightBlue-700 dark:bg-lightBlue-700 dark:hover:bg-lightBlue-600">
                  Save Contact
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your data and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Collection</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Allow us to collect usage data to improve your experience
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Chat History</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Save your conversation history</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive updates and wellness tips via email
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-slate-800"
                  >
                    Delete My Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the appearance of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes</p>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={handleThemeToggle} />
                </div>

                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-lg border cursor-pointer ${
                      !isDarkMode
                        ? "border-lightBlue-600 bg-white"
                        : "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                    }`}
                    onClick={() => {
                      setIsDarkMode(false)
                      setTheme("light")
                    }}
                  >
                    <div className="h-20 bg-white border border-slate-200 rounded mb-2"></div>
                    <p className="text-center font-medium">Light</p>
                  </div>

                  <div
                    className={`p-4 rounded-lg border cursor-pointer ${
                      isDarkMode
                        ? "border-lightBlue-600 bg-slate-900"
                        : "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                    }`}
                    onClick={() => {
                      setIsDarkMode(true)
                      setTheme("dark")
                    }}
                  >
                    <div className="h-20 bg-slate-900 border border-slate-700 rounded mb-2"></div>
                    <p className="text-center font-medium">Dark</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-slate-800"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
