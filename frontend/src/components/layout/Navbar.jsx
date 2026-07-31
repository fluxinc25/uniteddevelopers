import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../../assets/logo.png';  // ← FIXED: ../../ not ../
import {
  Home, User, Briefcase, FolderOpen, Wrench, CreditCard, Mail,
  ChevronDown, Code, Smartphone, Palette, Globe, ShoppingCart,
  Utensils, Dumbbell, GraduationCap, Zap, RefreshCw, Shield,
  Layout, Layers, Database, Cloud, Server, Cpu, LineChart
} from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  {
    label: 'Services',
    path: '/services',
    icon: Briefcase,
    megaMenu: {
      columns: [
        {
          title: 'Web Development',
          icon: Globe,
          items: [
            { label: 'Business Websites', icon: Layout, path: '/services' },
            { label: 'E-Commerce', icon: ShoppingCart, path: '/services' },
            { label: 'Portfolio Sites', icon: User, path: '/services' },
            { label: 'Landing Pages', icon: Layers, path: '/services' },
            { label: 'Restaurant Sites', icon: Utensils, path: '/services' },
            { label: 'Gym & Fitness', icon: Dumbbell, path: '/services' },
            { label: 'School & Education', icon: GraduationCap, path: '/services' },
          ],
        },
        {
          title: 'App Development',
          icon: Smartphone,
          items: [
            { label: 'Android Apps', icon: Smartphone, path: '/services' },
            { label: 'Firebase Integration', icon: Database, path: '/services' },
            { label: 'API Integration', icon: Server, path: '/services' },
          ],
        },
        {
          title: 'Design & Creative',
          icon: Palette,
          items: [
            { label: 'UI/UX Design', icon: Palette, path: '/services' },
            { label: 'Website Redesign', icon: RefreshCw, path: '/services' },
            { label: 'Brand Identity', icon: Palette, path: '/services' },
          ],
        },
        {
          title: 'Support & Growth',
          icon: Shield,
          items: [
            { label: 'Maintenance', icon: Shield, path: '/services' },
            { label: 'Performance', icon: Zap, path: '/services' },
            { label: 'SEO Optimization', icon: LineChart, path: '/services' },
          ],
        },
      ],
    },
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: FolderOpen,
    dropdown: [
      { label: 'All Projects', icon: FolderOpen, path: '/projects' },
      { label: 'Web Applications', icon: Globe, path: '/projects' },
      { label: 'Mobile Apps', icon: Smartphone, path: '/projects' },
      { label: 'UI/UX Design', icon: Palette, path: '/projects' },
    ],
  },
  {
    label: 'Skills',
    path: '/skills',
    icon: Wrench,
    dropdown: [
      { label: 'Frontend', icon: Code, path: '/skills' },
      { label: 'Backend', icon: Server, path: '/skills' },
      { label: 'Android', icon: Smartphone, path: '/skills' },
      { label: 'Cloud & DevOps', icon: Cloud, path: '/skills' },
      { label: 'Tools', icon: Cpu, path: '/skills' },
    ],
  },
  { label: 'Pricing', path: '/pricing', icon: CreditCard },
  { label: 'About', path: '/about', icon: User },
  { label: 'Contact', path: '/contact', icon: Mail },
];

const Logo = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/"
      className="relative flex items-center justify-center group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo Image */}
      <motion.div
        className="relative flex items-center justify-center w-16 h-16 rounded-xl overflow-hidden bg-transparent"
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <img
          src={logoImage}
          alt="United Developers"
          className="w-full h-full object-contain"
          style={{ mixBlendMode: 'multiply' }}
        />
      </motion.div>

      {/* Animated Text - Appears on Hover, Larger & Centered */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: -10, width: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden whitespace-nowrap ml-3 flex items-center"
          >
            <span className="text-surface-800 font-bold text-2xl tracking-tight">
              United
            </span>
            <span
              className="font-bold text-2xl tracking-tight ml-1.5"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Developers
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

const DropdownMenu = ({ items, isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute top-full left-0 mt-2 w-56 glass-strong rounded-2xl shadow-glass-lg border border-white/50 overflow-hidden z-50"
      >
        <div className="p-2">
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 group"
            >
              <item.icon className="w-4 h-4 text-surface-400 group-hover:text-primary-500 transition-colors" />
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MegaMenu = ({ columns, isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[800px] max-w-[90vw] glass-strong rounded-3xl shadow-glass-lg border border-white/50 overflow-hidden z-50"
      >
        <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col, colIdx) => (
            <div key={colIdx}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                  <col.icon className="w-4 h-4 text-primary-600" />
                </div>
                <h4 className="font-semibold text-surface-800 text-sm">{col.title}</h4>
              </div>
              <div className="space-y-1">
                {col.items.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-surface-500 hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-200 group"
                  >
                    <item.icon className="w-3.5 h-3.5 text-surface-300 group-hover:text-primary-400 transition-colors" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-gradient-to-r from-primary-50 to-accent-50 border-t border-white/50">
          <p className="text-xs text-surface-500 text-center">
            Need something custom?{' '}
            <Link to="/contact" className="text-primary-600 font-medium hover:underline">
              Let's talk
            </Link>
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-glass border-b border-white/40'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-18 py-4">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const hasDropdown = item.dropdown || item.megaMenu;
              const isOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-primary-600 bg-primary-50/80'
                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100/60'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl bg-primary-50/80 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {item.megaMenu && <MegaMenu columns={item.megaMenu.columns} isOpen={isOpen} />}
                  {item.dropdown && <DropdownMenu items={item.dropdown} isOpen={isOpen} />}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="btn-primary text-sm px-5 py-2.5 rounded-xl inline-flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Hire Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-surface-100 transition-colors"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-surface-700 rounded-full origin-left"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 bg-surface-700 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-surface-700 rounded-full origin-left"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-white/40 overflow-hidden"
          >
            <div className="section-padding py-4 space-y-1">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-surface-600 hover:bg-surface-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-3">
                <Link to="/contact" className="btn-primary w-full text-center justify-center flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Hire Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;