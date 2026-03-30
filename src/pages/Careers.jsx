import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiBriefcase, FiAward, FiClock, FiLoader, FiExternalLink } from 'react-icons/fi';
import Footer from '../components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Careers = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}api/jobs`);
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setOpenings(data.data);
      } else {
        setOpenings([]);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load job openings');
      setOpenings([]);
    } finally {
      setLoading(false);
    }
  };

  const getJobTypeBadge = (type) => {
    const badges = {
      'full-time': 'bg-green-100 text-green-700',
      'part-time': 'bg-blue-100 text-blue-700',
      'contract': 'bg-purple-100 text-purple-700',
      'remote': 'bg-teal-100 text-teal-700',
      'internship': 'bg-orange-100 text-orange-700',
    };
    return badges[type?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  const getExperienceBadge = (exp) => {
    if (!exp) return null;
    return (
      <span className="flex items-center gap-1 text-sm text-gray-500">
        <FiAward className="w-4 h-4" />
        {exp}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading opportunities...</p>
        </div>
      </div>
    );
  }

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
          {error && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-center">
              {error}
            </div>
          )}

          <div className="grid gap-6">
            {openings.length > 0 ? (
              openings.map((job, i) => (
                <div key={job._id || job.id || i} className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeBadge(job.type)}`}>
                          {job.type || 'Full-time'}
                        </span>
                        {job.status !== 'open' && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            Closed
                          </span>
                        )}
                      </div>
                      {job.description && (
                        <p className="text-gray-600 mb-4">{job.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <FiMapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                        )}
                        {job.experience && getExperienceBadge(job.experience)}
                        {job.salary && (
                          <span className="flex items-center gap-1">
                            <FiBriefcase className="w-4 h-4" />
                            {job.salary}
                          </span>
                        )}
                      </div>
                      {job.requirements && job.requirements.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job.requirements.slice(0, 4).map((req, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                              {req}
                            </span>
                          ))}
                          {job.requirements.length > 4 && (
                            <span className="text-gray-500 text-xs">
                              +{job.requirements.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {job.status === 'open' && (
                      <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all group-hover:shadow-lg whitespace-nowrap">
                        Apply Now <FiArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <FiBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Open Positions</h3>
                <p className="text-gray-600 mb-6">We don't have any open positions at the moment.</p>
                <p className="text-gray-500">But we're always interested in meeting talented people!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600">Great benefits and an even greater team</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FiAward className="w-8 h-8" />, title: 'Competitive Salary', desc: 'We offer industry-leading compensation' },
              { icon: <FiClock className="w-8 h-8" />, title: 'Flexible Hours', desc: 'Work when you are most productive' },
              { icon: <FiBriefcase className="w-8 h-8" />, title: 'Growth Path', desc: 'Clear career progression opportunities' },
              { icon: <FiMail className="w-8 h-8" />, title: 'Learning Budget', desc: 'Annual budget for courses and books' },
            ].map((benefit, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
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
