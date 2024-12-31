"use client"

import * as React from "react"
import { ToastContainer, toast as toastPrimitive, ToastContent, ToastOptions as ToastOptionsPrimitive } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export type ToastOptions = ToastOptionsPrimitive & {
  content: ToastContent
}

const ToastContext = React.createContext<{
  toast: (options: ToastOptions) => void
} | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

  React.useEffect(() => {
    forceUpdate()
  }, [])

  return (
    <ToastContext.Provider value={{ toast: (options: ToastOptions) => toastPrimitive(options.content, options) }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
