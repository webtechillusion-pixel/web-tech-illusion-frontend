import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMail, FiArrowRight, FiBookOpen, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/api';

const TeamDetail = () => {
  const { slug } = useParams();
  const [member, setMember] = useState(null);
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_BASE_URL}/api/team/slug/${encodeURIComponent(slug)}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Team member not found');
        }

        setMember(data.data);

        // Fetch articles authored by this member
        try {
          const blogRes = await fetch(`${API_BASE_URL}/api/blog/author/${data.data._id}`);
          const blogData = await blogRes.json();
          if (blogData.success && Array.isArray(blogData.data)) {
            setAuthorBlogs(blogData.data);
          }
        } catch (blogErr) {
          console.warn('Could not load author blogs:', blogErr);
        }
      } catch (err) {
        setError(err.message || 'Failed to load team member');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f8ff] flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#dfeafc] border-t-[#2563eb] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0f172a] font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-[#f3f8ff] px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white border border-[#dfeafc] rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-[#0f172a] mb-3">Profile not found</h1>
          <p className="text-[#6b7280] mb-6">{error || 'This team member could not be loaded.'}</p>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0f172a] text-white rounded-xl font-semibold hover:bg-[#2d2d3a] transition-colors"
          >
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  // SEO Schema for Team Member (Schema.org Person)
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    ...(member.email && { email: member.email }),
    ...(member.teamId && { identifier: member.teamId }),
    image: member.image,
    description: member.bio,
    ...(member.skills?.length && { knowsAbout: member.skills }),
    worksFor: {
      '@type': 'Organization',
      name: 'WebTech Illusion'
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f8ff]">
      {/* Inject SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/team" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] mb-6 sm:mb-8 hover:underline">
            ← Back to All Team Members
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 sm:gap-8 items-start">
            {/* Left: Fixed Aspect Ratio Photo Container */}
            <div className="bg-white border border-[#dfeafc] rounded-3xl overflow-hidden shadow-sm lg:sticky lg:top-28 max-w-sm mx-auto lg:max-w-none w-full">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                <img 
                  src={member.image?.replace(/^http:\/\//, 'https://') || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'Team')}&background=0f172a&color=38bdf8&size=512&bold=true`} 
                  alt={member.name} 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'Team')}&background=0f172a&color=38bdf8&size=512&bold=true`;
                  }}
                  className="w-full h-full object-cover object-top" 
                />
                {member.teamId && (
                  <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md text-white text-xs font-mono font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                    ID: {member.teamId}
                  </div>
                )}
              </div>

              {/* Quick Info Box */}
              <div className="p-4 sm:p-5 border-t border-[#edf4ff] bg-[#fafcff] space-y-3">
                {member.email && (
                  <div className="flex items-center gap-2.5 text-sm text-[#475569]">
                    <FiMail className="w-4 h-4 text-[#2563eb] flex-shrink-0" />
                    <a href={`mailto:${member.email}`} className="text-[#2563eb] hover:underline font-medium truncate">
                      {member.email}
                    </a>
                  </div>
                )}
                {member.experience && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#475569]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Experience: {member.experience}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Details & Bio */}
            <div className="bg-white rounded-3xl border border-[#dfeafc] p-5 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex px-3 py-1 rounded-full bg-[#edf4ff] text-[#1d4ed8] text-xs font-semibold">
                  {member.role}
                </span>
                {member.teamId && (
                  <span className="inline-flex px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                    Member #{member.teamId}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0f172a] mb-2 break-words">{member.name}</h1>

              {member.specialization && (
                <p className="text-base sm:text-lg text-[#2563eb] font-semibold mb-6">{member.specialization}</p>
              )}

              {member.bio && (
                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-2">About</h3>
                  <p className="text-[#4b5563] text-base sm:text-lg leading-relaxed whitespace-pre-line">{member.bio}</p>
                </div>
              )}

              {member.skills?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-3">Core Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span key={`${skill}-${index}`} className="px-3 py-1.5 rounded-full border border-[#dfeafc] bg-[#f8fbff] text-xs font-medium text-[#334155]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Connected Blog Articles by this Author */}
              <div className="pt-8 border-t border-[#edf4ff]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <FiBookOpen className="w-5 h-5 text-[#2563eb]" />
                    <h3 className="text-lg font-bold text-[#0f172a]">
                      Articles Authored by {member.name}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#edf4ff] text-[#2563eb] rounded-full">
                    {authorBlogs.length} {authorBlogs.length === 1 ? 'Post' : 'Posts'}
                  </span>
                </div>

                {authorBlogs.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {authorBlogs.map((post) => (
                      <Link
                        key={post._id}
                        to={`/blog/${post.slug || post._id}`}
                        className="group p-4 rounded-2xl border border-[#dfeafc] bg-[#f8fbff] hover:bg-white hover:border-[#2563eb] transition-all hover:shadow-md flex flex-col"
                      >
                        {post.image && (
                          <div className="relative aspect-square w-full overflow-hidden rounded-xl mb-3 bg-slate-200">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h4 className="font-bold text-[#0f172a] group-hover:text-[#2563eb] transition-colors text-sm line-clamp-2 mb-1.5">
                          {post.title}
                        </h4>
                        <p className="text-xs text-[#64748b] line-clamp-2 mb-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between text-[11px] text-[#94a3b8] pt-2 border-t border-[#edf4ff]">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3 h-3" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-[#2563eb] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            Read <FiArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-[#f8fbff] border border-dashed border-[#dfeafc] text-center">
                    <p className="text-sm text-[#64748b]">
                      No blog articles published yet by {member.name}. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamDetail;

