import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
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
                This Privacy Policy describes how Michael Stevens Solicitors collects, uses, and protects your personal information when you use our website and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Information You Provide:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Contact details (name, email, phone number, address)</li>
                  <li>Information in consultation requests or inquiries</li>
                  <li>Details about your legal matter when you engage our services</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Information Automatically Collected:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>IP address and browser information</li>
                  <li>Website usage data and pages visited</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Provide legal services and respond to inquiries</li>
                <li>Communicate about your legal matters</li>
                <li>Improve our website and services</li>
                <li>Comply with legal and professional obligations</li>
                <li>Send relevant legal updates (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Basis for Processing</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We process your information based on:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><span className="font-medium">Legitimate interests:</span> Providing legal services and maintaining client relationships</li>
                <li><span className="font-medium">Consent:</span> Marketing communications and non-essential cookies</li>
                <li><span className="font-medium">Legal obligations:</span> Professional conduct rules and regulatory requirements</li>
                <li><span className="font-medium">Contract performance:</span> Fulfilling our legal service agreements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We may share your information with:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><span className="font-medium">Service providers:</span> IT support, cloud storage, and administrative services (under strict confidentiality agreements)</li>
                <li><span className="font-medium">Legal and regulatory authorities:</span> When required by law or professional obligations</li>
                <li><span className="font-medium">Third parties:</span> Only with your explicit consent</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-blue-800 font-medium">We never sell your personal information to third parties.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Attorney-Client Privilege</h2>
              <p className="text-gray-700 leading-relaxed">
                Information shared in the context of an established attorney-client relationship is protected by attorney-client privilege and professional confidentiality rules, providing additional protection beyond this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We implement appropriate technical and organizational measures to protect your information, including:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Secure data transmission (SSL encryption)</li>
                <li>Access controls and staff training</li>
                <li>Regular security assessments</li>
                <li>Secure data storage systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We retain your information for as long as necessary to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Provide ongoing legal services</li>
                <li>Comply with professional and legal obligations</li>
                <li>Handle potential claims or disputes</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Client files are typically retained for [X] years after matter completion, as required by professional conduct rules.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-2">Depending on your location, you may have rights to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><span className="font-medium">Access:</span> Request copies of your personal information</li>
                <li><span className="font-medium">Rectification:</span> Correct inaccurate information</li>
                <li><span className="font-medium">Erasure:</span> Request deletion of your information (subject to legal and professional obligations)</li>
                <li><span className="font-medium">Portability:</span> Receive your information in a portable format</li>
                <li><span className="font-medium">Objection:</span> Object to certain processing activities</li>
                <li><span className="font-medium">Restriction:</span> Limit how we process your information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">To exercise these rights, contact us using the information below.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-2">Our website uses cookies to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Enable essential website functionality</li>
                <li>Remember your preferences</li>
                <li>Analyze website usage</li>
                <li>Provide relevant content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings, though this may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                If we transfer your information internationally, we ensure appropriate safeguards are in place to protect your data in accordance with applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of significant changes by posting the updated policy on our website with a new effective date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from children under 18 without parental consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">For questions about this Privacy Policy or to exercise your privacy rights, contact:</p>
              <div className="bg-gray-50 p-6 rounded-lg border">
                <p className="font-semibold text-gray-900">Michael Stevens Solicitors</p>
                <p className="text-gray-700">Unit D Atrium House 459-463 New Cross Road, London SE14 6AJ United Kingdom</p>
                <p className="text-gray-700">+44 (0) 20 8469 3714</p>
                <p className="text-gray-700">info@michaelstevenssolicitors.com</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-medium text-gray-900">Data Protection Officer:</p>
                  <p className="text-gray-700">[If applicable]</p>
                  <p className="text-gray-700">[DPO EMAIL]</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;