import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiBriefcase, FiAward, FiClock } from 'react-icons/fi';
import Footer from '../components/Footer';

const Careers = () => {
  const openings = [
    { title: 'Senior React Developer', type: 'Full-time', location: 'Lucknow, India', desc: 'Build modern web applications using React, Node.js, and cloud technologies.' },
    { title: 'UI/UX Designer', type: 'Full-time', location: 'Lucknow, India', desc: 'Create beautiful, user-friendly interfaces for web and mobile applications.' },
    { title: 'Digital Marketing Specialist', type: 'Full-time', location: 'Remote', desc: 'Drive growth through SEO, SEM, and social media marketing strategies.' },
    { title: 'Backend Developer', type: 'Full-time', location: 'Lucknow, India', desc: 'Develop scalable APIs and backend systems using Node.js, Python, or Go.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Join Our <span className="text-blue-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're always looking for talented individuals who want to build the future of digital solutions.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-6">
            {openings.map((job, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-4">{job.desc}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><FiBriefcase className="w-4 h-4" /> {job.type}</span>
                      <span className="flex items-center gap-1"><FiMapPin className="w-4 h-4" /> {job.location}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all group-hover:shadow-lg">
                    Apply Now <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't See a Perfect Match?</h2>
            <p className="text-blue-100 mb-8 text-lg">Send us your resume anyway. We're always interested in meeting talented people.</p>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all">
              Send Your Resume
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
