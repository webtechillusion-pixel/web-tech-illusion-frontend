import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiSmartphone, FiShoppingCart, FiBarChart, FiCloud, FiShield, FiArrowRight, FiCheckCircle, FiPhone, FiMail, FiMapPin, FiChevronRight, FiLoader } from 'react-icons/fi';
import Footer from '../components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const iconMap = {
  'web': <FiCode className="w-10 h-10" />,
  'mobile': <FiSmartphone className="w-10 h-10" />,
  'ecommerce': <FiShoppingCart className="w-10 h-10" />,
  'marketing': <FiBarChart className="w-10 h-10" />,
  'cloud': <FiCloud className="w-10 h-10" />,
  'security': <FiShield className="w-10 h-10" />,
  'default': <FiCode className="w-10 h-10" />,
};

const gradientMap = {
  'web': 'from-blue-500 to-blue-700',
  'mobile': 'from-cyan-500 to-cyan-700',
  'ecommerce': 'from-teal-500 to-teal-700',
  'marketing': 'from-green-500 to-green-700',
  'cloud': 'from-purple-500 to-purple-700',
  'security': 'from-pink-500 to-pink-700',
  'default': 'from-indigo-500 to-indigo-700',
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}api/services`);
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (service) => {
    const iconKey = service.icon?.toLowerCase() || 'default';
    return iconMap[iconKey] || iconMap.default;
  };

  const getServiceGradient = (index) => {
    if (services[index]?.icon) {
      return gradientMap[services[index].icon.toLowerCase()] || gradientMap.default;
    }
    return gradientMap.default;
  };

  const getFeatureIcon = () => <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  const displayServices = services.length > 0 ? services : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end technology services that help businesses transform and succeed in the digital age.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-center">
              {error}
            </div>
          )}
          
          <div className={`grid ${displayServices.length === 1 ? 'lg:grid-cols-1 max-w-2xl mx-auto' : displayServices.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-8`}>
            {displayServices.map((service, index) => (
              <div key={service._id || index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-500 group">
                <div className="flex items-start gap-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${gradientMap[index % 7] || gradientMap.default} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    {getServiceIcon(service)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.shortDescription}</p>
                    {service.content && (
                      <div className="text-sm text-gray-500 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: service.content }} />
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center text-sm text-gray-700">
                        {getFeatureIcon()}
                        Custom Solutions
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        {getFeatureIcon()}
                        24/7 Support
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        {getFeatureIcon()}
                        Quality Assured
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        {getFeatureIcon()}
                        On-Time Delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayServices.length === 0 && (
            <div className="text-center py-16">
              <FiCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Add services from the admin panel to display them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your <span className="text-blue-600">Package</span>
            </h2>
            <p className="text-lg text-gray-600">
              Flexible pricing designed to fit your budget. All packages include premium support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '₹15,000', features: ['5-7 Pages', 'Responsive Design', 'Contact Forms', 'Basic SEO', 'Email Support'], popular: false },
              { name: 'Professional', price: '₹30,000', features: ['Unlimited Pages', 'CMS Integration', 'Database', 'Advanced SEO', 'API Integration', 'Priority Support'], popular: true },
              { name: 'Enterprise', price: '₹1,00,000+', features: ['Custom Features', 'E-Commerce', 'Payment Gateway', 'Analytics', '24/7 Support', 'Dedicated Manager'], popular: false },
            ].map((plan, i) => (
              <div key={i} className={`relative bg-white rounded-3xl p-8 ${plan.popular ? 'border-2 border-blue-500 shadow-2xl scale-105' : 'border border-gray-200 shadow-lg'}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">MOST POPULAR</div>}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-gray-700">
                      <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`block w-full py-4 rounded-xl font-semibold text-center ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} transition-all`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get <span className="text-blue-600">Started?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Contact us today for a free consultation and project estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="tel:+917380497919" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              <FiPhone className="w-5 h-5" />
              Call Now
            </a>
            <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              Get Free Consultation
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <FiPhone className="w-6 h-6" />, label: 'Phone', value: '+91 73804 97919' },
              { icon: <FiMail className="w-6 h-6" />, label: 'Email', value: 'info@webtechillusion.com' },
              { icon: <FiMapPin className="w-6 h-6" />, label: 'Location', value: 'Lucknow, India' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600">{s.icon}</div>
                <div className="text-sm text-gray-500 mb-1">{s.label}</div>
                <div className="font-semibold text-gray-900">{s.value}</div>
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
