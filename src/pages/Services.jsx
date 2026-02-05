import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Static Website",
      description: "Perfect for businesses needing a professional online presence with essential information and contact details.",
      features: ["Responsive Design", "5-7 Pages", "Contact Forms", "SEO Optimized", "Fast Loading", "Mobile Friendly"],
      icon: "📄",
      price: "₹15,000 - ₹20,000",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Dynamic Website",
      description: "Interactive websites with content management systems and dynamic features for growing businesses.",
      features: ["CMS Integration", "Database Connectivity", "User Authentication", "API Integration", "Admin Panel", "Content Management"],
      icon: "⚙️",
      price: "₹30,000 - ₹50,000",
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "Fully Functional Website",
      description: "Complete web applications with advanced features, e-commerce capabilities, and custom functionalities.",
      features: ["E-commerce Integration", "Payment Gateway", "Advanced Analytics", "Custom Features", "Multi-user Support", "Third-party Integrations"],
      icon: "🚀",
      price: "₹1,00,000 - ₹2,00,000",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "E-Commerce Store",
      description: "Complete online store with product catalog, shopping cart, payment gateway, and order management system.",
      features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Management"],
      icon: "🛒",
      price: "Starting from ₹50,000",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Restaurant Website",
      description: "Food ordering website with menu display, online ordering, table booking, and delivery management.",
      features: ["Online Menu", "Food Ordering", "Table Booking", "Delivery Tracking"],
      icon: "🍽️",
      price: "Starting from ₹35,000",
      gradient: "from-red-500 to-pink-500"
    },
    {
      id: 6,
      title: "Real Estate Portal",
      description: "Property listing website with search filters, property details, agent profiles, and inquiry management.",
      features: ["Property Listings", "Advanced Search", "Agent Profiles", "Inquiry System"],
      icon: "🏠",
      price: "Starting from ₹60,000",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: 7,
      title: "Educational Platform",
      description: "Online learning platform with course management, student portal, assignments, and progress tracking.",
      features: ["Course Management", "Student Portal", "Online Tests", "Progress Tracking"],
      icon: "📚",
      price: "Starting from ₹80,000",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: 8,
      title: "Healthcare Website",
      description: "Medical website with appointment booking, doctor profiles, patient portal, and telemedicine features.",
      features: ["Appointment Booking", "Doctor Profiles", "Patient Portal", "Medical Records"],
      icon: "🏥",
      price: "Starting from ₹70,000",
      gradient: "from-green-600 to-teal-600"
    },
    {
      id: 9,
      title: "Travel & Tourism",
      description: "Travel booking website with package listings, hotel bookings, itinerary planning, and payment processing.",
      features: ["Package Listings", "Hotel Booking", "Flight Integration", "Payment Gateway"],
      icon: "✈️",
      price: "Starting from ₹55,000",
      gradient: "from-cyan-500 to-blue-500"
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
    <div className="min-h-screen">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 overflow-hidden">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.08),transparent_50%)] opacity-70"></div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(6,182,212,0.04)_25%,rgba(6,182,212,0.04)_50%,transparent_50%,transparent_75%,rgba(6,182,212,0.04)_75%)] bg-[length:30px_30px]"></div>
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-cyan-500/6 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-xs sm:text-sm font-medium text-blue-300 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Our Professional Services
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                Complete Digital
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Solutions Suite
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                Transform your business with our comprehensive digital solutions that drive growth, 
                innovation, and measurable success for enterprises worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto mb-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">3+</div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover-shadow hover-scale transition-all duration-300 overflow-hidden border border-gray-100 animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                <div className="p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">{service.price}</span>
                    <Link 
                      to="/contact"
                      className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-6 py-2 rounded-full font-semibold hover-scale transition-all duration-300"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our <span className="gradient-text">Process</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure your project is delivered on time, within budget, and exceeds expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Technologies We <span className="gradient-text">Master</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use cutting-edge technologies and frameworks to build robust, scalable solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'React', color: 'from-blue-400 to-blue-600' },
              { name: 'Node.js', color: 'from-green-400 to-green-600' },
              { name: 'Python', color: 'from-yellow-400 to-yellow-600' },
              { name: 'MongoDB', color: 'from-green-500 to-green-700' },
              { name: 'AWS', color: 'from-orange-400 to-orange-600' },
              { name: 'Docker', color: 'from-blue-500 to-blue-700' }
            ].map((tech, index) => (
              <div key={tech.name} className="text-center animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover-scale`}>
                  <span className="text-white font-bold text-xl">{tech.name.charAt(0)}</span>
                </div>
                <h4 className="font-semibold text-gray-900">{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-yellow-300">Project?</span>
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your requirements and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover-scale transition-all duration-300 shadow-lg"
            >
              Get Started Today
            </Link>
            <a 
              href="https://wa.me/917380497919?text=Hi%2C%20I%20want%20to%20discuss%20my%20project%20requirements"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;