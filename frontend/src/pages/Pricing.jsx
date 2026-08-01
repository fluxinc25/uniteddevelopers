import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check, Zap, Crown, Building2, Rocket, ArrowRight,
  Sparkles, Shield, Gauge, Headphones, Code2, Palette
} from 'lucide-react';
import Button from '../components/ui/Button';

const plans = [
  {
    name: 'Starter',
    price: '$399',
    period: '/project',
    description: 'Perfect for small businesses getting started online.',
    icon: Zap,
    color: 'primary',
    features: [
      'Double Page Website',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Contact Form Integration',
      '2 Revision Rounds',
      '1 Week Delivery',
    ],
    cta: 'Get Started',
    popular: false,
    discount: null,
  },
  {
    name: 'Business',
    price: '$799',
    period: '/project',
    description: 'Ideal for growing businesses needing a professional presence.',
    icon: Building2,
    color: 'accent',
    features: [
      'Multi-Page Website (up to 5)',
      'Mobile Responsive',
      'Advanced SEO Optimization',
      'Contact & Booking Forms',
      'Social Media Integration',
      'Performance Optimization',
      '4 Revision Rounds',
      '2 Weeks Delivery',
    ],
    cta: 'Most Popular',
    popular: true,
    discount: null,
  },
  {
    name: 'Premium',
    originalPrice: '$1,499',
    price: '$1,299',
    period: '/project',
    description: 'Full-featured solution for established businesses.',
    icon: Crown,
    color: 'primary',
    features: [
      'Unlimited Pages',
      'Custom Animations',
      'E-Commerce Integration',
      'CMS Dashboard',
      'Blog Setup',
      'Advanced Analytics',
      'Priority Support',
      'Unlimited Revisions',
      '4 Weeks Delivery',
    ],
    cta: 'Go Premium',
    popular: false,
    discount: '15% OFF',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large-scale organizations.',
    icon: Rocket,
    color: 'accent',
    features: [
      'Everything in Premium',
      'Custom Web Application',
      'API Development',
      'Database Architecture',
      'Cloud Infrastructure',
      'Dedicated Team',
      '24/7 Support',
      'SLA Guarantee',
      'Ongoing Maintenance',
    ],
    cta: 'Contact Us',
    popular: false,
    discount: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Pricing = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  return (
    <div className="min-h-screen bg-surface-50 pt-28 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-100/40 rounded-full blur-3xl" />
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Transparent Pricing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 mb-6">
              Simple, <span className="text-gradient">Honest</span> Pricing
            </h1>
            <p className="text-surface-500 text-lg max-w-2xl mx-auto leading-relaxed">
              No hidden fees. No surprises. Choose the plan that fits your vision,
              and let's build something extraordinary together.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                onMouseEnter={() => setHoveredPlan(idx)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-3xl p-6 lg:p-8 transition-all duration-500 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary-600 to-primary-700 text-white shadow-glow scale-105 z-10'
                    : plan.discount
                    ? 'bg-white border-2 border-amber-400 shadow-soft hover:shadow-soft-lg hover:-translate-y-2'
                    : 'bg-white border border-surface-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-2'
                }`}
              >
                {/* Discount Badge */}
                {plan.discount && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      {plan.discount}
                    </div>
                  </div>
                )}

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full bg-accent-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      RECOMMENDED
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.popular
                      ? 'bg-white/20'
                      : 'bg-gradient-to-br from-primary-50 to-accent-50'
                  }`}
                >
                  <plan.icon
                    className={`w-7 h-7 ${plan.popular ? 'text-white' : 'text-primary-600'}`}
                  />
                </div>

                {/* Plan Info */}
                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-surface-800'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.popular ? 'text-primary-100' : 'text-surface-400'
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  {plan.originalPrice && (
                    <span
                      className={`block text-lg line-through mb-1 ${
                        plan.popular ? 'text-primary-300' : 'text-surface-400'
                      }`}
                    >
                      {plan.originalPrice}
                    </span>
                  )}
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular ? 'text-white' : 'text-surface-900'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.popular ? 'text-primary-200' : 'text-surface-400'
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-white/20' : 'bg-primary-50'
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.popular ? 'text-white' : 'text-primary-600'
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm ${
                          plan.popular ? 'text-primary-50' : 'text-surface-600'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={plan.popular ? 'secondary' : 'primary'}
                  className={`w-full justify-center ${
                    plan.popular
                      ? 'bg-white text-primary-600 hover:bg-primary-50'
                      : ''
                  }`}
                  to="/contact"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { icon: Shield, label: 'Secure Payments' },
              { icon: Gauge, label: '99.9% Uptime' },
              { icon: Headphones, label: '24/7 Support' },
              { icon: Code2, label: 'Clean Code' },
              { icon: Palette, label: 'Pixel Perfect' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-surface-400 hover:text-surface-600 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;