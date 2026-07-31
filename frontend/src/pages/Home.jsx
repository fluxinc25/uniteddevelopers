import { useState, useEffect, useRef } from 'react';
import { projectAPI } from '../api/axios';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Globe, Smartphone, Zap, Star,
  ChevronDown, Play, Sparkles, Layers, Cpu, Palette
} from 'lucide-react';
import Button from '../components/ui/Button';

/* ─── Floating Particles Canvas ─── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ─── Typing Effect ─── */
const TypeWriter = ({ texts, speed = 80, pause = 2000 }) => {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return (
    <span className="text-gradient font-bold">
      {display}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-[1em] bg-primary-500 ml-1 align-middle"
      />
    </span>
  );
};

/* ─── Floating Code Window ─── */
const FloatingCodeWindow = ({ mouseX, mouseY }) => {
  const x = useTransform(mouseX, [0, 1], [-15, 15]);
  const y = useTransform(mouseY, [0, 1], [-15, 15]);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="absolute top-8 right-8 w-72 glass-card rounded-2xl shadow-soft-lg border border-white/60 overflow-hidden hidden lg:block"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-200/50 bg-white/50">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-surface-400 font-mono">App.jsx</span>
      </div>
      <div className="p-4 font-mono text-xs space-y-1.5 bg-surface-900 text-surface-300">
        <div><span className="text-accent-400">import</span> <span className="text-primary-400">React</span> <span className="text-accent-400">from</span> <span className="text-green-400">'react'</span>;</div>
        <div><span className="text-accent-400">const</span> <span className="text-yellow-400">App</span> = () ={'>'} {'{'}</div>
        <div className="pl-4"><span className="text-accent-400">return</span> (</div>
        <div className="pl-8 text-primary-300">&lt;Hero /&gt;</div>
        <div className="pl-8 text-accent-300">&lt;Services /&gt;</div>
        <div className="pl-8 text-green-300">&lt;Projects /&gt;</div>
        <div className="pl-4">);</div>
        <div>{'}'}</div>
      </div>
    </motion.div>
  );
};

/* ─── Floating Browser Window ─── */
const FloatingBrowserWindow = ({ mouseX, mouseY }) => {
  const x = useTransform(mouseX, [0, 1], [10, -10]);
  const y = useTransform(mouseY, [0, 1], [10, -10]);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
      className="absolute bottom-16 right-24 w-80 glass-card rounded-2xl shadow-soft-lg border border-white/60 overflow-hidden hidden lg:block"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-200/50 bg-white/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-surface-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-surface-300" />
        </div>
        <div className="flex-1 mx-3 h-6 bg-surface-100 rounded-md flex items-center px-2">
          <span className="text-[10px] text-surface-400">uniteddevelopers.com</span>
        </div>
      </div>
      <div className="p-4 space-y-3 bg-white/80">
        <div className="h-3 w-3/4 bg-surface-200 rounded-full" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 bg-primary-100 rounded-lg" />
          <div className="h-16 bg-accent-100 rounded-lg" />
          <div className="h-16 bg-primary-50 rounded-lg" />
        </div>
        <div className="h-3 w-1/2 bg-surface-200 rounded-full" />
        <div className="h-3 w-2/3 bg-surface-200 rounded-full" />
      </div>
    </motion.div>
  );
};

/* ─── Stats Counter ─── */
const AnimatedCounter = ({ target, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
        {count}{suffix}
      </div>
      <div className="text-surface-500 text-sm font-medium">{label}</div>
    </motion.div>
  );
};

/* ─── Service Preview Card ─── */
const ServicePreview = ({ icon: Icon, title, desc, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="group relative p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-500 overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity duration-500`} />
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-lg font-bold text-surface-800 mb-2">{title}</h3>
    <p className="text-surface-500 text-sm leading-relaxed">{desc}</p>
    <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      Learn more <ArrowRight className="w-4 h-4" />
    </div>
  </motion.div>
);

/* ─── Featured Projects (Real Data) ─── */
const categoryLabels = {
  website: 'Website',
  android: 'Mobile',
  uiux: 'UI/UX',
  fullstack: 'Full Stack',
  ecommerce: 'E-Commerce',
  dashboard: 'Dashboard'
};

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await projectAPI.getAll({ featured: 'true' });
        setProjects(res.data.slice(0, 2)); // max 2 projects
      } catch (err) {
        console.error('Failed to fetch featured projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl bg-surface-100 aspect-[16/10] animate-pulse" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-surface-400">
        No featured projects yet. Add some in the admin dashboard.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, i) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ y: -8 }}
          className="group relative rounded-2xl overflow-hidden bg-surface-100 aspect-[16/10] cursor-pointer"
          onClick={() => window.location.href = `/projects/${project.slug || project._id}`}
        >
          {/* Background Image */}
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-surface-900/20 to-transparent z-10" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                {categoryLabels[project.category] || project.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-white text-xs font-medium">{project.rating || '5.0'}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm line-clamp-1">
              {(project.techStack || []).slice(0, 3).join(' • ')}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Main Home Page ─── */
const Home = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <div>
      {/* ─── HERO SECTION ─── */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient pt-20"
      >
        <ParticleCanvas />

        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/10 rounded-full blur-3xl" />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="section-padding w-full relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary-200/50 shadow-soft"
              >
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-700">Premium Development Agency</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-surface-900 leading-[1.1] tracking-tight"
              >
                Building Digital
                <br />
                <TypeWriter
                  texts={['Experiences', 'Products', 'Solutions', 'Brands']}
                  speed={100}
                  pause={2500}
                />
                <br />
                That Matter
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-surface-500 max-w-lg leading-relaxed"
              >
                We craft premium websites and powerful Android applications using
                modern technologies and AI-powered workflows. Your vision, our expertise.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button to="/projects" size="lg">
                  View Our Work
                </Button>
                <Button to="/contact" variant="secondary" size="lg">
                  <Play className="w-4 h-4" /> Start a Project
                </Button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-surface-600"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-surface-500">
                  <span className="font-semibold text-surface-800">50+</span> Happy Clients Worldwide
                </div>
              </motion.div>
            </div>

            {/* Right Visual */}
            <div className="relative h-[500px] hidden lg:block">
              <FloatingCodeWindow mouseX={smoothX} mouseY={smoothY} />
              <FloatingBrowserWindow mouseX={smoothX} mouseY={smoothY} />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/4 left-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-glow"
              >
                <Code2 className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-1/3 left-1/4 w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-glow-accent"
              >
                <Smartphone className="w-7 h-7 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 right-4 w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-surface-400 font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-surface-400" />
        </motion.div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 to-white pointer-events-none" />
        <div className="section-padding relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter target={50} suffix="+" label="Projects Delivered" />
            <AnimatedCounter target={30} suffix="+" label="Happy Clients" />
            <AnimatedCounter target={5} suffix="+" label="Years Experience" />
            <AnimatedCounter target={99} suffix="%" label="Client Satisfaction" />
          </div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="py-24 bg-surface-50">
        <div className="section-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
                What We Do
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-surface-900 mb-4">
                Services We <span className="text-gradient">Offer</span>
              </h2>
              <p className="text-surface-500 max-w-2xl mx-auto">
                From concept to deployment, we handle every aspect of your digital presence
                with precision and creativity.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServicePreview
                icon={Globe}
                title="Web Development"
                desc="Custom business websites, e-commerce platforms, and landing pages built with modern frameworks."
                color="from-primary-500 to-primary-600"
                delay={0}
              />
              <ServicePreview
                icon={Smartphone}
                title="Android Apps"
                desc="Native and cross-platform Android applications with seamless user experiences."
                color="from-accent-500 to-accent-600"
                delay={0.1}
              />
              <ServicePreview
                icon={Palette}
                title="UI/UX Design"
                desc="Beautiful, intuitive interfaces that delight users and drive conversions."
                color="from-pink-500 to-rose-500"
                delay={0.2}
              />
              <ServicePreview
                icon={Layers}
                title="Website Redesign"
                desc="Transform your outdated site into a modern, high-performing digital asset."
                color="from-amber-500 to-orange-500"
                delay={0.3}
              />
              <ServicePreview
                icon={Cpu}
                title="API Integration"
                desc="Connect your applications with third-party services and custom APIs."
                color="from-emerald-500 to-teal-500"
                delay={0.4}
              />
              <ServicePreview
                icon={Zap}
                title="Performance"
                desc="Optimize speed, SEO, and user experience for maximum impact."
                color="from-cyan-500 to-blue-500"
                delay={0.5}
              />
            </div>

            <div className="text-center mt-12">
              <Button to="/services" variant="outline">
                View All Services <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

     {/* ─── FEATURED PROJECTS PREVIEW ─── */}
<section className="py-24 bg-white">
  <div className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4"
      >
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-surface-900">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>
        <Button to="/projects" variant="ghost">
          View All Projects <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>

      <FeaturedProjects />
    </div>
  </div>
</section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
        </div>

        <div className="section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto">
              Let's collaborate and turn your ideas into reality. Your next big project starts here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-bold text-lg hover:bg-primary-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;