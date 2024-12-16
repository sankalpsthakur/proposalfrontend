    // Start of Selection
    import { Toast } from "@/components/ui/toast"
    import {
      useToast as useToastPrimitive,
      type ToastOptions as ToastOptionsPrimitive,
    } from "@/components/ui/toast-primitive"
    
    type ToastOptions = {
      title?: React.ReactNode
      description?: React.ReactNode
      action?: React.ReactNode
      variant?: string
    } & Omit<ToastOptionsPrimitive, "content">
    
    export function useToast() {
      const { toast: toastPrimitive } = useToastPrimitive()
    
      function toast(options: ToastOptions) {
        const { title, description, action, ...rest } = options
        toastPrimitive({
          ...rest,
          content: ({ closeToast }) => (
                <Toast>
                  {title && <h3 className="toast-title">{title}</h3>}
                  {description && <p className="toast-description">{description}</p>}
                  {action}
                </Toast>
              ),
            })
      }
    
      return { toast }
    }
