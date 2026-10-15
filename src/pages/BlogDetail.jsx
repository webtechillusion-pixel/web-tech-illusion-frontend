import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft, FiCalendar, FiClock, FiEye, FiUser,
  FiMail, FiChevronDown, FiTag, FiShare2, FiCheck
} from 'react-icons/fi';
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
  const [openFaq, setOpenFaq] = useState(null);
  const [copied, setCopied] = useState(false);

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

  // SEO Meta and JSON-LD schema integration
  useEffect(() => {
    if (!post) return;

    const title = post.metaTitle || post.title || 'Blog Post';
    const description = post.metaDescription || post.excerpt || '';
    const canonicalUrl = `${window.location.origin}/blog/${post.slug || post._id}`;
    const authorName = post.teamMember?.name || post.author || 'WebTech Illusion Team';

    document.title = `${title} | WebTech Illusion`;

    const setMeta = (name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', post.metaKeywords || (post.tags ? post.tags.join(', ') : ''));
    setMeta('author', authorName);
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:type', 'article');
    setMeta('og:url', canonicalUrl);
    if (post.image) setMeta('og:image', post.image);

    // Article Structured Schema
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: description,
      image: post.image ? [post.image] : undefined,
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      author: {
        '@type': 'Person',
        name: authorName,
        jobTitle: post.teamMember?.role || undefined,
        email: post.teamMember?.email || post.authorEmail || undefined,
        url: post.teamMember?.slug ? `${window.location.origin}/team/${post.teamMember.slug}` : undefined
      },
      publisher: {
        '@type': 'Organization',
        name: 'WebTech Illusion',
        url: window.location.origin
      }
    };

    // FAQ Schema if FAQs exist
    let faqSchema = null;
    if (post.faqs && post.faqs.length > 0) {
      faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };
    }

    let scriptEl = document.head.querySelector('script[data-blog-seo]');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.setAttribute('data-blog-seo', 'true');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(faqSchema ? [articleSchema, faqSchema] : articleSchema);

    return () => {
      const el = document.head.querySelector('script[data-blog-seo]');
      if (el) el.remove();
    };
  }, [post]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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

  const catStyle = categoryColors[post.category?.toLowerCase()] || { bg: '#edf4ff', color: '#2563eb' };
  const teamAuthor = post.teamMember;

  return (
    <div className="min-h-screen bg-[#f3f8ff]">
      {/* ------ Hero Section ------ */}
      <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8]"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#dfeafc] bg-white text-xs font-semibold text-[#475569] hover:border-[#2563eb] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <FiShare2 className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>

          <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: catStyle.bg, color: catStyle.color }}
            >
              {post.category?.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight mb-4 sm:mb-6 break-words">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#6b7280] border-b border-[#dfeafc] pb-4 sm:pb-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-1.5">
              <FiUser className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="font-medium text-[#0f172a]">
                {post.author || 'WebTech Illusion Team'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{post.readTime || '5 min read'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiEye className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{post.views || 0} views</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------ Main Article Content ------ */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {post.image && (
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#dfeafc] bg-white shadow-sm aspect-square w-full max-w-2xl mx-auto">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Article Excerpt Callout */}
          {post.excerpt && (
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-100 text-sm sm:text-lg text-[#1e293b] font-medium leading-relaxed italic border-l-4 border-l-[#2563eb]">
              "{post.excerpt}"
            </div>
          )}

          {/* Article Body */}
          <article className="bg-white rounded-3xl border border-[#dfeafc] shadow-sm p-6 sm:p-10 lg:p-12">
            <div className="prose prose-lg max-w-none text-[#334155] leading-relaxed whitespace-pre-line font-sans text-base sm:text-lg">
              {post.content}
            </div>

            {/* Tags Pills */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[#edf4ff]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-3 flex items-center gap-1.5">
                  <FiTag className="w-3.5 h-3.5 text-[#2563eb]" /> Tags &amp; Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0] transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Frequently Asked Questions Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#dfeafc] p-6 sm:p-10 shadow-sm space-y-6">
              <div className="border-b border-[#edf4ff] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb]">FAQ</span>
                <h3 className="text-2xl font-black text-[#0f172a] mt-1">Frequently Asked Questions</h3>
                <p className="text-sm text-[#64748b] mt-1">Common questions and answers regarding this topic.</p>
              </div>

              <div className="space-y-3">
                {post.faqs.map((faq, fIdx) => {
                  const isOpen = openFaq === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className={`rounded-2xl border transition-all ${
                        isOpen ? 'border-[#2563eb] bg-[#f8fbff]' : 'border-[#e2e8f0] bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="font-bold text-base text-[#0f172a]">{faq.question}</span>
                        <FiChevronDown
                          className={`w-5 h-5 text-[#2563eb] transition-transform shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-sm text-[#475569] leading-relaxed border-t border-[#edf4ff]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Author Card - Linked Team Member Profile */}
          <div className="bg-white rounded-3xl border border-[#dfeafc] p-6 sm:p-8 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-4">
              About the Author
            </h4>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-2xl overflow-hidden border-2 border-[#dfeafc] shadow-sm shrink-0 bg-[#f1f5f9]">
                <img
                  src={teamAuthor?.image || post.image}
                  alt={teamAuthor?.name || post.author}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-[#0f172a]">
                    {teamAuthor?.name || post.author || 'WebTech Illusion Team'}
                  </h3>
                  {teamAuthor?.teamId && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ede9fe] text-[#7c3aed] border border-[#ddd6fe]">
                      ID: {teamAuthor.teamId}
                    </span>
                  )}
                  {teamAuthor?.role && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eff6ff] text-[#2563eb]">
                      {teamAuthor.role}
                    </span>
                  )}
                </div>

                {teamAuthor?.specialization && (
                  <p className="text-xs font-semibold text-[#2563eb]">
                    {teamAuthor.specialization}
                  </p>
                )}

                <p className="text-sm text-[#64748b] leading-relaxed">
                  {teamAuthor?.bio || 'Author and digital specialist delivering modern software engineering and technical insights.'}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                  {(teamAuthor?.email || post.authorEmail) && (
                    <a
                      href={`mailto:${teamAuthor?.email || post.authorEmail}`}
                      className="inline-flex items-center gap-1.5 text-[#2563eb] hover:underline font-medium"
                    >
                      <FiMail className="w-3.5 h-3.5" />
                      {teamAuthor?.email || post.authorEmail}
                    </a>
                  )}

                  {teamAuthor?.slug && (
                    <Link
                      to={`/team/${teamAuthor.slug}`}
                      className="inline-flex items-center gap-1 text-[#0f172a] hover:text-[#2563eb] font-bold"
                    >
                      View Team Member Profile &amp; Bio →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;
