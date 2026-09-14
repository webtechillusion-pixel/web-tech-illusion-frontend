import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/api';

const TeamDetail = () => {
  const { slug } = useParams();
  const [member, setMember] = useState(null);
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

  return (
    <div className="min-h-screen bg-[#f3f8ff]">
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <Link to="/team" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] mb-8">
            ← Back to Team
          </Link>

          <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-8 items-start">
            <div className="bg-white border border-[#dfeafc] rounded-3xl overflow-hidden shadow-sm">
              <img src={member.image} alt={member.name} className="w-full h-[420px] object-cover" />
            </div>

            <div className="bg-white rounded-3xl border border-[#dfeafc] p-6 sm:p-8 shadow-sm">
              <span className="inline-flex px-3 py-1 rounded-full bg-[#edf4ff] text-[#1d4ed8] text-xs font-semibold">
                {member.role}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-[#0f172a] mt-4 mb-3">{member.name}</h1>

              {member.specialization && (
                <p className="text-lg text-[#2563eb] font-semibold mb-5">{member.specialization}</p>
              )}

              {member.experience && (
                <div className="inline-flex items-center px-3 py-2 rounded-full bg-[#f3f8ff] border border-[#dfeafc] text-sm font-medium text-[#475569] mb-6">
                  {member.experience}
                </div>
              )}

              {member.bio && (
                <p className="text-[#4b5563] text-lg leading-8 whitespace-pre-line mb-8">{member.bio}</p>
              )}

              {member.skills?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#475569] mb-4">Core Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span key={`${skill}-${index}`} className="px-3 py-2 rounded-full border border-[#dfeafc] bg-[#f8fbff] text-sm text-[#334155]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamDetail;
