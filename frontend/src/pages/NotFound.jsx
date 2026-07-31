import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding pt-20 bg-surface-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <div className="text-8xl font-bold text-gradient mb-4">404</div>
        <h1 className="text-3xl font-bold text-surface-900 mb-4">Page Not Found</h1>
        <p className="text-surface-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/" icon={Home} iconPosition="left">
            Back Home
          </Button>
          <Button to="/projects" variant="secondary" icon={ArrowLeft} iconPosition="left">
            View Projects
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;