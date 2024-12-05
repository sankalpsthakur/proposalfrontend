import Link from 'next/link'
import Image from 'next/image'
import './globals.css'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Pablo Sizing Engine</h1>
            <p className="text-xl mb-8">Use assumptions, variables, and visualization for optimization of sizing</p>
            <Link href="/form" className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors">
              Start
            </Link>
          </div>
          <div className="md:w-1/2 bg-gray-900 p-8 flex items-center justify-center">
            <Image
              src="/images/Image.png"
              alt="Pablo Sizing Engine"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

