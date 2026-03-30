import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiChevronDown } from 'react-icons/fi';
import { useSettings } from '../context/SettingsContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);
  const { companyName, contactPhone, companyLogo } = useSettings();

  const navItems = [
    {
      label: 'Services',
      children: [
        { title: 'Web Development', sub: 'Custom websites & web applications', path: '/services' },
        { title: 'Mobile Solutions', sub: 'iOS & Android apps', path: '/services' },
        { title: 'E-Commerce', sub: 'Online stores & marketplaces', path: '/services' },
        { title: 'Digital Marketing', sub: 'SEO, SEM & social media', path: '/services' },
        { title: 'Cloud Services', sub: 'AWS, Azure & deployment', path: '/services' },
      ]
    },
    {
      label: 'Industries',
      children: [
        { title: 'Healthcare', sub: 'Medical & wellness platforms', path: '/industries' },
        { title: 'E-Commerce', sub: 'Retail & shopping solutions', path: '/industries' },
        { title: 'Education', sub: 'E-learning platforms', path: '/industries' },
        { title: 'Travel & Tourism', sub: 'Booking & reservation systems', path: '/industries' },
        { title: 'Real Estate', sub: 'Property management', path: '/industries' },
      ]
    },
    {
      label: 'Company',
      children: [
        { title: 'About Us', sub: 'Our story & vision', path: '/about' },
        { title: 'Leadership', sub: 'Meet our team', path: '/team' },
        { title: 'Careers', sub: 'Join our team', path: '/careers' },
        { title: 'Newsroom', sub: 'Latest updates', path: '/blog' },
      ]
    },
    {
      label: 'Insights',
      children: [
        { title: 'Blog', sub: 'Tech articles & guides', path: '/blog' },
        { title: 'Case Studies', sub: 'Our success stories', path: '/case-studies' },
        { title: 'Documentation', sub: 'Technical resources', path: '/documentation' },
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefs.current && !dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousemove', handleClickOutside);
    return () => document.removeEventListener('mousemove', handleClickOutside);
  }, []);

  const displayName = companyName || 'WebTech Illusion';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center gap-3">
            {companyLogo ? (
              <img src={companyLogo} alt={displayName} className="h-14 w-14 rounded-full object-cover shadow-md border-2 border-gray-100" />
            ) : (
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md border-2 border-blue-100">
                <span className="text-white text-xl font-bold">{displayName.charAt(0)}</span>
              </div>
            )}
            <div>
              <span className="text-2xl font-bold text-gray-900">{displayName.split(' ')[0]}</span>
              <span className="text-2xl font-bold text-blue-600"> {displayName.split(' ').slice(1).join(' ')}</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                ref={el => dropdownRefs.current[idx] = el}
                className="relative"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer">
                  {item.label}
                  <FiChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                </button>

                <div
                  className={`absolute left-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 z-50 ${
                    activeDropdown === idx ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                  }`}
                  style={{ top: '100%', marginTop: '8px' }}
                >
                  {item.children.map((child, cIdx) => (
                    <Link
                      key={cIdx}
                      to={child.path}
                      className="flex items-center p-4 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{child.title}</div>
                        <div className="text-xs text-gray-500">{child.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${contactPhone}`} className="flex items-center text-base text-gray-600 hover:text-blue-600 font-medium">
              <FiPhone className="w-4 h-4 mr-2" />
              {contactPhone}
            </a>
            <Link to="/contact" className="px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
              Get Started
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-gray-600">
            {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl max-h-96 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
            {navItems.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 font-medium"
                >
                  {item.label}
                  <FiChevronDown className="w-5 h-5" />
                </button>
                {activeDropdown === idx && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child, cIdx) => (
                      <Link key={cIdx} to={child.path} className="block px-4 py-2 text-sm text-gray-600">
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t mt-4 space-y-2">
              <a href={`tel:${contactPhone}`} className="flex items-center px-4 py-3 text-gray-600">
                <FiPhone className="w-5 h-5 mr-2" />
                {contactPhone}
              </a>
              <Link to="/contact" className="block text-center py-3 bg-blue-600 text-white rounded-lg font-semibold">
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
