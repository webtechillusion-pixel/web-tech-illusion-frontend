import { Link } from 'react-router-dom';
import {
  FiCode, FiTarget, FiZap, FiUsers, FiAward, FiHeart,
  FiArrowRight, FiPhone, FiMail, FiMapPin, FiShield,
  FiClock, FiTrendingUp, FiCheckCircle, FiGlobe,
  FiSmartphone, FiShoppingCart, FiBarChart, FiCloud,
  FiStar, FiChevronRight
} from 'react-icons/fi';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f3f8ff]">

      {/* â”€â”€ Hero â”€â”€ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/60 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">About Us</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0f172a] mb-6 leading-tight">
            Building the <span className="text-[#2563eb]">Future</span>
          </h1>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto mb-10 leading-relaxed">
            We are a leading software company in Lucknow helping brands grow with digital marketing, custom web development, mobile apps, and AI-powered business solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="button-shine px-8 py-4 bg-[#0f172a] text-white font-semibold rounded-xl hover:bg-[#2d2d3a] transition-all shadow-sm"
            >
              Contact Us
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border border-[#dfeafc] bg-white text-[#0f172a] font-semibold rounded-xl hover:border-[#2563eb] transition-all"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* â”€â”€ Mission â”€â”€ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-badge">Our Purpose</span>
              <div className="divider" style={{ margin: '16px 0' }}></div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 leading-tight">
                Reimagining <span className="text-[#2563eb]">What's Possible</span>
              </h2>
              <p className="text-lg text-[#6b7280] mb-8 leading-relaxed">
                Founded with a vision to bridge the gap between imagination and reality, WebTech Illusion has been at the forefront of digital innovation. We believe every great project starts with a dream, and our mission is to make those dreams come true.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '100%', label: 'Client Satisfaction', color: '#2563eb' },
                  { value: '24/7', label: 'Support Available',   color: '#059669' },
                  { value: '5+',   label: 'Years Experience',    color: '#7c3aed' },
                  { value: 'A+',   label: 'Quality Rating',      color: '#d97706' },
                ].map((s, i) => (
                  <div key={i} className="bg-[#f3f8ff] rounded-2xl p-5 text-center border border-[#dfeafc]">
                    <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-sm text-[#6b7280]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values card â€” dark navy for contrast */}
            <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
              <div className="space-y-4">
                {[
                  { icon: <FiZap  className="w-5 h-5" />, title: 'Innovation',    desc: 'Pushing boundaries with cutting-edge solutions' },
                  { icon: <FiAward className="w-5 h-5" />, title: 'Excellence',   desc: 'Delivering premium quality in everything we do' },
                  { icon: <FiUsers className="w-5 h-5" />, title: 'Collaboration',desc: 'Building lasting partnerships through teamwork' },
                  { icon: <FiHeart className="w-5 h-5" />, title: 'Integrity',    desc: 'Honest and transparent in all our dealings' },
                ].map((v, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-[#2563eb]/20 rounded-lg flex items-center justify-center flex-shrink-0 text-[#2563eb]">
                      {v.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{v.title}</h4>
                      <p className="text-sm text-white/50">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Expertise â”€â”€ */}
      <section className="py-24 bg-[#f3f8ff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge">What We Do</span>
            <div className="divider"></div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-4">
              Our <span className="text-[#2563eb]">Expertise</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCode className="w-7 h-7" />,
                title: 'Web Development',
                desc: 'Custom websites & web applications built with modern technologies for optimal performance.',
                iconBg: '#fef3c7', iconColor: '#d97706',
              },
              {
                icon: <FiSmartphone className="w-7 h-7" />,
                title: 'Mobile Solutions',
                desc: 'Native & cross-platform mobile applications for seamless user experiences.',
                iconBg: '#dbeafe', iconColor: '#2563eb',
              },
              {
                icon: <FiShoppingCart className="w-7 h-7" />,
                title: 'E-Commerce',
                desc: 'Complete online store solutions with secure payments & inventory management.',
                iconBg: '#d1fae5', iconColor: '#059669',
              },
              {
                icon: <FiBarChart className="w-7 h-7" />,
                title: 'Digital Marketing',
                desc: 'Strategic SEO, social media & content marketing to boost your online presence.',
                iconBg: '#edf4ff', iconColor: '#2563eb',
              },
              {
                icon: <FiCloud className="w-7 h-7" />,
                title: 'Cloud Services',
                desc: 'Scalable cloud infrastructure, deployment & DevOps solutions.',
                iconBg: '#ede9fe', iconColor: '#7c3aed',
              },
              {
                icon: <FiShield className="w-7 h-7" />,
                title: 'Security & Testing',
                desc: 'Comprehensive security audits & quality assurance for robust solutions.',
                iconBg: '#fce7f3', iconColor: '#db2777',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-[#dfeafc] hover:border-[#2563eb] hover:shadow-md transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: s.iconBg, color: s.iconColor }}
                >
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-3">{s.title}</h3>
                <p className="text-[#6b7280] leading-relaxed mb-6 text-sm">{s.desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-sm font-bold group-hover:gap-2 transition-all"
                  style={{ color: s.iconColor }}
                >
                  Learn More <FiChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Stats Banner â”€â”€ */}
      <section className="py-16 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '150+', label: 'Projects Delivered', color: '#2563eb' },
              { value: '50+',  label: 'Happy Clients',      color: '#2563eb' },
              { value: '98%',  label: 'Success Rate',       color: '#2563eb' },
              { value: '5+',   label: 'Years Experience',   color: '#2563eb' },
            ].map((s, i) => (
              <div key={i} className={`py-6 ${i > 0 ? 'border-l border-white/10' : ''}`}>
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: s.color }}>{s.value}</div>
                <div className="text-sm text-white/50 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Why Choose Us â”€â”€ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge">Why Choose Us</span>
            <div className="divider"></div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-4">
              The WebTech Illusion <span className="text-[#2563eb]">Advantage</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiZap  className="w-7 h-7" />, title: 'Fast Delivery',  desc: 'Quick turnaround without compromising quality',      iconBg: '#fef3c7', iconColor: '#d97706' },
              { icon: <FiAward className="w-7 h-7" />, title: 'Premium Quality',desc: 'Enterprise-grade solutions at competitive prices',   iconBg: '#d1fae5', iconColor: '#059669' },
              { icon: <FiUsers className="w-7 h-7" />, title: 'Expert Team',   desc: 'Skilled developers with years of experience',        iconBg: '#ede9fe', iconColor: '#7c3aed' },
              { icon: <FiClock className="w-7 h-7" />, title: '24/7 Support',  desc: 'Round-the-clock assistance for your needs',          iconBg: '#edf4ff', iconColor: '#2563eb' },
            ].map((s, i) => (
              <div
                key={i}
                className="text-center bg-[#f3f8ff] rounded-2xl p-8 border border-[#dfeafc] hover:border-[#2563eb] hover:shadow-md transition-all duration-300 group"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: s.iconBg, color: s.iconColor }}
                >
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-3">{s.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€ */}
      <section className="py-24 bg-[#f3f8ff]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 mt-4">
            Ready to Start Your <span className="text-[#2563eb]">Project?</span>
          </h2>
          <p className="text-xl text-[#6b7280] mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can help transform your business digitally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a
              href="tel:+917380497919"
              className="px-8 py-4 bg-[#0f172a] text-white font-bold rounded-xl hover:bg-[#2d2d3a] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <FiPhone className="w-5 h-5" /> Call Now
            </a>
            <Link
              to="/contact"
              className="button-shine px-8 py-4 bg-[#2563eb] text-[#0f172a] font-bold rounded-xl hover:bg-[#60a5fa] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Get Free Consultation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <FiPhone  className="w-5 h-5" />, label: 'Phone',    value: '+91 73804 97919',          iconBg: '#edf4ff', iconColor: '#2563eb' },
              { icon: <FiMail   className="w-5 h-5" />, label: 'Email',    value: 'info@webtechillusion.com', iconBg: '#dbeafe', iconColor: '#2563eb' },
              { icon: <FiMapPin className="w-5 h-5" />, label: 'Location', value: 'Lucknow, India',           iconBg: '#d1fae5', iconColor: '#059669' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#dfeafc] shadow-sm">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: s.iconBg, color: s.iconColor }}
                >
                  {s.icon}
                </div>
                <div className="text-xs text-[#9ca3af] mb-1 uppercase tracking-wider font-medium">{s.label}</div>
                <div className="font-semibold text-[#0f172a] text-sm">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

