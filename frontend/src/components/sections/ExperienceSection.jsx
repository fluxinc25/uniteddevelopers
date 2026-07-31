import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experienceAPI } from '../../api/axios';
import Loader from '../ui/Loader';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await experienceAPI.getAll();
        setExperiences(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) return <Loader className="py-20" />;

  return (
    <section className="section-padding py-24 bg-dark-lighter/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-wider uppercase mb-4 block">
            Journey
          </span>
          <h2 className="heading-lg text-white mb-4">Experience</h2>
          <p className="body-md max-w-2xl mx-auto">
            Professional milestones and career highlights.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent hidden sm:block" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={exp._id}
                variants={fadeInUp}
                className={`relative flex flex-col sm:flex-row gap-8 mb-12 last:mb-0 ${
                  isLeft ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-dark z-10 items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-dark" />
                </div>

                {/* Content */}
                <div className={`sm:w-1/2 ${isLeft ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div className="glass-card p-6 hover:border-gold/30 transition-all">
                    <div className={`flex items-center gap-2 mb-2 text-gold text-sm ${isLeft ? 'sm:justify-end' : ''}`}>
                      <Calendar size={14} />
                      <span>
                        {new Date(exp.startDate).getFullYear()}
                        {exp.endDate
                          ? ` - ${new Date(exp.endDate).getFullYear()}`
                          : ' - Present'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <div className={`flex items-center gap-2 text-gray-400 text-sm mb-3 ${isLeft ? 'sm:justify-end' : ''}`}>
                      <Briefcase size={14} />
                      <span>{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="text-gray-600">•</span>
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                      {exp.description}
                    </p>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className={`flex flex-wrap gap-2 ${isLeft ? 'sm:justify-end' : ''}`}>
                        {exp.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for other side */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;