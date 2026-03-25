import { Link } from 'react-router-dom';
import { FiCode, FiTarget, FiZap, FiUsers, FiAward, FiHeart, FiArrowRight, FiPhone, FiMail, FiMapPin, FiShield, FiClock, FiTrendingUp, FiCheckCircle, FiGlobe, FiSmartphone, FiShoppingCart, FiBarChart, FiCloud, FiStar, FiChevronRight } from 'react-icons/fi';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Building the <span className="text-blue-600">Future</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            We are a digital transformation company that delivers consulting-led and AI-powered technology services to help businesses thrive in the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Contact Us
            </Link>
            <Link to="/projects" className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                Our Purpose
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Reimagining <span className="text-blue-600">What's Possible</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded with a vision to bridge the gap between imagination and reality, WebTech Illusion has been at the forefront of digital innovation. We believe every great project starts with a dream, and our mission is to make those dreams come true.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '100%', label: 'Client Satisfaction' },
                  { value: '24/7', label: 'Support Available' },
                  { value: '5+', label: 'Years Experience' },
                  { value: 'A+', label: 'Quality Rating' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{s.value}</div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Values</h3>
              <div className="space-y-4">
                {[
                  { icon: <FiZap className="w-6 h-6" />, title: 'Innovation', desc: 'Pushing boundaries with cutting-edge solutions' },
                  { icon: <FiAward className="w-6 h-6" />, title: 'Excellence', desc: 'Delivering premium quality in everything we do' },
                  { icon: <FiUsers className="w-6 h-6" />, title: 'Collaboration', desc: 'Building lasting partnerships through teamwork' },
                  { icon: <FiHeart className="w-6 h-6" />, title: 'Integrity', desc: 'Honest and transparent in all our dealings' },
                ].map((v, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      {v.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{v.title}</h4>
                      <p className="text-sm text-gray-300">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Expertise</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FiCode className="w-8 h-8" />, title: 'Web Development', desc: 'Custom websites & web applications built with modern technologies for optimal performance.', gradient: 'from-blue-500 to-blue-700' },
              { icon: <FiSmartphone className="w-8 h-8" />, title: 'Mobile Solutions', desc: 'Native & cross-platform mobile applications for seamless user experiences.', gradient: 'from-cyan-500 to-cyan-700' },
              { icon: <FiShoppingCart className="w-8 h-8" />, title: 'E-Commerce', desc: 'Complete online store solutions with secure payments & inventory management.', gradient: 'from-teal-500 to-teal-700' },
              { icon: <FiBarChart className="w-8 h-8" />, title: 'Digital Marketing', desc: 'Strategic SEO, social media & content marketing to boost your online presence.', gradient: 'from-green-500 to-green-700' },
              { icon: <FiCloud className="w-8 h-8" />, title: 'Cloud Services', desc: 'Scalable cloud infrastructure, deployment & DevOps solutions.', gradient: 'from-purple-500 to-purple-700' },
              { icon: <FiShield className="w-8 h-8" />, title: 'Security & Testing', desc: 'Comprehensive security audits & quality assurance for robust solutions.', gradient: 'from-pink-500 to-pink-700' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-500">
                <div className={`w-16 h-16 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{s.desc}</p>
                <Link to="/services" className="inline-flex items-center text-blue-600 font-semibold group">
                  Learn More <FiChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
              { value: '150+', label: 'Projects Delivered' },
              { value: '50+', label: 'Happy Clients' },
              { value: '98%', label: 'Success Rate' },
              { value: '5+', label: 'Years Experience' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The WebTech Illusion <span className="text-blue-600">Advantage</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiZap className="w-8 h-8" />, title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality', gradient: 'from-blue-500 to-blue-700' },
              { icon: <FiAward className="w-8 h-8" />, title: 'Premium Quality', desc: 'Enterprise-grade solutions at competitive prices', gradient: 'from-green-500 to-green-700' },
              { icon: <FiUsers className="w-8 h-8" />, title: 'Expert Team', desc: 'Skilled developers with years of experience', gradient: 'from-purple-500 to-purple-700' },
              { icon: <FiClock className="w-8 h-8" />, title: '24/7 Support', desc: 'Round-the-clock assistance for your needs', gradient: 'from-orange-500 to-red-500' },
            ].map((s, i) => (
              <div key={i} className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-500">
                <div className={`w-20 h-20 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Your <span className="text-blue-600">Project?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business digitally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="tel:+917380497919" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              <FiPhone className="w-5 h-5" />
              Call Now
            </a>
            <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              Get Free Consultation
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <FiPhone className="w-6 h-6" />, label: 'Phone', value: '+91 73804 97919' },
              { icon: <FiMail className="w-6 h-6" />, label: 'Email', value: 'info@webtechillusion.com' },
              { icon: <FiMapPin className="w-6 h-6" />, label: 'Location', value: 'Lucknow, India' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600">{s.icon}</div>
                <div className="text-sm text-gray-500 mb-1">{s.label}</div>
                <div className="font-semibold text-gray-900">{s.value}</div>
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
