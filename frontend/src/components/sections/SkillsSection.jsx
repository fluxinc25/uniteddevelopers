import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillAPI } from '../../api/axios';
import Loader from '../ui/Loader';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await skillAPI.getAll();
        setSkills(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return <Loader className="py-20" />;

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section className="section-padding py-24 bg-dark-lighter/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-wider uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="heading-lg text-white mb-4">Skills & Technologies</h2>
          <p className="body-md max-w-2xl mx-auto">
            Our team masters the latest technologies to deliver cutting-edge solutions.
          </p>
        </motion.div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-white font-semibold text-lg mb-6 capitalize">{category}</h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <motion.div
                    key={skill._id}
                    variants={fadeInUp}
                    className="glass-card p-4 flex items-center gap-4 group hover:border-gold/30 transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
                      style={{
                        backgroundColor: `${skill.color}15`,
                        color: skill.color,
                      }}
                    >
                      {skill.icon ? (
                        <img src={skill.icon} alt="" className="w-6 h-6" />
                      ) : (
                        skill.name.charAt(0)
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium text-sm">
                          {skill.name}
                        </span>
                        <span className="text-gold text-sm font-semibold">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color || '#c9a962' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;