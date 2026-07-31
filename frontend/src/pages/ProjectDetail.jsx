import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, Calendar, Tag, Layers, Star } from 'lucide-react';
import { projectAPI } from '../api/axios';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await projectAPI.getBySlug(id);
        setProject(res.data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-surface-50">
        <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section-padding py-32 max-w-7xl mx-auto text-center bg-surface-50">
        <h1 className="text-4xl font-bold text-surface-900 mb-4">Project Not Found</h1>
        <p className="text-surface-500 mb-8">The project you're looking for doesn't exist.</p>
        <Button to="/projects" icon={ArrowLeft} iconPosition="left">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-surface-50">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-surface-500 hover:text-primary-600 transition-colors font-medium"
          >
            <ArrowLeft size={18} /> Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge>{project.category}</Badge>
            {project.featured && <Badge variant="warning">Featured</Badge>}
            <Badge variant={project.status === 'active' ? 'success' : 'info'}>
              {project.status}
            </Badge>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-surface-900 mb-4">{project.title}</h1>
          <p className="text-lg text-surface-500 max-w-3xl leading-relaxed">{project.shortDescription || project.description}</p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="p-2 rounded-2xl bg-white border border-surface-200/80 shadow-soft overflow-hidden">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-64 sm:h-96 rounded-xl object-cover"
              />
            ) : (
              <div className="w-full h-64 sm:h-96 rounded-xl bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 flex items-center justify-center">
                <Layers className="w-20 h-20 text-primary-200" />
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* About */}
            <div className="p-8 rounded-2xl bg-white border border-surface-200/80 shadow-soft">
              <h2 className="text-xl font-bold text-surface-800 mb-4">About This Project</h2>
              <p className="text-surface-500 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="p-8 rounded-2xl bg-white border border-surface-200/80 shadow-soft">
                <h2 className="text-xl font-bold text-surface-800 mb-4 flex items-center gap-2">
                  <Layers size={20} className="text-primary-500" /> Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 text-surface-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Star className="w-3 h-3 text-primary-500 fill-primary-500" />
                      </div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-surface-800 mb-4">Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.images.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="p-2 rounded-xl bg-white border border-surface-200/80 shadow-soft overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="w-full h-48 rounded-lg object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft">
                <h3 className="text-surface-800 font-semibold mb-4 flex items-center gap-2">
                  <Tag size={16} className="text-primary-500" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-surface-100 text-surface-600 text-sm font-medium border border-surface-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft space-y-3">
              <h3 className="text-surface-800 font-semibold mb-2">Links</h3>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-surface-600 hover:text-surface-800 font-medium transition-colors"
                >
                  <Code size={16} /> Source Code
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  <ExternalLink size={16} /> Play Store
                </a>
              )}
            </div>

            {/* Meta Info */}
            <div className="p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft space-y-3">
              <h3 className="text-surface-800 font-semibold mb-2">Details</h3>
              <div className="flex items-center gap-2 text-surface-500 text-sm">
                <Calendar size={14} className="text-primary-500" />
                Order: #{project.order || 'N/A'}
              </div>
              <div className="flex items-center gap-2 text-surface-500 text-sm">
                <Tag size={14} className="text-primary-500" />
                Category: {project.category}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-700 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
              <div className="relative z-10">
                <h3 className="font-bold mb-2">Like this project?</h3>
                <p className="text-primary-100 text-sm mb-4">We can build something similar for you.</p>
                <Button to="/contact" variant="secondary" className="w-full justify-center text-sm">
                  Start Your Project
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;