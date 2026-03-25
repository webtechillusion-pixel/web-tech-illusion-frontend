import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiFileText } from 'react-icons/fi';
import Footer from '../components/Footer';

const CaseStudies = () => {
  const studies = [
    { client: 'Travel Agency', industry: 'Travel & Tourism', title: 'Online Booking Platform', desc: 'Built a comprehensive booking system that increased bookings by 200%.', result: '+200% Bookings' },
    { client: 'Retail Store', industry: 'E-Commerce', title: 'Multi-Vendor Marketplace', desc: 'Created a scalable marketplace supporting 500+ vendors with real-time inventory.', result: '500+ Vendors' },
    { client: 'Healthcare Clinic', industry: 'Healthcare', title: 'Patient Management System', desc: 'Developed a HIPAA-compliant system for managing patient records and appointments.', result: 'HIPAA Compliant' },
    { client: 'Real Estate Firm', industry: 'Real Estate', title: 'Property Listing Portal', desc: 'Built a feature-rich portal with virtual tours and 3D property views.', result: '+150% Leads' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Success Stories</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses transform and grow through innovative digital solutions.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {studies.map((study, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">{study.industry}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-sm text-gray-500">Client</div>
                    <div className="font-semibold text-gray-900">{study.client}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Result</div>
                    <div className="font-bold text-green-600">{study.result}</div>
                  </div>
                </div>
                <Link to="/projects" className="inline-flex items-center text-blue-600 font-semibold mt-4 group-hover:text-blue-700">
                  View Full Case Study <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Be Our Next Success Story?</h2>
          <p className="text-xl text-gray-600 mb-10">Let's discuss how we can help transform your business.</p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
            Start Your Project
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
