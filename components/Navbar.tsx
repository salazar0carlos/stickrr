'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/supabase'
import { Menu, X, LogOut } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    auth.getUser().then(setUser)
  }, [])

  const handleSignOut = async () => {
    await auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-600 py-2">
            Stickrr
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  href="/designer"
                  className={`${
                    pathname === '/designer' ? 'text-indigo-600' : 'text-gray-700'
                  } hover:text-indigo-600 transition`}
                >
                  Designer
                </Link>
                <Link
                  href="/library"
                  className={`${
                    pathname === '/library' ? 'text-indigo-600' : 'text-gray-700'
                  } hover:text-indigo-600 transition`}
                >
                  My Labels
                </Link>
                <Link
                  href="/pricing"
                  className={`${
                    pathname === '/pricing' ? 'text-indigo-600' : 'text-gray-700'
                  } hover:text-indigo-600 transition`}
                >
                  Pricing
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-700 hover:text-red-600 transition py-1"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  Pricing
                </Link>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-2">
            {user ? (
              <>
                <Link
                  href="/designer"
                  className="block text-gray-700 hover:text-indigo-600 transition py-3 px-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Designer
                </Link>
                <Link
                  href="/library"
                  className="block text-gray-700 hover:text-indigo-600 transition py-3 px-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Labels
                </Link>
                <Link
                  href="/pricing"
                  className="block text-gray-700 hover:text-indigo-600 transition py-3 px-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center text-red-600 py-3 px-2 rounded-lg hover:bg-red-50 w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="block text-gray-700 hover:text-indigo-600 transition py-3 px-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-indigo-600 transition py-3 px-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition text-center shadow-sm font-medium mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
