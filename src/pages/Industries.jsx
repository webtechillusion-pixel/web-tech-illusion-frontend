import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiTarget } from 'react-icons/fi';
import Footer from '../components/Footer';

const Industries = () => {
  const industries = [
    { name: 'Healthcare',      icon: 'ðŸ¥', desc: 'Medical & wellness platforms with HIPAA-compliant solutions',       iconBg: '#d1fae5', iconColor: '#059669' },
    { name: 'E-Commerce',      icon: 'ðŸ›’', desc: 'Retail & shopping solutions for seamless online experiences',        iconBg: '#fef3c7', iconColor: '#d97706' },
    { name: 'Education',       icon: 'ðŸŽ“', desc: 'E-learning platforms transforming education delivery',               iconBg: '#dbeafe', iconColor: '#2563eb' },
    { name: 'Travel & Tourism',icon: 'âœˆï¸', desc: 'Booking & reservation systems for travel businesses',               iconBg: '#edf4ff', iconColor: '#2563eb' },
    { name: 'Real Estate',     icon: 'ðŸ ', desc: 'Property management solutions for real estate professionals',        iconBg: '#ede9fe', iconColor: '#7c3aed' },
    { name: 'Finance',         icon: 'ðŸ’°', desc: 'Fintech solutions for banking & financial services',                 iconBg: '#ccfbf1', iconColor: '#0f766e' },
  ];

  return (
    <div className="min-h-screen bg-[#f3f8ff]">

      {/* â”€â”€ Hero â”€â”€ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">Industry Focus</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0f172a] mb-6 leading-tight">
            Industries We <span className="text-[#2563eb]">Serve</span>
          </h1>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto leading-relaxed">
            We deliver digital solutions and growth-focused software for businesses that need smarter, faster, and more scalable operations.
          </p>
        </div>
      </section>

      {/* â”€â”€ Industries Grid â”€â”€ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-[#f3f8ff] border border-[#dfeafc] hover:border-[#2563eb] hover:shadow-md transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: ind.iconBg }}
                >
                  {ind.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-3">{ind.name}</h3>
                <p className="text-[#6b7280] mb-6 leading-relaxed text-sm">{ind.desc}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center font-bold text-sm gap-1 transition-colors"
                  style={{ color: ind.iconColor }}
                >
                  Get Consultation
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€ */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-[#2563eb]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiTarget className="w-8 h-8 text-[#2563eb]" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Transform Your <span className="text-[#2563eb]">Industry?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10 leading-relaxed">
            Let's discuss how we can help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917380497919"
              className="px-8 py-4 bg-white text-[#0f172a] font-bold rounded-xl hover:bg-[#f3f8ff] flex items-center justify-center gap-2 transition-all text-sm"
            >
              <FiPhone className="w-5 h-5" /> Call Now
            </a>
            <Link
              to="/contact"
              className="button-shine px-8 py-4 bg-[#2563eb] hover:bg-[#60a5fa] text-[#0f172a] font-bold rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;

