import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiMail, FiMapPin, FiBriefcase,
  FiAward, FiClock, FiLoader
} from 'react-icons/fi';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/api';

const jobTypeStyle = {
  'full-time':  { bg: '#d1fae5', color: '#065f46' },
  'part-time':  { bg: '#dbeafe', color: '#1e40af' },
  'contract':   { bg: '#ede9fe', color: '#5b21b6' },
  'remote':     { bg: '#ccfbf1', color: '#0f766e' },
  'internship': { bg: '#fef3c7', color: '#92400e' },
};

const Careers = () => {
  const [openings, setOpenings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res  = await fetch(`${API_BASE_URL}/api/jobs`);
      const data = await res.json();
      setOpenings(data.success && data.data.length > 0 ? data.data : []);
    } catch (err) {
      setError('Failed to load job openings');
      setOpenings([]);
    } finally {
      setLoading(false);
    }
  };

  const getJobStyle = (type) =>
    jobTypeStyle[type?.toLowerCase()] || { bg: '#edf4ff', color: '#1d4ed8' };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f8ff] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-10 h-10 animate-spin text-[#2563eb] mx-auto mb-3" />
          <p className="text-[#6b7280] text-sm">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f8ff]">

      {/* ------ Hero ------ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">We're Hiring</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0f172a] mb-6 leading-tight">
            Join Our <span className="text-[#2563eb]">Team</span>
          </h1>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto leading-relaxed">
            We're always looking for talented individuals who want to build the future of digital solutions.
          </p>
        </div>
      </section>

      {/* ------ Job Listings ------ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-center text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {openings.length > 0 ? (
              openings.map((job, i) => {
                const style = getJobStyle(job.type);
                return (
                  <div
                    key={job._id || job.id || i}
                    className="group bg-white p-8 rounded-2xl border border-[#dfeafc] hover:border-[#2563eb] hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-[#0f172a]">{job.title}</h3>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ background: style.bg, color: style.color }}
                          >
                            {job.type || 'Full-time'}
                          </span>
                          {job.status !== 'open' && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                              Closed
                            </span>
                          )}
                        </div>

                        {job.description && (
                          <p className="text-[#6b7280] mb-4 text-sm leading-relaxed">{job.description}</p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-[#9ca3af]">
                          {job.location && (
                            <span className="flex items-center gap-1.5">
                              <FiMapPin className="w-4 h-4 text-[#2563eb]" /> {job.location}
                            </span>
                          )}
                          {job.experience && (
                            <span className="flex items-center gap-1.5">
                              <FiAward className="w-4 h-4 text-[#2563eb]" /> {job.experience}
                            </span>
                          )}
                          {job.salary && (
                            <span className="flex items-center gap-1.5">
                              <FiBriefcase className="w-4 h-4 text-[#2563eb]" /> {job.salary}
                            </span>
                          )}
                        </div>

                        {job.requirements?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {job.requirements.slice(0, 4).map((req, idx) => (
                              <span
                                key={idx}
                                className="bg-[#f3f8ff] text-[#4b5563] px-3 py-1 rounded-full text-xs border border-[#dfeafc]"
                              >
                                {req}
                              </span>
                            ))}
                            {job.requirements.length > 4 && (
                              <span className="text-[#9ca3af] text-xs self-center">
                                +{job.requirements.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {job.status === 'open' && (
                        <Link
                          to="/contact"
                          className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 bg-[#0f172a] hover:bg-[#2d2d3a] text-white font-semibold rounded-xl transition-all text-sm gap-2"
                        >
                          Apply Now <FiArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-[#edf4ff] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBriefcase className="w-9 h-9 text-[#2563eb]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">No Open Positions</h3>
                <p className="text-[#6b7280] mb-2 text-sm">We don't have any open positions at the moment.</p>
                <p className="text-[#9ca3af] text-sm">But we're always interested in meeting talented people!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ------ Benefits ------ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-badge">Perks & Benefits</span>
            <div className="divider"></div>
            <h2 className="text-4xl font-black text-[#0f172a] mb-4">Why Work With <span className="text-[#2563eb]">Us?</span></h2>
            <p className="text-[#6b7280] text-lg">Great benefits and an even greater team</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FiAward    className="w-7 h-7" />, title: 'Competitive Salary', desc: 'We offer industry-leading compensation', iconBg: '#fef3c7', iconColor: '#d97706' },
              { icon: <FiClock    className="w-7 h-7" />, title: 'Flexible Hours',     desc: 'Work when you are most productive',     iconBg: '#d1fae5', iconColor: '#059669' },
              { icon: <FiBriefcase className="w-7 h-7" />,title: 'Growth Path',        desc: 'Clear career progression opportunities', iconBg: '#ede9fe', iconColor: '#7c3aed' },
              { icon: <FiMail     className="w-7 h-7" />, title: 'Learning Budget',    desc: 'Annual budget for courses and books',    iconBg: '#edf4ff', iconColor: '#2563eb' },
            ].map((b, i) => (
              <div
                key={i}
                className="text-center p-6 bg-[#f3f8ff] rounded-2xl border border-[#dfeafc] hover:border-[#2563eb] hover:shadow-sm transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: b.iconBg, color: b.iconColor }}
                >
                  {b.icon}
                </div>
                <h3 className="text-base font-bold text-[#0f172a] mb-2">{b.title}</h3>
                <p className="text-[#6b7280] text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------ Spontaneous CTA ------ */}
      <section className="py-20 bg-[#f3f8ff]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Don't See a Perfect <span className="text-[#2563eb]">Match?</span>
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed text-sm">
              Send us your resume anyway. We're always interested in meeting talented people.
            </p>
            <Link
              to="/contact"
              className="button-shine inline-flex items-center justify-center px-8 py-4 bg-[#2563eb] hover:bg-[#60a5fa] text-[#0f172a] font-bold rounded-xl transition-all text-sm gap-2"
            >
              Send Your Resume <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;

