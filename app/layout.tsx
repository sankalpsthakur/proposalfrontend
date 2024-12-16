import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from "@/components/ui/toast-primitive";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pablo - Green Hydrogen Solutions',
  description: 'Optimized sizing for your green hydrogen projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
<<<<<<< HEAD
  );
}

=======
  )
}
>>>>>>> 10ba9b5905ad7da911dddd932c1d7c7e3be4ffba
