"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X, Target, TrendingUp, Wrench, ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-[#1A3721] shadow-sm backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold font-outfit text-[#CCFF00] flex items-center gap-2"
              >
                Pablo <Sparkles className="w-5 h-5" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-[#CCFF00] hover:text-white transition-colors font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="text-[#CCFF00] hover:text-white transition-colors font-medium">
                How it Works
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#1A3721] font-semibold transition-all duration-300"
                  asChild
                >
                  <Link href="/app" className="flex items-center gap-2">
                    Sign in to Dashboard <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-[#CCFF00] hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                <Link 
                  href="#features" 
                  className="text-[#CCFF00] hover:text-white transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="text-[#CCFF00] hover:text-white transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How it Works
                </Link>
                <Button 
                  variant="outline" 
                  className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#1A3721] font-semibold transition-all duration-300 w-full"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/app" className="flex items-center justify-center gap-2">
                    Sign in to Dashboard <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="bg-[#1A3721] text-white py-32">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="container mx-auto px-4"
          >
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-6xl font-bold mb-6 font-outfit leading-tight"
              >
                Optimized Sizing for Your Green Hydrogen Projects.
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8 text-gray-200"
              >
                Get instant insights into the best-fit project size, complete with detailed financial models and scenarios.
              </motion.p>
              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#CCFF00] text-[#1A3721] hover:bg-white hover:text-[#1A3721] font-semibold px-8 py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  asChild
                >
                  <Link href="https://forms.gle/dHvDGGf5vHZL4FSVA" target="_blank" className="flex items-center gap-2">
                    Join Waitlist <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-lg text-gray-300"
          >
            Tailored for your business needs, powered by precision.
          </motion.p>
        </section>

        {/* What We Offer Section */}
        <section id="features" className="py-32 bg-white scroll-mt-20">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 text-[#1A3721] font-outfit"
            >
              Your Green Hydrogen Blueprint, Simplified.
            </motion.h2>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { 
                  title: "Optimized Project Sizing",
                  description: "Align project configurations with your requirements.",
                  icon: Target
                },
                { 
                  title: "Detailed Financial Scenarios",
                  description: "ROI, OPEX, and CAPEX insights at your fingertips.",
                  icon: TrendingUp
                },
                { 
                  title: "Custom Solutions",
                  description: "Tailored models for any scale or industry.",
                  icon: Wrench
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-[#1A3721] hover:border-[#CCFF00] transition-all duration-300"
                >
                  <div className="text-[#1A3721] mb-6 flex justify-center">
                    <item.icon size={48} className="opacity-90" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-[#1A3721] font-outfit">{item.title}</h3>
                  <p className="text-[#1A3721] opacity-90">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 bg-[#1A3721] text-white scroll-mt-20">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 font-outfit"
            >
              How We Deliver Value:
            </motion.h2>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-12"
            >
              {[
                { title: "Input Your Requirements", description: "Share your data or constraints." },
                { title: "Run Optimizations", description: "We calculate the ideal project size and scenarios." },
                { title: "Receive Financial Models", description: "Explore detailed forecasts tailored to your goals." },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="text-center relative"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#CCFF00] text-[#1A3721] w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-lg"
                  >
                    {index + 1}
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4 font-outfit">{step.title}</h3>
                  <p className="text-gray-300 text-lg">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Simple Financial Models Section */}
        <section className="py-32 bg-white text-[#1A3721]">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-12 font-outfit"
            >
              Built for Transparency and Ease
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="text-xl mb-6 leading-relaxed text-gray-700">
                Our models make it easy to visualize your project's potential. Key metrics like savings, ROI, and CAPEX are clearly annotated for quick understanding.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-[#1A3721]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Get Optimized. Go Green.</h2>
            <p className="text-xl mb-8 text-white">Join our waitlist today and start building your sustainable future.</p>
            <Button size="lg" className="bg-[#CCFF00] text-[#1A3721] hover:bg-white hover:text-[#1A3721] font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" asChild>
              <Link href="https://forms.gle/dHvDGGf5vHZL4FSVA" target="_blank">Join Waitlist</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#1A3721] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Pablo</h3>
              <p className="text-sm text-gray-300">Optimizing green hydrogen projects for a sustainable future.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/app" className="text-gray-300 hover:text-[#CCFF00] transition-colors">Dashboard</Link></li>
                <li><Link href="https://forms.gle/dHvDGGf5vHZL4FSVA" target="_blank" className="text-gray-300 hover:text-[#CCFF00] transition-colors">Join Waitlist</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-gray-300">Have questions? Get in touch with our team.</p>
                <div>
                  <Button variant="outline" className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#1A3721] w-full md:w-auto" asChild>
                    <Link href="mailto:sankalp.thakur@hygenco.in">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Pablo. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-sm text-gray-300 hover:text-[#CCFF00] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-gray-300 hover:text-[#CCFF00] transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

