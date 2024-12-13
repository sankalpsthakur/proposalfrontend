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
            <ul className="flex space-x-4">
              <li><Link href="#" className="text-white hover:text-[#CCFF00]">Home</Link></li>
              <li><Link href="#" className="text-white hover:text-[#CCFF00]">About</Link></li>
              <li><Link href="#" className="text-white hover:text-[#CCFF00]">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#1A3721] text-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Optimized Sizing for Your Green Hydrogen Projects.</h1>
              <p className="text-xl mb-6">Get instant insights into the best-fit project size, complete with detailed financial models and scenarios.</p>
              <Button size="lg" className="bg-[#CCFF00] text-[#1A3721] hover:bg-white">Talk to Us</Button>
            </div>
            <div className="md:w-1/2">
              <Image src="/placeholder.svg" width={600} height={400} alt="Financial dashboard illustration" className="rounded-lg shadow-lg" />
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
            <div className="text-center mt-12">
              <Button size="lg" className="bg-[#1A3721] text-white hover:bg-[#CCFF00] hover:text-[#1A3721]">Talk to Us</Button>
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
            <div className="text-center mt-12">
              <Button size="lg" className="bg-[#CCFF00] text-[#1A3721] hover:bg-white">Get Started Now</Button>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A3721]">Trusted by Industry Leaders</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
              {[1, 2, 3, 4, 5].map((logo) => (
                <Image key={logo} src={`/placeholder.svg`} width={120} height={60} alt={`Client logo ${logo}`} className="opacity-50 hover:opacity-100 transition-opacity" />
              ))}
            </div>
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
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="md:w-1/2">
                <Image src="/placeholder.svg" width={600} height={400} alt="Financial model example" className="rounded-lg shadow-lg" />
              </div>
              <div className="md:w-1/2">
                <p className="text-xl mb-6">Our models make it easy to visualize your project's potential. Key metrics like savings, ROI, and CAPEX are clearly annotated for quick understanding.</p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-[#CCFF00] text-[#1A3721] hover:bg-white">Download a Sample Model</Button>
                  <Button size="lg" variant="outline" className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#1A3721]">Talk to Us for a Custom Plan</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#1A3721]">Get Optimized. Go Green.</h2>
            <p className="text-xl mb-8 text-[#1A3721]">Talk to us today and start building your sustainable future.</p>
            <Button size="lg" className="bg-[#1A3721] text-white hover:bg-[#CCFF00] hover:text-[#1A3721]">Talk to Us</Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#1A3721] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: info@pablo.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Green Energy St, Eco City</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul>
                <li><Link href="#" className="hover:text-[#CCFF00]">About</Link></li>
                <li><Link href="#" className="hover:text-[#CCFF00]">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-[#CCFF00]">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-[#CCFF00]">LinkedIn</Link>
                <Link href="#" className="hover:text-[#CCFF00]">Twitter</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Pablo. All rights reserved.</p>
            <p className="mt-2">Optimizing the Future of Green Hydrogen</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

