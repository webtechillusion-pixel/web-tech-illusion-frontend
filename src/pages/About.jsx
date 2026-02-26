import React, { useState } from 'react';
import {
  FiCode,
  FiZap,
  FiAward,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiCpu,
  FiDatabase,
  FiServer,
  FiCloud,
  FiGlobe,
  FiSmartphone,
  FiMonitor,
  FiLayers,
  FiBox,
  FiPackage,
  FiSend,
  FiStar,
  FiHeart,
  FiSun,
  FiTool,
  FiGitBranch,
  FiActivity,
  FiBarChart,
  FiMessageSquare,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiBriefcase,
  FiBookOpen,
  FiNavigation,
  FiArrowRight,
  FiExternalLink,
  FiShoppingCart,
  FiFileText
} from 'react-icons/fi';
import Footer from '../components/Footer';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-[80vh] sm:min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-400 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                About Our Company
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transforming Ideas Into
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Digital Excellence
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                We are a passionate team of innovative developers and creative designers dedicated to building digital solutions that transform businesses.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
                {[
                  { value: '10+', label: 'Projects' },
                  { value: '10+', label: 'Clients' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="#our-story"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Learn More
                </a>
                <a 
                  href="/contact"
                  className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Our Story Section */}
      <section id="our-story" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-semibold text-blue-700 mb-4">
              <FiBookOpen className="w-4 h-4 mr-2" />
              Our Journey
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Story</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              From a small startup to a leading digital agency, our journey has been defined by innovation, passion, and client success.
            </p>
          </div>

          {/* Mission/Vision Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'mission', label: 'Our Mission', icon: <FiTarget className="w-4 h-4" /> },
              { id: 'vision', label: 'Our Vision', icon: <FiZap className="w-4 h-4" /> },
              { id: 'values', label: 'Our Values', icon: <FiHeart className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              {activeTab === 'mission' && (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                    <FiTarget className="w-6 h-6 mr-2 text-blue-600" />
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Founded with a vision to bridge the gap between imagination and reality, Illusion has been at the forefront of digital innovation. We believe that every great project starts with a dream, and our mission is to make those dreams come true through cutting-edge technology and creative solutions.
                  </p>
                </>
              )}

              {activeTab === 'vision' && (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                    <FiZap className="w-6 h-6 mr-2 text-yellow-500" />
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the leading digital transformation partner for businesses worldwide, creating innovative solutions that drive growth, enhance user experiences, and set new standards in digital excellence.
                  </p>
                </>
              )}

              {activeTab === 'values' && (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                    <FiHeart className="w-6 h-6 mr-2 text-red-500" />
                    Our Core Values
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our values guide everything we do - from how we treat our clients to how we develop our solutions.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Innovation', 'Quality', 'Integrity', 'Collaboration'].map((value, index) => (
                      <div key={index} className="flex items-center">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="font-medium text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Visual Card */}
            <div className="relative">
              <div className={`rounded-2xl h-64 sm:h-80 overflow-hidden shadow-xl ${
                activeTab === 'mission' ? 'bg-gradient-to-br from-blue-600 to-cyan-600' :
                activeTab === 'vision' ? 'bg-gradient-to-br from-purple-600 to-pink-600' :
                'bg-gradient-to-br from-green-600 to-teal-600'
              }`}>
                <div className="h-full flex items-center justify-center text-white p-8">
                  <div className="text-center">
                    {activeTab === 'mission' && (
                      <>
                        <FiTarget className="w-12 h-12 mx-auto mb-4 opacity-80" />
                        <div className="text-2xl font-bold">Digital Excellence</div>
                        <p className="text-sm opacity-90 mt-2">Transforming ideas into powerful digital solutions</p>
                      </>
                    )}
                    {activeTab === 'vision' && (
                      <>
                        <FiZap className="w-12 h-12 mx-auto mb-4 opacity-80" />
                        <div className="text-2xl font-bold">Innovation First</div>
                        <p className="text-sm opacity-90 mt-2">Leading the future of digital transformation</p>
                      </>
                    )}
                    {activeTab === 'values' && (
                      <>
                        <FiHeart className="w-12 h-12 mx-auto mb-4 opacity-80" />
                        <div className="text-2xl font-bold">Trust & Quality</div>
                        <p className="text-sm opacity-90 mt-2">Building lasting partnerships through excellence</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { number: '24/7', label: 'Support' },
                  { number: '100%', label: 'Satisfaction' },
                  { number: 'A+', label: 'Quality' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-3 text-center shadow-md">
                    <div className="text-lg font-bold text-gray-900">{stat.number}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
            <div>
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl h-80 flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="text-3xl sm:text-4xl font-bold mb-4">Our Vision</div>
                  <p className="text-lg sm:text-xl opacity-90">Creating Digital Excellence</p>
                </div>
</div>

 {/* Enhanced Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-700 mb-6">
              <FiHeart className="w-4 h-4 mr-2" />
              What Drives Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every solution we create.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiZap className="w-8 h-8" />,
                title: "Innovation",
                description: "Pushing boundaries with cutting-edge solutions and forward-thinking approaches",
                color: "from-blue-500 to-cyan-500",
                bgColor: "from-blue-50 to-cyan-50"
              },
              {
                icon: <FiAward className="w-8 h-8" />,
                title: "Quality",
                description: "Excellence in every detail we create and every project we deliver",
                color: "from-green-500 to-teal-500",
                bgColor: "from-green-50 to-teal-50"
              },
              {
                icon: <FiSun className="w-8 h-8" />,
                title: "Creativity",
                description: "Unique designs and innovative solutions that make your brand stand out",
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50"
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: "Collaboration",
                description: "Building lasting partnerships through transparent communication and teamwork",
                color: "from-orange-500 to-red-500",
                bgColor: "from-orange-50 to-red-50"
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Enhanced Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full text-sm font-medium text-green-700 mb-6">
              <FiCode className="w-4 h-4 mr-2" />
              What We Do Best
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What We <span className="gradient-text">Specialize In</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions designed to elevate your business and drive measurable results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCode className="w-8 h-8" />,
                title: "Web Development",
                description: "Custom websites, web applications, and e-commerce platforms built with modern technologies",
                features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "Cross-browser Compatibility"],
                gradient: "from-blue-500 to-indigo-600",
                bgColor: "from-blue-50 to-indigo-100",
                borderColor: "border-blue-200"
              },
              {
                icon: <FiShoppingCart className="w-8 h-8" />,
                title: "E-Commerce Solutions",
                description: "Complete online store development with secure payment gateways and inventory management",
                features: ["Payment Gateway Integration", "Inventory Management", "Order Tracking System", "Customer Dashboard"],
                gradient: "from-green-500 to-teal-600",
                bgColor: "from-green-50 to-teal-100",
                borderColor: "border-green-200"
              },
              {
                icon: <FiBarChart className="w-8 h-8" />,
                title: "Digital Marketing",
                description: "Comprehensive digital marketing strategies including SEO and social media marketing",
                features: ["Search Engine Optimization", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
                gradient: "from-purple-500 to-pink-600",
                bgColor: "from-purple-50 to-pink-100",
                borderColor: "border-purple-200"
              },
              {
                icon: <FiSmartphone className="w-8 h-8" />,
                title: "Mobile Development",
                description: "Native and cross-platform mobile applications for iOS and Android devices",
                features: ["React Native Apps", "Flutter Development", "App Store Optimization", "UI/UX Design"],
                gradient: "from-orange-500 to-red-600",
                bgColor: "from-orange-50 to-red-100",
                borderColor: "border-orange-200"
              },
              {
                icon: <FiCloud className="w-8 h-8" />,
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and deployment solutions for modern applications",
                features: ["AWS Deployment", "Serverless Architecture", "Cloud Migration", "DevOps Services"],
                gradient: "from-cyan-500 to-blue-600",
                bgColor: "from-cyan-50 to-blue-100",
                borderColor: "border-cyan-200"
              },
              {
                icon: <FiShield className="w-8 h-8" />,
                title: "Security & Testing",
                description: "Comprehensive security audits and quality assurance testing services",
                features: ["Security Audits", "Penetration Testing", "Performance Testing", "Code Reviews"],
                gradient: "from-red-500 to-pink-600",
                bgColor: "from-red-50 to-pink-100",
                borderColor: "border-red-200"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className={`group relative bg-gradient-to-br ${service.bgColor} p-8 rounded-2xl border ${service.borderColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fadeInUp`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Gradient Border Animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      <FiCheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="mt-6 pt-4 border-t border-gray-200/50">
                  <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors flex items-center group/btn">
                    Learn More
                    <FiArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Our Development Process */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-semibold text-blue-700 mb-4">
              <FiGitBranch className="w-4 h-4 mr-2" />
              Our Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Development <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach to ensure your project is delivered with excellence, on time, and within budget.
            </p>
          </div>

          {/* Process Steps - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your requirements, target audience, and project goals",
                icon: <FiTarget className="w-6 h-6" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating roadmaps, wireframes, and technical specifications",
                icon: <FiNavigation className="w-6 h-6" />,
                color: "from-green-500 to-teal-500"
              },
              {
                step: "03",
                title: "Development",
                description: "Building with best practices and modern technologies",
                icon: <FiCode className="w-6 h-6" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "04",
                title: "Launch",
                description: "Deployment with testing, optimization, and ongoing support",
                icon: <FiSend className="w-6 h-6" />,
                color: "from-orange-500 to-red-500"
              }
            ].map((phase, index) => (
              <div 
                key={index} 
                className="relative group"
              >
                {/* Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${phase.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                      {phase.icon}
                    </div>
                    <span className="text-3xl font-bold text-gray-200">{phase.step}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                {/* Arrow Connector (desktop only) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                      <FiArrowRight className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Process Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Average Timeline', value: '4-12 weeks', bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600' },
              { label: 'Team Members', value: '3-10+', bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600' },
              { label: 'Methodology', value: 'Agile', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600' },
              { label: 'Success Rate', value: '100%', bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600' }
            ].map((stat, index) => (
              <div key={index} className={`${stat.bg} rounded-xl p-4 text-center border ${stat.border}`}>
                <div className={`text-xl lg:text-2xl font-bold ${stat.text} mb-1`}>{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Enhanced Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full text-sm font-medium text-green-700 mb-6">
              <FiStar className="w-4 h-4 mr-2" />
              Why We're Different
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="gradient-text">Illusion?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart from other web development companies and makes us the perfect partner for your digital journey.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.05),transparent_50%)]"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  Leading Digital Transformation Company
                </h3>
                
                {[
                  {
                    icon: <FiUsers className="w-6 h-6" />,
                    title: "Expert Team",
                    description: "Skilled developers with expertise in latest technologies and frameworks",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: <FiAward className="w-6 h-6" />,
                    title: "Affordable Pricing",
                    description: "Competitive rates with transparent pricing and no hidden costs",
                    color: "from-green-500 to-teal-500"
                  },
                  {
                    icon: <FiClock className="w-6 h-6" />,
                    title: "Timely Delivery",
                    description: "On-time project completion with regular updates and milestone tracking",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: <FiShield className="w-6 h-6" />,
                    title: "Ongoing Support",
                    description: "Comprehensive maintenance and support services post-launch",
                    color: "from-orange-500 to-red-500"
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-8">
                {/* Technologies Grid */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiCpu className="w-6 h-6 mr-2 text-blue-600" />
                    Technologies We Master
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'React', icon: '⚛️', color: 'from-blue-400 to-cyan-600' },
                      { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-green-600' },
                      { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700' },
                      { name: 'Tailwind', icon: '🎨', color: 'from-cyan-400 to-blue-600' },
                      { name: 'JavaScript', icon: 'JS', color: 'from-yellow-400 to-orange-600' },
                      { name: 'Express', icon: '🚀', color: 'from-gray-600 to-gray-800' },
                      { name: 'Python', icon: '🐍', color: 'from-yellow-400 to-blue-600' },
                      { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-yellow-600' },
                      { name: 'Docker', icon: '🐳', color: 'from-blue-500 to-blue-700' }
                    ].map((tech, index) => (
                      <div key={index} className="text-center group">
                        <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          <span className="text-white font-bold text-xl">{tech.icon}</span>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info Card */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                  <FiMessageSquare className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
                  <p className="mb-6 opacity-90">Let's discuss how we can help transform your business digitally</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="tel:+917380497919"
                      className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                    >
                      <FiPhone className="w-5 h-5 mr-2" />
                      Call Us
                    </a>
                    <a 
                      href="mailto:info@illusion.com"
                      className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                    >
                      <FiMail className="w-5 h-5 mr-2" />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
</div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { number: '10+', label: 'Projects Completed', icon: <FiBox /> },
              { number: '10+', label: 'Happy Clients', icon: <FiUsers /> },
              { number: '98%', label: 'Client Retention', icon: <FiTrendingUp /> },
              { number: '24/7', label: 'Support Available', icon: <FiClock /> }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                <div className="flex items-center justify-center text-gray-600 mb-1">
                  {React.cloneElement(stat.icon, { className: 'w-5 h-5 mr-2' })}
                  {stat.label}
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section id="contact-section" className="relative py-24 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:80px_80px]"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-blue-300 mb-8">
              <FiTarget className="w-5 h-5 mr-2" />
              Let's Work Together
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Ready to Transform Your 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Digital Presence?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Join 50+ satisfied businesses that have transformed their digital presence with our cutting-edge solutions and expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a 
              href="tel:+917380497919"
              className="group relative bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden flex items-center"
            >
              <FiPhone className="w-6 h-6 mr-3" />
              Call Now
              <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a 
              href="mailto:info@illusion.com"
              className="group border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center"
            >
              <FiMail className="w-6 h-6 mr-3" />
              Send Email
            </a>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiPhone className="w-8 h-8" />
              </div>
              <div className="text-lg font-bold mb-1">Phone</div>
              <div className="text-blue-300">+91 73804 97919</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiMail className="w-8 h-8" />
              </div>
              <div className="text-lg font-bold mb-1">Email</div>
              <div className="text-blue-300">info@illusion.com</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiMapPin className="w-8 h-8" />
              </div>
              <div className="text-lg font-bold mb-1">Location</div>
              <div className="text-blue-300">Lucknow, India</div>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;