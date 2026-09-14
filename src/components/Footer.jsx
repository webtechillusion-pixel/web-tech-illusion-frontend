import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { useSettings } from '../context/SettingsContext';
import apiConfig from '../config/api';
import logo from '../assets/illusionlogo.jpeg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const {
    companyName,
    companyDescription,
    contactEmail,
    contactPhone,
    contactAddress,
    socialFacebook,
    socialTwitter,
    socialInstagram,
    socialLinkedin,
    socialGithub,
    footerCopyright,
  } = useSettings();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const response = await fetch(apiConfig.endpoints.newsletter.subscribe, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to subscribe.');
      setSuccess(data.message || 'Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Unable to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { name: 'Facebook',  url: socialFacebook,  label: 'Fb' },
    { name: 'LinkedIn',  url: socialLinkedin,  label: 'Li' },
    { name: 'Instagram', url: socialInstagram, label: 'Ig' },
    { name: 'GitHub',    url: socialGithub,    label: 'Gh' },
  ].filter(s => s.url);

  const name = companyName || 'WebTech Illusion';

  return (
    <footer className="bg-[#0f172a] text-white">
      {/* Top CTA strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Ready to build something <span className="text-[#60a5fa]">exceptional?</span>
            </h3>
            <p className="text-white/60 text-sm mt-1">Let's turn your vision into a high-performing digital product.</p>
          </div>
          <Link
            to="/contact"
            className="button-shine flex-shrink-0 flex items-center gap-2 px-7 py-3.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold rounded-xl transition-colors shadow-lg text-sm"
          >
            Start a Project <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Brand column */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-5">
            <img
              src={logo}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#60a5fa]/50 shadow-md"
            />
            <div>
              <span className="text-xl font-bold text-white">{name.split(' ')[0]}</span>
              <span className="text-xl font-bold text-[#60a5fa]"> {name.split(' ').slice(1).join(' ')}</span>
            </div>
          </Link>

          <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
            {companyDescription ||
              'We deliver consulting-led and AI-powered technology services that help enterprises reimagine their businesses for the digital future.'}
          </p>

          {socialLinks.length > 0 && (
            <div className="flex gap-2">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-9 h-9 bg-white/10 hover:bg-[#2563eb] rounded-lg flex items-center justify-center transition-colors text-xs font-bold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Services</h4>
          <ul className="space-y-3">
            {['Web Development', 'Mobile Apps', 'E-Commerce', 'Digital Marketing', 'Cloud Services'].map((s, i) => (
              <li key={i}>
                <Link
                  to="/services"
                  className="text-sm text-white/60 hover:text-[#60a5fa] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#60a5fa]/40 group-hover:bg-[#60a5fa] transition-colors"></span>
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Company</h4>
          <ul className="space-y-3">
            {[
              { label: 'About Us',  path: '/about' },
              { label: 'Our Team',  path: '/team' },
              { label: 'Careers',   path: '/careers' },
              { label: 'Blog',      path: '/blog' },
              { label: 'Contact',   path: '/contact' },
            ].map((s, i) => (
              <li key={i}>
                <Link
                  to={s.path}
                  className="text-sm text-white/60 hover:text-[#60a5fa] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#60a5fa]/40 group-hover:bg-[#60a5fa] transition-colors"></span>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Contact</h4>
          <div className="space-y-3 text-sm text-white/60 mb-6">
            {contactPhone && (
              <div className="flex items-center gap-2">
                <FiPhone className="w-3.5 h-3.5 text-[#60a5fa] flex-shrink-0" />
                <span>{contactPhone}</span>
              </div>
            )}
            {contactEmail && (
              <div className="flex items-center gap-2">
                <FiMail className="w-3.5 h-3.5 text-[#60a5fa] flex-shrink-0" />
                <span>{contactEmail}</span>
              </div>
            )}
            {contactAddress && (
              <div className="flex items-start gap-2">
                <FiMapPin className="w-3.5 h-3.5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
                <span>{contactAddress}</span>
              </div>
            )}
          </div>

          <h5 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Newsletter</h5>
          {success && <p className="text-emerald-400 text-xs mb-2">{success}</p>}
          {error   && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2563eb] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 bg-[#2563eb] hover:bg-[#60a5fa] text-[#0f172a] rounded-lg transition-colors text-sm font-bold disabled:opacity-50"
            >
              {loading ? 'â€¦' : 'Join'}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            {footerCopyright || `Â© ${new Date().getFullYear()} ${name}. All rights reserved.`}
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
              <span key={i} className="hover:text-[#2563eb] cursor-pointer transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

