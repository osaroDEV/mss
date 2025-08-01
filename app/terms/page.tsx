import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <div className="text-lg text-gray-600">
              <p className="font-semibold">Michael Stevens Solicitors</p>
              <p className="text-sm mt-2">Last updated: 1 August 2025</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service ("Terms") govern your use of the Michael Stevens Solicitors website and any services provided through this website. By accessing or using our website, you agree to be bound by these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. About Our Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Michael Stevens Solicitors is a law firm providing legal services. Information on this website is for general informational purposes only and does not constitute legal advice. Each legal matter is unique and requires individual assessment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. No Attorney-Client Relationship</h2>
              <p className="text-gray-700 leading-relaxed">
                Use of this website or communication through it does not create an attorney-client relationship between you and Michael Stevens Solicitors. Such relationships are established only through signed retainer agreements. Do not send confidential information through unsecured communications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Website Use</h2>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Permitted Use:</h3>
                <p className="text-gray-700 leading-relaxed">You may use this website for lawful purposes to learn about our services and contact us.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Prohibited Use:</h3>
                <p className="text-gray-700 leading-relaxed mb-2">You may not:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Use the website for unlawful purposes</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Transmit viruses, malware, or other harmful code</li>
                  <li>Interfere with the website's operation</li>
                  <li>Copy, reproduce, or distribute website content without permission</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All website content, including text, images, logos, and design elements, is owned by Michael Stevens Solicitors or licensed to us. You may not use our content without written permission except as necessary for normal website browsing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the content or practices of these external sites. Links do not constitute endorsements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimers</h2>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Information Accuracy:</h3>
                <p className="text-gray-700 leading-relaxed">While we strive for accuracy, we make no warranties about the completeness, reliability, or timeliness of website information.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Service Availability:</h3>
                <p className="text-gray-700 leading-relaxed">We do not guarantee uninterrupted website availability and reserve the right to modify or discontinue services at any time.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Michael Stevens Solicitors shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by UK law. Any disputes shall be resolved in the courts of the United Kingdom.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the website constitutes acceptance of modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">For questions about these Terms, please contact:</p>
              <div className="bg-gray-50 p-6 rounded-lg border">
                <p className="font-semibold text-gray-900">Michael Stevens Solicitors</p>
                <p className="text-gray-700">Unit D Atrium House 459-463 New Cross Road, London SE14 6AJ United Kingdom</p>
                <p className="text-gray-700">+44 (0) 20 8469 3714</p>
                <p className="text-gray-700">info@michaelstevenssolicitors.com</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;