import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Sparkles, Zap, Printer, Star } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Free to start • No credit card required
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              Create Beautiful Labels
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                In Seconds
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
              Design professional labels for seed packets, mason jars, freezer containers, school supplies, and more. Print on any label printer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
              >
                Start Creating Free
              </Link>
              <Link
                href="/pricing"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-200"
              >
                View Pricing
              </Link>
            </div>

            <p className="text-gray-500 mt-6">
              ✨ Start with 3 free labels • No signup required to browse templates
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Make Labels
              </h2>
              <p className="text-xl text-gray-600">
                Professional features, simple interface
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  15+ Templates
                </h3>
                <p className="text-gray-600">
                  Pre-designed templates for seed packets, mason jars, freezer containers, school supplies, and pantry organization
                </p>
              </div>

              <div className="text-center p-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Full Customization
                </h3>
                <p className="text-gray-600">
                  Edit text, add icons, change colors, and adjust sizes. Make each label uniquely yours
                </p>
              </div>

              <div className="text-center p-8">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Printer className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Print Ready PDFs
                </h3>
                <p className="text-gray-600">
                  Export optimized for Dymo, Brother, HP, and all thermal printers. Perfect sizing every time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Perfect For Every Project
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Garden & Seeds', desc: 'Track plantings and varieties', color: 'bg-green-50 border-green-200' },
                { title: 'Mason Jars', desc: 'Label homemade jams and preserves', color: 'bg-pink-50 border-pink-200' },
                { title: 'Freezer Meals', desc: 'Date and organize frozen foods', color: 'bg-blue-50 border-blue-200' },
                { title: 'School Supplies', desc: 'Name tags for kids items', color: 'bg-yellow-50 border-yellow-200' },
                { title: 'Pantry Organization', desc: 'Beautiful container labels', color: 'bg-orange-50 border-orange-200' },
                { title: 'Gift Tags', desc: 'Personalize presents', color: 'bg-purple-50 border-purple-200' },
              ].map((useCase, i) => (
                <div key={i} className={`p-6 rounded-lg border-2 ${useCase.color}`}>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Start Free, Upgrade When Ready
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              3 free labels to try it out. Then just $2.99/month for unlimited labels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="bg-indigo-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-400 transition"
              >
                See All Plans
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-2xl font-bold text-white mb-4">Stickrr</div>
            <p className="mb-6">Create beautiful labels for everything</p>
            <div className="flex justify-center gap-8 text-sm">
              <Link href="/pricing" className="hover:text-white transition">
                Pricing
              </Link>
              <Link href="/login" className="hover:text-white transition">
                Login
              </Link>
              <Link href="/signup" className="hover:text-white transition">
                Sign Up
              </Link>
            </div>
            <p className="text-xs mt-8">© 2024 Stickrr. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
