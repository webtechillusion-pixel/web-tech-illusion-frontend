import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCode, FiSmartphone, FiShoppingCart, FiBarChart, FiCloud,
  FiShield, FiArrowRight, FiCheckCircle, FiPhone, FiMail,
  FiMapPin, FiChevronRight, FiLoader
} from 'react-icons/fi';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/api';

const iconMap = {
  'web':       <FiCode className="w-9 h-9" />,
  'mobile':    <FiSmartphone className="w-9 h-9" />,
  'ecommerce': <FiShoppingCart className="w-9 h-9" />,
  'marketing': <FiBarChart className="w-9 h-9" />,
  'cloud':     <FiCloud className="w-9 h-9" />,
  'security':  <FiShield className="w-9 h-9" />,
  'default':   <FiCode className="w-9 h-9" />,
};

const iconStyleMap = {
  'web':       { bg: '#fef3c7', color: '#d97706' },
  'mobile':    { bg: '#dbeafe', color: '#2563eb' },
  'ecommerce': { bg: '#d1fae5', color: '#059669' },
  'marketing': { bg: '#edf4ff', color: '#2563eb' },
  'cloud':     { bg: '#ede9fe', color: '#7c3aed' },
  'security':  { bg: '#fce7f3', color: '#db2777' },
  'default':   { bg: '#edf4ff', color: '#2563eb' },
};

// fallback palette for index-based coloring
const palette = [
  { bg: '#fef3c7', color: '#d97706' },
  { bg: '#dbeafe', color: '#2563eb' },
  { bg: '#d1fae5', color: '#059669' },
  { bg: '#edf4ff', color: '#2563eb' },
  { bg: '#ede9fe', color: '#7c3aed' },
  { bg: '#fce7f3', color: '#db2777' },
];

const Services = () => {
  const [services, setServices]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();
      setServices(data.success && data.data.length > 0 ? data.data : []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (service) => {
    const key = service.icon?.toLowerCase() || 'default';
    return iconMap[key] || iconMap.default;
  };

  const getServiceStyle = (service, index) => {
    const key = service.icon?.toLowerCase();
    return iconStyleMap[key] || palette[index % palette.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f8ff] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-10 h-10 animate-spin text-[#2563eb] mx-auto mb-4" />
          <p className="text-[#6b7280]">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f8ff]">

      {/* â”€â”€ Hero â”€â”€ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">What We Offer</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0f172a] mb-6 leading-tight">
            Our <span className="text-[#2563eb]">Services</span>
          </h1>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto leading-relaxed">
            End-to-end website design, web development, mobile apps, SEO, and digital marketing services for businesses looking for the best software company in Lucknow and a growth-focused digital partner.
          </p>
        </div>
      </section>

      {/* â”€â”€ Services Grid â”€â”€ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-center text-sm">
              {error}
            </div>
          )}

          {services.length > 0 ? (
            <div className={`grid ${services.length === 1 ? 'lg:grid-cols-1 max-w-2xl mx-auto' : 'lg:grid-cols-2'} gap-8`}>
              {services.map((service, index) => {
                const style = getServiceStyle(service, index);
                return (
                  <div
                    key={service._id || index}
                    className="bg-[#f3f8ff] rounded-2xl p-8 border border-[#dfeafc] hover:border-[#2563eb] hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-6">
                      <div
                        className="w-18 h-18 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ background: style.bg, color: style.color, width: '4.5rem', height: '4.5rem' }}
                      >
                        {getServiceIcon(service)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#0f172a] mb-3">{service.title}</h3>
                        <p className="text-[#6b7280] leading-relaxed mb-5 text-sm">{service.shortDescription}</p>
                        {service.content && (
                          <div
                            className="text-sm text-[#9ca3af] mb-5 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: service.content }}
                          />
                        )}
                        <div className="grid grid-cols-2 gap-3">
                          {['Custom Solutions', '24/7 Support', 'Quality Assured', 'On-Time Delivery'].map((f, fi) => (
                            <div key={fi} className="flex items-center text-sm text-[#4b5563]">
                              <FiCheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: style.color }} />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-[#edf4ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCode className="w-9 h-9 text-[#2563eb]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-2">No Services Found</h3>
              <p className="text-[#6b7280]">Add services from the admin panel to display them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* â”€â”€ Pricing â”€â”€ */}
      <section className="py-24 bg-[#f3f8ff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge">Transparent Pricing</span>
            <div className="divider"></div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-4">
              Choose Your <span className="text-[#2563eb]">Package</span>
            </h2>
            <p className="text-lg text-[#6b7280]">
              Flexible pricing designed to fit your budget. All packages include premium support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '₹15,000',
                features: ['5–7 Pages', 'Responsive Design', 'Contact Forms', 'Basic SEO', 'Email Support'],
                popular: false,
              },
              {
                name: 'Professional',
                price: '₹30,000',
                features: ['Unlimited Pages', 'CMS Integration', 'Database', 'Advanced SEO', 'API Integration', 'Priority Support'],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: '₹1,00,000+',
                features: ['Custom Features', 'E-Commerce', 'Payment Gateway', 'Analytics', '24/7 Support', 'Dedicated Manager'],
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-3xl p-8 transition-all ${
                  plan.popular
                    ? 'border-2 border-[#2563eb] shadow-xl scale-105'
                    : 'border border-[#dfeafc] shadow-sm hover:shadow-md hover:border-[#2563eb]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0f172a] text-[#2563eb] text-xs font-bold rounded-full tracking-wider">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-2">{plan.name}</h3>
                  <div className="text-4xl font-black text-[#2563eb] mb-2">{plan.price}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-[#4b5563] text-sm">
                      <FiCheckCircle className="w-4 h-4 text-[#2563eb] mr-3 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block w-full py-4 rounded-xl font-semibold text-center transition-all text-sm ${
                    plan.popular
                      ? 'bg-[#0f172a] text-white hover:bg-[#2d2d3a]'
                      : 'bg-[#f3f8ff] text-[#0f172a] border border-[#dfeafc] hover:border-[#2563eb]'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€ */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Get <span className="text-[#2563eb]">Started?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10">
            Contact us today for a free consultation and project estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a
              href="tel:+917380497919"
              className="px-8 py-4 bg-white text-[#0f172a] font-bold rounded-xl hover:bg-[#f3f8ff] transition-all flex items-center justify-center gap-2"
            >
              <FiPhone className="w-5 h-5" /> Call Now
            </a>
            <Link
              to="/contact"
              className="button-shine px-8 py-4 bg-[#2563eb] text-[#0f172a] font-bold rounded-xl hover:bg-[#60a5fa] transition-all flex items-center justify-center gap-2"
            >
              Get Free Consultation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <FiPhone  className="w-5 h-5" />, label: 'Phone',    value: '+91 73804 97919',          style: { bg: '#edf4ff', color: '#2563eb' } },
              { icon: <FiMail   className="w-5 h-5" />, label: 'Email',    value: 'info@webtechillusion.com', style: { bg: '#dbeafe', color: '#2563eb' } },
              { icon: <FiMapPin className="w-5 h-5" />, label: 'Location', value: 'Lucknow, India',           style: { bg: '#d1fae5', color: '#059669' } },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#2563eb]/50 transition-colors">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: s.style.bg, color: s.style.color }}
                >
                  {s.icon}
                </div>
                <div className="text-xs text-white/40 mb-1 uppercase tracking-wider font-medium">{s.label}</div>
                <div className="font-semibold text-white text-sm">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

