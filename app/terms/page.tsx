import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last Updated: November 11, 2025</p>

          <div className="prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using Stickrr ("Service"), you agree to be bound by these Terms of Service ("Terms").
              If you do not agree to these Terms, do not use the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Eligibility</h2>
            <p className="text-gray-700 mb-4">
              You must be at least <strong>13 years old</strong> to use this Service. By using the Service, you represent and warrant that you meet this age requirement.
              If you are under 18, you confirm that you have parental or guardian consent to use the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Account Registration</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must notify us immediately of any unauthorized access to your account</li>
              <li>One account per user; sharing accounts is prohibited</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Service Description</h2>
            <p className="text-gray-700 mb-2">Stickrr provides a mobile label maker application with the following features:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Create custom labels for various purposes (seed packets, mason jars, freezer containers, etc.)</li>
              <li>Free tier: 3 label downloads</li>
              <li>Subscription: $2.99/month for unlimited downloads</li>
              <li>One-time purchase: $0.49 per label</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Acceptable Use Policy</h2>
            <p className="text-gray-700 mb-2">You agree NOT to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Violate any laws or regulations in your jurisdiction</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Upload or create content that is offensive, defamatory, or harmful</li>
              <li>Attempt to hack, reverse engineer, or compromise the Service</li>
              <li>Scrape, spider, or crawl the Service using automated means</li>
              <li>Share your account credentials with others</li>
              <li>Circumvent usage limits or payment requirements</li>
              <li>Use the Service to spam, harass, or harm others</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Intellectual Property</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">6.1 Our Content</h3>
            <p className="text-gray-700 mb-4">
              The Service, including its design, software, graphics, and templates, is owned by Stickrr and protected by copyright and trademark laws.
              You may not copy, modify, distribute, or create derivative works based on our content without permission.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">6.2 Your Content</h3>
            <p className="text-gray-700 mb-4">
              You retain all rights to the label designs you create using the Service. By using the Service, you grant us a limited license
              to store, display, and process your designs solely for the purpose of providing the Service to you.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">6.3 User-Uploaded Images</h3>
            <p className="text-gray-700 mb-4">
              You represent that you have the right to use any images you upload to the Service. You are solely responsible
              for ensuring you have proper licenses or permissions for any third-party content.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Payment Terms</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">7.1 Pricing</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Free tier: 3 label downloads (no payment required)</li>
              <li>Subscription: $2.99/month, billed monthly, cancel anytime</li>
              <li>One-time purchase: $0.49 per label download</li>
              <li>Prices are subject to change with 30 days notice</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">7.2 Billing</h3>
            <p className="text-gray-700 mb-4">
              Payments are processed by Stripe. By providing payment information, you authorize us to charge your payment method.
              Subscription fees are billed in advance on a monthly basis.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">7.3 Refund Policy</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Subscriptions:</strong> You may cancel your subscription at any time. No refunds for partial months.</li>
              <li><strong>One-time purchases:</strong> Refunds available within 7 days of purchase if the label was not downloaded.</li>
              <li><strong>Technical issues:</strong> If you experience technical problems preventing use, contact support@stickrr.com for assistance or refund.</li>
              <li>All refund requests must be submitted to support@stickrr.com</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">7.4 Cancellation</h3>
            <p className="text-gray-700 mb-4">
              You may cancel your subscription at any time through your account settings or by contacting support.
              Cancellation takes effect at the end of the current billing period. You will retain access until that date.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Service Availability</h2>
            <p className="text-gray-700 mb-4">
              We strive to provide reliable service, but we do not guarantee uninterrupted or error-free operation. We may:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Temporarily suspend the Service for maintenance or upgrades</li>
              <li>Modify or discontinue features with reasonable notice</li>
              <li>Impose usage limits to ensure fair access for all users</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9. Account Termination</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">9.1 By You</h3>
            <p className="text-gray-700 mb-4">
              You may delete your account at any time through your <Link href="/settings" className="text-indigo-600 hover:underline">account settings</Link>.
              Upon deletion, all your data will be permanently removed within 30 days.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">9.2 By Us</h3>
            <p className="text-gray-700 mb-4">
              We may suspend or terminate your account if you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Violate these Terms of Service</li>
              <li>Engage in fraudulent or abusive behavior</li>
              <li>Provide false information during registration</li>
              <li>Fail to pay for services rendered</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10. Disclaimers</h2>
            <p className="text-gray-700 mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-gray-700 mb-4">
              We do not warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>The Service will meet your specific requirements</li>
              <li>The Service will be uninterrupted, timely, or error-free</li>
              <li>The results obtained from the Service will be accurate or reliable</li>
              <li>Any defects in the Service will be corrected</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, STICKRR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
              OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="text-gray-700 mb-4">
              OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS, OR $100, WHICHEVER IS GREATER.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12. Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify and hold harmless Stickrr and its affiliates from any claims, damages, losses, liabilities,
              and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Content you upload or create using the Service</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              Any disputes arising from these Terms or the Service shall be resolved through binding arbitration in accordance with
              the rules of the American Arbitration Association, rather than in court. You waive your right to a jury trial.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">14. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States,
              without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may modify these Terms at any time. We will notify you of significant changes by email or through the Service.
              Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16. Severability</h2>
            <p className="text-gray-700 mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">17. Entire Agreement</h2>
            <p className="text-gray-700 mb-4">
              These Terms, together with our <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>,
              constitute the entire agreement between you and Stickrr regarding the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">18. Contact Information</h2>
            <p className="text-gray-700 mb-2">
              If you have questions about these Terms, please contact us:
            </p>
            <p className="text-gray-700">
              Email: <a href="mailto:support@stickrr.com" className="text-indigo-600 hover:underline">support@stickrr.com</a><br />
              Legal: <a href="mailto:legal@stickrr.com" className="text-indigo-600 hover:underline">legal@stickrr.com</a>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link href="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
