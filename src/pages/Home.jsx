import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiCheckCircle, FiAward, FiTarget, FiMail, FiMapPin, FiSend, FiChevronRight, FiCode, FiSmartphone, FiShoppingCart, FiBarChart, FiCloud, FiStar, FiUsers, FiBook, FiBriefcase, FiFileText, FiGlobe, FiClock, FiSearch, FiZap, FiMessageCircle, FiDollarSign, FiTrendingUp, FiShield, FiHeart } from 'react-icons/fi';
import Footer from '../components/Footer';
import logo from '../assets/illusionlogo.jpeg';

const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const endValue = parseInt(end);
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Typewriter = ({ text, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
};

const Home = () => {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSuccess('Thank you! We will contact you within 24 hours.');
      setForm({ name: '', phone: '' });
      setLoading(false);
      setTimeout(() => setSuccess(''), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        
        {/* Background Decorations */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Brand Badge with Logo */}
              <div className="inline-flex items-center gap-4 mb-8 animate-fade-in">
                <img src={logo} alt="WebTech Illusion" className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-blue-100 animate-pulse" />
                <div className="relative">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    <span className="text-gray-900">WebTech</span>
                    <span className="text-blue-600"> Illusion</span>
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    <span className="text-sm text-gray-500 font-medium">Creating Digital Excellence</span>
                  </div>
                </div>
              </div>

              {/* Main Heading with Typewriter */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                <Typewriter text="We Build Digital Experiences That Matter" delay={300} className="bg-gradient-to-r from-gray-900 via-blue-700 to-purple-600 bg-clip-text text-transparent" />
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                Transform your ideas into powerful digital solutions. We deliver consulting-led and AI-powered technology services that drive meaningful transformation.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5">
                  Start Your Project
                  <FiArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/projects" className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all">
                  View Our Work
                  <FiArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-8">
                <div className="flex -space-x-3">
                  {['bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-pink-500'].map((color, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(j => <FiStar key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-sm text-gray-500">5.0 Rating from clients</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square">
                {/* Main Card with Dashboard Mockup */}
                <div className="absolute top-0 right-0 w-[85%] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl shadow-blue-900/30 p-6 overflow-hidden">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 mx-4 h-6 bg-gray-700 rounded-md"></div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white">
                        <p className="text-xs opacity-80">Revenue</p>
                        <p className="text-lg font-bold">$45K</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white">
                        <p className="text-xs opacity-80">Users</p>
                        <p className="text-lg font-bold">2.4K</p>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-3 text-white">
                        <p className="text-xs opacity-80">Growth</p>
                        <p className="text-lg font-bold">+24%</p>
                      </div>
                    </div>
                    
                    {/* Chart Placeholder */}
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="flex items-end justify-between h-24 gap-2">
                        <div className="flex-1 bg-blue-500/60 rounded-t" style={{height: '60%'}}></div>
                        <div className="flex-1 bg-blue-500/60 rounded-t" style={{height: '80%'}}></div>
                        <div className="flex-1 bg-blue-500/60 rounded-t" style={{height: '45%'}}></div>
                        <div className="flex-1 bg-blue-500/60 rounded-t" style={{height: '90%'}}></div>
                        <div className="flex-1 bg-blue-500/60 rounded-t" style={{height: '70%'}}></div>
                        <div className="flex-1 bg-blue-500/60 rounded-t" style={{height: '95%'}}></div>
                        <div className="flex-1 bg-blue-500/60 rounded-t" style={{height: '75%'}}></div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span>New order received</span>
                        <span className="ml-auto">2m ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>User signup completed</span>
                        <span className="ml-auto">5m ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute bottom-8 left-0 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-bounce" style={{animationDuration: '3s'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                      <FiCheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Project Delivered</p>
                      <p className="text-xs text-gray-500">Successfully</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-16 -left-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <FiCode className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">10+ Projects</p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-24 right-4 bg-white rounded-2xl shadow-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                      <FiAward className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">5.0 Rating</p>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(j => <FiStar key={j} className="w-2 h-2 text-yellow-400 fill-yellow-400" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Website</h2>
            <p className="text-gray-600">Navigate through all our pages to discover what we offer</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { title: 'About Us', path: '/about', icon: <FiGlobe className="w-6 h-6" />, desc: 'Learn our story', color: 'from-blue-500 to-blue-600' },
              { title: 'Services', path: '/services', icon: <FiCode className="w-6 h-6" />, desc: 'What we do', color: 'from-purple-500 to-purple-600' },
              { title: 'Projects', path: '/projects', icon: <FiBriefcase className="w-6 h-6" />, desc: 'Our work', color: 'from-cyan-500 to-cyan-600' },
              { title: 'Industries', path: '/industries', icon: <FiGlobe className="w-6 h-6" />, desc: 'Sectors we serve', color: 'from-teal-500 to-teal-600' },
              { title: 'Team', path: '/team', icon: <FiUsers className="w-6 h-6" />, desc: 'Meet experts', color: 'from-pink-500 to-pink-600' },
              { title: 'Blog', path: '/blog', icon: <FiBook className="w-6 h-6" />, desc: 'Latest insights', color: 'from-orange-500 to-orange-600' },
              { title: 'Case Studies', path: '/case-studies', icon: <FiFileText className="w-6 h-6" />, desc: 'Success stories', color: 'from-green-500 to-green-600' },
              { title: 'Careers', path: '/careers', icon: <FiBriefcase className="w-6 h-6" />, desc: 'Join us', color: 'from-red-500 to-red-600' },
              { title: 'Contact', path: '/contact', icon: <FiMail className="w-6 h-6" />, desc: 'Get in touch', color: 'from-indigo-500 to-indigo-600' },
              { title: 'Documentation', path: '/documentation', icon: <FiFileText className="w-6 h-6" />, desc: 'Tech resources', color: 'from-gray-500 to-gray-600' },
            ].map((page, i) => (
              <Link key={i} to={page.path} className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 bg-gradient-to-br ${page.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {page.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{page.title}</h3>
                <p className="text-sm text-gray-500">{page.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Clean Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              End-to-End <span className="text-blue-600">Digital Solutions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive technology services designed to help you thrive in the digital economy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FiCode className="w-8 h-8" />, title: 'Web Development', desc: 'Custom websites and web applications built with cutting-edge technologies.', gradient: 'from-blue-500 to-blue-700' },
              { icon: <FiSmartphone className="w-8 h-8" />, title: 'Mobile Solutions', desc: 'Native and cross-platform apps for iOS and Android devices.', gradient: 'from-cyan-500 to-cyan-700' },
              { icon: <FiShoppingCart className="w-8 h-8" />, title: 'E-Commerce', desc: 'Complete online store solutions with secure payment integration.', gradient: 'from-teal-500 to-teal-700' },
              { icon: <FiBarChart className="w-8 h-8" />, title: 'Digital Marketing', desc: 'Strategic SEO, social media, and content marketing solutions.', gradient: 'from-green-500 to-green-700' },
              { icon: <FiCloud className="w-8 h-8" />, title: 'Cloud Services', desc: 'Scalable cloud infrastructure and DevOps services.', gradient: 'from-purple-500 to-purple-700' },
              { icon: <FiAward className="w-8 h-8" />, title: 'Quality & Testing', desc: 'Comprehensive security audits and quality assurance.', gradient: 'from-pink-500 to-pink-700' },
            ].map((s, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${s.gradient} rounded-xl flex items-center justify-center text-white mb-6`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 mb-4">{s.desc}</p>
                <Link to="/services" className="inline-flex items-center text-blue-600 font-medium text-sm">
                  Learn More <FiChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 10, label: 'Projects Delivered', suffix: '+' },
              { value: 20, label: 'Happy Clients', suffix: '+' },
              { value: 98, label: 'Success Rate', suffix: '%' },
              { value: 1, label: 'Years Experience', suffix: '+' }
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"><Counter end={s.value} suffix={s.suffix} /></div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-blue-600">WebTech Illusion?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine deep expertise with cutting-edge technology to deliver transformative solutions.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality' },
                  { title: 'Premium Quality', desc: 'Enterprise-grade solutions at competitive prices' },
                  { title: 'Expert Team', desc: 'Skilled developers with years of experience' },
                  { title: '24/7 Support', desc: 'Round-the-clock assistance for your needs' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Technologies We Master</h3>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { name: 'React', icon: '⚛️' },
                  { name: 'Node.js', icon: '🟢' },
                  { name: 'MongoDB', icon: '🍃' },
                  { name: 'AWS', icon: '☁️' },
                  { name: 'Python', icon: '🐍' },
                  { name: 'Docker', icon: '🐳' }
                ].map((t, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <div className="text-xs font-medium">{t.name}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h4 className="font-bold mb-2">Ready to Start?</h4>
                <p className="text-sm text-gray-300 mb-4">Get a free consultation and project estimate</p>
                <div className="flex gap-3">
                  <a href="tel:+917380497919" className="flex-1 py-3 bg-white text-gray-900 rounded-lg font-semibold text-center hover:bg-gray-100">
                    Call Now
                  </a>
                  <Link to="/contact" className="flex-1 py-3 bg-blue-600 rounded-lg font-semibold text-center hover:bg-blue-700">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How We <span className="text-blue-400">Work</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Our streamlined process ensures your project is delivered on time with exceptional quality</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', icon: <FiMessageCircle className="w-8 h-8" />, title: 'Discovery', desc: 'We discuss your requirements, goals, and vision to understand your needs completely.', color: 'from-blue-500 to-blue-600' },
              { step: '02', icon: <FiSearch className="w-8 h-8" />, title: 'Planning', desc: 'Our team creates detailed wireframes, mockups, and project roadmap.', color: 'from-purple-500 to-purple-600' },
              { step: '03', icon: <FiCode className="w-8 h-8" />, title: 'Development', desc: 'We build your solution using cutting-edge technologies and agile methodology.', color: 'from-cyan-500 to-cyan-600' },
              { step: '04', icon: <FiZap className="w-8 h-8" />, title: 'Delivery', desc: 'After rigorous testing, we launch your project and provide ongoing support.', color: 'from-green-500 to-green-600' },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full">
                  <div className="text-6xl font-bold text-gray-700 absolute top-4 right-4">{item.step}</div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2"><FiArrowRight className="w-8 h-8 text-gray-600" /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients & Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trusted by <span className="text-blue-600">Industry Leaders</span></h2>
            <p className="text-gray-600 text-lg">We've had the privilege of working with amazing businesses across various sectors</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {['TechCorp', 'StartupX', 'MediaHub', 'EduLearn', 'HealthPlus', 'RetailMax'].map((brand, i) => (
              <div key={i} className="flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                <div className="w-24 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold text-sm">
                  {brand}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked <span className="text-blue-600">Questions</span></h2>
            <p className="text-gray-600 text-lg">Find answers to common questions about our services</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'How long does it take to build a website?', a: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex e-commerce or custom solutions may take 2-3 months. We provide detailed timelines during the planning phase.' },
              { q: 'What technologies do you use?', a: 'We work with modern technologies including React, Node.js, Python, MongoDB, AWS, and more. We choose the best tech stack based on your specific project requirements.' },
              { q: 'Do you provide post-launch support?', a: 'Yes! We offer comprehensive post-launch support including bug fixes, updates, security monitoring, and feature enhancements. We also offer maintenance packages tailored to your needs.' },
              { q: 'Can you work with existing projects?', a: 'Absolutely! We regularly take over and improve existing projects. We can audit your current setup, identify issues, and implement improvements or new features.' },
              { q: 'What is your pricing model?', a: 'We offer flexible pricing based on project scope. We provide detailed quotes after understanding your requirements. Our goal is to deliver maximum value within your budget.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-bold text-gray-900">{faq.q}</span>
                  <span className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                    <FiChevronRight className="w-5 h-5 text-blue-600" />
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all">
              Contact Us <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-yellow-500">Clients Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Travel Business Owner', content: 'WebTech Illusion created an amazing website. Professional team and excellent results!' },
              { name: 'Priya Sharma', role: 'Car Rental Service', content: 'Our online bookings increased by 200%. Highly recommended!' },
              { name: 'Amit Patel', role: 'Cosmetics Store Owner', content: 'The e-commerce solution they built is fantastic. Sales doubled!' }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(j => <FiStar key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{t.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FiTarget className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Build Your <span className="text-blue-600">Dream Website?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Let's discuss your project and create something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="tel:+917380497919" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
              <FiPhone className="w-5 h-5" />
              Call Now
            </a>
            <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              Get Free Consultation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <FiPhone className="w-6 h-6" />, label: 'Phone', value: '+91 73804 97919' },
              { icon: <FiMail className="w-6 h-6" />, label: 'Email', value: 'info@webtechillusion.com' },
              { icon: <FiMapPin className="w-6 h-6" />, label: 'Location', value: 'Lucknow, India' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600">
                  {item.icon}
                </div>
                <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                <div className="font-semibold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiClock className="w-7 h-7" />, title: 'Fast Delivery', desc: 'Quick turnaround times without compromising quality' },
              { icon: <FiDollarSign className="w-7 h-7" />, title: 'Affordable Pricing', desc: 'Competitive rates for enterprise-quality work' },
              { icon: <FiShield className="w-7 h-7" />, title: '100% Secure', desc: 'Your data and projects are fully protected' },
              { icon: <FiHeart className="w-7 h-7" />, title: 'Satisfaction Guaranteed', desc: 'We ensure you are happy with the results' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
          <p className="text-gray-400 mb-8">Get the latest insights, tips, and updates delivered to your inbox</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">No spam, unsubscribe anytime</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-50 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Get Free Consultation</h2>
              <p className="text-gray-600 text-center mb-10">Fill the form below and we'll get back to you within 24 hours</p>

              {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center font-medium text-green-700">{success}</div>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your Name" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Phone Number" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiSend className="w-5 h-5" />
                      Get Free Consultation
                    </span>
                  )}
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6">Or call: <a href="tel:+917380497919" className="text-blue-600 font-semibold hover:underline">+91 73804 97919</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a href="https://wa.me/917380497919" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
        </a>
        <a href="tel:+917380497919" className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all hover:scale-110">
          <FiPhone className="w-7 h-7 text-white" />
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
