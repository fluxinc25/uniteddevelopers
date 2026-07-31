import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-surface-50 relative">
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;