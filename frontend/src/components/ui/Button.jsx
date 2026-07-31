import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-xl overflow-hidden group';

  const variants = {
    primary: 'btn-primary text-white',
    secondary: 'btn-secondary',
    ghost: 'text-surface-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2',
    outline: 'border-2 border-surface-200 hover:border-primary-400 text-surface-700 hover:text-primary-600 bg-transparent hover:bg-primary-50/50 px-5 py-2.5',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}`;

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      )}
      {!loading && !Icon && iconPosition === 'right' && variant === 'primary' && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      )}

      {/* Ripple effect container */}
      <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </span>
    </>
  );

  if (to) {
    return (
      <motion.div whileHover={!disabled ? { y: -2 } : {}} whileTap={!disabled ? { y: 0 } : {}}>
        <Link to={to} className={classes} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        whileHover={!disabled ? { y: -2 } : {}}
        whileTap={!disabled ? { y: 0 } : {}}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 0 } : {}}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;