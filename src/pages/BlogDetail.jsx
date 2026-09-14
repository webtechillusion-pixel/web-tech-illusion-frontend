import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiEye, FiUser } from 'react-icons/fi';
import Footer from '../components/Footer';
import { buildApiUrl } from '../config/api';

const categoryColors = {
  'web-development': { bg: '#fef3c7', color: '#d97706' },
  'ui-ux-design': { bg: '#ede9fe', color: '#7c3aed' },
  'digital-marketing': { bg: '#d1fae5', color: '#059669' },
  'mobile-apps': { bg: '#fce7f3', color: '#db2777' },
  technology: { bg: '#dbeafe', color: '#2563eb' }
};

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(buildApiUrl(`api/blog/${id}`));
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Blog not found');
        }

        setPost(data.data);
      } catch (err) {
        setError(err.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f8ff] flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#dfeafc] border-t-[#2563eb] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0f172a] font-semibold">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#f3f8ff] px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white border border-[#dfeafc] rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-[#0f172a] mb-3">Article not found</h1>
          <p className="text-[#6b7280] mb-6">{error || 'This blog article could not be loaded.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0f172a] text-white rounded-xl font-semibold hover:bg-[#2d2d3a] transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const catStyle = categoryColors[post.category] || { bg: '#edf4ff', color: '#2563eb' };

  return (
    <div className="min-h-screen bg-[#f3f8ff]">
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] mb-6"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          <div className="mb-6">
            <span
              className="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: catStyle.bg, color: catStyle.color }}
            >
              {post.category?.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b7280] border-b border-[#dfeafc] pb-6 mb-8">
            <div className="flex items-center gap-2">
              <FiUser className="w-4 h-4 text-[#2563eb]" />
              <span>{post.author || 'WebTech Illusion Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4 text-[#2563eb]" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 text-[#2563eb]" />
              <span>{post.readTime || '5 min read'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiEye className="w-4 h-4 text-[#2563eb]" />
              <span>{post.views || 0}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {post.image && (
            <div className="mb-10 overflow-hidden rounded-3xl border border-[#dfeafc] bg-white shadow-sm">
              <img src={post.image} alt={post.title} className="w-full h-[420px] object-cover" />
            </div>
          )}

          <article className="bg-white rounded-3xl border border-[#dfeafc] shadow-sm p-6 sm:p-8 lg:p-12">
            <p className="text-lg text-[#4b5563] leading-8 whitespace-pre-line">{post.content}</p>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;
