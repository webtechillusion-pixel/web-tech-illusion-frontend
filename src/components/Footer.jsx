import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_URL

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Successfully subscribed!');
        setEmail('');
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to subscribe. Please try again.');
    }

    setLoading(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <pattern id="footerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#footerGrid)"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pt-16 pb-12">
          
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">WebTech Illusion</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md">
              Your trusted digital partner for creating extraordinary web experiences. 
              We specialize in transforming ideas into reality through innovative design 
              and cutting-edge development solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/webtechillusion/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/webtechillusion/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/webtechillusion/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://g.page/webtech-illusion" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.703c-1.164 1.164-2.785 1.912-4.539 2.099v-4.539c.187-1.754.935-3.375 2.099-4.539l2.44 2.44-2.44 2.44-2.44 2.44 2.44 2.44 2.44-2.44zm-5.894-5.703V6.297c-1.754-.187-3.375-.935-4.539-2.099l2.44-2.44 2.44 2.44 2.44 2.44-2.44 2.44-2.44 2.44 2.44 2.44-2.44 2.44-2.44-2.44 2.099-2.099z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@webtechillusion" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white relative">
              Services
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Web Development</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>UI/UX Design</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Mobile Apps</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Digital Strategy</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>E-commerce</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white relative">
              Company
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>About Us</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Portfolio</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Careers</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white relative">
              Stay Connected
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe for updates and exclusive insights.
            </p>
            {message && (
              <div className={`text-sm mb-3 ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </div>
            )}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col mb-6">
              <div className="flex">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 px-4 py-3 flex-1 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm backdrop-blur-sm" 
                  placeholder="Your email"
                  required
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-r-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 text-sm group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                +91 7380497919
              </div>
              <div className="flex items-center text-gray-300 text-sm group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                info@webtechillusion.com
              </div>
              <div className="flex items-start text-gray-300 text-sm group">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.703c-1.164 1.164-2.785 1.912-4.539 2.099v-4.539c.187-1.754.935-3.375 2.099-4.539l2.44 2.44-2.44 2.44-2.44 2.44 2.44 2.44 2.44-2.44zm-5.894-5.703V6.297c-1.754-.187-3.375-.935-4.539-2.099l2.44-2.44 2.44 2.44 2.44 2.44-2.44 2.44-2.44 2.44 2.44 2.44-2.44 2.44-2.44-2.44 2.099-2.099z"/>
                  </svg>
                </div>
                <span className="leading-relaxed">16/1033, Road, Sector 16,<br/>Indira Nagar, Lucknow,<br/>Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-sm text-center sm:text-left">
              © 2024 <span className="text-blue-400 font-semibold">WebTech Illusion</span>. All Rights Reserved. Made with ❤️ in India
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-6 text-sm text-gray-400">
              <span className="hover:text-blue-400 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-blue-400 transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-blue-400 transition-colors cursor-pointer">Support</span>
              <span className="hover:text-blue-400 transition-colors cursor-pointer">Sitemap</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;