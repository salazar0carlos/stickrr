import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last Updated: November 11, 2025</p>

          <div className="prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Stickrr ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
              This privacy policy explains how we collect, use, and safeguard your information when you use our mobile label maker application.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Email address (required for account creation and login)</li>
              <li>Password (encrypted and never stored in plain text)</li>
              <li>User ID (automatically generated)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.2 Design and Usage Data</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Label designs you create (text, images, colors, layouts)</li>
              <li>Template selections and label sizes</li>
              <li>Download history and usage counts</li>
              <li>Account creation and last update timestamps</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.3 Payment Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Stripe Customer ID and Subscription ID</li>
              <li>Payment history and subscription status</li>
              <li>Credit card information is processed and stored by Stripe (not by us)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Provide and maintain our label maker service</li>
              <li>Authenticate your account and manage sessions</li>
              <li>Process payments and manage subscriptions</li>
              <li>Store and sync your label designs across devices</li>
              <li>Enforce free tier limits (3 free downloads)</li>
              <li>Send transactional emails (password resets, payment receipts)</li>
              <li>Improve our service and develop new features</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Third-Party Services</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">4.1 Service Providers</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>
                <strong>Supabase:</strong> Database and authentication services. Stores your account data and label designs.
                <br /><a href="https://supabase.com/privacy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a>
              </li>
              <li>
                <strong>Stripe:</strong> Payment processing for subscriptions and one-time purchases.
                <br /><a href="https://stripe.com/privacy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a>
              </li>
              <li>
                <strong>Vercel:</strong> Application hosting and delivery.
                <br /><a href="https://vercel.com/legal/privacy-policy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>
              </li>
              <li>
                <strong>Google Fonts API:</strong> Font loading (standard HTTP requests, no personal data shared).
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Data Security</h2>
            <p className="text-gray-700 mb-2">We implement industry-standard security measures:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>All data transmitted over HTTPS encryption</li>
              <li>Passwords hashed using bcrypt (never stored in plain text)</li>
              <li>Database encryption at rest via Supabase</li>
              <li>PCI DSS Level 1 compliant payment processing via Stripe</li>
              <li>Webhook signature verification for payment events</li>
              <li>Regular security updates and monitoring</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 mb-2">You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Access:</strong> Request a copy of all data we hold about you</li>
              <li><strong>Export:</strong> Download your data in machine-readable format (JSON)</li>
              <li><strong>Deletion:</strong> Request deletion of your account and all associated data</li>
              <li><strong>Correction:</strong> Update your email address or other account information</li>
              <li><strong>Portability:</strong> Export your label designs to use elsewhere</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To exercise these rights, visit your <Link href="/settings" className="text-indigo-600 hover:underline">Account Settings</Link> or contact us at privacy@stickrr.com
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your data for as long as your account is active. If you delete your account, we will permanently delete all your personal data
              within 30 days, except for data we are legally required to retain (payment records for tax purposes: 7 years).
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use essential cookies for authentication (session tokens managed by Supabase). These cookies are necessary for the service to function.
              We do not use advertising cookies or third-party tracking scripts.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              If you are a parent or guardian and believe your child has provided us with personal data, please contact us at privacy@stickrr.com.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place
              through our service providers' compliance with GDPR and other privacy frameworks.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. We will notify you of significant changes by email or through the application.
              Continued use of our service after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12. Contact Us</h2>
            <p className="text-gray-700 mb-2">
              If you have questions about this privacy policy or our data practices, please contact us:
            </p>
            <p className="text-gray-700">
              Email: <a href="mailto:privacy@stickrr.com" className="text-indigo-600 hover:underline">privacy@stickrr.com</a><br />
              Support: <a href="mailto:support@stickrr.com" className="text-indigo-600 hover:underline">support@stickrr.com</a>
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13. GDPR Compliance (EU Users)</h2>
            <p className="text-gray-700 mb-2">
              If you are located in the European Economic Area, you have additional rights under GDPR:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Legal basis for processing: Contract (to provide our service)</li>
              <li>Right to object to processing</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
              <li>Right to withdraw consent (where applicable)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">14. CCPA Compliance (California Users)</h2>
            <p className="text-gray-700 mb-2">
              If you are a California resident, you have rights under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of sale of personal information (we do not sell your data)</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link href="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
