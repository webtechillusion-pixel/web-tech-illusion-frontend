import React, { useState, useRef, useEffect } from 'react';
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
  FiPlay,
  FiArrowRight,
  FiExternalLink,
  FiShoppingCart,
  FiNavigation,
  // FiLightbulb ,

  FiFileText


} from 'react-icons/fi';
import Footer from '../components/Footer';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('mission');
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(6,182,212,0.03)_30%,rgba(6,182,212,0.03)_60%,transparent_60%)] bg-[length:40px_40px] animate-float"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-glow"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-spin-slow"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-8 animate-fadeInUp">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <FiAward className="w-5 h-5 mr-2" />
                About Our Company
                <div className="w-3 h-3 bg-green-400 rounded-full ml-3 animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                Transforming Ideas Into
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient-shift">
                  Digital Excellence
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                We are a passionate team of <span className="font-semibold text-blue-400">innovative developers</span> and <span className="font-semibold text-purple-400">creative designers</span> dedicated to building digital solutions that transform businesses and exceed expectations.
              </p>
              
              <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto mb-12 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">1+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide mb-1">Years</div>
                  <div className="text-xs text-gray-500">Experience</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-2 group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">10+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide mb-1">Projects</div>
                  <div className="text-xs text-gray-500">Delivered</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-2 group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">10+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide mb-1">Happy</div>
                  <div className="text-xs text-gray-500">Clients</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                <button 
                  onClick={() => window.scrollTo({ top: document.getElementById('our-story').offsetTop - 80, behavior: 'smooth' })}
                  className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <FiPlay className="w-5 h-5 mr-2" />
                    Discover Our Story
                    <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: document.getElementById('contact-section').offsetTop - 80, behavior: 'smooth' })}
                  className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center"
                >
                  <FiMessageSquare className="w-5 h-5 mr-2" />
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Enhanced Story Section */}
      <section id="our-story" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.03),transparent_50%)]"></div>
          
          <div className="relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 mb-6">
                <FiBookOpen className="w-4 h-4 mr-2" />
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a small startup to a leading digital agency, our journey has been defined by innovation, passion, and client success.
              </p>
            </div>

            {/* Mission/Vision Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'mission', label: 'Our Mission', icon: <FiTarget className="w-4 h-4" /> },
                { id: 'vision', label: 'Our Vision', icon: <FiFileText className="w-4 h-4" /> },
                { id: 'values', label: 'Our Values', icon: <FiHeart className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="space-y-6">
                {activeTab === 'mission' && (
                  <div className="animate-fadeInUp">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiTarget className="w-8 h-8 mr-3 text-blue-600" />
                      Our Mission
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                      Founded with a vision to bridge the gap between imagination and reality, Illusion has been at the forefront of digital innovation. We believe that every great project starts with a dream, and our mission is to make those dreams come true through cutting-edge technology and creative solutions.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Our team combines years of experience in web development, design, and digital strategy to deliver solutions that not only meet but exceed our clients' expectations.
                    </p>
                  </div>
                )}

                {activeTab === 'vision' && (
                  <div className="animate-fadeInUp">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiLightbulb className="w-8 h-8 mr-3 text-yellow-500" />
                      Our Vision
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                      To be the leading digital transformation partner for businesses worldwide, creating innovative solutions that drive growth, enhance user experiences, and set new standards in digital excellence.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      We envision a future where technology seamlessly integrates with business processes, enabling organizations to reach their full potential and create meaningful impact in their industries.
                    </p>
                  </div>
                )}

                {activeTab === 'values' && (
                  <div className="animate-fadeInUp">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <FiHeart className="w-8 h-8 mr-3 text-red-500" />
                      Our Core Values
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                      Our values guide everything we do - from how we treat our clients to how we develop our solutions. They are the foundation of our success and the reason clients trust us with their most important projects.
                    </p>
                    <div className="space-y-3">
                      {['Innovation', 'Quality', 'Integrity', 'Collaboration'].map((value, index) => (
                        <div key={index} className="flex items-center">
                          <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="font-semibold text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className={`relative rounded-2xl h-96 overflow-hidden shadow-2xl group ${
                  activeTab === 'mission' ? 'bg-gradient-to-br from-blue-600 to-cyan-600' :
                  activeTab === 'vision' ? 'bg-gradient-to-br from-purple-600 to-pink-600' :
                  'bg-gradient-to-br from-green-600 to-teal-600'
                }`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                  
                  {/* Animated Content */}
                  <div className="relative h-full flex items-center justify-center text-white p-8">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                      {activeTab === 'mission' && (
                        <>
                          <FiTarget className="w-20 h-20 mx-auto mb-6 animate-pulse" />
                          <div className="text-3xl md:text-4xl font-bold mb-4">Digital Excellence</div>
                          <p className="text-lg opacity-90 max-w-md">Transforming ideas into powerful digital solutions</p>
                        </>
                      )}
                      {activeTab === 'vision' && (
                        <>
                          <FiLightbulb className="w-20 h-20 mx-auto mb-6 animate-bounce" />
                          <div className="text-3xl md:text-4xl font-bold mb-4">Innovation First</div>
                          <p className="text-lg opacity-90 max-w-md">Leading the future of digital transformation</p>
                        </>
                      )}
                      {activeTab === 'values' && (
                        <>
                          <FiHeart className="w-20 h-20 mx-auto mb-6 animate-pulse" />
                          <div className="text-3xl md:text-4xl font-bold mb-4">Trust & Quality</div>
                          <p className="text-lg opacity-90 max-w-md">Building lasting partnerships through excellence</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float"></div>
                  <div className="absolute bottom-10 left-10 w-12 h-12 bg-white/10 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { number: '24/7', label: 'Support', icon: <FiClock className="w-4 h-4" /> },
                    { number: '100%', label: 'Satisfaction', icon: <FiAward className="w-4 h-4" /> },
                    { number: 'A+', label: 'Quality', icon: <FiStar className="w-4 h-4" /> }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-blue-600 mb-2 flex justify-center">{stat.icon}</div>
                      <div className="text-xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
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

{/* Enhanced Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_25%,rgba(59,130,246,0.02)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.02)_75%)] bg-[length:60px_60px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 mb-6">
              <FiGitBranch className="w-4 h-4 mr-2" />
              Our Methodology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Development <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to ensure your project is delivered with excellence, on time, and within budget.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 rounded-full"></div>
            
            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Discovery & Analysis",
                  description: "Understanding your business requirements, target audience, and project goals through detailed consultation and research.",
                  icon: <FiTarget className="w-6 h-6" />,
                  color: "from-blue-500 to-cyan-500",
                  details: ["Business Analysis", "User Research", "Requirements Gathering", "Technical Assessment"]
                },
                {
                  step: "02",
                  title: "Planning & Design",
                  description: "Creating detailed project roadmap, wireframes, and technical specifications for optimal results.",
                  icon: <FiNavigation className="w-6 h-6" />,
                  color: "from-green-500 to-teal-500",
                  details: ["UI/UX Design", "Architecture Planning", "Technology Stack", "Project Timeline"]
                },
                {
                  step: "03",
                  title: "Development & Testing",
                  description: "Building your solution using best practices, modern technologies, and agile development methodology.",
                  icon: <FiCode className="w-6 h-6" />,
                  color: "from-purple-500 to-pink-500",
                  details: ["Agile Development", "Code Reviews", "Automated Testing", "Quality Assurance"]
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description: "Deploying your project with thorough testing, optimization, and ongoing support for success.",
                  icon: <FiSend className="w-6 h-6" />,
                  color: "from-orange-500 to-red-500",
                  details: ["Deployment Strategy", "Performance Optimization", "Monitoring", "24/7 Support"]
                }
              ].map((phase, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} animate-fadeInUp`} style={{animationDelay: `${index * 0.15}s`}}>
                  {/* Timeline Node */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-4 border-blue-500 rounded-full shadow-lg z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{phase.step}</span>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group hover:scale-105">
                      <div className={`inline-flex items-center w-12 h-12 bg-gradient-to-br ${phase.color} rounded-xl text-white font-bold text-lg mb-6 ${index % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                        {phase.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {phase.description}
                      </p>
                      
                      {/* Process Details */}
                      <div className={`grid grid-cols-2 gap-3 ${index % 2 === 0 ? 'lg:ml-auto lg:w-4/5' : ''}`}>
                        {phase.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <FiCheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Timeline Node */}
                  <div className="lg:hidden flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold shadow-lg mx-4">
                    {phase.step}
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
              { icon: <FiClock />, label: 'Average Timeline', value: '4-12 weeks', color: 'from-blue-500 to-cyan-500' },
              { icon: <FiUsers />, label: 'Team Members', value: '3-10 specialists', color: 'from-green-500 to-teal-500' },
              { icon: <FiGitBranch />, label: 'Sprints', value: 'Agile Methodology', color: 'from-purple-500 to-pink-500' },
              { icon: <FiAward />, label: 'Success Rate', value: '100%', color: 'from-orange-500 to-red-500' }
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