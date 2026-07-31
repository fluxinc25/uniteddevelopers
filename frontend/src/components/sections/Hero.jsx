import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroAPI } from '../../api/axios';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await heroAPI.get();
        setHero(res.data);
      } catch (err) {
        console.error('Failed to fetch hero:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  if (loading) return <div className="min-h-[80vh] flex items-center justify-center"><Loader /></div>;

  const data = hero || {
    headline: 'UnitedDevelopers',
    subtitle: 'We Build Digital Excellence',
    description: 'Premium web & mobile development agency crafting exceptional digital experiences.',
    ctaPrimary: { text: 'View Projects', link: '/projects' },
    ctaSecondary: { text: 'Contact Us', link: '/contact' },
    stats: [
      { label: 'Projects Delivered', value: '50+' },
      { label: 'Happy Clients', value: '30+' },
      { label: 'Years Experience', value: '5+' },
    ]
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[120px]" />
      </div>

      {/* Floating Shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[15%] w-20 h-20 border border-gold/20 rounded-lg hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-32 left-[10%] w-16 h-16 border border-gold/15 rounded-full hidden lg:block"
      />

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8"
            >
              <Sparkles size={14} className="text-gold" />
              <span className="text-gold text-sm font-medium">{data.subtitle}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-xl mb-6"
            >
              <span className="text-white">{data.headline.split(' ')[0]}</span>
              <br />
              <span className="text-gradient-gold">{data.headline.split(' ').slice(1).join(' ') || 'Developers'}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-lg max-w-xl mb-10"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to={data.ctaPrimary?.link || '/projects'}>
                <Button icon={ArrowRight}>{data.ctaPrimary?.text || 'View Projects'}</Button>
              </Link>
              <Link to={data.ctaSecondary?.link || '/contact'}>
                <Button variant="outline" icon={Download}>{data.ctaSecondary?.text || 'Contact Us'}</Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10"
            >
              {(data.stats || []).map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-gold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative glass-card p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
                    <span className="text-5xl font-bold text-gold">UD</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Premium Development</h3>
                  <p className="text-gray-400">React • Node.js • MongoDB</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;