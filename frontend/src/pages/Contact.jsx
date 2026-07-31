import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { messageAPI } from '../api/axios';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // honeypot field
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await messageAPI.submit(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello.uniteddevelopers@gmail.com',
      href: 'mailto:hello.uniteddevelopers@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 332 4765340',
      href: 'tel:+923324765340',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote / Worldwide',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-50">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
            Contact
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-surface-900 mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-surface-800 mb-6">Contact Information</h2>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-surface-400 text-sm mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-surface-800 font-medium hover:text-primary-600 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-surface-800 font-medium">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time Card */}
            <div className="p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-surface-800">Response Time</h3>
              </div>
              <p className="text-surface-500 text-sm leading-relaxed">
                We typically respond within <span className="font-semibold text-surface-700">24 hours</span>. 
                For urgent inquiries, mention <span className="font-semibold text-primary-600">"URGENT"</span> in the subject.
              </p>
            </div>

            {/* Social Proof */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-700 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
              <div className="relative z-10">
                <div className="text-3xl font-bold mb-1">30+</div>
                <div className="text-primary-100 text-sm mb-4">Happy Clients Worldwide</div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-[10px] font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-3xl bg-white border border-surface-200/80 shadow-soft-lg">
              <h2 className="text-2xl font-bold text-surface-800 mb-6">Send a Message</h2>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl mb-6 text-green-700"
                >
                  <CheckCircle size={20} />
                  <span className="text-sm font-medium">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6 text-red-700"
                >
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 relative">
                {/* HONEYPOT: Hidden from humans, traps bots */}
<input
  type="text"
  name="website"
  value={formData.website}
  onChange={handleChange}
  tabIndex={-1}
  autoComplete="new-password"
  aria-hidden="true"
  style={{
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    zIndex: -1,
  }}
/>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                />

                <TextArea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                />

                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  icon={Send}
                  className="w-full justify-center"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;