import * as React from "react"
import { cn } from "@/lib/utils"

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded-lg shadow-xl p-6 max-w-lg w-full",
          className
        )}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

