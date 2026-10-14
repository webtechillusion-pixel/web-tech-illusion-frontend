import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiArrowRight, FiUser, FiCheckCircle } from 'react-icons/fi';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/api';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/team`);
        if (data.success) {
          setTeam(data.data);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 sm:mb-6 break-words">
            Our <span className="text-blue-600">Team</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experienced developers and authors behind WebTech Illusion's success.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : team.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No team members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {team.map((developer, index) => (
                <div 
                  key={developer._id || index}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fadeInUp shadow-sm flex flex-col"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Fixed Aspect Ratio Photo Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                    <img 
                      src={developer.image?.replace(/^http:\/\//, 'https://') || `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name || 'Team')}&background=0f172a&color=38bdf8&size=512&bold=true`} 
                      alt={developer.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name || 'Team')}&background=0f172a&color=38bdf8&size=512&bold=true`;
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Team ID Badge */}
                    {developer.teamId && (
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-mono font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                        ID: {developer.teamId}
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-0.5">{developer.name}</h3>
                      <p className="text-blue-300 font-medium text-sm">{developer.role}</p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {developer.experience && (
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                            {developer.experience}
                          </span>
                        )}
                        {developer.email && (
                          <a 
                            href={`mailto:${developer.email}`}
                            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                            title={developer.email}
                          >
                            <FiMail className="w-3 h-3 text-blue-500" />
                            <span className="truncate max-w-[150px]">{developer.email}</span>
                          </a>
                        )}
                      </div>
                      {developer.specialization && (
                        <p className="text-gray-700 font-medium text-sm mt-1">{developer.specialization}</p>
                      )}
                    </div>

                    {developer.bio && (
                      <p className="text-gray-600 mb-5 leading-relaxed text-sm line-clamp-3">
                        {developer.bio}
                      </p>
                    )}

                    {developer.skills && developer.skills.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-gray-900 font-semibold mb-2.5 text-xs uppercase tracking-wider">Core Skills</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {developer.skills.slice(0, 5).map((skill, skillIndex) => (
                            <span 
                              key={skillIndex}
                              className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium border border-gray-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                          {developer.skills.length > 5 && (
                            <span className="text-xs text-gray-400 self-center">+{developer.skills.length - 5} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link
                        to={`/team/${developer.slug || developer._id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0f172a] hover:bg-blue-600 text-white rounded-xl text-sm font-semibold transition-all group/btn shadow-sm"
                      >
                        View Profile & Articles
                        <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Want to Join Our <span className="text-blue-600">Team?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            We're always looking for talented developers. Check our open positions.
          </p>
          <Link to="/careers" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
            View Openings
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
