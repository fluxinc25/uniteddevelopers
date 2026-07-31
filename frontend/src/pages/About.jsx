import { motion } from 'framer-motion';
import { Award, Calendar, Users, Briefcase, GraduationCap, MapPin, Heart, Coffee } from 'lucide-react';

const timeline = [
  {
    year: '2020',
    title: 'Founded United Developers',
    desc: 'Started with a vision to deliver premium digital solutions.',
    icon: Heart,
  },
  {
    year: '2021',
    title: 'First Major Client',
    desc: 'Delivered our first enterprise-level e-commerce platform.',
    icon: Briefcase,
  },
  {
    year: '2022',
    title: 'Team Expansion',
    desc: 'Grew to a team of 5 talented developers and designers.',
    icon: Users,
  },
  {
    year: '2023',
    title: '50+ Projects Milestone',
    desc: 'Successfully delivered over 50 projects across industries.',
    icon: Award,
  },
  {
    year: '2024',
    title: 'Global Reach',
    desc: 'Expanded services to international clients worldwide.',
    icon: MapPin,
  },
  {
    year: '2025',
    title: 'AI Integration',
    desc: 'Incorporated AI-powered workflows into our development process.',
    icon: Coffee,
  },
];

const experiences = [
  { number: '5+', label: 'Years of Experience', icon: Calendar },
  { number: '50+', label: 'Projects Completed', icon: Briefcase },
  { number: '30+', label: 'Happy Clients', icon: Users },
  { number: '15+', label: 'Technologies Mastered', icon: GraduationCap },
];

const values = [
  {
    title: 'Quality First',
    desc: 'We never compromise on quality. Every pixel, every line of code matters.',
  },
  {
    title: 'Client Centric',
    desc: 'Your success is our success. We work as an extension of your team.',
  },
  {
    title: 'Innovation Driven',
    desc: 'We stay ahead of trends to deliver cutting-edge solutions.',
  },
  {
    title: 'Transparent Process',
    desc: 'Clear communication and honest timelines throughout the project.',
  },
];

const About = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-surface-900 mb-6">
              We Are <span className="text-gradient">United Developers</span>
            </h1>
            <p className="text-lg text-surface-500 leading-relaxed">
              A passionate team of developers and designers dedicated to crafting
              exceptional digital experiences. We believe in the power of technology
              to transform businesses and enrich lives.
            </p>
          </motion.div>

          {/* Experience Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <exp.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">{exp.number}</div>
                <div className="text-surface-500 text-sm font-medium">{exp.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding mb-24 bg-white py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-surface-900 mb-4">Our Core Values</h2>
            <p className="text-surface-500 max-w-xl mx-auto">The principles that guide everything we do.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-surface-200/60 bg-surface-50 hover:bg-white hover:shadow-soft-lg transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-surface-800 mb-2">{val.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding mb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-surface-900 mb-4">Our Journey</h2>
            <p className="text-surface-500">The story of how we grew from an idea to an agency.</p>
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-300 via-accent-300 to-primary-300 md:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div
                    className={`ml-12 md:ml-0 p-6 rounded-2xl bg-white border border-surface-200/60 shadow-soft hover:shadow-soft-lg transition-all duration-300 ${
                      i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-surface-800 mb-2">{item.title}</h3>
                    <p className="text-surface-500 text-sm">{item.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-primary-400 flex items-center justify-center z-10">
                  <item.icon className="w-3.5 h-3.5 text-primary-500" />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;