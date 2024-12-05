// Simplified version of the use-toast hook
import { useState } from 'react'

export interface Toast {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = (newToast: Toast) => {
    setToast(newToast)
    setTimeout(() => setToast(null), 3000)
  }

  return { toast, showToast }
}

