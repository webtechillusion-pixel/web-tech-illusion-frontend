import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCode, FiShoppingCart, FiFilter, FiArrowRight,
  FiGlobe, FiCpu, FiDatabase, FiServer, FiShield,
  FiMonitor, FiSmartphone
} from 'react-icons/fi';
import Footer from '../components/Footer';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [searchTerm,   setSearchTerm]   = useState('');

  const projects = [
    {
      id: 1, title: 'Siddhart Tour and Travel',
      description: 'Complete travel booking platform with tour packages, hotel reservations, and seamless payment integration.',
      tech: ['React', 'Node.js', 'MongoDB'], category: 'Web Development',
      icon: <FiGlobe />, status: 'Completed', duration: '3 months',
      accentColor: '#2563eb', iconBg: '#fef3c7',
      features: ['Real-time Booking', 'Payment Gateway', 'Admin Dashboard'],
      image: 'https://picsum.photos/seed/travel/600/400',
    },
    {
      id: 2, title: 'Car Rental Website',
      description: 'Modern car rental platform with real-time availability and booking management.',
      tech: ['React', 'Node.js', 'MongoDB'], category: 'Web Development',
      icon: <FiMonitor />, status: 'Completed', duration: '2 months',
      accentColor: '#059669', iconBg: '#d1fae5',
      features: ['Vehicle Management', 'Booking System'],
      image: 'https://picsum.photos/seed/car/600/400',
    },
    {
      id: 3, title: 'Cosmetics E-Commerce',
      description: 'Beautiful cosmetics online store with product catalog and shopping cart.',
      tech: ['React', 'Node.js', 'MongoDB'], category: 'E-Commerce',
      icon: <FiShoppingCart />, status: 'Completed', duration: '4 months',
      accentColor: '#db2777', iconBg: '#fce7f3',
      features: ['Product Catalog', 'Shopping Cart', 'User Reviews'],
      image: 'https://picsum.photos/seed/cosmetics/600/400',
    },
    {
      id: 4, title: 'Food Delivery App',
      description: 'On-demand food delivery platform with restaurant listings and order tracking.',
      tech: ['React Native', 'Node.js'], category: 'Mobile App',
      icon: <FiSmartphone />, status: 'In Progress', duration: '5 months',
      accentColor: '#d97706', iconBg: '#fef3c7',
      features: ['Restaurant Listings', 'Real-time Tracking'],
      image: 'https://picsum.photos/seed/food/600/400',
    },
    {
      id: 5, title: 'Healthcare Portal',
      description: 'Comprehensive healthcare management system with appointment scheduling.',
      tech: ['React', 'Python'], category: 'Web Development',
      icon: <FiShield />, status: 'Completed', duration: '6 months',
      accentColor: '#0f766e', iconBg: '#ccfbf1',
      features: ['Appointments', 'Patient Records'],
      image: 'https://picsum.photos/seed/healthcare/600/400',
    },
    {
      id: 6, title: 'Educational Platform',
      description: 'Online learning management system with course creation and enrollment.',
      tech: ['Next.js', 'Node.js'], category: 'Web Development',
      icon: <FiCpu />, status: 'Completed', duration: '4 months',
      accentColor: '#7c3aed', iconBg: '#ede9fe',
      features: ['Course Management', 'Student Portal'],
      image: 'https://picsum.photos/seed/education/600/400',
    },
  ];

  const filters = ['All Projects', 'Web Development', 'E-Commerce', 'Mobile App'];

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = activeFilter === 'All Projects' || p.category === activeFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f3f8ff]">

      {/* ------ Hero ------ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">Our Work</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0f172a] mb-6 leading-tight">
            Our <span className="text-[#2563eb]">Projects</span>
          </h1>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successful digital solutions that showcase our expertise.
          </p>
        </div>
      </section>

      {/* ------ Grid ------ */}
      <section className="py-16 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-between mb-10">
            <div className="relative w-full lg:w-96">
              <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-[#dfeafc] rounded-xl bg-white text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors text-sm shadow-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    activeFilter === f
                      ? 'bg-[#0f172a] text-white border-[#0f172a]'
                      : 'bg-white text-[#6b7280] border-[#dfeafc] hover:border-[#2563eb] hover:text-[#0f172a]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#dfeafc] hover:border-[#2563eb] hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden" style={{ background: project.iconBg }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Completed'
                          ? 'bg-[#d1fae5] text-emerald-700'
                          : 'bg-[#fef3c7] text-amber-700'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: project.iconBg, color: project.accentColor }}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs text-[#9ca3af]">{project.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0f172a] mb-2 group-hover:text-[#2563eb] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#6b7280] text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((t, ti) => (
                      <span key={ti} className="bg-[#f3f8ff] text-[#4b5563] px-2.5 py-1 rounded-lg text-xs border border-[#dfeafc] font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center font-bold text-sm gap-1 transition-colors"
                    style={{ color: project.accentColor }}
                  >
                    View Details <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-[#edf4ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCode className="w-9 h-9 text-[#2563eb]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-2">No projects found</h3>
              <p className="text-[#6b7280] text-sm">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ------ CTA ------ */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Start Your <span className="text-[#2563eb]">Project?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10 leading-relaxed">
            Let's discuss how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="button-shine px-8 py-4 bg-[#2563eb] hover:bg-[#60a5fa] text-[#0f172a] font-bold rounded-xl transition-all text-sm"
            >
              Start Your Project
            </Link>
            <Link
              to="/case-studies"
              className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:border-[#2563eb] hover:text-[#2563eb] transition-all text-sm"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;

