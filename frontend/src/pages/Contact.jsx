import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Clock,
  MessageCircle, Shield, Zap, Globe, ArrowUpRight
} from 'lucide-react';
import { FaGithub, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { messageAPI } from '../api/axios';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
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

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello.uniteddevelopers@gmail.com',
      href: 'mailto:hello.uniteddevelopers@gmail.com',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 325 4839926',
      href: 'tel:+923254839926',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
  icon: FaWhatsapp,
  label: 'WhatsApp',
  value: '+92 325 4839926',
  href: 'https://wa.me/923254839926',
  color: 'from-green-500 to-green-600',
  bgColor: 'bg-green-50',
},
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote / Worldwide',
      href: null,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
    },
  ];

  const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com/uniteddevelopers.llc/', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: FaGithub, href: 'https://github.com/fluxinc25/uniteddevelopers', label: 'GitHub', color: 'hover:text-gray-900' },
  { icon: FaTwitter, href: 'https://x.com/uniteddevllc', label: 'Twitter', color: 'hover:text-sky-500' },
];

  return (
    <div className="pt-24 pb-20 bg-surface-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-50/50 to-accent-50/30 rounded-full blur-3xl" />
      </div>

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-surface-200 shadow-sm text-primary-600 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            Let's Work Together
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-bold text-surface-900 mb-6 tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear about it. Send us a message 
            and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-surface-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-surface-400 text-xs font-medium uppercase tracking-wider mb-0.5">{item.label}</div>
                        <div className="text-surface-800 font-semibold truncate group-hover:text-primary-600 transition-colors">{item.value}</div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-surface-300 group-hover:text-primary-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-surface-200/80 shadow-soft">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-surface-400 text-xs font-medium uppercase tracking-wider mb-0.5">{item.label}</div>
                        <div className="text-surface-800 font-semibold">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Response Time Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-700 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.4),transparent_50%)]" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Lightning Fast Response</h3>
                  <p className="text-primary-100 text-sm leading-relaxed">
                    We typically respond within <span className="font-semibold text-white">24 hours</span>. 
                    For urgent inquiries, mention <span className="font-semibold text-white">"URGENT"</span> in the subject.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft"
            >
              <h3 className="font-semibold text-surface-800 mb-4 text-sm uppercase tracking-wider">Follow Us</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-11 h-11 rounded-xl bg-surface-50 border border-surface-200 flex items-center justify-center text-surface-400 ${social.color} hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {['A', 'B', 'C', 'D'].map((letter, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-surface-900">30+</div>
                  <div className="text-surface-400 text-sm">Happy Clients Worldwide</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="p-8 lg:p-10 rounded-3xl bg-white border border-surface-200/80 shadow-soft-lg relative overflow-hidden">
              {/* Subtle gradient top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-surface-800">Send a Message</h2>
                  <p className="text-surface-400 text-sm">Fill out the form below and we'll get back to you</p>
                </div>
              </div>

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
                {/* HONEYPOT */}
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
                  placeholder="Tell us about your project, timeline, and budget..."
                />

                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  icon={Send}
                  className="w-full justify-center py-3.5 text-base"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 pt-2 text-surface-400 text-xs">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Your information is secure and encrypted</span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Globe Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-surface-200 shadow-soft">
            <Globe className="w-5 h-5 text-primary-500" />
            <span className="text-surface-600 text-sm font-medium">Serving clients globally — from startups to enterprises</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;