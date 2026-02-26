import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiCode, 
  FiShoppingCart, 
  FiExternalLink, 
  FiFilter, 
  FiTrendingUp, 
  FiUsers, 
  FiClock, 
  FiAward,
  FiGithub,
  FiGlobe,
  FiCpu,
  FiDatabase,
  FiServer,
  FiShield,
  FiZap,
  FiMonitor,
  FiSmartphone,
  FiCloud,
  FiLayers,
  FiBox,
  FiPackage,
  FiTarget,
  // FiRocket,
  FiStar,
  FiCheckCircle,
  FiArrowRight,
  FiGrid,
  FiList,
  FiEye
} from 'react-icons/fi';
import Footer from '../components/Footer';
import LazyLoad from '../components/LazyLoad';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Siddhart Tour and Travel",
      description: "Complete travel booking platform with tour packages, hotel reservations, and seamless payment integration for memorable travel experiences",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development",
      gradient: "from-blue-500 to-purple-600",
      icon: <FiGlobe />,
      status: "Completed",
      duration: "3 months",
      clientUrl: "https://siddhart-tour.example.com",
      githubUrl: "https://github.com/example/siddhart-tour",
      features: ["Real-time Booking", "Payment Gateway", "Admin Dashboard", "Responsive Design"],
      image: "https://picsum.photos/seed/travel/600/400"
    },
    {
      id: 2,
      title: "Car Rental Website",
      description: "Modern car rental platform with real-time availability, booking management, and secure payment processing for hassle-free vehicle rentals",
      tech: ["React", "Express.js", "MongoDB", "Razorpay"],
      category: "Web Development",
      gradient: "from-green-500 to-teal-600",
      icon: <FiMonitor />,
      status: "Completed",
      duration: "2 months",
      clientUrl: "https://car-rental.example.com",
      githubUrl: "https://github.com/example/car-rental",
      features: ["Vehicle Management", "Real-time Availability", "Booking System", "Payment Integration"],
      image: "https://picsum.photos/seed/car/600/400"
    },
    {
      id: 3,
      title: "Cosmetics E-Commerce",
      description: "Beautiful cosmetics online store with product catalog, shopping cart, user reviews, and integrated payment gateway for beauty enthusiasts",
      tech: ["React", "Node.js", "MongoDB", "PayPal"],
      category: "E-Commerce",
      gradient: "from-purple-500 to-pink-600",
      icon: <FiShoppingCart />,
      status: "Completed",
      duration: "4 months",
      clientUrl: "https://cosmetics-store.example.com",
      githubUrl: "https://github.com/example/cosmetics",
      features: ["Product Catalog", "Shopping Cart", "User Reviews", "Inventory Management"],
      image: "https://picsum.photos/seed/cosmetics/600/400"
    },
    {
      id: 4,
      title: "Food Delivery App",
      description: "On-demand food delivery platform with restaurant listings, order tracking, and real-time delivery updates for seamless dining experience",
      tech: ["React Native", "Node.js", "PostgreSQL", "Stripe"],
      category: "Mobile App",
      gradient: "from-orange-500 to-red-600",
      icon: <FiSmartphone />,
      status: "In Progress",
      duration: "5 months",
      clientUrl: null,
      githubUrl: "https://github.com/example/food-delivery",
      features: ["Restaurant Listings", "Real-time Tracking", "Payment Gateway", "Ratings & Reviews"],
      image: "https://picsum.photos/seed/food/600/400"
    },
    {
      id: 5,
      title: "Healthcare Portal",
      description: "Comprehensive healthcare management system with appointment scheduling, patient records, and telemedicine capabilities",
      tech: ["React", "Python", "PostgreSQL", "AWS"],
      category: "Web Development",
      gradient: "from-teal-500 to-cyan-600",
      icon: <FiShield />,
      status: "Completed",
      duration: "6 months",
      clientUrl: "https://healthcare.example.com",
      githubUrl: null,
      features: ["Appointment Scheduling", "Patient Records", "Telemedicine", "Billing System"],
      image: "https://picsum.photos/seed/healthcare/600/400"
    },
    {
      id: 6,
      title: "Educational Platform",
      description: "Online learning management system with course creation, student enrollment, and progress tracking for educational institutions",
      tech: ["Next.js", "Node.js", "MongoDB", "Cloudinary"],
      category: "Web Development",
      gradient: "from-indigo-500 to-blue-600",
      icon: <FiCpu />,
      status: "Completed",
      duration: "4 months",
      clientUrl: "https://edu-platform.example.com",
      githubUrl: "https://github.com/example/edu-platform",
      features: ["Course Management", "Student Portal", "Video Streaming", "Assessment Tools"],
      image: "https://picsum.photos/seed/education/600/400"
    }
  ];

const filters = ['All Projects', 'Web Development', 'E-Commerce', 'Mobile App'];

  const techIcons = {
    'React': <FiCode className="w-4 h-4" />,
    'Node.js': <FiServer className="w-4 h-4" />,
    'MongoDB': <FiDatabase className="w-4 h-4" />,
    'Stripe': <FiShield className="w-4 h-4" />,
    'Express.js': <FiServer className="w-4 h-4" />,
    'Razorpay': <FiShield className="w-4 h-4" />,
    'PayPal': <FiShield className="w-4 h-4" />,
    'React Native': <FiSmartphone className="w-4 h-4" />,
    'PostgreSQL': <FiDatabase className="w-4 h-4" />,
    'Python': <FiCpu className="w-4 h-4" />,
    'AWS': <FiCloud className="w-4 h-4" />,
    'Next.js': <FiGlobe className="w-4 h-4" />,
    'Cloudinary': <FiCloud className="w-4 h-4" />
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'All Projects' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 relative overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-spin-slow"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_25%,rgba(59,130,246,0.02)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.02)_75%)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full mb-8 animate-fadeInUp">
              <FiCode className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">Our Portfolio</span>
            </div>
          </div>
          
          <div className="text-center mb-20 animate-fadeInUp">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Our
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Creative Projects
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-16 px-4">
              Explore our portfolio of successful <span className="font-semibold text-blue-600">innovative digital solutions</span> that showcase our expertise in transforming ideas into reality
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
              <div className="text-center group cursor-pointer">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">{projects.length}+</div>
                <div className="flex items-center justify-center text-gray-600 font-medium text-sm mb-1">
                  <FiBox className="w-4 h-4 mr-1" />
                  Projects
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="flex items-center justify-center text-gray-600 font-medium text-sm mb-1">
                  <FiUsers className="w-4 h-4 mr-1" />
                  Happy Clients
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform">100%</div>
                <div className="flex items-center justify-center text-gray-600 font-medium text-sm mb-1">
                  <FiAward className="w-4 h-4 mr-1" />
                  Success Rate
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <button 
                onClick={() => window.scrollTo({ top: document.getElementById('projects-grid').offsetTop - 80, behavior: 'smooth' })}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <FiEye className="w-5 h-5 mr-2" />
                Explore Portfolio
                <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link 
                to="/contact"
                className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FiTarget className="w-5 h-5 mr-2" />
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* Enhanced Projects Section */}
      <section id="projects-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Search and Filter Controls */}
        <div className="mb-12 animate-fadeInUp">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`group px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {filter === 'All Projects' && <FiBox className="w-4 h-4 mr-2" />}
                {filter === 'Web Development' && <FiCode className="w-4 h-4 mr-2" />}
                {filter === 'E-Commerce' && <FiShoppingCart className="w-4 h-4 mr-2" />}
                {filter === 'Mobile App' && <FiSmartphone className="w-4 h-4 mr-2" />}
                {filter}
                {activeFilter === filter && (
                  <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3' : 'space-y-6'} gap-8`}>
          {filteredProjects.map((project, index) => (
            <LazyLoad key={project.id} threshold={0.1}>
              <div 
                className={`group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fadeInUp border border-gray-100 ${
                  hoveredProject === project.id ? 'transform scale-105' : ''
                } ${viewMode === 'list' ? 'flex flex-col lg:flex-row' : ''}`}
                style={{animationDelay: `${index * 0.1}s`}}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Header with Gradient Border */}
                <div className={`relative ${viewMode === 'list' ? 'lg:w-1/3' : 'h-48'} bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <img 
                    src={project.image}
                    alt={project.title}
                    className={`w-full ${viewMode === 'list' ? 'h-full' : 'h-48'} object-cover opacity-90 group-hover:scale-110 transition-transform duration-500`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Completed' 
                        ? 'bg-green-500/90 text-white' 
                        : 'bg-yellow-500/90 text-white'
                    } backdrop-blur-sm`}>
                      {project.status === 'Completed' ? (
                        <><FiCheckCircle className="inline w-3 h-3 mr-1" /> Completed</>
                      ) : (
                        <><FiClock className="inline w-3 h-3 mr-1" /> In Progress</>
                      )}
                    </span>
                  </div>

                  {/* Project Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                      {project.icon}
                    </div>
                  </div>
                </div>
              
                {/* Project Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'lg:w-2/3' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <FiClock className="w-3 h-3 mr-1" />
                      {project.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors flex items-center">
                    {project.title}
                    <FiExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 2 && (
                        <span className="text-xs text-gray-500 italic">+{project.features.length - 2} more</span>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 flex items-center">
                          {techIcons[tech] || <FiCode className="w-3 h-3 mr-1" />}
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link 
                      to={`/project/${project.id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm group"
                    >
                      <FiEye className="w-4 h-4 mr-2" />
                      View Details
                      <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    {project.clientUrl && (
                      <a 
                        href={project.clientUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center text-sm"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-gray-600 text-gray-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center text-sm"
                      >
                        <FiGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
              </div>
            </LazyLoad>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 animate-fadeInUp">
            <div className="text-6xl mb-4 text-gray-300">
              <FiSearch className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria to find more projects.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('All Projects');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Enhanced CTA Section */}
        <div className="mt-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center relative overflow-hidden animate-fadeInUp">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="relative z-10">
            <FiGlobe  className="w-16 h-16 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="text-yellow-300">Next Project?</span>
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Let's discuss how we can bring your vision to life with our expertise and creativity. 
              Every successful project starts with a great conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
              >
                <FiTarget className="w-5 h-5 mr-2" />
                Start Your Project
                <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                <FiAward className="w-5 h-5 mr-2" />
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Projects;