import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Card = ({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
  href,
  to,
  ...props
}) => {
  const baseClasses = `relative rounded-2xl bg-white border border-surface-200/80 transition-all duration-300 overflow-hidden ${className}`;

  const hoverClasses = hover
    ? 'hover:shadow-soft-lg hover:border-primary-200/60 hover:-translate-y-1'
    : '';

  const glowClasses = glow
    ? 'shadow-glow hover:shadow-glow-accent'
    : 'shadow-soft';

  const content = (
    <>
      {children}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 via-primary-50/0 to-accent-50/0 hover:from-primary-50/30 hover:via-transparent hover:to-accent-50/20 transition-all duration-500 pointer-events-none" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${hoverClasses} ${glowClasses} block`}
        whileHover={hover ? { y: -4 } : {}}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  if (to) {
    return (
      <motion.div
        className={`${baseClasses} ${hoverClasses} ${glowClasses} cursor-pointer`}
        whileHover={hover ? { y: -4 } : {}}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        {...props}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${glowClasses}`}
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
      {...props}
    >
      {content}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 pt-0 ${className}`}>{children}</div>
);

export const CardIcon = ({ icon: Icon, color = 'primary' }) => {
  const colors = {
    primary: 'from-primary-100 to-primary-50 text-primary-600',
    accent: 'from-accent-100 to-accent-50 text-accent-600',
    success: 'from-green-100 to-green-50 text-green-600',
    warning: 'from-amber-100 to-amber-50 text-amber-600',
  };

  return (
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center mb-4`}
    >
      <Icon className="w-5 h-5" />
    </div>
  );
};

export default Card;