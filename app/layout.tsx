"use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useToast } from "../app/components/ui/use-toast"; // Ensure correct import
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Pablo Sizing Engine',
//   description: 'Optimize sizing with assumptions, variables, and visualization',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Ensure the Toaster is rendered once at the root */}
        {/* The toast function can be used here if needed */}
      </body>
    </html>
  );
}