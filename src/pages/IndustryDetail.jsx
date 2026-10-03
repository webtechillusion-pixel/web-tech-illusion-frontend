import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiPhone, FiMail, FiMapPin, FiLoader, FiCheckCircle,
  FiTrendingUp, FiUsers, FiTarget, FiShield
} from 'react-icons/fi';
import Footer from '../components/Footer';

const industryDetails = {
  'healthcare': {
    name: 'Healthcare',
    subtitle: 'Digital Solutions for Medical & Wellness Platforms',
    description: 'HIPAA-compliant healthcare software that improves patient engagement, streamlines operations, and enables better health outcomes.',
    icon: '🏥',
    color: { bg: '#d1fae5', text: '#059669' },
    overview: 'Healthcare organizations need secure, reliable digital solutions that comply with strict regulatory requirements while improving patient care. We specialize in building HIPAA-compliant platforms that facilitate communication between patients and providers, streamline appointment management, and enable telehealth services.',
    solutions: [
      { title: 'Patient Management Systems', desc: 'Centralized patient records, appointment scheduling, and medical history management.' },
      { title: 'Telemedicine Platforms', desc: 'Secure video consultations, prescription management, and remote monitoring capabilities.' },
      { title: 'Health Analytics', desc: 'Data-driven insights for patient outcomes, preventive care, and operational efficiency.' },
      { title: 'Mobile Health Apps', desc: 'Patient engagement apps for appointment booking, health tracking, and provider communication.' }
    ],
    challenges: [
      'Ensuring HIPAA and data privacy compliance',
      'Integrating with legacy health systems',
      'Managing large volumes of sensitive patient data',
      'Providing seamless user experience for diverse user groups'
    ],
    benefits: [
      'Improved patient satisfaction and engagement',
      'Reduced administrative burden on staff',
      'Better data security and compliance',
      'Increased operational efficiency'
    ],
    technologies: ['Node.js', 'React', 'MongoDB', 'AWS', 'HIPAA Compliant Hosting', 'End-to-End Encryption']
  },
  'ecommerce': {
    name: 'E-Commerce',
    subtitle: 'Powerful Online Stores That Drive Sales',
    description: 'Build and scale your online retail business with our comprehensive e-commerce solutions designed for conversion and growth.',
    icon: '🛍️',
    color: { bg: '#fef3c7', text: '#d97706' },
    overview: 'In today\'s digital economy, a strong online presence is essential. We build e-commerce platforms that combine beautiful design with powerful backend systems to drive sales. From inventory management to payment processing, we handle the complexity so you can focus on your business.',
    solutions: [
      { title: 'Online Storefronts', desc: 'Beautiful, conversion-optimized e-commerce websites with seamless shopping experiences.' },
      { title: 'Inventory Management', desc: 'Real-time stock tracking, automated reordering, and multi-warehouse management.' },
      { title: 'Payment Processing', desc: 'Secure integration with payment gateways, subscription billing, and fraud detection.' },
      { title: 'Analytics & Optimization', desc: 'Detailed sales analytics, customer behavior tracking, and conversion optimization.' }
    ],
    challenges: [
      'Managing large product catalogs efficiently',
      'Ensuring secure payment processing',
      'Handling peak traffic during sales events',
      'Providing personalized shopping experiences'
    ],
    benefits: [
      '24/7 automated sales channel',
      'Reduced manual order processing',
      'Improved customer insights and targeting',
      'Scalable growth without infrastructure concerns'
    ],
    technologies: ['Shopify', 'WooCommerce', 'React', 'Node.js', 'Stripe', 'PostgreSQL', 'AWS']
  },
  'education': {
    name: 'Education',
    subtitle: 'E-Learning Platforms Transforming Education',
    description: 'Modern e-learning solutions that engage students, empower educators, and scale educational content delivery.',
    icon: '📚',
    color: { bg: '#dbeafe', text: '#2563eb' },
    overview: 'Education is undergoing a digital transformation. We build e-learning platforms that enable interactive learning experiences, from live classes to self-paced courses. Our solutions support students and educators with intuitive interfaces and robust backend systems.',
    solutions: [
      { title: 'Learning Management Systems', desc: 'Complete LMS for course creation, student enrollment, progress tracking, and assessments.' },
      { title: 'Live Class Platforms', desc: 'Real-time video classes with interactive features, screen sharing, and student engagement tools.' },
      { title: 'Content Delivery', desc: 'Secure content hosting, adaptive learning paths, and multi-format support (videos, documents, quizzes).' },
      { title: 'Student Analytics', desc: 'Detailed learning analytics, performance insights, and personalized learning recommendations.' }
    ],
    challenges: [
      'Scaling to handle thousands of concurrent users',
      'Ensuring content is engaging and accessible',
      'Supporting diverse learning styles',
      'Protecting student data and privacy'
    ],
    benefits: [
      'Increased student engagement and retention',
      'Democratized access to quality education',
      'Data-driven insights into student performance',
      'Cost-effective content delivery at scale'
    ],
    technologies: ['React', 'Node.js', 'WebRTC', 'MongoDB', 'AWS', 'Redis', 'Docker']
  },
  'travel-tourism': {
    name: 'Travel & Tourism',
    subtitle: 'Booking & Reservation Systems for Travel Businesses',
    description: 'Complete travel platform solutions with booking engines, itinerary management, and customer engagement tools.',
    icon: '✈️',
    color: { bg: '#edf4ff', text: '#2563eb' },
    overview: 'The travel industry requires sophisticated booking systems, real-time availability management, and seamless payment processing. We build platforms that connect travelers with destinations while managing complex inventory and pricing.',
    solutions: [
      { title: 'Booking Engines', desc: 'Powerful search and booking systems for flights, hotels, tours, and packages.' },
      { title: 'Itinerary Management', desc: 'Tools for travelers to plan trips, manage bookings, and share itineraries with companions.' },
      { title: 'Dynamic Pricing', desc: 'Automated pricing optimization based on demand, seasonality, and market conditions.' },
      { title: 'Review & Rating Systems', desc: 'Customer feedback platforms that build trust and influence travel decisions.' }
    ],
    challenges: [
      'Real-time inventory synchronization across multiple sources',
      'Managing complex pricing and availability rules',
      'Handling high-volume transactions during peak periods',
      'Providing 24/7 customer support globally'
    ],
    benefits: [
      'Increased direct bookings',
      'Reduced operational complexity',
      'Better customer insights and personalization',
      'Expanded market reach globally'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe/PayPal', 'Google Maps API', 'AWS', 'Redis']
  },
  'real-estate': {
    name: 'Real Estate',
    subtitle: 'Property Management Solutions for Real Estate Professionals',
    description: 'Comprehensive real estate platforms for property listings, property management, and client engagement.',
    icon: '🏠',
    color: { bg: '#ede9fe', text: '#7c3aed' },
    overview: 'Real estate professionals need comprehensive digital tools to manage properties, connect with clients, and close deals efficiently. We build platforms that streamline property management, showcase listings, and facilitate transactions.',
    solutions: [
      { title: 'Property Listing Portals', desc: 'Beautiful property showcases with virtual tours, high-quality images, and detailed descriptions.' },
      { title: 'Client Management', desc: 'CRM systems for managing leads, clients, and transactions throughout the sales process.' },
      { title: 'Virtual Tours & 3D', desc: '360° virtual tours, 3D floor plans, and augmented reality property walkthroughs.' },
      { title: 'Transaction Management', desc: 'Document management, contract handling, and closing coordination.' }
    ],
    challenges: [
      'Managing large property databases with high-quality media',
      'Facilitating client-agent communication',
      'Providing secure document management',
      'Competing in a crowded marketplace'
    ],
    benefits: [
      'Expanded property visibility',
      'Reduced time-to-close',
      'Better client engagement and satisfaction',
      'Streamlined operations and reduced paperwork'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Cloudinary', 'Stripe', 'WebRTC']
  },
  'finance': {
    name: 'Finance',
    subtitle: 'Fintech Solutions for Banking & Financial Services',
    description: 'Secure fintech platforms for payments, lending, investments, and financial management.',
    icon: '💰',
    color: { bg: '#ccfbf1', text: '#0f766e' },
    overview: 'The financial services industry demands the highest levels of security, compliance, and reliability. We build fintech solutions that enable financial institutions and startups to deliver modern financial services securely.',
    solutions: [
      { title: 'Payment Systems', desc: 'Real-time payment platforms with support for multiple currencies and payment methods.' },
      { title: 'Lending Platforms', desc: 'Loan origination systems, credit assessment, and disbursement automation.' },
      { title: 'Investment Platforms', desc: 'Investment management platforms with portfolio tracking, analysis, and transaction execution.' },
      { title: 'Compliance & Reporting', desc: 'Automated compliance monitoring, regulatory reporting, and audit trails.' }
    ],
    challenges: [
      'Ensuring PCI-DSS and regulatory compliance',
      'Managing high transaction volumes securely',
      'Fraud detection and prevention',
      'Maintaining system uptime and reliability'
    ],
    benefits: [
      'Reduced fraud and financial risk',
      'Faster transaction processing',
      'Regulatory compliance and audit readiness',
      'Improved customer trust and adoption'
    ],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'Blockchain', 'AWS', 'Encryption', 'Multi-factor Auth']
  }
};

const IndustryDetail = () => {
  const { type } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const industryKey = Object.keys(industryDetails).find(key => key === type);
    
    if (industryKey) {
      setIndustry(industryDetails[industryKey]);
    }
    setLoading(false);
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-10 h-10 animate-spin text-[#c8a96e] mx-auto mb-4" />
          <p className="text-[#1a1a2e]">Loading industry details...</p>
        </div>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4">Industry Not Found</h1>
          <p className="text-[#1a1a2e]/60 mb-8">The industry you're looking for doesn't exist.</p>
          <Link to="/industries" className="inline-block px-8 py-3 bg-[#c8a96e] text-white font-semibold rounded-lg hover:bg-[#b59757] transition-colors">
            Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#faf8f5] via-white to-[#faf8f5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1a2e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <Link to="/industries" className="inline-flex items-center text-[#c8a96e] hover:text-[#b59757] mb-6 text-sm font-semibold">
            ← Back to Industries
          </Link>
          
          <div className="flex items-start gap-8 mb-12">
            <div
              className="text-6xl"
            >
              {industry.icon}
            </div>
            <div className="flex-1">
              <span className="section-badge mb-3">Industry Focus</span>
              <h1 className="text-5xl md:text-6xl font-black text-[#1a1a2e] mb-4 leading-tight">
                {industry.name}
              </h1>
              <p className="text-xl text-[#1a1a2e]/70 max-w-2xl">{industry.subtitle}</p>
            </div>
          </div>

          <p className="text-lg text-[#1a1a2e]/80 leading-relaxed max-w-3xl">{industry.overview}</p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1a1a2e] mb-12">Our Solutions for {industry.name}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {industry.solutions.map((solution, i) => (
              <div key={i} className="p-8 bg-[#faf8f5] rounded-2xl border border-[#c8a96e]/10 hover:border-[#c8a96e] transition-all group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: industry.color.bg, color: industry.color.text }}
                >
                  <FiTarget className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3">{solution.title}</h3>
                <p className="text-[#1a1a2e]/70 leading-relaxed">{solution.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Benefits */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenges */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FiTrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a2e]">Industry Challenges</h3>
              </div>
              <ul className="space-y-4">
                {industry.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-red-100/50">
                    <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                      !
                    </div>
                    <span className="text-[#1a1a2e]/80">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a2e]">Our Benefits</h3>
              </div>
              <ul className="space-y-4">
                {industry.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-green-100/50">
                    <FiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-[#1a1a2e]/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1a1a2e] mb-12">Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">
            {industry.technologies.map((tech, i) => (
              <span key={i} className="px-6 py-3 bg-[#faf8f5] text-[#1a1a2e] font-semibold rounded-full border border-[#c8a96e]/20 hover:border-[#c8a96e] transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1a1a2e] mb-12">Why Choose Web Tech Illusion</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiUsers className="w-8 h-8" />, title: 'Industry Experts', desc: 'Deep domain expertise in the industry.' },
              { icon: <FiShield className="w-8 h-8" />, title: 'Security First', desc: 'Enterprise-grade security and compliance.' },
              { icon: <FiTrendingUp className="w-8 h-8" />, title: 'Scalable', desc: 'Built to grow with your business.' },
              { icon: <FiTarget className="w-8 h-8" />, title: 'Results-Driven', desc: 'Focused on your business outcomes.' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-[#c8a96e]/10 hover:border-[#c8a96e] transition-all text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#faf8f5]" style={{ color: industry.color.text }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{item.title}</h3>
                <p className="text-sm text-[#1a1a2e]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Transform Your <span className="text-[#c8a96e]">{industry.name}</span> Business?
          </h2>
          <p className="text-xl text-white/60 mb-10">
            Let's discuss how we can help with digital solutions for your industry.
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

export default IndustryDetail;
