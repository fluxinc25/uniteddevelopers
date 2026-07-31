import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2, MessageCircle, Users, Camera, Mail, MapPin, Phone,
  ArrowUpRight
} from 'lucide-react';
import logoImage from '../../assets/logo.png';

const footerLinks = {
  services: [
    { label: 'Business Websites', path: '/services' },
    { label: 'E-Commerce', path: '/services' },
    { label: 'Android Apps', path: '/services' },
    { label: 'UI/UX Design', path: '/services' },
    { label: 'Maintenance', path: '/services' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ],
  resources: [
    { label: 'Blog', path: '#' },
    { label: 'Case Studies', path: '/projects' },
    { label: 'FAQ', path: '#' },
    { label: 'Privacy Policy', path: '#' },
  ],
};

const socialLinks = [
  { icon: Code2, href: '#', label: 'GitHub' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Users, href: '#', label: 'LinkedIn' },
  { icon: Camera, href: '#', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden bg-black">
      {/* Top gradient line */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />

      <div className="relative section-padding py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-transparent flex items-center justify-center">
                  <img
                    src={logoImage}
                    alt="United Developers"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold">
                  United{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Developers
                  </span>
                </span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                We craft premium digital experiences that transform businesses.
                From stunning websites to powerful mobile applications.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2 lg:col-start-6">
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                Get in Touch
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  <span className="text-white/70 text-sm">hello@uniteddevelopers.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  <span className="text-white/70 text-sm">+92 332 4765340</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  <span className="text-white/70 text-sm">Remote/Worldwide</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative mt-16 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © 2026 United Developers. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;