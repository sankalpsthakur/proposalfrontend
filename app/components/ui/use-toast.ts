// Simplified version of the use-toast hook
'use client'

import { useState } from 'react'

export interface Toast {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export const useToast = () => {
  const [toastState, setToastState] = useState<Toast | null>(null)

  const toast = (newToast: Toast) => {
    setToastState(newToast)
    setTimeout(() => setToastState(null), 3000)
  }

  return { toastState, toast }
}


