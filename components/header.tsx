"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, MessageCircle, User, LogOut, Moon, Sun, History } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

interface HeaderProps {
  onHistoryClick?: () => void
}

export default function Header({ onHistoryClick }: HeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-purple-100 dark:border-slate-700 px-4 py-3 shadow-sm backdrop-blur-sm bg-white/90 dark:bg-slate-800/90">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {onHistoryClick && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-1 rounded-full text-purple-600 hover:bg-purple-50 dark:text-purple-300 dark:hover:bg-slate-700"
              onClick={onHistoryClick}
            >
              <History className="h-5 w-5" />
              <span className="sr-only">History</span>
            </Button>
          )}
          <Link href="/chat" className="flex items-center space-x-2 group">
            <motion.div
              className="h-8 w-8 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/logo.png"
                alt="AuraMind Logo"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.span
              className="font-bold text-purple-600 dark:text-purple-300"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              AuraMind
            </motion.span>
          </Link>
        </div>

        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="h-8 w-8 bg-purple-100 dark:bg-purple-800 ring-2 ring-purple-200 dark:ring-purple-700 overflow-hidden">
                  <img
                    src="/user-avatar.png"
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </Avatar>
              </motion.div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 animate-in fade-in-80 slide-in-from-top-5 bg-white/95 backdrop-blur-sm dark:bg-slate-800/95"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/chat")} className="cursor-pointer">
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>Chat</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
              {theme === "dark" ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 dark:text-red-400 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
