import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-purple-600 dark:text-purple-300">AuraMind</CardTitle>
            <CardDescription>Your companion for mental wellbeing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-slate-600 dark:text-slate-300">
                A safe space to talk, reflect, and grow with AI-powered support.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <Link href="/signin" className="w-full">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-slate-800"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="text-center text-xs text-slate-500 dark:text-slate-400">
            <p className="w-full">Need immediate help? Call the Mental Health Helpline: 988</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
