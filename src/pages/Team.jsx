import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/api';

const Team = () => {
  const [team,    setTeam]    = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/team`);
        if (data.success) setTeam(data.data);
      } catch (err) {
        console.error('Error fetching team:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f8ff]">

      {/* â”€â”€ Hero â”€â”€ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">Meet the People</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0f172a] mb-6 leading-tight">
            Our <span className="text-[#2563eb]">Team</span>
          </h1>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto leading-relaxed">
            Meet the experienced developers behind WebTech Illusion's success.
          </p>
        </div>
      </section>

      {/* â”€â”€ Team Grid â”€â”€ */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 rounded-full border-2 border-[#dfeafc] border-t-[#2563eb] animate-spin"></div>
            </div>
          ) : team.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-[#edf4ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">ðŸ‘¥</span>
              </div>
              <p className="text-[#6b7280] text-lg">No team members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((developer, index) => (
                <div
                  key={developer._id || index}
                  className="group bg-white rounded-2xl border border-[#dfeafc] overflow-hidden hover:border-[#2563eb] hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-[#edf4ff]">
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white mb-0.5">{developer.name}</h3>
                      <p className="text-[#2563eb] font-medium text-sm">{developer.role}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="mb-4">
                      {developer.experience && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#edf4ff] text-[#1d4ed8] border border-[#dfeafc]">
                          {developer.experience}
                        </span>
                      )}
                      {developer.specialization && (
                        <p className="text-[#6b7280] font-medium text-sm mt-2">{developer.specialization}</p>
                      )}
                    </div>

                    {developer.bio && (
                      <p className="text-[#6b7280] mb-5 leading-relaxed text-sm">{developer.bio}</p>
                    )}

                    {developer.skills?.length > 0 && (
                      <div className="mb-5">
                        <h4 className="text-[#0f172a] font-semibold mb-2 text-xs uppercase tracking-wider">Core Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {developer.skills.map((skill, si) => (
                            <span
                              key={si}
                              className="text-xs bg-[#f3f8ff] text-[#4b5563] px-3 py-1 rounded-full border border-[#dfeafc] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social icons */}
                    <div className="flex justify-center gap-3 pt-4 border-t border-[#edf4ff]">
                      {/* LinkedIn */}
                      <div className="w-9 h-9 bg-[#0f172a] rounded-full flex items-center justify-center hover:bg-[#2563eb] transition-colors cursor-pointer">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      {/* GitHub */}
                      <div className="w-9 h-9 bg-[#0f172a] rounded-full flex items-center justify-center hover:bg-[#2563eb] transition-colors cursor-pointer">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      {/* Twitter */}
                      <div className="w-9 h-9 bg-[#0f172a] rounded-full flex items-center justify-center hover:bg-[#2563eb] transition-colors cursor-pointer">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* â”€â”€ Join CTA â”€â”€ */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Want to Join Our <span className="text-[#2563eb]">Team?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10 leading-relaxed">
            We're always looking for talented developers. Check our open positions.
          </p>
          <Link
            to="/careers"
            className="button-shine inline-flex items-center justify-center px-8 py-4 bg-[#2563eb] hover:bg-[#60a5fa] text-[#0f172a] font-bold rounded-xl transition-all text-sm gap-2"
          >
            View Openings
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;

