
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AtomIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Only used on the landing page now
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Quantum Dashboard', path: '/quantum-dashboard' },
    { name: 'Workflow', path: '/workflow' },
    { name: 'Analysis', path: '/analysis' },
    { name: 'Legal Advisor', path: '/legal-advisor' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 h-16
      ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-semibold">
            <AtomIcon size={18} />
          </div>
          <span className="font-semibold text-xl tracking-tight">DocuScan</span>
        </Link>

        {/* Desktop Navigation - Only for landing page */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="flex gap-4 lg:gap-6 overflow-x-auto hide-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium whitespace-nowrap transition-colors hover:text-primary ${
                  location.pathname === item.path ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {item.name.length > 12 ? (
                  <span className="inline-block max-w-[120px] truncate" title={item.name}>
                    {item.name}
                  </span>
                ) : (
                  item.name
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-2 shrink-0">
            <Button 
              variant="outline" 
              className="px-3 lg:px-4"
              onClick={() => location.pathname !== '/subscription' && (window.location.href = '/subscription')}
            >
              Subscribe
            </Button>
            <Button className="px-3 lg:px-4">Get Started</Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-border animate-fade-in p-4">
          <div className="flex flex-col gap-3 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium py-2 transition-colors hover:text-primary ${
                  location.pathname === item.path ? 'text-primary' : 'text-foreground/80'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-3 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full justify-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                location.pathname !== '/subscription' && (window.location.href = '/subscription');
              }}
            >
              Subscribe
            </Button>
            <Button 
              className="w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
