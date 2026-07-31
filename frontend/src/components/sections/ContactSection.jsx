import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="section-padding py-24 bg-dark-lighter/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm font-medium tracking-wider uppercase mb-4 block">Contact</span>
            <h2 className="heading-lg text-white mb-6">Let's Build Something Amazing</h2>
            <p className="body-lg mb-10">
              Have a project in mind? We'd love to hear about it. Get in touch and let's create something extraordinary together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Mail size={20} className="text-gold" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Email</div>
                  <div className="text-white">ahsanali9113737@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Phone size={20} className="text-gold" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Phone</div>
                  <div className="text-white">Available on request</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Location</div>
                  <div className="text-white">Remote / Worldwide</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            <p className="text-gray-400 mb-6">
              Fill out the contact form and we'll get back to you within 24 hours.
            </p>
            <Link to="/contact" className="btn-primary w-full flex items-center justify-center gap-2">
              Go to Contact Form <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;