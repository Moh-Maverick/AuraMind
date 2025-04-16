"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const slidePanelVariants = cva(
  "fixed inset-y-0 z-50 flex flex-col bg-white shadow-xl transition-all duration-300 ease-in-out dark:bg-slate-900",
  {
    variants: {
      side: {
        left: "left-0 border-r border-purple-100 dark:border-slate-700",
        right: "right-0 border-l border-purple-100 dark:border-slate-700",
      },
      size: {
        sm: "w-72 sm:max-w-sm",
        default: "w-full max-w-md",
        lg: "w-full max-w-lg",
        xl: "w-full max-w-xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      side: "left",
      size: "default",
    },
  },
)

export interface SlidePanelProps extends VariantProps<typeof slidePanelVariants> {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  overlay?: boolean
  closeButton?: boolean
  title?: string
}

export function SlidePanel({
  side,
  size,
  open,
  onClose,
  children,
  className,
  overlay = true,
  closeButton = true,
  title,
}: SlidePanelProps) {
  // Handle escape key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onClose])

  // Prevent body scroll when panel is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {overlay && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity dark:bg-slate-950/80"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          slidePanelVariants({ side, size }),
          side === "left"
            ? open
              ? "translate-x-0"
              : "-translate-x-full"
            : open
              ? "translate-x-0"
              : "translate-x-full",
          className,
        )}
        role="dialog"
        aria-modal="true"
      >
        {(title || closeButton) && (
          <div className="flex items-center justify-between border-b border-purple-100 px-4 py-3 dark:border-slate-700">
            {title && <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-300">{title}</h2>}
            {closeButton && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-500 hover:bg-purple-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </>
  )
}
