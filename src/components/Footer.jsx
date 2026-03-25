import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSuccess('Thank you for subscribing!');
      setEmail('');
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }, 1500);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div>
                <span className="text-2xl font-bold">WebTech</span>
                <span className="text-2xl font-bold text-blue-400"> Illusion</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              We deliver consulting-led and AI-powered technology services that help enterprises reimagine their businesses for the digital future.
            </p>
            <div className="flex gap-3">
              {['Facebook', 'LinkedIn', 'Instagram', 'YouTube'].map((s, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-xs font-medium">{s.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3">
              {['Web Development', 'Mobile Apps', 'E-Commerce', 'Digital Marketing', 'Cloud Services'].map((s, i) => (
                <li key={i}><Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Team', 'Careers', 'Contact', 'Blog'].map((s, i) => (
                <li key={i}><Link to={s === 'About Us' ? '/about' : s === 'Our Team' ? '/team' : s === 'Blog' ? '/blog' : '/contact'} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400 mb-6">
              <div>+91 73804 97919</div>
              <div>info@webtechillusion.com</div>
              <div>Sector 16, Indira Nagar,<br/>Lucknow, UP 226010</div>
            </div>
            <h5 className="text-sm font-semibold mb-3">Newsletter</h5>
            {success && <div className="text-green-400 text-sm mb-2">{success}</div>}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <button type="submit" disabled={loading} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50">
                {loading ? '...' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">© 2024 WebTech Illusion. All Rights Reserved.</div>
            <div className="flex gap-6 text-sm text-gray-400">
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
