"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Search, Calendar, MessageSquare, Clock } from "lucide-react"
import { SlidePanel } from "@/components/ui/slide-panel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface HistoryPanelProps {
  open: boolean
  onClose: () => void
  conversations: Conversation[]
  onSelectConversation: (conversation: Conversation) => void
}

export default function HistoryPanel({ open, onClose, conversations, onSelectConversation }: HistoryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("recent")

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.date.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group conversations by date
  const groupedConversations = filteredConversations.reduce<Record<string, Conversation[]>>((groups, conversation) => {
    const date = conversation.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(conversation)
    return groups
  }, {})

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      side="left"
      size="default"
      title="Conversation History"
      className="bg-gradient-to-b from-white to-purple-50 dark:from-slate-900 dark:to-slate-900"
    >
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-purple-200 focus-visible:ring-purple-500 dark:border-slate-700"
          />
        </div>
      </div>

      <Tabs defaultValue="recent" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="recent" className="text-xs">
            Recent
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs">
            Favorites
          </TabsTrigger>
          <TabsTrigger value="all" className="text-xs">
            All
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6">
              {Object.entries(groupedConversations)
                .slice(0, 3)
                .map(([date, convos]) => (
                  <div key={date} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">{date}</h3>
                    </div>
                    <div className="space-y-2 pl-6">
                      {convos.map((conversation) => (
                        <ConversationCard
                          key={conversation.id}
                          conversation={conversation}
                          onSelect={onSelectConversation}
                          onClose={onClose}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="favorites" className="h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-purple-200 dark:text-purple-800" />
            <p className="mt-2 text-slate-500 dark:text-slate-400">No favorite conversations yet</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Mark conversations as favorites to see them here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6">
              {Object.entries(groupedConversations).map(([date, convos]) => (
                <div key={date} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">{date}</h3>
                  </div>
                  <div className="space-y-2 pl-6">
                    {convos.map((conversation) => (
                      <ConversationCard
                        key={conversation.id}
                        conversation={conversation}
                        onSelect={onSelectConversation}
                        onClose={onClose}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </SlidePanel>
  )
}

function ConversationCard({
  conversation,
  onSelect,
  onClose,
}: {
  conversation: Conversation
  onSelect: (conversation: Conversation) => void
  onClose: () => void
}) {
  const handleSelect = () => {
    onSelect(conversation)
    onClose()
  }

  // Get the first message timestamp
  const firstMessageTime = conversation.messages[0]?.timestamp
  const formattedTime = firstMessageTime ? format(new Date(firstMessageTime), "h:mm a") : ""

  return (
    <div
      className="group relative rounded-lg border border-purple-100 bg-white p-3 shadow-sm transition-all hover:border-purple-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
      onClick={handleSelect}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 bg-purple-100 dark:bg-purple-900">
          <span className="text-purple-600 dark:text-purple-300 text-xs font-bold">AI</span>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm text-slate-900 truncate dark:text-slate-100">
              {conversation.messages[0]?.content.substring(0, 20)}...
            </h4>
            <div className="flex items-center">
              <Clock className="h-3 w-3 text-slate-400 mr-1" />
              <span className="text-xs text-slate-400">{formattedTime}</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 dark:text-slate-400">{conversation.preview}</p>
          <div className="mt-2 flex items-center gap-1">
            <Badge
              variant="outline"
              className="text-[10px] px-1 py-0 bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
            >
              {conversation.messages.length} messages
            </Badge>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent ring-offset-2 transition-all group-hover:ring-purple-200 dark:ring-offset-slate-900 dark:group-hover:ring-purple-800"></div>
    </div>
  )
}
