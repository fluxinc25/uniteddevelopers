import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../../api/axios';
import Card from '../ui/Card';
import Loader from '../ui/Loader';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectAPI.getAll({ featured: true, limit: 6 });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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
          <span className="text-gold text-sm font-medium tracking-wider uppercase mb-4 block">Portfolio</span>
          <h2 className="heading-lg text-white mb-4">Featured Projects</h2>
          <p className="body-md max-w-2xl mx-auto">Explore our latest work and see how we transform ideas into powerful digital solutions.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project._id} variants={fadeInUp}>
              <Card className="group h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-dark-lighter">
                  {project.thumbnail ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${project.thumbnail}`}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <Link to={`/projects/${project.slug}`}>
                      <ArrowUpRight size={18} className="text-gray-500 group-hover:text-gold transition-colors" />
                    </Link>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.techStack || []).slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gold hover:text-gold-light flex items-center gap-1">
                        <ExternalLink size={12} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/projects" className="btn-outline inline-flex items-center gap-2">
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;