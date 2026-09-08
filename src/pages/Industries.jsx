import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiTarget } from 'react-icons/fi';
import Footer from '../components/Footer';

const Industries = () => {
  const industries = [
    { name: 'Healthcare', icon: '🏥', desc: 'Medical & wellness platforms with HIPAA-compliant solutions' },
    { name: 'E-Commerce', icon: '🛒', desc: 'Retail & shopping solutions for seamless online experiences' },
    { name: 'Education', icon: '🎓', desc: 'E-learning platforms transforming education delivery' },
    { name: 'Travel & Tourism', icon: '✈️', desc: 'Booking & reservation systems for travel businesses' },
    { name: 'Real Estate', icon: '🏠', desc: 'Property management solutions for real estate professionals' },
    { name: 'Finance', icon: '💰', desc: 'Fintech solutions for banking & financial services' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Industries We <span className="text-blue-600">Serve</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver specialized digital solutions tailored to the unique needs of each industry.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500">
                <div className="text-5xl mb-6">{ind.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{ind.name}</h3>
                <p className="text-gray-600 mb-6">{ind.desc}</p>
                <Link to="/contact" className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Get Consultation <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FiTarget className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Industry?</h2>
          <p className="text-xl text-gray-600 mb-10">Let's discuss how we can help your business grow.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917380497919" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
              <FiPhone className="w-5 h-5" /> Call Now
            </a>
            <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
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
