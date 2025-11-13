import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-indigo-600 mb-2">Stickrr</h3>
            <p className="text-sm text-gray-600">
              Create beautiful custom labels for all your organizing needs.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/studio" className="text-sm text-gray-600 hover:text-indigo-600 transition">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-sm text-gray-600 hover:text-indigo-600 transition">
                  My Labels
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-indigo-600 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-indigo-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-indigo-600 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@stickrr.com" className="text-sm text-gray-600 hover:text-indigo-600 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="mailto:privacy@stickrr.com" className="text-sm text-gray-600 hover:text-indigo-600 transition">
                  Privacy Requests
                </a>
              </li>
              <li>
                <Link href="/settings" className="text-sm text-gray-600 hover:text-indigo-600 transition">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} Stickrr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
