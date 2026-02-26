import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/WebTech Logo with BG.png';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-2' 
        : 'bg-white shadow-sm py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src={logo} 
              alt="WebTech Illusion" 
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover shadow-md border-2 border-blue-100 group-hover:border-blue-300 transition-all duration-300" 
            />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">WebTech Illusion</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA & Phone */}
          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href="tel:+917380497919"
              className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiPhone className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+91 73804 97919</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 border-t border-gray-100 pt-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(link.path) 
                      ? 'text-white bg-gradient-to-r from-blue-600 to-cyan-600' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                <a 
                  href="tel:+917380497919"
                  className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  <FiPhone className="w-5 h-5 mr-2" />
                  +91 73804 97919
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
