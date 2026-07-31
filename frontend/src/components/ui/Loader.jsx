import { motion } from 'framer-motion';
import { Code2, Braces, Terminal, Cpu } from 'lucide-react';

const Loader = () => {
  const codeLines = [
    'import { createApp } from "united-dev";',
    'const app = createApp();',
    'app.use(premiumUI);',
    'app.use(smoothAnimations);',
    'await app.launch();',
    '// Ready to build something amazing...',
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-surface-50 flex flex-col items-center justify-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-200/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary-100/40 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative mb-8"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-glow"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Code2 className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-white" />
          </motion.div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold text-surface-800">
            United{' '}
            <span
              className="text-gradient"
            >
              Developers
            </span>
          </h2>
          <p className="text-surface-400 text-sm mt-1">Initializing premium experience...</p>
        </motion.div>

        {/* Code Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-80 max-w-[90vw] glass-card rounded-2xl p-4 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-surface-200/50">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-surface-400 font-mono">terminal — bash</span>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            {codeLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.2, duration: 0.3 }}
                className="flex items-start gap-2"
              >
                <span className="text-primary-400 shrink-0">❯</span>
                <span
                  className={
                    line.startsWith('//')
                      ? 'text-surface-400 italic'
                      : line.startsWith('import') || line.startsWith('const') || line.startsWith('await')
                      ? 'text-accent-500'
                      : 'text-surface-600'
                  }
                >
                  {line}
                </span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.2 }}
              className="flex items-center gap-2 mt-2"
            >
              <span className="text-green-500">✓</span>
              <span className="text-green-600 text-xs">System ready. Launching...</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mt-8 w-48 h-1 bg-surface-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;