import { Link } from 'react-router-dom';
import { FiArrowRight, FiCode, FiBook, FiFile, FiDownload } from 'react-icons/fi';
import Footer from '../components/Footer';

const Documentation = () => {
  const docs = [
    { title: 'API Documentation', desc: 'Complete REST API reference with examples', icon: <FiCode className="w-8 h-8" /> },
    { title: 'Getting Started Guide', desc: 'Step-by-step tutorials for beginners', icon: <FiBook className="w-8 h-8" /> },
    { title: 'Technical Specifications', desc: 'Architecture, security, and performance details', icon: <FiFile className="w-8 h-8" /> },
    { title: 'Integration Guides', desc: 'Third-party integrations and webhooks', icon: <FiDownload className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Developer <span className="text-blue-600">Documentation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to integrate and build with our platform.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {docs.map((doc, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {doc.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{doc.title}</h3>
                <p className="text-gray-600 mb-6">{doc.desc}</p>
                <Link to="/contact" className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Read More <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Need Help?</h2>
          <p className="text-xl text-gray-600 mb-10">Our technical team is available to assist you with any questions.</p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
            Contact Technical Support
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentation;
