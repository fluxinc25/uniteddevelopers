const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you fill out our contact form. This may include your name, email address, and any message you send us.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to respond to your inquiries, provide our services, and improve our website. We do not sell or share your personal information with third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Cookies</h2>
            <p>We may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello.uniteddevelopers@gmail.com" className="text-blue-600 hover:underline">hello.uniteddevelopers@gmail.com</a>.</p>
          </section>

          <p className="text-sm text-gray-400 pt-4 border-t">Last updated: August 2026</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;