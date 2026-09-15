import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiChevronDown } from 'react-icons/fi';
import { useSettings } from '../context/SettingsContext';
import logo from '../assets/illusionlogo.jpeg';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRefs = useRef([]);
  const { companyName, contactPhone } = useSettings();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems = [
    {
      label: 'Company',
      children: [
        { title: 'About Us',   sub: 'Our story & vision',  path: '/about' },
        { title: 'Leadership', sub: 'Meet our team',        path: '/team' },
        { title: 'Careers',    sub: 'Join our team',        path: '/careers' },
        { title: 'Newsroom',   sub: 'Latest updates',       path: '/blog' },
      ]
    },
    {
      label: 'Industries',
      children: [
        { title: 'Healthcare',     sub: 'Medical & wellness platforms',    path: '/industries/healthcare' },
        { title: 'E-Commerce',     sub: 'Retail & shopping solutions',     path: '/industries/e-commerce' },
        { title: 'Education',      sub: 'E-learning platforms',            path: '/industries/education' },
        { title: 'Travel & Tourism', sub: 'Booking & reservation systems', path: '/industries/travel-tourism' },
        { title: 'Real Estate',    sub: 'Property management',             path: '/industries/real-estate' },
      ]
    },
    {
      label: 'Services',
      children: [
        { title: 'Web Development',   sub: 'Custom websites & web applications', path: '/services/web-development' },
        { title: 'Mobile Solutions',  sub: 'iOS & Android apps',                 path: '/services/mobile-app-development' },
        { title: 'E-Commerce',        sub: 'Online stores & marketplaces',        path: '/services/e-commerce-solutions' },
        { title: 'Digital Marketing', sub: 'SEO, SEM & social media',            path: '/services/digital-marketing' },
        { title: 'Cloud Services',    sub: 'AWS, Azure & deployment',            path: '/services/cloud-services' },
      ]
    },
    {
      label: 'Insights',
      children: [
        { title: 'Blog',          sub: 'Tech articles & guides',  path: '/blog' },
        { title: 'Case Studies',  sub: 'Our success stories',     path: '/case-studies' },
        { title: 'Documentation', sub: 'Technical resources',     path: '/documentation' },
      ]
    }
  ];

  const displayName = companyName || 'WebTech Illusion';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_12px_30px_rgba(37,99,235,0.08)] border-b border-[#dfeafc]'
          : 'bg-white/80 backdrop-blur-xl border-b border-[#edf4ff]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                alt={displayName}
                className="h-16 w-16 sm:h-[4.25rem] sm:w-[4.25rem] rounded-full object-cover shadow-[0_12px_28px_rgba(37,99,235,0.2)] border-2 border-white ring-2 ring-[#dfeafc] group-hover:ring-[#93c5fd] transition-all duration-300"
              />
            </div>
            <div className="leading-none">
              <span className="block text-xl sm:text-[1.45rem] font-black tracking-tight text-[#0f172a] whitespace-nowrap">
                {displayName}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                ref={el => dropdownRefs.current[idx] = el}
                className="relative"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-sm font-semibold text-[#374151] hover:text-[#0f172a] flex items-center gap-1.5 transition-all duration-200 rounded-xl hover:bg-[#f3f8ff] cursor-pointer">
                  {item.label}
                  <FiChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === idx ? 'rotate-180 text-[#2563eb]' : 'text-[#64748b]'
                    }`}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#dfeafc] overflow-hidden transition-all duration-200 z-50 ${
                    activeDropdown === idx
                      ? 'opacity-100 translate-y-0 visible'
                      : 'opacity-0 -translate-y-2 invisible'
                  }`}
                  style={{ top: '100%', marginTop: '6px' }}
                >
                  <div className="p-2">
                    {item.children.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        to={child.path}
                        className="flex items-center p-3 rounded-xl hover:bg-[#f3f8ff] transition-colors group"
                      >
                        <div className="w-8 h-8 bg-[#edf4ff] rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-[#dfeafc] transition-colors">
                          <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#0f172a]">{child.title}</div>
                          <div className="text-xs text-[#9ca3af] mt-0.5">{child.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            {contactPhone && (
              <a
                href={`tel:${contactPhone}`}
                className="flex items-center text-sm text-[#6b7280] hover:text-[#0f172a] font-medium transition-colors"
              >
                <FiPhone className="w-4 h-4 mr-1.5 text-[#2563eb]" />
                {contactPhone}
              </a>
            )}
            <Link
              to="/contact"
              className="button-shine px-6 py-2.5 bg-gradient-to-r from-[#0f172a] to-[#2563eb] text-white text-sm font-semibold rounded-xl hover:shadow-[0_12px_25px_rgba(37,99,235,0.22)] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#374151] hover:text-[#0f172a] rounded-lg hover:bg-[#f3f8ff] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#dfeafc] shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navItems.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[#0f172a] font-semibold text-sm rounded-xl hover:bg-[#f3f8ff] transition-colors"
                >
                  {item.label}
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform ${activeDropdown === idx ? 'rotate-180 text-[#2563eb]' : 'text-[#9ca3af]'}`}
                  />
                </button>
                {activeDropdown === idx && (
                  <div className="pl-4 space-y-1 pb-2">
                    {item.children.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        to={child.path}
                        className="flex items-center px-4 py-2.5 text-sm text-[#4b5563] hover:text-[#0f172a] rounded-lg hover:bg-[#f3f8ff] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mr-3 flex-shrink-0"></span>
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-[#dfeafc] mt-2 space-y-2">
              {contactPhone && (
                <a
                  href={`tel:${contactPhone}`}
                  className="flex items-center px-4 py-3 text-sm text-[#6b7280] font-medium"
                >
                  <FiPhone className="w-4 h-4 mr-2 text-[#2563eb]" />
                  {contactPhone}
                </a>
              )}
              <Link
                to="/contact"
                className="block text-center py-3 bg-[#0f172a] text-white rounded-xl font-semibold text-sm hover:bg-[#2d2d3a] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

