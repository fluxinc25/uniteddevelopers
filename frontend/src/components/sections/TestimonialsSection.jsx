import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonialAPI } from '../../api/axios';
import Loader from '../ui/Loader';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await testimonialAPI.getAll();
        setTestimonials(res.data.filter(t => t.featured).slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return <Loader className="py-20" />;

  return (
    <section className="section-padding py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-wider uppercase mb-4 block">Testimonials</span>
          <h2 className="heading-lg text-white mb-4">What Clients Say</h2>
          <p className="body-md max-w-2xl mx-auto">Real feedback from real clients who trusted us with their vision.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div key={t._id} variants={fadeInUp}>
              <div className="glass-card p-6 h-full flex flex-col relative">
                <Quote size={32} className="text-gold/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < t.rating ? 'text-gold fill-gold' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  {t.image ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${t.image}`}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold text-sm">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role} {t.company && `• ${t.company}`}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;