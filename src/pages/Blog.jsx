import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch, FiCalendar, FiUser, FiArrowRight,
  FiClock, FiEye, FiMessageCircle
} from 'react-icons/fi';
import Footer from '../components/Footer';
import apiConfig, { buildApiUrl } from '../config/api';

const categoryColors = {
  'web-development':  { bg: '#fef3c7', color: '#d97706' },
  'ui-ux-design':     { bg: '#ede9fe', color: '#7c3aed' },
  'digital-marketing':{ bg: '#d1fae5', color: '#059669' },
  'mobile-apps':      { bg: '#fce7f3', color: '#db2777' },
  'technology':       { bg: '#dbeafe', color: '#2563eb' },
};

const Blog = () => {
  const [searchTerm,         setSearchTerm]         = useState('');
  const [selectedCategory,   setSelectedCategory]   = useState('all');
  const [blogPosts,          setBlogPosts]          = useState([]);
  const [loading,            setLoading]            = useState(true);
  const [error,              setError]              = useState('');
  const [seoData,            setSeoData]            = useState(null);
  const [newsletterEmail,    setNewsletterEmail]    = useState('');
  const [newsletterMessage,  setNewsletterMessage]  = useState('');
  const [newsletterLoading,  setNewsletterLoading]  = useState(false);

  const categories = [
    { id: 'all',               label: 'All Posts' },
    { id: 'web-development',   label: 'Web Development' },
    { id: 'ui-ux-design',      label: 'UI/UX Design' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'mobile-apps',       label: 'Mobile Apps' },
    { id: 'technology',        label: 'Technology' },
  ];

  useEffect(() => { fetchBlogs(); fetchSeoData(); }, [selectedCategory, searchTerm]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterMessage('');
    try {
      const res  = await fetch(apiConfig.endpoints.newsletter.subscribe, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Unable to subscribe.');
      setNewsletterMessage(data.message || 'Thank you for subscribing!');
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterMessage(err.message || 'Unable to subscribe. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  const fetchSeoData = async () => {
    try {
      const res = await fetch(buildApiUrl('api/seo/blog'));
      const data = await res.json();
      if (data.success && data.data) setSeoData(data.data);
    } catch (err) { /* silent */ }
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchTerm)                 params.append('search', searchTerm);
      const res  = await fetch(`${buildApiUrl('api/blog')}?${params}`);
      const data = await res.json();
      if (data.success) setBlogPosts(data.data);
      else              setError('Failed to load blogs');
    } catch (err) {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const getCategoryStyle = (cat) =>
    categoryColors[cat] || { bg: '#edf4ff', color: '#2563eb' };

  return (
    <div className="min-h-screen bg-[#f3f8ff]">

      {/* â”€â”€ Hero â”€â”€ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">Our Blog</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0f172a] mb-6 leading-tight">
            Latest Insights &<br />
            <span className="text-[#2563eb]">Expert Articles</span>
          </h1>
          <p className="text-lg text-[#6b7280] mb-10 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest trends, tips, and insights in web development, design, and digital marketing.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-[#dfeafc] rounded-2xl text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors shadow-sm text-sm"
            />
          </div>

          {/* SEO banner */}
          {seoData?.ogImage && (
            <div className="mt-10">
              {seoData.ogImageLink ? (
                <a href={seoData.ogImageLink} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform">
                  <img src={seoData.ogImage} alt="Blog Banner" className="max-w-md mx-auto rounded-2xl shadow-lg border border-[#dfeafc]" />
                </a>
              ) : (
                <img src={seoData.ogImage} alt="Blog Banner" className="max-w-md mx-auto rounded-2xl shadow-lg border border-[#dfeafc]" />
              )}
            </div>
          )}
        </div>
      </section>

      {/* â”€â”€ Posts â”€â”€ */}
      <section className="py-16 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-[#0f172a] text-white border-[#0f172a]'
                    : 'bg-white text-[#6b7280] border-[#dfeafc] hover:border-[#2563eb] hover:text-[#0f172a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#dfeafc] animate-pulse">
                  <div className="h-48 bg-[#edf4ff]"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-[#edf4ff] rounded w-1/3"></div>
                    <div className="h-5 bg-[#edf4ff] rounded"></div>
                    <div className="h-4 bg-[#edf4ff] rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : blogPosts.length > 0 ? (
              blogPosts.map((post) => {
                const catStyle = getCategoryStyle(post.category);
                return (
                  <article
                    key={post._id}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#dfeafc] hover:border-[#2563eb] hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#edf4ff]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ background: catStyle.bg, color: catStyle.color }}
                        >
                          {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#2563eb] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-[#6b7280] text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                      <div className="flex items-center justify-between text-xs text-[#9ca3af] mb-3">
                        <div className="flex items-center gap-1">
                          <FiUser className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[90px]">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-3.5 h-3.5" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#9ca3af] mb-4 pb-4 border-b border-[#edf4ff]">
                        <div className="flex items-center gap-1">
                          <FiClock className="w-3.5 h-3.5" /> {post.readTime}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <FiEye className="w-3.5 h-3.5" /> {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiMessageCircle className="w-3.5 h-3.5" /> {post.comments}
                          </span>
                        </div>
                      </div>

                      <button className="w-full flex items-center justify-center px-4 py-2.5 bg-[#0f172a] hover:bg-[#2d2d3a] text-white rounded-xl font-semibold text-sm transition-all gap-2">
                        Read Article <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-20 h-20 bg-[#edf4ff] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="w-8 h-8 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-2">No articles found</h3>
                <p className="text-[#6b7280] text-sm">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>

          {/* Load more */}
          {!loading && blogPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white border border-[#dfeafc] hover:border-[#2563eb] text-[#0f172a] rounded-full font-semibold transition-all text-sm shadow-sm">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* â”€â”€ Newsletter â”€â”€ */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Subscribe to Our <span className="text-[#2563eb]">Newsletter</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
            Get the latest articles, tips, and insights delivered straight to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#2563eb] text-sm transition-colors"
            />
            <button
              type="submit" disabled={newsletterLoading}
              className="px-8 py-3.5 bg-[#2563eb] hover:bg-[#60a5fa] text-[#0f172a] rounded-xl font-bold transition-colors disabled:opacity-50 text-sm"
            >
              {newsletterLoading ? '...' : 'Subscribe'}
            </button>
          </form>
          {newsletterMessage && (
            <p className="text-white/60 text-sm mt-4">{newsletterMessage}</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

