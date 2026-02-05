import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  
  const projects = [
    {
      id: 1,
      title: "Siddhart Tour and Travel",
      description: "Complete travel booking platform with tour packages, hotel reservations, and seamless payment integration for memorable travel experiences",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Car Rental Website",
      description: "Modern car rental platform with real-time availability, booking management, and secure payment processing for hassle-free vehicle rentals",
      tech: ["React", "Express.js", "MongoDB", "Razorpay"],
      category: "Web Development",
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Cosmetics E-Commerce",
      description: "Beautiful cosmetics online store with product catalog, shopping cart, user reviews, and integrated payment gateway for beauty enthusiasts",
      tech: ["React", "Node.js", "MongoDB", "PayPal"],
      category: "E-Commerce",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const filters = ['All Projects', 'Web Development', 'E-Commerce'];

  const filteredProjects = activeFilter === 'All Projects' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 relative overflow-hidden">
      {/* Epic Hero Section */}
      <section className="min-h-screen flex items-center relative">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-slate-100 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 mb-8 animate-fadeInUp">
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">Our Portfolio</span>
            </div>
          </div>
          
          <div className="text-center mb-20 animate-fadeInUp">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Our
              <span className="block text-blue-600">
                Projects
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Explore our portfolio of successful projects that showcase our expertise 
              <span className="font-semibold text-blue-600"> in creating innovative digital solutions</span>
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3+</div>
                <p className="text-gray-600 font-medium text-sm">Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3+</div>
                <p className="text-gray-600 font-medium text-sm">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1+</div>
                <p className="text-gray-600 font-medium text-sm">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <p className="text-gray-600 font-medium text-sm">Success Rate</p>
              </div>
            </div>
            
            <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                Explore Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 bg-white">
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fadeInUp shadow-lg"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <img 
                  src={`https://picsum.photos/400/300?random=${project.id}`}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h.01a1 1 0 100-2H5zm3 0a1 1 0 000 2h3a1 1 0 100-2H8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">Live Project</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">{project.category}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <Link 
                    to={`/project/${project.id}`}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-center text-sm"
                  >
                    View Details
                  </Link>
                  <button className="border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 text-sm">
                    Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 bg-white rounded-2xl p-12 border border-gray-200 shadow-lg animate-fadeInUp">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your <span className="text-blue-600">Next Project?</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Let's discuss how we can bring your vision to life with our expertise and creativity. 
              Every successful project starts with a great conversation.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Projects;