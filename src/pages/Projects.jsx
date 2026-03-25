import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiShoppingCart, FiExternalLink, FiFilter, FiUsers, FiClock, FiAward, FiGithub, FiGlobe, FiCpu, FiDatabase, FiServer, FiShield, FiMonitor, FiSmartphone, FiCloud, FiBox, FiTarget, FiStar, FiCheckCircle, FiArrowRight, FiGrid, FiList, FiEye } from 'react-icons/fi';
import Footer from '../components/Footer';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    { id: 1, title: "Siddhart Tour and Travel", description: "Complete travel booking platform with tour packages, hotel reservations, and seamless payment integration.", tech: ["React", "Node.js", "MongoDB"], category: "Web Development", gradient: "from-blue-500 to-blue-700", icon: <FiGlobe />, status: "Completed", duration: "3 months", clientUrl: null, githubUrl: null, features: ["Real-time Booking", "Payment Gateway", "Admin Dashboard"], image: "https://picsum.photos/seed/travel/600/400" },
    { id: 2, title: "Car Rental Website", description: "Modern car rental platform with real-time availability and booking management.", tech: ["React", "Node.js", "MongoDB"], category: "Web Development", gradient: "from-green-500 to-green-700", icon: <FiMonitor />, status: "Completed", duration: "2 months", clientUrl: null, githubUrl: null, features: ["Vehicle Management", "Booking System"], image: "https://picsum.photos/seed/car/600/400" },
    { id: 3, title: "Cosmetics E-Commerce", description: "Beautiful cosmetics online store with product catalog and shopping cart.", tech: ["React", "Node.js", "MongoDB"], category: "E-Commerce", gradient: "from-pink-500 to-pink-700", icon: <FiShoppingCart />, status: "Completed", duration: "4 months", clientUrl: null, githubUrl: null, features: ["Product Catalog", "Shopping Cart", "User Reviews"], image: "https://picsum.photos/seed/cosmetics/600/400" },
    { id: 4, title: "Food Delivery App", description: "On-demand food delivery platform with restaurant listings and order tracking.", tech: ["React Native", "Node.js"], category: "Mobile App", gradient: "from-orange-500 to-orange-700", icon: <FiSmartphone />, status: "In Progress", duration: "5 months", clientUrl: null, githubUrl: null, features: ["Restaurant Listings", "Real-time Tracking"], image: "https://picsum.photos/seed/food/600/400" },
    { id: 5, title: "Healthcare Portal", description: "Comprehensive healthcare management system with appointment scheduling.", tech: ["React", "Python"], category: "Web Development", gradient: "from-teal-500 to-teal-700", icon: <FiShield />, status: "Completed", duration: "6 months", clientUrl: null, githubUrl: null, features: ["Appointments", "Patient Records"], image: "https://picsum.photos/seed/healthcare/600/400" },
    { id: 6, title: "Educational Platform", description: "Online learning management system with course creation and enrollment.", tech: ["Next.js", "Node.js"], category: "Web Development", gradient: "from-indigo-500 to-indigo-700", icon: <FiCpu />, status: "Completed", duration: "4 months", clientUrl: null, githubUrl: null, features: ["Course Management", "Student Portal"], image: "https://picsum.photos/seed/education/600/400" }
  ];

  const filters = ['All Projects', 'Web Development', 'E-Commerce', 'Mobile App'];
  const techIcons = { 'React': <FiCode className="w-4 h-4" />, 'Node.js': <FiServer className="w-4 h-4" />, 'MongoDB': <FiDatabase className="w-4 h-4" />, 'Next.js': <FiGlobe className="w-4 h-4" />, 'Python': <FiCpu className="w-4 h-4" />, 'React Native': <FiSmartphone className="w-4 h-4" /> };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'All Projects' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful digital solutions that showcase our expertise.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative w-full lg:w-96">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
            </div>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
                <div className="relative h-48 bg-gradient-to-br ${project.gradient}">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{project.category}</span>
                    <span className="text-xs text-gray-500">{project.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{tech}</span>
                    ))}
                  </div>
                  <Link to={`/project/${project.id}`} className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    View Details <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-10">Let's discuss how we can help bring your vision to life.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">Start Your Project</Link>
            <Link to="/case-studies" className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all">View Case Studies</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;