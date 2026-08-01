import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe, ShoppingCart, User, Layers, Utensils, Dumbbell, GraduationCap,
  Smartphone, Database, Server, Palette, RefreshCw, Shield, Zap,
  ArrowRight, Check
} from 'lucide-react';
import Button from '../components/ui/Button';

const serviceCategories = [
  {
    title: 'Web Development',
    id: 'web-development',
    services: [
      {
        id: 'business-websites',
        icon: Globe,
        title: 'Business Websites',
        desc: 'Professional corporate websites that establish credibility and drive leads.',
        features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'],
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
      },
      {
        id: 'ecommerce',
        icon: ShoppingCart,
        title: 'E-Commerce Websites',
        desc: 'Full-featured online stores with secure payments and inventory management.',
        features: ['Payment Gateway', 'Cart System', 'Order Tracking', 'Admin Dashboard'],
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50',
      },
      {
        id: 'portfolio-websites',
        icon: User,
        title: 'Portfolio Websites',
        desc: 'Stunning personal portfolios that showcase your work beautifully.',
        features: ['Custom Design', 'Case Studies', 'Blog Section', 'Contact Forms'],
        color: 'from-violet-500 to-violet-600',
        bgColor: 'bg-violet-50',
      },
      {
        id: 'landing-pages',
        icon: Layers,
        title: 'Landing Pages',
        desc: 'High-converting landing pages designed to maximize your ROI.',
        features: ['A/B Testing', 'Analytics', 'Fast Load', 'Mobile First'],
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50',
      },
      {
        id: 'restaurant-websites',
        icon: Utensils,
        title: 'Restaurant Websites',
        desc: 'Beautiful restaurant sites with menus, reservations, and online ordering.',
        features: ['Online Menu', 'Reservations', 'Gallery', 'Reviews'],
        color: 'from-red-500 to-rose-500',
        bgColor: 'bg-red-50',
      },
      {
        id: 'gym-fitness',
        icon: Dumbbell,
        title: 'Gym & Fitness',
        desc: 'Dynamic fitness websites with class schedules and membership systems.',
        features: ['Class Schedules', 'Memberships', 'Trainer Profiles', 'BMI Calculator'],
        color: 'from-cyan-500 to-teal-500',
        bgColor: 'bg-cyan-50',
      },
      {
        id: 'school-websites',
        icon: GraduationCap,
        title: 'School Websites',
        desc: 'Educational platforms with student portals and course management.',
        features: ['Student Portal', 'Course Management', 'Events', 'Notices'],
        color: 'from-indigo-500 to-indigo-600',
        bgColor: 'bg-indigo-50',
      },
    ],
  },
  {
    title: 'App Development',
    id: 'app-development',
    services: [
      {
        id: 'android-app-dev',
        icon: Smartphone,
        title: 'Android App Dev',
        desc: 'Native Android applications built with Java and modern frameworks.',
        features: ['Native Performance', 'Material Design', 'Push Notifications', 'Offline Mode'],
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50',
      },
      {
        id: 'firebase-integration',
        icon: Database,
        title: 'Firebase Integration',
        desc: 'Seamless Firebase backend for real-time data and authentication.',
        features: ['Real-time DB', 'Authentication', 'Cloud Storage', 'Analytics'],
        color: 'from-orange-500 to-amber-600',
        bgColor: 'bg-orange-50',
      },
      {
        id: 'api-integration',
        icon: Server,
        title: 'API Integration',
        desc: 'Connect your applications with third-party services and APIs.',
        features: ['REST APIs', 'GraphQL', 'Webhooks', 'Third-party'],
        color: 'from-sky-500 to-blue-600',
        bgColor: 'bg-sky-50',
      },
    ],
  },
  {
    title: 'Design & Creative',
    id: 'design-creative',
    services: [
      {
        id: 'ui-ux-design',
        icon: Palette,
        title: 'UI/UX Design',
        desc: 'User-centered design that balances aesthetics with functionality.',
        features: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
        color: 'from-pink-500 to-rose-500',
        bgColor: 'bg-pink-50',
      },
      {
        id: 'website-redesign',
        icon: RefreshCw,
        title: 'Website Redesign',
        desc: 'Transform your outdated website into a modern digital experience.',
        features: ['Modern UI', 'Performance', 'SEO Boost', 'Accessibility'],
        color: 'from-purple-500 to-violet-600',
        bgColor: 'bg-purple-50',
      },
    ],
  },
  {
    title: 'Support & Growth',
    id: 'support-growth',
    services: [
      {
        id: 'maintenance-support',
        icon: Shield,
        title: 'Maintenance & Support',
        desc: 'Ongoing support to keep your digital assets secure and up-to-date.',
        features: ['24/7 Monitoring', 'Security Updates', 'Backups', 'Bug Fixes'],
        color: 'from-slate-500 to-slate-600',
        bgColor: 'bg-slate-50',
      },
      {
        id: 'performance-optimization',
        icon: Zap,
        title: 'Performance Optimization',
        desc: 'Speed up your website for better rankings and user experience.',
        features: ['Core Web Vitals', 'Image Optimization', 'Caching', 'CDN Setup'],
        color: 'from-yellow-500 to-amber-600',
        bgColor: 'bg-yellow-50',
      },
    ],
  },
];

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-primary-500', 'ring-offset-4');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-primary-500', 'ring-offset-4');
          }, 2000);
        }, 300);
      }
    }
  }, [location]);

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-surface-900 mb-6">
              What We <span className="text-gradient">Build</span>
            </h1>
            <p className="text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
              From stunning websites to powerful mobile applications, we deliver
              comprehensive digital solutions tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="py-16 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Premium Heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px w-12 bg-gradient-to-r from-primary-500 to-transparent" />
                <span className="text-sm font-semibold text-primary-600 tracking-widest uppercase">
                  {category.title}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-surface-900 tracking-tight">
                {category.title}
              </h2>
              <p className="mt-3 text-surface-400 text-lg max-w-xl">
                Expert solutions crafted with precision and care.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service, i) => (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-500 overflow-hidden scroll-mt-32"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-surface-800 mb-3 group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-surface-500 text-sm leading-relaxed mb-5">
                      {service.desc}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-sm text-surface-600">
                          <div className={`w-5 h-5 rounded-full ${service.bgColor} flex items-center justify-center shrink-0`}>
                            <Check className="w-3 h-3 text-primary-600" />
                          </div>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <Button to="/contact" variant="ghost" size="sm" className="group/btn">
                      Get Started <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-primary-600 to-accent-700 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-primary-100 mb-8">
              We specialize in tailor-made digital solutions. Tell us about your project.
            </p>
            <Button to="/contact" className="bg-white text-primary-700 hover:bg-primary-50">
              Discuss Your Project
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;