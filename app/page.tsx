import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-[#1A3721] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#CCFF00]">Pablo</div>
          <nav>
            <Button 
              variant="outline" 
              className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#1A3721] font-semibold transition-colors duration-200"
              asChild
            >
              <Link href="/app">Sign in to Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#1A3721] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Optimized Sizing for Your Green Hydrogen Projects.</h1>
              <p className="text-xl mb-6">Get instant insights into the best-fit project size, complete with detailed financial models and scenarios.</p>
              <Button size="lg" className="bg-[#CCFF00] text-[#1A3721] hover:bg-white hover:text-[#1A3721] font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" asChild>
                <Link href="https://forms.gle/dHvDGGf5vHZL4FSVA" target="_blank">Join Waitlist</Link>
              </Button>
            </div>
          </div>
          <p className="text-center mt-8 text-lg">Tailored for your business needs, powered by precision.</p>
        </section>

        {/* What We Offer Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A3721]">Your Green Hydrogen Blueprint, Simplified.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Optimized Project Sizing", description: "Align project configurations with your requirements." },
                { title: "Detailed Financial Scenarios", description: "ROI, OPEX, and CAPEX insights at your fingertips." },
                { title: "Custom Solutions", description: "Tailored models for any scale or industry." },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-[#1A3721] hover:border-[#CCFF00] transition-colors">
                  <div className="text-[#1A3721] text-4xl mb-4">
                    {index === 0 && "🎯"}
                    {index === 1 && "💹"}
                    {index === 2 && "🔧"}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1A3721]">{item.title}</h3>
                  <p className="text-[#1A3721]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-[#1A3721] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How We Deliver Value:</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Input Your Requirements", description: "Share your data or constraints." },
                { title: "Run Optimizations", description: "We calculate the ideal project size and scenarios." },
                { title: "Receive Financial Models", description: "Explore detailed forecasts tailored to your goals." },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#CCFF00] text-[#1A3721] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">{index + 1}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A3721]">Trusted by Industry Leaders</h2>
            <div className="max-w-2xl mx-auto text-center">
              <blockquote className="text-xl italic text-[#1A3721] mb-4">"Pablo provided us with clear, actionable insights that significantly improved our project's ROI. Their optimization tools are game-changers in the green hydrogen space."</blockquote>
              <p className="font-semibold text-[#1A3721]">- Jane Doe, CTO of GreenEnergy Innovations</p>
            </div>
          </div>
        </section>

        {/* Simple Financial Models Section */}
        <section className="py-20 bg-[#1A3721] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Built for Transparency and Ease</h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xl mb-6">Our models make it easy to visualize your project's potential. Key metrics like savings, ROI, and CAPEX are clearly annotated for quick understanding.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#1A3721]">Get Optimized. Go Green.</h2>
            <p className="text-xl mb-8 text-[#1A3721]">Join our waitlist today and start building your sustainable future.</p>
            <Button size="lg" className="bg-[#1A3721] text-white hover:bg-[#CCFF00] hover:text-[#1A3721] font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" asChild>
              <Link href="https://forms.gle/dHvDGGf5vHZL4FSVA" target="_blank">Join Waitlist</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#1A3721] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Pablo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

