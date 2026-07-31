import { motion } from 'framer-motion';
import {
  Code2, Server, Smartphone, Cloud, Wrench,
  Monitor, Database, Flame, Layout, Wind,
  Box, HardDrive,
  GitBranch, Code, Globe, Shield,
  Cpu, Palette, PenTool, Layers
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Monitor,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    skills: [
      { name: 'HTML5', level: 95, icon: Code2 },
      { name: 'CSS3', level: 92, icon: Layout },
      { name: 'JavaScript', level: 90, icon: Code },
      { name: 'React', level: 88, icon: Cpu },
      { name: 'Next.js', level: 85, icon: Box },
      { name: 'Tailwind CSS', level: 93, icon: Wind },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    skills: [
      { name: 'Node.js', level: 87, icon: Server },
      { name: 'Express', level: 85, icon: Globe },
      { name: 'MongoDB', level: 82, icon: Database },
      { name: 'Firebase', level: 88, icon: Flame },
      { name: 'REST APIs', level: 90, icon: Code2 },
      { name: 'GraphQL', level: 75, icon: GitBranch },
    ],
  },
  {
    title: 'Android',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    skills: [
      { name: 'Java', level: 85, icon: Code },
      { name: 'Kotlin', level: 78, icon: Code2 },
      { name: 'Android Studio', level: 90, icon: Smartphone },
      { name: 'Firebase Mobile', level: 86, icon: Flame },
      { name: 'Material Design', level: 88, icon: Layers },
      { name: 'Room DB', level: 80, icon: Database },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    skills: [
      { name: 'Git', level: 90, icon: GitBranch },
      { name: 'GitHub', level: 92, icon: Code2 },
      { name: 'VS Code', level: 95, icon: Code },
      { name: 'Palette', level: 80, icon: Palette },
      { name: 'Postman', level: 85, icon: PenTool },
      { name: 'Docker', level: 70, icon: Box },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    skills: [
      { name: 'MongoDB Atlas', level: 85, icon: Database },
      { name: 'Firebase Hosting', level: 88, icon: Flame },
      { name: 'Vercel', level: 92, icon: Globe },
      { name: 'Netlify', level: 90, icon: Globe },
      { name: 'Cloudflare', level: 78, icon: Shield },
      { name: 'AWS Basics', level: 70, icon: Cloud },
    ],
  },
];

const SkillBar = ({ skill, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
            <skill.icon className="w-3.5 h-3.5 text-surface-600" />
          </div>
          <span className="text-sm font-semibold text-surface-700">{skill.name}</span>
        </div>
        <span className="text-xs font-bold text-surface-400">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-surface-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
              Expertise
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-surface-900 mb-6">
              Skills & <span className="text-gradient">Technologies</span>
            </h1>
            <p className="text-lg text-surface-500 max-w-2xl mx-auto">
              A comprehensive toolkit built over years of hands-on development experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Skills */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-2xl bg-white border border-surface-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-500 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-800">{category.title}</h3>
                  <p className="text-xs text-surface-400">{category.skills.length} technologies</p>
                </div>
              </div>

              {/* Skill Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={category.color}
                    delay={i * 0.05}
                  />
                ))}
              </div>

              {/* Decorative */}
              <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full ${category.bgColor} opacity-50 blur-2xl group-hover:opacity-80 transition-opacity`} />
            </motion.div>
          ))}

          {/* Summary Card - spans full width on mobile, 2 cols on xl */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 xl:col-span-3 p-8 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-700 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Always Learning</h3>
                <p className="text-primary-100 max-w-lg">
                  Technology evolves rapidly, and so do we. We're constantly exploring new
                  frameworks, tools, and methodologies to deliver cutting-edge solutions.
                </p>
              </div>
              <div className="flex gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm text-primary-200">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">30+</div>
                  <div className="text-sm text-primary-200">Skills</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">∞</div>
                  <div className="text-sm text-primary-200">Curiosity</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skill Pills */}
      <section className="section-padding mt-16">
        <div className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-surface-800 mb-8"
          >
            Tech Stack Overview
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Firebase',
              'Tailwind', 'JavaScript', 'TypeScript', 'Java', 'Android', 'VPS',
              'GitHub', 'VS Code', 'Palette', 'Vercel', 'Cloudflare', 'Docker',
              'REST API', 'GraphQL', 'Redux', 'Framer Motion'
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 rounded-xl bg-white border border-surface-200 text-surface-600 text-sm font-medium shadow-sm hover:shadow-md hover:border-primary-300 hover:text-primary-600 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Skills;