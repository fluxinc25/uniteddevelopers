import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, ExternalLink, Code2, Star, ArrowRight, Loader2
} from 'lucide-react';
import { projectAPI } from '../api/axios';

const categories = ['All', 'website', 'android', 'uiux', 'fullstack', 'ecommerce', 'dashboard'];

const categoryLabels = {
  website: 'Website',
  android: 'Mobile',
  uiux: 'UI/UX',
  fullstack: 'Full Stack',
  ecommerce: 'E-Commerce',
  dashboard: 'Dashboard'
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectAPI.getAll();
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-surface-50">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-surface-50">
      {/* Hero */}
      <section className="section-padding mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-sm font-medium mb-4">
              Our Work
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-surface-900 mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-lg text-surface-500 max-w-2xl mx-auto">
              Explore our portfolio of successful projects across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section-padding mb-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-glow'
                  : 'bg-white text-surface-600 hover:bg-surface-100 border border-surface-200'
              }`}
            >
              {cat === 'All' ? 'All' : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-20 text-surface-400">
                No projects found in this category.
              </div>
            ) : (
              filtered.map((project, i) => (
                <motion.div
                  key={project._id || project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-surface-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Globe className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-surface-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <Code2 className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                        {categoryLabels[project.category] || project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-surface-800 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-surface-600">{project.rating || '5.0'}</span>
                      </div>
                    </div>
                    <p className="text-surface-500 text-sm mb-4 line-clamp-2">{project.shortDescription || project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {(project.techStack || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-surface-100 text-surface-600 text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projects/${project.slug || project._id}`}
                      className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm group/link"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Projects;