import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiCode, FiSmartphone, FiShoppingCart, FiBarChart, FiCloud,
  FiShield, FiArrowRight, FiCheckCircle, FiPhone, FiMail,
  FiMapPin, FiLoader
} from 'react-icons/fi';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/api';

const iconMap = {
  'web':       <FiCode className="w-12 h-12" />,
  'mobile':    <FiSmartphone className="w-12 h-12" />,
  'ecommerce': <FiShoppingCart className="w-12 h-12" />,
  'marketing': <FiBarChart className="w-12 h-12" />,
  'cloud':     <FiCloud className="w-12 h-12" />,
  'security':  <FiShield className="w-12 h-12" />,
};

const iconStyleMap = {
  'web':       { bg: '#fef3c7', color: '#d97706' },
  'mobile':    { bg: '#dbeafe', color: '#2563eb' },
  'ecommerce': { bg: '#d1fae5', color: '#059669' },
  'marketing': { bg: '#edf4ff', color: '#2563eb' },
  'cloud':     { bg: '#ede9fe', color: '#7c3aed' },
  'security':  { bg: '#fce7f3', color: '#db2777' },
};

const serviceDetails = {
  'web-development': {
    title: 'Web Development',
    shortTitle: 'Web Dev',
    subtitle: 'Custom websites and web applications built to scale',
    fullDescription: 'We create responsive, high-performance websites and web applications that engage your audience and drive business growth. From corporate websites to complex SaaS platforms, our web development expertise spans modern frameworks and best practices.',
    icon: 'web',
    features: [
      'Responsive & Mobile-First Design',
      'React, Vue.js & Modern Frameworks',
      'Node.js & Express Backend Development',
      'Database Design & Optimization',
      'SEO-Optimized Architectures',
      'Performance & Security Best Practices',
      'Real-time Features & APIs',
      'Continuous Deployment & DevOps'
    ],
    process: [
      { step: 'Discovery & Planning', desc: 'We understand your goals, audience, and technical requirements through detailed consultation.' },
      { step: 'Design & Prototyping', desc: 'Beautiful, user-centric designs that map to your brand and business objectives.' },
      { step: 'Development', desc: 'Agile development with clean, maintainable code and regular progress updates.' },
      { step: 'Testing & QA', desc: 'Comprehensive testing ensures reliability, security, and cross-browser compatibility.' },
      { step: 'Deployment & Support', desc: 'Smooth deployment with ongoing support and maintenance for your web assets.' }
    ],
    technologies: ['React', 'Vue.js', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
    caseStudies: [
      { name: 'Travel Booking Platform', result: '200% increase in online bookings' },
      { name: 'E-Commerce Store', result: 'Reduced load time by 60%' }
    ]
  },
  'mobile-apps': {
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    subtitle: 'Native and cross-platform mobile applications for iOS and Android',
    fullDescription: 'Our team builds intuitive, feature-rich mobile applications that deliver exceptional user experiences. Whether you need native apps for maximum performance or cross-platform solutions for cost efficiency, we have you covered.',
    icon: 'mobile',
    features: [
      'iOS & Android Native Development',
      'React Native & Flutter Cross-Platform',
      'Mobile UI/UX Design',
      'API Integration & Backend',
      'Push Notifications & Real-time Sync',
      'Offline Functionality',
      'App Store & Play Store Deployment',
      'Mobile Performance Optimization'
    ],
    process: [
      { step: 'Platform & Strategy', desc: 'Determine the best approach (native vs cross-platform) based on your target audience and budget.' },
      { step: 'Prototype Development', desc: 'Build interactive prototypes to validate core features and user flows.' },
      { step: 'Full Development', desc: 'Develop production-ready apps with rigorous testing and optimization.' },
      { step: 'Launch & Support', desc: 'Deploy to app stores and provide ongoing maintenance and feature updates.' }
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Realm', 'Heroku'],
    caseStudies: [
      { name: 'Fitness Tracking App', result: '50K downloads in first month' },
      { name: 'Delivery Platform', result: '4.8★ rating on app stores' }
    ]
  },
  'ecommerce': {
    title: 'E-Commerce Solutions',
    shortTitle: 'E-Commerce',
    subtitle: 'Powerful online stores that convert visitors into customers',
    fullDescription: 'Build a compelling online store with our e-commerce expertise. We create platforms that combine beautiful design with powerful backend systems to drive sales and customer loyalty.',
    icon: 'ecommerce',
    features: [
      'Product Catalog Management',
      'Shopping Cart & Checkout',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Tracking & Fulfillment',
      'Customer Reviews & Ratings',
      'Multi-currency & Multi-language',
      'Analytics & Reporting'
    ],
    process: [
      { step: 'Store Strategy', desc: 'Plan your product catalog, pricing, and sales channels.' },
      { step: 'Platform Selection', desc: 'Choose between Shopify, WooCommerce, custom builds based on scale.' },
      { step: 'Integration & Setup', desc: 'Connect payment gateways, shipping providers, and inventory systems.' },
      { step: 'Launch & Growth', desc: 'Deploy with SEO optimization and marketing setup for immediate visibility.' }
    ],
    technologies: ['Shopify', 'WooCommerce', 'Magento', 'Custom React + Node.js', 'Stripe', 'PayPal'],
    caseStudies: [
      { name: 'Cosmetics Store', result: '₹50L+ revenue in first year' },
      { name: 'Fashion Retail', result: 'Automated 70% of order processing' }
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing & SEO',
    shortTitle: 'Digital Marketing',
    subtitle: 'Strategic marketing to boost visibility and drive qualified traffic',
    fullDescription: 'Grow your online presence with data-driven digital marketing strategies. From SEO to social media, we help you reach the right audience at the right time.',
    icon: 'marketing',
    features: [
      'Search Engine Optimization (SEO)',
      'Google Ads & PPC Campaigns',
      'Social Media Marketing',
      'Content Marketing Strategy',
      'Email Marketing Automation',
      'Analytics & Reporting',
      'Conversion Rate Optimization',
      'Brand Development'
    ],
    process: [
      { step: 'Audit & Analysis', desc: 'Deep dive into your current visibility, competition, and target audience.' },
      { step: 'Strategy Development', desc: 'Create a comprehensive marketing plan with specific KPIs and timelines.' },
      { step: 'Implementation', desc: 'Execute campaigns across chosen channels with continuous optimization.' },
      { step: 'Monitoring & Scaling', desc: 'Track performance and scale what works for maximum ROI.' }
    ],
    technologies: ['Google Analytics', 'Google Search Console', 'Meta Ads', 'Mailchimp', 'SEMrush', 'Ahrefs'],
    caseStudies: [
      { name: 'SaaS Company', result: '300% increase in organic traffic' },
      { name: 'Local Service', result: '1st page ranking for 20+ keywords' }
    ]
  },
  'cloud-services': {
    title: 'Cloud Services & Infrastructure',
    shortTitle: 'Cloud Services',
    subtitle: 'Scalable, secure cloud infrastructure for modern applications',
    fullDescription: 'Leverage cloud technologies to build scalable, reliable applications. We help with cloud architecture, migration, and ongoing management using AWS, Azure, and Google Cloud.',
    icon: 'cloud',
    features: [
      'Cloud Architecture Design',
      'AWS, Azure & GCP Implementation',
      'Database Optimization',
      'Auto-scaling & Load Balancing',
      'CI/CD Pipeline Setup',
      'Disaster Recovery Planning',
      'Cost Optimization',
      'Security & Compliance'
    ],
    process: [
      { step: 'Assessment', desc: 'Evaluate current infrastructure and identify cloud opportunities.' },
      { step: 'Architecture', desc: 'Design a scalable, secure cloud architecture tailored to your needs.' },
      { step: 'Migration', desc: 'Plan and execute a smooth migration with minimal downtime.' },
      { step: 'Optimization', desc: 'Continuously monitor and optimize for performance and cost.' }
    ],
    technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
    caseStudies: [
      { name: 'EdTech Platform', result: 'Reduced costs by 40% with auto-scaling' },
      { name: 'Data Analytics', result: 'Handled 10x traffic spike without issues' }
    ]
  },
  'security': {
    title: 'Cybersecurity Solutions',
    shortTitle: 'Security',
    subtitle: 'Protect your business with enterprise-grade security',
    fullDescription: 'Security is not an afterthought. We build security into every application and provide ongoing protection against evolving cyber threats.',
    icon: 'security',
    features: [
      'Application Security Audits',
      'Penetration Testing',
      'SSL/TLS Implementation',
      'Two-Factor Authentication',
      'Data Encryption',
      'Security Compliance (HIPAA, PCI-DSS)',
      'Regular Security Updates',
      'Incident Response Planning'
    ],
    process: [
      { step: 'Security Assessment', desc: 'Identify vulnerabilities and security gaps in your systems.' },
      { step: 'Remediation Plan', desc: 'Create a prioritized roadmap to address identified issues.' },
      { step: 'Implementation', desc: 'Deploy security controls and best practices across your infrastructure.' },
      { step: 'Monitoring', desc: 'Continuous monitoring and updates to protect against new threats.' }
    ],
    technologies: ['OWASP', 'SSL/TLS', 'OAuth 2.0', 'JWT', 'Firewalls', 'VPN', 'Security Tools'],
    caseStudies: [
      { name: 'Healthcare Provider', result: 'Achieved HIPAA compliance in 3 months' },
      { name: 'FinTech Startup', result: 'Zero security incidents in 2 years' }
    ]
  }
};

const ServiceDetail = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Map route param to service detail key
    const serviceKey = Object.keys(serviceDetails).find(
      key => key === type
    );

    if (serviceKey) {
      setService(serviceDetails[serviceKey]);
      setLoading(false);
    } else {
      // If service not found in predefined list, try to fetch from API
      fetchServiceFromAPI();
    }
  }, [type]);

  const fetchServiceFromAPI = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const found = data.data.find(s => 
          s.title.toLowerCase().replace(/\s+/g, '-') === type
        );
        if (found) {
          setService({
            title: found.title,
            shortTitle: found.title,
            subtitle: found.shortDescription,
            fullDescription: found.shortDescription,
            icon: found.icon?.toLowerCase() || 'web',
            features: ['Professional Service', 'Expert Team', 'Quality Assured', 'On-Time Delivery'],
            process: [
              { step: 'Consultation', desc: 'Understand your requirements and goals.' },
              { step: 'Planning', desc: 'Create a detailed project plan.' },
              { step: 'Execution', desc: 'Deliver high-quality results.' }
            ],
            technologies: [],
            caseStudies: []
          });
        }
      }
    } catch (err) {
      console.error('Error fetching service:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-10 h-10 animate-spin text-[#c8a96e] mx-auto mb-4" />
          <p className="text-[#1a1a2e]">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4">Service Not Found</h1>
          <p className="text-[#1a1a2e]/60 mb-8">The service you're looking for doesn't exist.</p>
          <Link to="/services" className="inline-block px-8 py-3 bg-[#c8a96e] text-white font-semibold rounded-lg hover:bg-[#b59757] transition-colors">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const style = iconStyleMap[service.icon] || { bg: '#edf4ff', color: '#2563eb' };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#faf8f5] via-white to-[#faf8f5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1a2e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <Link to="/services" className="inline-flex items-center text-[#c8a96e] hover:text-[#b59757] mb-6 text-sm font-semibold">
            ← Back to Services
          </Link>
          
          <div className="flex items-start gap-8 mb-12">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center flex-shrink-0"
              style={{ background: style.bg, color: style.color }}
            >
              {iconMap[service.icon]}
            </div>
            <div className="flex-1">
              <span className="section-badge mb-3">Service Details</span>
              <h1 className="text-5xl md:text-6xl font-black text-[#1a1a2e] mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-[#1a1a2e]/70 max-w-2xl">{service.subtitle}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:text-[#1a1a2e] prose-a:text-[#c8a96e]">
            <p className="text-lg text-[#1a1a2e]/80 leading-relaxed">{service.fullDescription}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1a1a2e] mb-12">What's Included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-[#faf8f5] rounded-xl hover:shadow-md transition-all">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: style.bg, color: style.color }}
                >
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e]">{feature}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1a1a2e] mb-12">Our Process</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {service.process.map((p, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-6 min-h-64 flex flex-col border-2 border-[#c8a96e]/20 hover:border-[#c8a96e] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#c8a96e] text-white font-bold flex items-center justify-center mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a2e] mb-3">{p.step}</h3>
                  <p className="text-sm text-[#1a1a2e]/60 flex-1">{p.desc}</p>
                </div>
                {i < service.process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-4 bg-[#c8a96e] rounded-full transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      {service.technologies.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-12">Technologies We Use</h2>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, i) => (
                <span key={i} className="px-6 py-3 bg-[#faf8f5] text-[#1a1a2e] font-semibold rounded-full border border-[#c8a96e]/20 hover:border-[#c8a96e] transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      {service.caseStudies.length > 0 && (
        <section className="py-20 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-12">Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {service.caseStudies.map((cs, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-[#c8a96e]/20 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">{cs.name}</h3>
                  <p className="text-[#c8a96e] font-semibold">{cs.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Get <span className="text-[#c8a96e]">Started?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10">
            Let's discuss how we can help your business with {service.title.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:+917379118083"
              className="px-8 py-4 bg-white text-[#1a1a2e] font-bold rounded-xl hover:bg-[#faf8f5] transition-all flex items-center justify-center gap-2"
            >
              <FiPhone className="w-5 h-5" /> Call Now
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 bg-[#c8a96e] text-[#1a1a2e] font-bold rounded-xl hover:bg-[#b59757] transition-all flex items-center justify-center gap-2"
            >
              Get Free Consultation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <FiPhone  className="w-5 h-5" />, label: 'Phone',    value: '+91 73791 18083' },
              { icon: <FiMail   className="w-5 h-5" />, label: 'Email',    value: 'webtechillusion@gmail.com' },
              { icon: <FiMapPin className="w-5 h-5" />, label: 'Location', value: 'Sector 16/1033, Indiranagar, Lucknow' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#c8a96e]/50 transition-colors">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 bg-[#c8a96e]/20 text-[#c8a96e]">
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

export default ServiceDetail;
