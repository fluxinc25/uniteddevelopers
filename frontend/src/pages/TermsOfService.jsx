const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using our website, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Services</h2>
            <p>United Developers provides web development, mobile app development, UI/UX design, and related digital services. All services are subject to separate agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and images, is the property of United Developers and protected by copyright laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Limitation of Liability</h2>
            <p>United Developers shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Contact</h2>
            <p>For questions about these Terms, contact us at <a href="mailto:hello.uniteddevelopers@gmail.com" className="text-blue-600 hover:underline">hello.uniteddevelopers@gmail.com</a>.</p>
          </section>

          <p className="text-sm text-gray-400 pt-4 border-t">Last updated: August 2026</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;