import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What services does United Developers offer?',
    answer: 'We offer web development, mobile app development (Android), UI/UX design, e-commerce solutions, and website maintenance services.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'The timeline depends on the complexity of the project. A simple business website typically takes 2-4 weeks, while more complex projects may take 6-12 weeks.',
  },
  {
    question: 'Do you offer ongoing support after project completion?',
    answer: 'Yes, we offer maintenance packages to keep your website or app running smoothly. This includes updates, bug fixes, and performance optimization.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We use modern technologies including React, Node.js, MongoDB, Firebase, Android (Java/Kotlin), and cloud services like AWS and Cloudinary.',
  },
  {
    question: 'How do I get a quote for my project?',
    answer: 'You can fill out our contact form or email us at hello.uniteddevelopers@gmail.com with your project details, and we will get back to you within 24 hours.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Absolutely! We work with clients worldwide and have experience collaborating across different time zones.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-12 text-lg">Find answers to common questions about our services.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <Link to="/contact" className="text-blue-600 hover:underline font-medium">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;