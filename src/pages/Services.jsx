import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFileText, 
  FiCpu, 
  FiSend, 
  FiShoppingCart, 
  FiPackage, 
  FiHome, 
  FiBookOpen, 
  FiActivity, 
  FiNavigation, 
  FiDatabase, 
  FiUser, 
  FiCreditCard, 
  FiGrid, 
  FiFilter, 
  FiStar, 
  FiCheckCircle, 
  FiArrowRight, 
  FiTarget, 
  FiTrendingUp, 
  FiShield, 
  FiAward,
  FiUsers,
  FiZap,
  FiGlobe,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiExternalLink,
  FiPlay
} from 'react-icons/fi';
import Footer from '../components/Footer';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      title: "Static Website",
      description: "Perfect for businesses needing a professional online presence with essential information and contact details.",
      features: ["Responsive Design", "5-7 Pages", "Contact Forms", "SEO Optimized", "Fast Loading", "Mobile Friendly"],
      icon: <FiFileText />,
      price: "₹15,000 - ₹20,000",
      gradient: "from-blue-500 to-cyan-500",
      category: "basic",
      timeline: "2-3 weeks",
      rating: 4.8,
      clients: 50
    },
    {
      id: 2,
      title: "Dynamic Website",
      description: "Interactive websites with content management systems and dynamic features for growing businesses.",
      features: ["CMS Integration", "Database Connectivity", "User Authentication", "API Integration", "Admin Panel", "Content Management"],
      icon: <FiCpu />,
      price: "₹30,000 - ₹50,000",
      gradient: "from-green-500 to-teal-500",
      category: "intermediate",
      timeline: "4-6 weeks",
      rating: 4.9,
      clients: 35
    },
    {
      id: 3,
      title: "Fully Functional Website",
      description: "Complete web applications with advanced features, e-commerce capabilities, and custom functionalities.",
      features: ["E-commerce Integration", "Payment Gateway", "Advanced Analytics", "Custom Features", "Multi-user Support", "Third-party Integrations"],
      
      price: "₹1,00,000 - ₹2,00,000",
      gradient: "from-purple-500 to-pink-500",
      category: "advanced",
      timeline: "8-12 weeks",
      rating: 5.0,
      clients: 20
    },
    {
      id: 4,
      title: "E-Commerce Store",
      description: "Complete online store with product catalog, shopping cart, payment gateway, and order management system.",
      features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Management"],
      icon: <FiShoppingCart />,
      price: "Starting from ₹50,000",
      gradient: "from-orange-500 to-red-500",
      category: "ecommerce",
      timeline: "6-8 weeks",
      rating: 4.7,
      clients: 40
    },
    {
      id: 5,
      title: "Restaurant Website",
      description: "Food ordering website with menu display, online ordering, table booking, and delivery management.",
      features: ["Online Menu", "Food Ordering", "Table Booking", "Delivery Tracking"],
      icon: <FiPackage />,
      price: "Starting from ₹35,000",
      gradient: "from-red-500 to-pink-500",
      category: "industry",
      timeline: "3-4 weeks",
      rating: 4.6,
      clients: 25
    },
    {
      id: 6,
      title: "Real Estate Portal",
      description: "Property listing website with search filters, property details, agent profiles, and inquiry management.",
      features: ["Property Listings", "Advanced Search", "Agent Profiles", "Inquiry System"],
      icon: <FiHome />,
      price: "Starting from ₹60,000",
      gradient: "from-indigo-500 to-purple-500",
      category: "industry",
      timeline: "5-7 weeks",
      rating: 4.8,
      clients: 15
    },
    {
      id: 7,
      title: "Educational Platform",
      description: "Online learning platform with course management, student portal, assignments, and progress tracking.",
      features: ["Course Management", "Student Portal", "Online Tests", "Progress Tracking"],
      icon: <FiBookOpen />,
      price: "Starting from ₹80,000",
      gradient: "from-blue-600 to-indigo-600",
      category: "industry",
      timeline: "7-9 weeks",
      rating: 4.9,
      clients: 12
    },
    {
      id: 8,
      title: "Healthcare Website",
      description: "Medical website with appointment booking, doctor profiles, patient portal, and telemedicine features.",
      features: ["Appointment Booking", "Doctor Profiles", "Patient Portal", "Medical Records"],
      icon: <FiActivity />,
      price: "Starting from ₹70,000",
      gradient: "from-green-600 to-teal-600",
      category: "industry",
      timeline: "6-8 weeks",
      rating: 4.7,
      clients: 18
    },
    {
      id: 9,
      title: "Travel & Tourism",
      description: "Travel booking website with package listings, hotel bookings, itinerary planning, and payment processing.",
      features: ["Package Listings", "Hotel Booking", "Flight Integration", "Payment Gateway"],
     
      price: "Starting from ₹55,000",
      gradient: "from-cyan-500 to-blue-500",
      category: "industry",
      timeline: "5-7 weeks",
      rating: 4.8,
      clients: 22
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: '🎯' },
    { id: 'basic', name: 'Basic', icon: '📄' },
    { id: 'intermediate', name: 'Intermediate', icon: '⚙️' },
    { id: 'advanced', name: 'Advanced', icon: '🚀' },
    { id: 'ecommerce', name: 'E-Commerce', icon: '🛒' },
    { id: 'industry', name: 'Industry', icon: '🏢' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CEO",
      content: "The team delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
      rating: 5,
      service: "E-Commerce Store"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Global Education",
      role: "Director",
      content: "Our educational platform has transformed how we deliver courses online. The intuitive interface and robust features have improved student engagement significantly.",
      rating: 5,
      service: "Educational Platform"
    },
    {
      id: 3,
      name: "Emma Williams",
      company: "Fine Dining Co.",
      role: "Owner",
      content: "The restaurant website they built has streamlined our ordering process and increased online sales by 300%. Absolutely fantastic work!",
      rating: 5,
      service: "Restaurant Website"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements, target audience, and business goals to create a comprehensive project roadmap."
    },
    {
      step: "02", 
      title: "Design & Prototype",
      description: "Our design team creates wireframes and prototypes to visualize the final product before development begins."
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "We build your solution using best practices, followed by rigorous testing to ensure quality and performance."
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "We deploy your project and provide ongoing support, maintenance, and updates to keep it running smoothly."
    }
  ];

return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Professional Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(6,182,212,0.03)_30%,rgba(6,182,212,0.03)_60%,transparent_60%)] bg-[length:40px_40px] animate-float"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-glow"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-spin-slow"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-8 animate-fadeInUp">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="mr-2">🚀</span>
                Premium Digital Solutions
                <div className="w-2 h-2 bg-green-400 rounded-full ml-3 animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                Complete Digital
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient-shift">
                  Transformation
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed px-4 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                Empower your business with cutting-edge digital solutions that drive innovation, 
                enhance user experience, and deliver measurable results in today's competitive landscape.
              </p>
              
              <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto mb-12 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">5+</div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Projects Delivered</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-2 group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">98%</div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Client Satisfaction</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-2 group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Support Available</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                <button 
                  onClick={() => window.scrollTo({ top: document.getElementById('services-section').offsetTop - 80, behavior: 'smooth' })}
                  className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Services
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <Link 
                  to="/contact"
                  className="group border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 backdrop-blur-sm"
                >
                  Get Free Consultation
                  <svg className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Enhanced Services Section with Filter */}
      <section id="services-section" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Premium Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Discover our comprehensive range of digital solutions designed to elevate your business and deliver exceptional results.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                  {selectedCategory === category.id && (
                    <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div 
                key={service.id}
                className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 animate-fadeInUp transform hover:-translate-y-2 ${
                  hoveredService === service.id ? 'scale-105' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Gradient Top Border */}
                <div className={`h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                
                {/* Service Icon with Animation */}
                <div className="p-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                    <span className="text-3xl filter drop-shadow-md">{service.icon}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  {/* Additional Info */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3">
                      <div className="text-lg font-bold text-blue-600">{service.timeline}</div>
                      <div className="text-xs text-gray-600">Timeline</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-3">
                      <div className="text-lg font-bold text-green-600">⭐ {service.rating}</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3">
                      <div className="text-lg font-bold text-purple-600">{service.clients}+</div>
                      <div className="text-xs text-gray-600">Clients</div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Key Features
                    </h4>
                    <ul className="space-y-2 max-h-32 overflow-y-auto">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-xs text-gray-500 italic">+{service.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Starting from</div>
                      <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.price}
                      </div>
                    </div>
                    <Link 
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="group/btn bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      Get Quote
                      <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try selecting a different category to view more services.</p>
            </div>
          )}
        </div>
      </section>

{/* Enhanced Process Section with Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_25%,rgba(59,130,246,0.02)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.02)_75%)] bg-[length:60px_60px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              Our Development Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How We <span className="gradient-text">Transform Ideas</span> into Reality
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our systematic approach ensures every project is executed with precision, creativity, and technical excellence from concept to deployment.
            </p>
          </div>
          
          {/* Timeline Visualization */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 rounded-full"></div>
            
            <div className="space-y-12">
              {process.map((step, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} animate-fadeInUp`} style={{animationDelay: `${index * 0.15}s`}}>
                  {/* Timeline Node */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full shadow-lg z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{step.step}</span>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group hover:border-blue-300">
                      <div className={`inline-flex items-center w-12 h-12 bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'} rounded-xl text-white font-bold text-lg mb-4 ${index % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className={`w-4 h-4 mr-2 ${index % 2 === 0 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Phase {step.step}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Timeline Node */}
                  <div className="lg:hidden flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold shadow-lg mx-4">
                    {step.step}
                  </div>
                  
                  {/* Spacer */}
                  <div className="hidden lg:block lg:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: '⚡', label: 'Average Delivery Time', value: '2-8 weeks', color: 'from-yellow-400 to-orange-500' },
              { icon: '👥', label: 'Team Members', value: '5-15 specialists', color: 'from-blue-400 to-cyan-500' },
              { icon: '🔄', label: 'Revision Rounds', value: 'Unlimited', color: 'from-green-400 to-teal-500' },
              { icon: '🎯', label: 'Success Rate', value: '100%', color: 'from-purple-400 to-pink-500' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className={`inline-flex items-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl text-white text-2xl mb-4 group-hover:rotate-6 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-blue-300 mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Client Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience working with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group hover:scale-105 animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-200 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</div>
                    <div className="text-xs text-blue-300 mt-1">Service: {testimonial.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { number: '150+', label: 'Happy Clients', icon: '😊' },
              { number: '200+', label: 'Projects Completed', icon: '🚀' },
              { number: '98%', label: 'Client Retention', icon: '🔄' },
              { number: '5★', label: 'Average Rating', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Technology Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Technologies We <span className="gradient-text">Master</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge technologies and frameworks to build robust, scalable, and future-proof solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'React', icon: '⚛️', color: 'from-blue-400 to-cyan-600' },
              { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-green-600' },
              { name: 'Python', icon: '🐍', color: 'from-yellow-400 to-blue-600' },
              { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700' },
              { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-yellow-600' },
              { name: 'Docker', icon: '🐳', color: 'from-blue-500 to-blue-700' },
              { name: 'TypeScript', icon: '📘', color: 'from-blue-600 to-indigo-600' },
              { name: 'GraphQL', icon: '◈', color: 'from-pink-500 to-purple-600' },
              { name: 'Next.js', icon: '▲', color: 'from-gray-800 to-gray-900' },
              { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-700 to-blue-900' },
              { name: 'Redis', icon: '🔴', color: 'from-red-500 to-red-700' },
              { name: 'Kubernetes', icon: '☸️', color: 'from-blue-600 to-purple-600' }
            ].map((tech, index) => (
              <div key={tech.name} className="group text-center animate-fadeInUp" style={{animationDelay: `${index * 0.05}s`}}>
                <div className={`w-20 h-20 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <span className="text-3xl filter drop-shadow-md">{tech.icon}</span>
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{tech.name}</h4>
                <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 font-medium">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              And many more technologies to power your digital success
            </div>
          </div>
        </div>
      </section>

{/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:80px_80px]"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-blue-300 mb-8 animate-fadeInUp">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Ready to Transform Your Business?
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            Let's Build Something 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Amazing Together
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Join 150+ satisfied businesses that have transformed their digital presence with our cutting-edge solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <Link 
              to="/contact"
              className="group relative bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Your Project
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <a 
              href="https://wa.me/917380497919?text=Hi%2C%20I%20want%20to%20discuss%20my%20project%20requirements"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center hover:shadow-2xl"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Chat
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            {[
              { label: 'Free Consultation', value: '30-min', icon: '📅' },
              { label: 'Response Time', value: '< 2 hours', icon: '⚡' },
              { label: 'Project Quote', value: '24 hours', icon: '📋' },
              { label: 'Support', value: '24/7', icon: '🛟' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="text-lg font-bold text-yellow-400 mb-1">{item.value}</div>
                <div className="text-sm text-gray-300">{item.label}</div>
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