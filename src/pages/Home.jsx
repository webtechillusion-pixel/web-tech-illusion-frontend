import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiPhone, FiCheckCircle, FiAward, FiTarget,
  FiMail, FiMapPin, FiSend, FiChevronRight, FiCode, FiSmartphone,
  FiShoppingCart, FiBarChart, FiCloud, FiStar, FiUsers, FiBook,
  FiBriefcase, FiFileText, FiGlobe, FiClock, FiSearch, FiZap,
  FiMessageCircle, FiDollarSign, FiTrendingUp, FiShield, FiHeart,
  FiCheck, FiCpu, FiLayers, FiActivity, FiServer, FiLock,
  FiExternalLink, FiSliders, FiArrowUp, FiBell
} from 'react-icons/fi';
import Footer from '../components/Footer';
import logo from '../assets/illusionlogo.jpeg';
import apiConfig from '../config/api';

/* â”€â”€â”€ Animated Counter â”€â”€â”€ */
const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const endValue = parseInt(end, 10);
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

/* â”€â”€â”€ Typewriter â”€â”€â”€ */
const Typewriter = ({ words, delay = 1500, typingSpeed = 80, className = '' }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex % words.length];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText === word) setTimeout(() => setIsDeleting(true), delay);
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay, typingSpeed]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-[#2563eb]">|</span>
    </span>
  );
};

const techLogos = [
  { name: 'React 19',     tag: 'Frontend',       color: '#0ea5e9' },
  { name: 'Next.js',      tag: 'Full-Stack',      color: '#0f172a' },
  { name: 'Node.js',      tag: 'Backend',         color: '#16a34a' },
  { name: 'Python',       tag: 'AI & Data',       color: '#ca8a04' },
  { name: 'TypeScript',   tag: 'Language',        color: '#2563eb' },
  { name: 'MongoDB',      tag: 'Database',        color: '#15803d' },
  { name: 'AWS Cloud',    tag: 'DevOps',          color: '#ea580c' },
  { name: 'Docker',       tag: 'Containers',      color: '#0284c7' },
  { name: 'Tailwind CSS', tag: 'UI Styling',      color: '#0d9488' },
  { name: 'OpenAI API',   tag: 'Generative AI',   color: '#7c3aed' },
  { name: 'PostgreSQL',   tag: 'Relational DB',   color: '#4338ca' },
  { name: 'FastAPI',      tag: 'High-Perf API',   color: '#059669' },
];

/* â”€â”€â”€ Main Component â”€â”€â”€ */
const Home = () => {
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', service: 'web-development', budget: 'flexible', message: ''
  });
  const [submitting, setSubmitting]       = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError]     = useState('');

  const [selectedProjectType, setSelectedProjectType] = useState('web-app');
  const [selectedFeatures, setSelectedFeatures]       = useState(['auth', 'dashboard', 'seo']);
  const [selectedTimeline, setSelectedTimeline]       = useState('standard');
  const [activeWorkFilter, setActiveWorkFilter]       = useState('all');
  const [openFaq, setOpenFaq]                         = useState(0);
  const [showScrollTop, setShowScrollTop]             = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToConsultation = () => {
    document.getElementById('consultation-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess('');
    setSubmitError('');
    try {
      const response = await fetch(apiConfig.endpoints.contact.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to submit.');
      setSubmitSuccess('Thank you! Your consultation request has been received. An engineering lead will contact you within 2â€“4 hours.');
      setContactForm({ name: '', email: '', phone: '', service: 'web-development', budget: 'flexible', message: '' });
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try calling us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFeature = (id) =>
    setSelectedFeatures((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const estimatorProjects = {
    'web-app':    { name: 'Custom SaaS & Web Application',     baseWeeks: 3, baseBudget: '$1,200 â€“ $3,500' },
    'mobile-app': { name: 'iOS & Android Mobile App',          baseWeeks: 4, baseBudget: '$2,000 â€“ $5,000' },
    'ecommerce':  { name: 'High-Conversion E-Commerce Store',  baseWeeks: 3, baseBudget: '$1,500 â€“ $4,000' },
    'ai-solution':{ name: 'AI Workflows & LLM Integration',    baseWeeks: 3, baseBudget: '$1,800 â€“ $4,500' },
  };

  const featureOptions = [
    { id: 'auth',    label: 'User Authentication & Roles',   icon: 'ðŸ”’' },
    { id: 'payment', label: 'Stripe / Razorpay Payments',    icon: 'ðŸ’³' },
    { id: 'dashboard',label:'Custom Admin Dashboard',        icon: 'ðŸ“Š' },
    { id: 'ai',      label: 'AI Chatbot & Automation',       icon: 'ðŸ¤–' },
    { id: 'seo',     label: 'Full SEO & Social Meta Stack',  icon: 'ðŸš€' },
    { id: 'cloud',   label: 'AWS Cloud & CI/CD Pipeline',    icon: 'â˜ï¸' },
  ];

  const currentEstimator = estimatorProjects[selectedProjectType] || estimatorProjects['web-app'];

  const portfolioProjects = [
    {
      id: 1, title: 'Global Travel & Hotel Booking Engine',
      category: 'web-app', categoryLabel: 'Custom Web Platform',
      metrics: '+240% Direct Bookings', speed: '0.4s Page Load',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
      accentColor: '#2563eb',
      desc: 'High-speed reservation platform with real-time room availability, payment gateways, and multilingual search.'
    },
    {
      id: 2, title: 'Luxury Cosmetics & Beauty Marketplace',
      category: 'ecommerce', categoryLabel: 'E-Commerce Store',
      metrics: '3.1x Revenue Growth', speed: '99 Performance Score',
      tech: ['Next.js', 'Stripe', 'Tailwind', 'Redis'],
      accentColor: '#d97706',
      desc: 'Modern headless commerce platform with 1-click checkout, AI product recommendations, and mobile PWA.'
    },
    {
      id: 3, title: 'Fleet Logistics & Car Rental Engine',
      category: 'mobile-app', categoryLabel: 'Mobile & Web App',
      metrics: '+180% User Retention', speed: 'Sub-second Sync',
      tech: ['React Native', 'Node.js', 'Socket.io', 'GCP'],
      accentColor: '#059669',
      desc: 'Real-time GPS tracking, automated driver allocation, instant PDF invoice generation, and customer app.'
    },
    {
      id: 4, title: 'Enterprise AI Customer Support Copilot',
      category: 'ai-solution', categoryLabel: 'AI & Automation',
      metrics: '85% Query Resolution', speed: 'Instant LLM Stream',
      tech: ['Python', 'FastAPI', 'OpenAI', 'Pinecone'],
      accentColor: '#7c3aed',
      desc: 'Custom RAG chatbot trained on corporate knowledge bases providing 24/7 automated ticket resolution.'
    },
  ];

  const filteredProjects = activeWorkFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeWorkFilter);

  const faqs = [
    {
      q: 'How quickly can you start and what is the typical project timeline?',
      a: 'We can typically kick off within 48â€“72 hours of initial scope alignment. Standard web applications take 2â€“4 weeks, while complex full-stack platforms or multi-platform mobile apps take 4â€“8 weeks. We deliver working milestone demos every 2 weeks.'
    },
    {
      q: 'Do I get 100% full ownership of the source code and intellectual property?',
      a: 'Yes, absolutely. You retain 100% ownership of all source code, design assets, database schemas, and intellectual property. We sign strict Non-Disclosure Agreements (NDAs) prior to starting.'
    },
    {
      q: 'What modern technologies and frameworks do you use?',
      a: 'We specialise in modern, battle-tested technologies including React 19, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, TailwindCSS, Docker, AWS Cloud, and OpenAI APIs.'
    },
    {
      q: 'How do you ensure our website ranks high on Google (SEO)?',
      a: 'Every platform we build is engineered with clean semantic HTML5, sub-second Core Web Vitals, dynamic Open Graph tags, automated XML sitemaps, canonical link enforcement, and schema.org structured data built right into the foundation.'
    },
    {
      q: 'What post-launch support and maintenance do you provide?',
      a: 'We provide 30 days of complimentary post-launch support including bug fixes, performance monitoring, and team training. We also offer dedicated ongoing SLA maintenance packages covering 24/7 uptime monitoring and feature enhancements.'
    },
  ];

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <div className="min-h-screen bg-[#f3f8ff] text-[#1f2937] font-sans">

      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.14),_transparent_28%)]"></div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#60a5fa]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0f172a]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">

            <div className="pt-4 lg:pt-8">
              <div className="inline-flex items-center gap-3 mb-7 px-4 py-2 rounded-full bg-white/90 border border-[#dfeafc] shadow-[0_8px_20px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                <img src={logo} alt="WebTech Illusion" className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
                <span className="text-sm font-bold text-[#0f172a] tracking-[0.12em] uppercase">WebTech Illusion</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] lg:leading-[1.05] font-black text-[#0f172a] tracking-[-0.04em] mb-6">
                Best Software Company in Lucknow<br />
                for Website Design, Web Apps &{' '}
                <span className="inline-block text-[#2563eb]">
                  <Typewriter
                    words={['Digital Marketing', 'SEO Growth', 'Custom Software', 'Business Results']}
                    className=""
                  />
                </span>
              </h1>

              <p className="text-lg text-[#475569] leading-relaxed mb-8 max-w-xl">
                WebTech Illusion is a trusted web development company in Lucknow and digital marketing agency helping startups, local brands, and growing businesses with custom websites, mobile apps, SEO, and conversion-focused digital growth strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={scrollToConsultation}
                  className="button-shine inline-flex items-center justify-center px-7 py-4 bg-gradient-to-r from-[#0f172a] via-[#0f172a] to-[#2563eb] text-white font-bold rounded-2xl shadow-[0_16px_30px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer gap-2 text-sm"
                >
                  Start Your Project <FiArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-7 py-4 bg-white text-[#0f172a] font-bold rounded-2xl border border-[#dfeafc] shadow-[0_8px_18px_rgba(15,23,42,0.04)] hover:border-[#2563eb] hover:shadow-[0_10px_22px_rgba(37,99,235,0.12)] transition-all duration-300 gap-2 text-sm"
                >
                  See Our Work <FiChevronRight className="w-4 h-4 text-[#2563eb]" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748b]">
                <div className="flex -space-x-2">
                  {['R','P','A','S'].map((l, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0f172a] to-[#2563eb] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md">
                      {l}
                    </div>
                  ))}
                </div>
                <span>Trusted by <strong className="text-[#0f172a]">50+ businesses</strong> across India & worldwide</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 bg-gradient-to-br from-[#bfdbfe] via-transparent to-[#dbeafe] blur-3xl opacity-70 rounded-[2rem] -z-10"></div>

              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: <Counter end={150} suffix="+" />, label: 'Projects', color: '#0f172a' },
                    { value: <Counter end={50} suffix="+" />, label: 'Clients', color: '#2563eb' },
                    { value: <Counter end={5} suffix="+" />, label: 'Years', color: '#059669' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/90 rounded-2xl p-4 border border-[#dfeafc] shadow-[0_12px_24px_rgba(15,23,42,0.05)] text-center backdrop-blur-sm">
                      <div className="text-2xl sm:text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-[#64748b] font-semibold">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <FiCode className="w-5 h-5" />, title: 'Web Development', desc: 'Fast, modern websites', iconBg: '#dbeafe', iconColor: '#2563eb' },
                    { icon: <FiSmartphone className="w-5 h-5" />, title: 'Mobile Apps', desc: 'iOS & Android solutions', iconBg: '#e0f2fe', iconColor: '#0284c7' },
                    { icon: <FiShoppingCart className="w-5 h-5" />, title: 'E-Commerce', desc: 'Stores that convert', iconBg: '#d1fae5', iconColor: '#059669' },
                    { icon: <FiTrendingUp className="w-5 h-5" />, title: 'Digital Growth', desc: 'SEO & strategy', iconBg: '#eff6ff', iconColor: '#2563eb' },
                  ].map((card, i) => (
                    <div key={i} className="bg-white/90 rounded-2xl p-5 border border-[#dfeafc] shadow-[0_14px_28px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(37,99,235,0.12)] transition-all duration-300 group">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ background: card.iconBg, color: card.iconColor }}>
                        {card.icon}
                      </div>
                      <h3 className="text-sm font-bold text-[#0f172a] mb-1">{card.title}</h3>
                      <p className="text-xs text-[#64748b]">{card.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-[#0f172a] to-[#1d4ed8] rounded-2xl p-5 shadow-[0_18px_32px_rgba(29,78,216,0.24)] text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-white/70 text-[11px] uppercase tracking-[0.12em] mb-2">Client satisfaction</p>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-white">5.0</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className="w-4 h-4 text-[#bfdbfe] fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/70 text-[11px] uppercase tracking-[0.12em] mb-2">Avg. load</p>
                      <span className="text-2xl font-black text-emerald-300">0.3s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€â”€ 2. TECH STACK MARQUEE â”€â”€â”€ */}
      <section className="py-8 bg-white border-y border-[#dfeafc] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center justify-between">
          <p className="text-xs font-mono uppercase tracking-widest text-[#9ca3af]">
            Powered by Modern Technologies & Cloud Infrastructure
          </p>
          <span className="text-xs font-mono text-[#2563eb] hidden sm:inline-block">Production-Grade Ecosystem</span>
        </div>
        <div className="flex overflow-hidden relative">
          <div className="animate-marquee gap-6 py-2">
            {[...techLogos, ...techLogos].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#f3f8ff] border border-[#dfeafc] shrink-0 hover:border-[#2563eb] transition-colors"
              >
                <span className="w-2 h-2 rounded-full" style={{ background: tech.color }}></span>
                <span className="text-sm font-bold text-[#0f172a]">{tech.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#edf4ff] text-[#64748b] font-mono">{tech.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ 3. SERVICES GRID â”€â”€â”€ */}
      <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-badge">
            <FiLayers className="w-3.5 h-3.5" /> Comprehensive Capabilities
          </span>
          <div className="divider"></div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mt-2">
            End-to-End Technology <br />
            <span className="text-[#2563eb]">Built for Modern Scale</span>
          </h2>
          <p className="text-[#6b7280] text-base sm:text-lg mt-4 leading-relaxed">
            From initial concept wireframes to enterprise deployment and AI automation, we craft robust digital systems designed to outperform competitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FiCode className="w-6 h-6" />,
              title: 'Custom Web & SaaS Development',
              desc: 'High-speed, responsive, progressive web applications and enterprise platforms built with React 19, Next.js, and Node.js.',
              features: ['Sub-second page load speeds', 'Custom API & microservices', 'Modular component design systems'],
              iconBg: '#fef3c7', iconColor: '#d97706',
            },
            {
              icon: <FiSmartphone className="w-6 h-6" />,
              title: 'Mobile App Engineering',
              desc: 'Native iOS, Android, and cross-platform mobile applications engineered for high retention and seamless UX.',
              features: ['React Native & Flutter builds', 'Offline-first synchronization', 'Biometric & Push Notifications'],
              iconBg: '#dbeafe', iconColor: '#2563eb',
            },
            {
              icon: <FiCpu className="w-6 h-6" />,
              title: 'AI & Intelligent Automation',
              desc: 'Integrate LLMs, custom AI chatbots, predictive analytics, and automated data pipelines into your workflows.',
              features: ['Custom RAG Knowledge Bases', 'Automated Customer Operations', 'OpenAI & Claude LLM integration'],
              iconBg: '#ede9fe', iconColor: '#7c3aed',
            },
            {
              icon: <FiShoppingCart className="w-6 h-6" />,
              title: 'High-Conversion E-Commerce',
              desc: 'Modern online stores engineered for maximum conversions, fast checkouts, and seamless payment integration.',
              features: ['Custom checkout funnels', 'Stripe & Razorpay multi-currency', 'Inventory & ERP sync'],
              iconBg: '#fce7f3', iconColor: '#db2777',
            },
            {
              icon: <FiCloud className="w-6 h-6" />,
              title: 'Cloud Architecture & DevOps',
              desc: 'Scalable AWS, Azure, and GCP cloud infrastructure with automated CI/CD pipelines and 24/7 reliability.',
              features: ['Zero-downtime deployment', 'Docker & Kubernetes orchestration', 'Automated security monitoring'],
              iconBg: '#d1fae5', iconColor: '#059669',
            },
            {
              icon: <FiTrendingUp className="w-6 h-6" />,
              title: 'Technical SEO & Growth',
              desc: 'Full-funnel digital strategy, on-page schema optimisation, Core Web Vitals, and organic ranking growth.',
              features: ['Schema.org JSON-LD structured data', 'Performance & Speed Auditing', 'Conversion Rate Optimisation'],
              iconBg: '#fef9c3', iconColor: '#ca8a04',
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-white border border-[#dfeafc] hover:border-[#2563eb] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: service.iconBg, color: service.iconColor }}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-3">{service.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-2.5 mb-8 text-xs text-[#4b5563] font-medium">
                  {service.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]" style={{ background: service.iconBg, color: service.iconColor }}>âœ“</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center text-xs font-bold transition-colors mt-auto pt-4 border-t border-[#edf4ff]"
                style={{ color: service.iconColor }}
              >
                Explore Service Details
                <FiArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€â”€ 4. PROJECT ESTIMATOR â”€â”€â”€ */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-[#dfeafc] bg-white p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle top-right decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563eb]/5 rounded-bl-full pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-badge">âš¡ Interactive Scope Estimator</span>
            <div className="divider"></div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] mt-2">
              Estimate Your Next <span className="text-[#2563eb]">Project Scope</span>
            </h2>
            <p className="text-[#6b7280] text-sm mt-2">
              Select your requirements to instantly generate estimated timelines, architecture deliverables, and scope blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1 */}
              <div>
                <label className="block text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-3">
                  1. Select Project Archetype
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'web-app',    label: 'Web Platform / SaaS', icon: 'ðŸŒ' },
                    { id: 'mobile-app', label: 'iOS & Android App',   icon: 'ðŸ“±' },
                    { id: 'ecommerce',  label: 'E-Commerce Store',    icon: 'ðŸ›ï¸' },
                    { id: 'ai-solution',label: 'AI & Custom LLM',     icon: 'ðŸ§ ' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedProjectType(item.id)}
                      className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        selectedProjectType === item.id
                          ? 'bg-[#f3f8ff] border-[#2563eb] shadow-sm'
                          : 'bg-[#f3f8ff] border-[#dfeafc] hover:border-[#2563eb]/50'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-[#0f172a]">{item.label}</div>
                        <div className="text-[11px] text-[#9ca3af]">Production ready</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <label className="block text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-3">
                  2. Select Key Features & Modules
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featureOptions.map((feat) => {
                    const active = selectedFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleFeature(feat.id)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs font-medium transition-all cursor-pointer ${
                          active
                            ? 'bg-[#f3f8ff] border-[#2563eb] text-[#0f172a] font-bold'
                            : 'bg-[#f3f8ff] border-[#dfeafc] text-[#6b7280] hover:border-[#2563eb]/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{feat.icon}</span>
                          <span>{feat.label}</span>
                        </span>
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                          style={{ background: active ? '#2563eb' : '#dfeafc', color: active ? 'white' : 'transparent' }}
                        >âœ“</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <label className="block text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-3">
                  3. Delivery Velocity
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'express',    label: 'Express Sprint',   time: '2â€“3 Weeks' },
                    { id: 'standard',   label: 'Standard Agile',   time: '4â€“6 Weeks' },
                    { id: 'enterprise', label: 'Enterprise Scale', time: '8+ Weeks' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTimeline(t.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedTimeline === t.id
                          ? 'bg-[#f3f8ff] border-[#2563eb] shadow-sm'
                          : 'bg-[#f3f8ff] border-[#dfeafc] hover:border-[#2563eb]/50'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#0f172a]">{t.label}</div>
                      <div className="text-[11px] text-[#2563eb] mt-0.5 font-medium">{t.time}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary card */}
            <div className="lg:col-span-5 bg-[#f3f8ff] rounded-2xl border border-[#dfeafc] p-6 space-y-5">
              <div className="border-b border-[#dfeafc] pb-4">
                <span className="text-[11px] font-mono text-[#2563eb] uppercase tracking-widest">Scope Blueprint</span>
                <h3 className="text-xl font-bold text-[#0f172a] mt-1">{currentEstimator.name}</h3>
                <p className="text-xs text-[#9ca3af] mt-1">Full source code ownership + 30-day warranty included.</p>
              </div>
              <div className="space-y-3 text-xs">
                {[
                  { label: 'Included Modules',        value: `${selectedFeatures.length} Feature Pods`,  color: '#0f172a' },
                  { label: 'Development Velocity',    value: `${selectedTimeline} Pace`,               color: '#2563eb' },
                  { label: 'Architecture',             value: 'React 19 / Node / Cloud',                 color: '#059669' },
                  { label: 'SEO & Core Web Vitals',   value: 'Built-In (A+ Grade)',                     color: '#7c3aed' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-[#edf4ff]">
                    <span className="text-[#9ca3af]">{row.label}</span>
                    <span className="font-bold capitalize" style={{ color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#dfeafc] text-center">
                <p className="text-xs text-[#6b7280]">Ready to discuss details and receive a binding milestone quote?</p>
                <button
                  type="button"
                  onClick={scrollToConsultation}
                  className="w-full mt-3 py-3 bg-[#0f172a] hover:bg-[#2d2d3a] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Request Custom Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ 5. WHY CHOOSE US â”€â”€â”€ */}
      <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-badge">âš¡ The WebTech Illusion Difference</span>
            <div className="divider text-left" style={{ margin: '16px 0' }}></div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
              Why Forward-Thinking <br />
              <span className="text-[#2563eb]">Brands Choose Us</span>
            </h2>
            <p className="text-[#6b7280] text-base mt-4 leading-relaxed">
              We eliminate the traditional agency bloat. You work directly with experienced software engineers, UI specialists, and cloud architects who care about code quality, velocity, and measurable business outcomes.
            </p>
            <div className="space-y-4 mt-8">
              {[
                { title: 'Lightning Speed & Clean Code',     desc: 'Modular, test-covered code designed for sub-second performance and effortless future scaling.' },
                { title: 'AI-First Capabilities Built-In',  desc: 'Intelligent LLMs and automation integrated into your product to save hundreds of operational hours.' },
                { title: '100% Code & IP Ownership',        desc: 'Zero vendor lock-in. All repositories, docs, designs, and deployments are 100% yours.' },
                { title: 'Direct Engineer Access',          desc: 'No confusing middlemen. You communicate directly with engineering leads and inspect live sprint demos.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#dfeafc] shadow-sm hover:border-[#2563eb] transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-[#edf4ff] text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">âœ“</div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0f172a]">{item.title}</h3>
                    <p className="text-xs text-[#6b7280] mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div className="bg-white rounded-3xl border border-[#dfeafc] p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#0f172a] mb-1">Agency Comparison</h3>
            <p className="text-xs text-[#9ca3af] mb-6">How we compare against traditional agencies & freelance setups.</p>
            <div className="space-y-3 text-xs">
              {[
                { feature: 'Delivery Velocity',           traditional: 'Slow (months of overhead)',     illusion: 'Rapid 2-Week Sprints' },
                { feature: 'Engineering Direct Access',   traditional: 'Account managers only',         illusion: 'Direct Lead Engineers' },
                { feature: 'Code Quality & Web Vitals',   traditional: 'Often bloated themes',          illusion: 'Sub-second Clean Code' },
                { feature: 'SEO & Structured Data',       traditional: 'Basic plugin add-on',           illusion: 'Full Schema Built-in' },
                { feature: 'Post-Launch Support',         traditional: 'Expensive hourly retainers',    illusion: '30-Day Free + SLAs' },
              ].map((row, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#f3f8ff] border border-[#edf4ff] space-y-2">
                  <div className="font-bold text-[#0f172a]">{row.feature}</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="text-[#9ca3af] flex items-center gap-1.5">
                      <span className="text-rose-400">âœ•</span> {row.traditional}
                    </div>
                    <div className="text-emerald-600 font-bold flex items-center gap-1.5">
                      <span>âœ“</span> {row.illusion}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ 6. CASE STUDIES â”€â”€â”€ */}
      <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="section-badge">ðŸ’¼ Proven Results</span>
            <div className="divider text-left" style={{ margin: '16px 0' }}></div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
              Featured Case Studies &<br />
              <span className="text-[#2563eb]">Client Success Stories</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all',         label: 'All Work' },
              { id: 'web-app',     label: 'Web Platforms' },
              { id: 'ecommerce',   label: 'E-Commerce' },
              { id: 'mobile-app',  label: 'Mobile Apps' },
              { id: 'ai-solution', label: 'AI Solutions' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveWorkFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeWorkFilter === tab.id
                    ? 'bg-[#0f172a] text-white border-[#0f172a]'
                    : 'bg-white text-[#6b7280] border-[#dfeafc] hover:border-[#0f172a] hover:text-[#0f172a]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl border border-[#dfeafc] bg-white p-8 shadow-sm hover:shadow-md hover:border-[#2563eb] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#edf4ff] text-[#1d4ed8]">
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs font-bold bg-[#d1fae5] text-emerald-700 px-3 py-1 rounded-full">
                    {project.metrics}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-3 group-hover:text-[#2563eb] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#6b7280] text-sm leading-relaxed mb-6">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, ti) => (
                    <span key={ti} className="px-2.5 py-1 rounded-lg bg-[#f3f8ff] text-[#4b5563] text-[11px] font-mono border border-[#dfeafc]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[#edf4ff] flex items-center justify-between">
                <span className="text-xs text-[#9ca3af] font-mono">
                  Performance: <b className="text-[#2563eb]">{project.speed}</b>
                </span>
                <Link to="/projects" className="text-xs font-bold text-[#0f172a] hover:text-[#2563eb] flex items-center gap-1 transition-colors">
                  Explore Case Details <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€â”€ 7. DEVELOPMENT ROADMAP â”€â”€â”€ */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#0f172a] p-10 sm:p-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#2563eb] text-xs font-bold uppercase tracking-wider border border-white/10">
              ðŸ—ºï¸ Battle-Tested Methodology
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4">
              How We Deliver <span className="text-[#2563eb]">Excellence</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-3">
              Our transparent 4-stage engineering sprint ensures zero surprises, on-time delivery, and bulletproof software.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Strategic Discovery',   badge: 'Blueprint Phase',  desc: 'Deep dive into your business goals, target audience, technical architecture, and interactive Figma wireframing.' },
              { step: '02', title: 'UI/UX & Prototyping',   badge: 'Design System',    desc: 'High-fidelity visual design, responsive design systems, micro-interactions, and clickable user journey prototypes.' },
              { step: '03', title: 'Agile Full-Stack Code', badge: 'Sprint Reviews',   desc: 'Sprint-based engineering using modern clean code patterns, automated QA testing, and bi-weekly client demos.' },
              { step: '04', title: 'Zero-Downtime Launch',  badge: 'Production 24/7',  desc: 'Production deployment, speed optimisation, Google SEO indexing, and 30-day comprehensive warranty.' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2563eb]/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#2563eb] font-mono">{item.step}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">{item.badge}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ 8. TESTIMONIALS â”€â”€â”€ */}
      <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-badge">â­ Client Reviews</span>
          <div className="divider"></div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] mt-2">
            Trusted by Growing <span className="text-[#2563eb]">Enterprises</span>
          </h2>
          <p className="text-[#6b7280] text-sm mt-2">See what founders and business leaders say about working with WebTech Illusion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Rajesh Sharma', role: 'Founder, TravelHub Global',
              quote: 'WebTech Illusion transformed our booking platform completely. Page load speed dropped to 0.4s and direct bookings surged by 240% in the first quarter.',
              rating: 5, tag: 'Custom Web Platform', initial: 'R',
            },
            {
              name: 'Priya Verma', role: 'Director, Aura Luxe Cosmetics',
              quote: 'Their e-commerce engineering and custom checkout architecture doubled our conversion rates. The team delivered ahead of schedule with flawless code.',
              rating: 5, tag: 'E-Commerce Store', initial: 'P',
            },
            {
              name: 'Amit Patel', role: 'CTO, FleetTrack Logistics',
              quote: 'Exceptional full-stack and mobile app capabilities. Engineers are responsive, technically sharp, and proactive in suggesting architectural improvements.',
              rating: 5, tag: 'Mobile & Cloud App', initial: 'A',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-[#dfeafc] shadow-sm hover:shadow-md hover:border-[#2563eb] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4 text-[#2563eb]">
                  {[...Array(item.rating)].map((_, si) => (
                    <FiStar key={si} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#4b5563] leading-relaxed italic mb-6">"{item.quote}"</p>
              </div>
              <div className="pt-4 border-t border-[#edf4ff] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0f172a] flex items-center justify-center font-bold text-[#2563eb] text-sm">
                  {item.initial}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0f172a]">{item.name}</div>
                  <div className="text-[11px] text-[#9ca3af]">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€â”€ 9. FAQ â”€â”€â”€ */}
      <section className="py-24 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge">â“ Common Inquiries</span>
          <div className="divider"></div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] mt-2">
            Frequently Asked <span className="text-[#2563eb]">Questions</span>
          </h2>
          <p className="text-[#6b7280] text-sm mt-2">Everything you need to know about starting a project with us.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  isOpen ? 'border-[#2563eb] bg-white shadow-sm' : 'border-[#dfeafc] bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-[#0f172a]">{faq.q}</span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
                      isOpen ? 'bg-[#2563eb] text-white rotate-180' : 'bg-[#edf4ff] text-[#2563eb]'
                    }`}
                  >â†“</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#6b7280] leading-relaxed border-t border-[#edf4ff] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* â”€â”€â”€ 10. CONSULTATION FORM â”€â”€â”€ */}
      <section id="consultation-section" className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-[#dfeafc] bg-white p-8 sm:p-14 shadow-sm relative overflow-hidden">
          {/* Gold corner glow */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#2563eb]/5 rounded-br-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Left info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf4ff] border border-[#dfeafc] text-[#2563eb] text-xs font-bold">
                Fast 2–4 Hr Response Guarantee
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] leading-tight">
                Let's Build Something <br />
                <span className="text-[#2563eb]">Extraordinary Together</span>
              </h2>

              <p className="text-[#6b7280] text-sm leading-relaxed">
                Have an upcoming project or need high-performance digital engineering? Tell us about your vision and our lead architect will prepare a tailored proposal.
              </p>

              <div className="space-y-3 text-xs font-medium">
                <a
                  href="tel:+917380497919"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f3f8ff] border border-[#dfeafc] hover:border-[#2563eb] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#edf4ff] text-[#2563eb] flex items-center justify-center shrink-0">
                    <FiPhone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#9ca3af] text-[11px]">Direct Phone Call</div>
                    <div className="font-bold text-[#0f172a]">+91 73804 97919</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/917380497919"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f3f8ff] border border-[#dfeafc] hover:border-emerald-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#d1fae5] text-emerald-600 flex items-center justify-center shrink-0">
                    <FiMessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#9ca3af] text-[11px]">WhatsApp Chat</div>
                    <div className="font-bold text-emerald-600">Chat with Engineering Lead â†—</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f3f8ff] border border-[#dfeafc]">
                  <div className="w-8 h-8 rounded-lg bg-[#edf4ff] text-[#2563eb] flex items-center justify-center shrink-0">
                    <FiMapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#9ca3af] text-[11px]">Global Headquarters</div>
                    <div className="font-bold text-[#0f172a]">Lucknow, India (Serving Worldwide)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-[#f3f8ff] rounded-2xl border border-[#dfeafc] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#0f172a] mb-1">Get Free Technical Advisory</h3>
              <p className="text-xs text-[#9ca3af] mb-6">Fill in details below and receive initial architecture insights + NDA.</p>

              {submitSuccess && (
                <div className="p-4 mb-5 rounded-xl bg-[#d1fae5] border border-emerald-200 text-emerald-700 text-xs font-medium">
                  {submitSuccess}
                </div>
              )}
              {submitError && (
                <div className="p-4 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4b5563] mb-1">Your Name *</label>
                    <input
                      type="text" required value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 bg-white border border-[#dfeafc] rounded-xl text-xs text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4b5563] mb-1">Phone Number *</label>
                    <input
                      type="tel" required value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-white border border-[#dfeafc] rounded-xl text-xs text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4b5563] mb-1">Email Address</label>
                    <input
                      type="email" value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 bg-white border border-[#dfeafc] rounded-xl text-xs text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4b5563] mb-1">Service Required</label>
                    <select
                      value={contactForm.service}
                      onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#dfeafc] rounded-xl text-xs text-[#0f172a] focus:outline-none focus:border-[#2563eb] transition-colors"
                    >
                      <option value="web-development">Custom Web / SaaS Platform</option>
                      <option value="mobile-app">iOS / Android Mobile App</option>
                      <option value="ecommerce">E-Commerce Storefront</option>
                      <option value="ai-solutions">AI & Automation Integration</option>
                      <option value="cloud-devops">Cloud Architecture & DevOps</option>
                      <option value="seo-growth">Full SEO & Growth Audit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4b5563] mb-1">Project Overview / Goals</label>
                  <textarea
                    rows="3" value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Briefly describe your goals, required features, or target launch timeline..."
                    className="w-full px-4 py-2.5 bg-white border border-[#dfeafc] rounded-xl text-xs text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="button-shine w-full py-3.5 bg-[#0f172a] hover:bg-[#2d2d3a] text-white font-bold text-xs rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Request &amp; Get Free Consultation</span>
                      <FiSend className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Floating Buttons â”€â”€â”€ */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-11 h-11 bg-white hover:bg-[#f3f8ff] text-[#0f172a] rounded-full flex items-center justify-center shadow-lg border border-[#dfeafc] hover:border-[#2563eb] transition-all hover:scale-110 cursor-pointer"
            title="Back to Top"
          >
            <FiArrowUp className="w-5 h-5" />
          </button>
        )}
        <a
          href="https://wa.me/917380497919"
          target="_blank"
          rel="noreferrer"
          className="w-13 h-13 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
          title="WhatsApp Us"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

