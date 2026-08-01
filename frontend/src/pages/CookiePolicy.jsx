const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help us provide and improve our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Cookies</h2>
            <p>We use cookies to understand how you interact with our website, remember your preferences, and improve your browsing experience.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Types of Cookies We Use</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site.</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Managing Cookies</h2>
            <p>You can control and manage cookies through your browser settings. Please note that disabling cookies may affect your experience on our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
            <p>If you have questions about our Cookie Policy, email us at <a href="mailto:hello.uniteddevelopers@gmail.com" className="text-blue-600 hover:underline">hello.uniteddevelopers@gmail.com</a>.</p>
          </section>

          <p className="text-sm text-gray-400 pt-4 border-t">Last updated: August 2026</p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;