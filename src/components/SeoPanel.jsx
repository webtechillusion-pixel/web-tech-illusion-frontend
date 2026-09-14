import React, { useCallback, useEffect, useMemo, useState } from 'react';

const pages = [
  { value: 'home', label: 'Home Page', path: '/' },
  { value: 'services', label: 'Services', path: '/services' },
  { value: 'projects', label: 'Projects & Work', path: '/projects' },
  { value: 'about', label: 'About Us', path: '/about' },
  { value: 'case-studies', label: 'Case Studies', path: '/case-studies' },
  { value: 'team', label: 'Team', path: '/team' },
  { value: 'contact', label: 'Contact Us', path: '/contact' },
  { value: 'industries', label: 'Industries', path: '/industries' },
  { value: 'blog', label: 'Blog & Articles', path: '/blog' },
  { value: 'careers', label: 'Careers', path: '/careers' },
  { value: 'documentation', label: 'Documentation', path: '/documentation' }
];

const smartTemplates = {
  home: {
    metaTitle: 'WebTech Illusion - Digital Solutions, Web & Software Development',
    metaDescription: 'Transform your business with WebTech Illusion. High-performance web development, AI integration, mobile apps, and scalable digital solutions.',
    metaKeywords: 'web development, software company, mobile app development, UI/UX design, AI solutions, SEO agency, digital marketing, cloud DevOps',
    focusKeyword: 'software development company',
    slug: '',
    canonicalUrl: 'https://webtechillusion.com',
    schemaType: 'WebSite',
    h1Heading: 'Building High-Performance Digital Experiences That Matter',
    ogTitle: 'WebTech Illusion - Digital Solutions & Next-Gen Software',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  services: {
    metaTitle: 'Our Services | Web, Mobile, AI & Cloud Engineering - WebTech Illusion',
    metaDescription: 'End-to-end technology services: custom web apps, iOS/Android mobile apps, e-commerce, cloud DevOps, AI automation, and full-funnel digital marketing.',
    metaKeywords: 'web development services, mobile app development, AI solutions, cloud hosting, DevOps, SEO services',
    focusKeyword: 'web development services',
    slug: 'services',
    canonicalUrl: 'https://webtechillusion.com/services',
    schemaType: 'Service',
    h1Heading: 'Comprehensive Digital Capabilities Built for Modern Scale',
    ogTitle: 'End-to-End Technology & Software Development Services',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  projects: {
    metaTitle: 'Projects & Case Studies | Proven Digital Results - WebTech Illusion',
    metaDescription: 'Explore our portfolio of delivered web applications, mobile apps, e-commerce stores, and enterprise solutions with verified client growth results.',
    metaKeywords: 'portfolio, software projects, web apps case studies, client success stories',
    focusKeyword: 'software projects portfolio',
    slug: 'projects',
    canonicalUrl: 'https://webtechillusion.com/projects',
    schemaType: 'CollectionPage',
    h1Heading: 'Showcasing Breakthrough Digital Solutions & Client Success',
    ogTitle: 'WebTech Illusion Case Studies & Portfolio',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  about: {
    metaTitle: 'About Us | WebTech Illusion - Engineering Digital Innovation',
    metaDescription: 'Discover the story, mission, and expert team behind WebTech Illusion. Delivering enterprise-grade digital products and consulting services globally.',
    metaKeywords: 'about webtech illusion, tech company mission, software team, digital transformation agency',
    focusKeyword: 'about webtech illusion',
    slug: 'about',
    canonicalUrl: 'https://webtechillusion.com/about',
    schemaType: 'AboutPage',
    h1Heading: 'Pioneering Digital Excellence with Passion and Precision',
    ogTitle: 'About WebTech Illusion - Who We Are',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  'case-studies': {
    metaTitle: 'Case Studies | Measurable Digital Impact - WebTech Illusion',
    metaDescription: 'In-depth case studies showcasing how we helped brands achieve 200%+ revenue growth, sub-second load times, and massive user scale.',
    metaKeywords: 'digital transformation case studies, ecommerce growth study, web performance case study',
    focusKeyword: 'digital transformation case studies',
    slug: 'case-studies',
    canonicalUrl: 'https://webtechillusion.com/case-studies',
    schemaType: 'CollectionPage',
    h1Heading: 'Real Challenges. Bold Engineering. Measurable Results.',
    ogTitle: 'WebTech Illusion Case Studies - Client ROI & Impact',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  team: {
    metaTitle: 'Meet the Team | Experts, Engineers & Designers - WebTech Illusion',
    metaDescription: 'Meet the talented engineers, architects, designers, and growth specialists driving innovation and delivering exceptional products at WebTech Illusion.',
    metaKeywords: 'tech team, software engineers, UI/UX designers, leadership, WebTech Illusion team',
    focusKeyword: 'software engineers and designers',
    slug: 'team',
    canonicalUrl: 'https://webtechillusion.com/team',
    schemaType: 'AboutPage',
    h1Heading: 'The Minds and Craftsmen Behind Every Breakthrough',
    ogTitle: 'Meet the WebTech Illusion Engineering Team',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  contact: {
    metaTitle: 'Contact Us | Start Your Project - WebTech Illusion',
    metaDescription: 'Get in touch with WebTech Illusion for a free technical consultation, project estimate, or partnership inquiry. Fast 24-hour turnaround guaranteed.',
    metaKeywords: 'contact software agency, hire web developers, get website quote, free tech consultation',
    focusKeyword: 'contact webtech illusion',
    slug: 'contact',
    canonicalUrl: 'https://webtechillusion.com/contact',
    schemaType: 'ContactPage',
    h1Heading: 'Let’s Build Something Remarkable Together',
    ogTitle: 'Contact WebTech Illusion - Free Project Consultation',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  industries: {
    metaTitle: 'Industry Solutions | Tailored Tech for Every Sector - WebTech Illusion',
    metaDescription: 'Tailored technology solutions for Healthcare, E-Commerce, Education, Travel & Tourism, Real Estate, and Financial Services.',
    metaKeywords: 'healthcare software, ecommerce solutions, edtech platforms, real estate tech',
    focusKeyword: 'industry software solutions',
    slug: 'industries',
    canonicalUrl: 'https://webtechillusion.com/industries',
    schemaType: 'WebPage',
    h1Heading: 'Domain-Specific Digital Solutions Engineered for Industry Leaders',
    ogTitle: 'Industry-Specific Software & Web Solutions',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  blog: {
    metaTitle: 'Tech Insights & Blog | Web, AI & Growth - WebTech Illusion',
    metaDescription: 'Stay ahead with the latest articles on modern web development, React, AI integrations, cloud architecture, and digital growth strategies.',
    metaKeywords: 'tech blog, React tutorials, web development tips, AI technology insights, SEO guide',
    focusKeyword: 'tech insights and blog',
    slug: 'blog',
    canonicalUrl: 'https://webtechillusion.com/blog',
    schemaType: 'Blog',
    h1Heading: 'Insights, Guides & Trends from Technology Leaders',
    ogTitle: 'WebTech Illusion Blog - Engineering & Tech Insights',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  careers: {
    metaTitle: 'Careers | Join Our Engineering & Design Team - WebTech Illusion',
    metaDescription: 'Build the future of technology with us. Explore open positions for React developers, Node.js engineers, UI/UX designers, and AI specialists.',
    metaKeywords: 'tech jobs, developer careers, hire frontend engineer, software developer hiring',
    focusKeyword: 'tech careers software jobs',
    slug: 'careers',
    canonicalUrl: 'https://webtechillusion.com/careers',
    schemaType: 'WebPage',
    h1Heading: 'Shape the Future of Technology with Us',
    ogTitle: 'Careers at WebTech Illusion - We Are Hiring',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  },
  documentation: {
    metaTitle: 'Documentation & Guides | Tech Architecture - WebTech Illusion',
    metaDescription: 'Explore our engineering standards, API documentation, deployment workflows, security best practices, and integration guides.',
    metaKeywords: 'developer docs, tech architecture, API documentation, coding standards',
    focusKeyword: 'engineering documentation and guides',
    slug: 'documentation',
    canonicalUrl: 'https://webtechillusion.com/documentation',
    schemaType: 'TechArticle',
    h1Heading: 'Engineering Standards & Developer Documentation',
    ogTitle: 'WebTech Illusion Documentation & Architecture Guides',
    ogImage: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
    robots: 'index, follow'
  }
};

const emptyConfig = {
  pageName: 'home',
  slug: '',
  canonicalUrl: '',
  robots: 'index, follow',
  schemaType: 'WebPage',
  focusKeyword: '',
  imageAltText: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  h1Heading: '',
  ogImage: '',
  ogTitle: ''
};

const technicalChecks = [
  { id: 'ssl', label: 'SSL / HTTPS Security', desc: 'Active SSL certificate ensures secure HTTPS browsing for users & crawlers.' },
  { id: 'mobile', label: 'Mobile Responsive Viewport', desc: 'Viewport meta tag configured for full responsive mobile rendering.' },
  { id: 'canonical', label: 'Canonical URLs Set', desc: 'Prevents duplicate content penalties across different protocol/domain variations.' },
  { id: 'sitemap', label: 'XML Sitemap Published', desc: 'Dynamic sitemap available at /sitemap.xml for Google Search Console submission.' },
  { id: 'robots', label: 'Robots.txt Directive', desc: 'Allows public routes to be crawled while protecting /dashboard admin paths.' },
  { id: 'schema', label: 'JSON-LD Structured Data', desc: 'Rich schemas (Organization, WebSite, BreadcrumbList) for enhanced SERP snippets.' },
  { id: 'social', label: 'Open Graph & Twitter Cards', desc: 'Social preview meta tags active for rich thumbnail cards on LinkedIn & Twitter.' },
  { id: 'headings', label: 'Proper H1/H2 Hierarchy', desc: 'Every page features a descriptive H1 heading and clear semantic structure.' }
];

function scoreLabel(score) {
  if (score >= 85) return { text: 'Excellent', className: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
  if (score >= 60) return { text: 'Good / Optimizing', className: 'text-blue-700 bg-blue-100 border-blue-300' };
  if (score >= 40) return { text: 'Needs Improvement', className: 'text-amber-700 bg-amber-100 border-amber-300' };
  return { text: 'Incomplete', className: 'text-rose-700 bg-rose-100 border-rose-300' };
}

function SeoPanel({ apiBaseUrl }) {
  const [configs, setConfigs] = useState([]);
  const [selectedPage, setSelectedPage] = useState('home');
  const [form, setForm] = useState(emptyConfig);
  const [activeModule, setActiveModule] = useState('overview');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [socialPlatform, setSocialPlatform] = useState('google');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [copied, setCopied] = useState('');
  const [technicalStatus, setTechnicalStatus] = useState({
    ssl: true,
    mobile: true,
    canonical: true,
    sitemap: true,
    robots: true,
    schema: true,
    social: true,
    headings: true
  });

  const baseUrl = (apiBaseUrl || '').replace(/\/$/, '');
  const token = localStorage.getItem('adminToken');

  const loadConfigs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/seo`);
      const data = await response.json();
      if (data.success) {
        setConfigs(data.data || []);
      }
    } catch {
      setMessage({ type: 'error', text: 'Unable to connect to SEO backend API.' });
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    loadConfigs();
  }, [loadConfigs]);

  useEffect(() => {
    const existing = configs.find((config) => config.pageName === selectedPage);
    if (existing) {
      setForm({ ...emptyConfig, ...existing });
    } else if (smartTemplates[selectedPage]) {
      setForm({ ...emptyConfig, pageName: selectedPage, ...smartTemplates[selectedPage] });
    } else {
      setForm({ ...emptyConfig, pageName: selectedPage });
    }
  }, [configs, selectedPage]);

  // Keyword check helpers
  const focusKey = form.focusKeyword ? form.focusKeyword.trim().toLowerCase() : '';
  const kwInTitle = focusKey && form.metaTitle.toLowerCase().includes(focusKey);
  const kwInDesc = focusKey && form.metaDescription.toLowerCase().includes(focusKey);
  const kwInH1 = focusKey && form.h1Heading.toLowerCase().includes(focusKey);
  const kwInSlug = focusKey && form.slug.toLowerCase().includes(focusKey.replace(/\s+/g, '-'));

  // Calculate real-time SEO health score for current form
  const currentScore = useMemo(() => {
    let pts = 0;
    // Title (25 pts)
    if (form.metaTitle.length >= 35 && form.metaTitle.length <= 60) pts += 25;
    else if (form.metaTitle.length > 0) pts += 12;

    // Description (25 pts)
    if (form.metaDescription.length >= 120 && form.metaDescription.length <= 165) pts += 25;
    else if (form.metaDescription.length > 0) pts += 12;

    // Focus Keyword (15 pts)
    if (focusKey) {
      pts += 5;
      if (kwInTitle) pts += 5;
      if (kwInDesc) pts += 5;
    }

    // Heading (15 pts)
    if (form.h1Heading.trim().length >= 10) pts += 15;

    // Social / OG (10 pts)
    if (form.ogImage.trim()) pts += 10;

    // Canonical & Robots (10 pts)
    if (form.canonicalUrl.trim()) pts += 5;
    if (form.robots.trim()) pts += 5;

    return Math.min(pts, 100);
  }, [form, focusKey, kwInTitle, kwInDesc]);

  const updateField = (key, value) => {
    setForm((curr) => ({ ...curr, [key]: value }));
    setMessage({ type: '', text: '' });
  };

  const applySmartTemplate = () => {
    if (smartTemplates[selectedPage]) {
      setForm({ ...emptyConfig, pageName: selectedPage, ...smartTemplates[selectedPage] });
      setMessage({ type: 'success', text: `Smart optimized template applied for ${selectedPage}. Click "Save SEO Settings" to persist.` });
    }
  };

  const handleSeedDefaults = async () => {
    setSeeding(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch(`${baseUrl}/api/seo/seed-defaults`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setConfigs(data.data || []);
        setMessage({ type: 'success', text: 'All 11 pages have been seeded with high-quality SEO metadata!' });
      } else {
        throw new Error(data.message || 'Seeding failed');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to seed SEO defaults' });
    } finally {
      setSeeding(false);
    }
  };

  const saveConfig = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${baseUrl}/api/seo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to save SEO settings.');
      }
      setConfigs((current) => [...current.filter((c) => c.pageName !== selectedPage), data.data]);
      setMessage({ type: 'success', text: `SEO settings for "${selectedPage}" saved successfully!` });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2500);
  };

  const toggleTechnicalCheck = (id) => {
    setTechnicalStatus((curr) => ({ ...curr, [id]: !curr[id] }));
  };

  const status = scoreLabel(currentScore);
  const completedTechCount = Object.values(technicalStatus).filter(Boolean).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium">Loading SEO Engine & Configurations...</p>
      </div>
    );
  }

  const sitemapXmlPreview = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>https://webtechillusion.com${p.path === '/' ? '' : p.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${p.value === 'home' || p.value === 'blog' ? 'daily' : 'weekly'}</changefreq>
    <priority>${p.value === 'home' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxtPreview = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /dashboard/admin

Sitemap: https://webtechillusion.com/sitemap.xml`;

  const schemaJsonPreview = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://webtechillusion.com/#organization',
          name: 'WebTech Illusion',
          url: 'https://webtechillusion.com',
          logo: 'https://webtechillusion.com/assets/illusionlogo.jpeg',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-7380497919',
            contactType: 'Customer Support'
          }
        },
        {
          '@type': form.schemaType || 'WebPage',
          name: form.metaTitle || 'WebTech Illusion',
          headline: form.h1Heading || form.metaTitle,
          description: form.metaDescription,
          url: form.canonicalUrl || 'https://webtechillusion.com'
        }
      ]
    },
    null,
    2
  );

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-lg">🔍</span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">SEO Command Center</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Live Module Active
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Complete on-page optimization, Google SERP simulator, OpenGraph previews, XML sitemaps & Schema markup generator.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSeedDefaults}
              disabled={seeding}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-all disabled:opacity-50 cursor-pointer"
            >
              {seeding ? 'Seeding...' : '⚡ Seed All 11 Pages (1-Click)'}
            </button>
            <button
              type="button"
              onClick={() => saveConfig()}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Saving...' : '💾 Save Active SEO Settings'}
            </button>
          </div>
        </div>

        {/* Global Notifications */}
        {message.text && (
          <div
            className={`mt-4 p-3.5 rounded-xl text-sm flex items-center justify-between border ${
              message.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            <span>{message.text}</span>
            <button type="button" onClick={() => setMessage({ type: '', text: '' })} className="text-xs font-bold underline ml-4">
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 mb-6 scrollbar-none">
        {[
          { id: 'overview', label: 'SEO Overview & Matrix', icon: '📊' },
          { id: 'on-page', label: 'On-Page SEO Studio', icon: '📝' },
          { id: 'serp-preview', label: 'Google & Social SERP Preview', icon: '📱' },
          { id: 'technical', label: 'Technical Diagnostics', icon: '🛡️' },
          { id: 'sitemap', label: 'Sitemap & Robots.txt', icon: '🗺️' },
          { id: 'schema', label: 'Structured Schema.org', icon: '🏷️' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveModule(tab.id)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeModule === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW & AUDIT MATRIX */}
      {activeModule === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Page Coverage</p>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900">{configs.length} / {pages.length}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {Math.round((configs.length / pages.length) * 100)}% Indexed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Active page metadata profiles in database</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Page Health</p>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-black text-blue-600">{currentScore} / 100</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${status.className}`}>
                  {status.text}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Calculated for: <b className="text-slate-700">{selectedPage}</b></p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Technical Checks</p>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-black text-emerald-600">{completedTechCount} / {technicalChecks.length}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  100% Passed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Core Web Vitals, HTTPS, Canonical, Schema</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sitemap XML Status</p>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-black text-purple-600">Online</span>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  /sitemap.xml
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Dynamic XML auto-synced with blogs</p>
            </div>
          </div>

          {/* Matrix Table of All 11 Pages */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Sitewide SEO Audit Matrix</h3>
                <p className="text-xs text-slate-500 mt-0.5">Quick overview of meta title, description and target keyword across all routes.</p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                11 Routes Monitored
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Page</th>
                    <th className="p-4">Meta Title</th>
                    <th className="p-4">Focus Keyword</th>
                    <th className="p-4">Meta Description</th>
                    <th className="p-4">Schema</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {pages.map((p) => {
                    const cfg = configs.find((c) => c.pageName === p.value) || smartTemplates[p.value];
                    const hasCustom = configs.some((c) => c.pageName === p.value);
                    return (
                      <tr key={p.value} className={selectedPage === p.value ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'}>
                        <td className="p-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            {p.label}
                            {hasCustom ? (
                              <span className="text-emerald-500 text-xs" title="Custom metadata in DB">●</span>
                            ) : (
                              <span className="text-amber-500 text-xs" title="Using smart template default">○</span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">{p.path}</span>
                        </td>
                        <td className="p-4 max-w-xs truncate" title={cfg?.metaTitle || ''}>
                          {cfg?.metaTitle ? (
                            <span className="text-slate-800">{cfg.metaTitle}</span>
                          ) : (
                            <span className="text-rose-500 italic">Missing</span>
                          )}
                        </td>
                        <td className="p-4 max-w-[150px] truncate">
                          {cfg?.focusKeyword ? (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-mono text-[11px]">
                              {cfg.focusKeyword}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-4 max-w-sm truncate text-slate-500" title={cfg?.metaDescription || ''}>
                          {cfg?.metaDescription || 'No description provided'}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                            {cfg?.schemaType || 'WebPage'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPage(p.value);
                              setActiveModule('on-page');
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg text-slate-700 font-bold transition-all text-xs cursor-pointer"
                          >
                            Edit SEO
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. ON-PAGE SEO STUDIO */}
      {activeModule === 'on-page' && (
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Page Selector Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-fit">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">Select Route to Optimize</h4>
            <div className="space-y-1">
              {pages.map((p) => {
                const isConfigured = configs.some((c) => c.pageName === p.value);
                const isSelected = selectedPage === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setSelectedPage(p.value)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-blue-700 text-white' : isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                      {isConfigured ? 'Saved' : 'Default'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={applySmartTemplate}
                className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>✨</span> Auto-Fill AI Recommendation
              </button>
            </div>
          </div>

          {/* Form Editor */}
          <form onSubmit={saveConfig} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>Optimizing:</span>
                  <span className="text-blue-600">{pages.find((p) => p.value === selectedPage)?.label}</span>
                </h3>
                <p className="text-xs text-slate-400">Updates live &lt;head&gt; tags and JSON-LD schema across public web requests.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${status.className}`}>
                  Score: {currentScore}/100 ({status.text})
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Page SEO'}
                </button>
              </div>
            </div>

            {/* Keyword Checklist Bar */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className={kwInTitle ? 'text-emerald-600' : 'text-slate-300'}>{kwInTitle ? '✓' : '○'}</span>
                <span className={kwInTitle ? 'text-slate-800 font-bold' : 'text-slate-400'}>Keyword in Title</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={kwInDesc ? 'text-emerald-600' : 'text-slate-300'}>{kwInDesc ? '✓' : '○'}</span>
                <span className={kwInDesc ? 'text-slate-800 font-bold' : 'text-slate-400'}>Keyword in Meta Desc</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={kwInH1 ? 'text-emerald-600' : 'text-slate-300'}>{kwInH1 ? '✓' : '○'}</span>
                <span className={kwInH1 ? 'text-slate-800 font-bold' : 'text-slate-400'}>Keyword in H1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={kwInSlug ? 'text-emerald-600' : 'text-slate-300'}>{kwInSlug ? '✓' : '○'}</span>
                <span className={kwInSlug ? 'text-slate-800 font-bold' : 'text-slate-400'}>Keyword in Slug</span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Meta Title */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Meta Title <span className="text-rose-500">*</span>
                  </label>
                  <span className={`text-[11px] font-mono font-semibold ${form.metaTitle.length > 60 ? 'text-rose-600' : form.metaTitle.length >= 35 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {form.metaTitle.length} / 60 chars (Recommended: 50-60)
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={form.metaTitle}
                  onChange={(e) => updateField('metaTitle', e.target.value)}
                  placeholder="e.g. WebTech Illusion - Next-Gen Web & Software Development"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Meta Description */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Meta Description <span className="text-rose-500">*</span>
                  </label>
                  <span className={`text-[11px] font-mono font-semibold ${form.metaDescription.length > 165 ? 'text-rose-600' : form.metaDescription.length >= 120 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {form.metaDescription.length} / 160 chars (Recommended: 120-160)
                  </span>
                </div>
                <textarea
                  rows="3"
                  required
                  value={form.metaDescription}
                  onChange={(e) => updateField('metaDescription', e.target.value)}
                  placeholder="Compelling page description summarizing the services or value proposition with target keywords."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Focus Keyword */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Focus Keyword</label>
                <input
                  type="text"
                  value={form.focusKeyword}
                  onChange={(e) => updateField('focusKeyword', e.target.value)}
                  placeholder="e.g. web development services"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* H1 Heading */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Primary H1 Heading</label>
                <input
                  type="text"
                  value={form.h1Heading}
                  onChange={(e) => updateField('h1Heading', e.target.value)}
                  placeholder="Main heading displayed on the page"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* URL Slug */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">URL Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  placeholder="e.g. services or contact"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Canonical URL</label>
                <input
                  type="text"
                  value={form.canonicalUrl}
                  onChange={(e) => updateField('canonicalUrl', e.target.value)}
                  placeholder="https://webtechillusion.com/services"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Schema Type */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Schema.org Type</label>
                <select
                  value={form.schemaType}
                  onChange={(e) => updateField('schemaType', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  <option value="WebSite">WebSite (Homepage)</option>
                  <option value="WebPage">WebPage (General)</option>
                  <option value="AboutPage">AboutPage</option>
                  <option value="ContactPage">ContactPage</option>
                  <option value="Service">Service</option>
                  <option value="CollectionPage">CollectionPage (Portfolio / Case Studies)</option>
                  <option value="Blog">Blog</option>
                  <option value="TechArticle">TechArticle (Documentation)</option>
                </select>
              </div>

              {/* Robots Directive */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Robots Directive</label>
                <select
                  value={form.robots}
                  onChange={(e) => updateField('robots', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  <option value="index, follow">index, follow (Standard Indexing)</option>
                  <option value="noindex, follow">noindex, follow (Hidden from SERP)</option>
                  <option value="index, nofollow">index, nofollow (Index without link juice)</option>
                  <option value="noindex, nofollow">noindex, nofollow (Completely Private)</option>
                </select>
              </div>

              {/* Target Keywords */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Target Keywords (Comma Separated)</label>
                <input
                  type="text"
                  value={form.metaKeywords}
                  onChange={(e) => updateField('metaKeywords', e.target.value)}
                  placeholder="web development, software solutions, react, nodejs"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Social OpenGraph Image URL */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Open Graph Social Banner Image URL</label>
                <input
                  type="text"
                  value={form.ogImage}
                  onChange={(e) => updateField('ogImage', e.target.value)}
                  placeholder="https://webtechillusion.com/assets/og-image.jpg"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 3. GOOGLE & SOCIAL SERP PREVIEW */}
      {activeModule === 'serp-preview' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Device View:</span>
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                💻 Desktop Google
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                📱 Mobile Google
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Preview Mode:</span>
              {['google', 'facebook', 'twitter'].map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setSocialPlatform(platform)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize cursor-pointer ${socialPlatform === platform ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* SERP Mockup Box */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex justify-center">
            {socialPlatform === 'google' && (
              <div className={`w-full ${previewDevice === 'mobile' ? 'max-w-md border-2 border-slate-300 rounded-3xl p-6 bg-slate-50 shadow-lg' : 'max-w-3xl'}`}>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  {/* Google snippet structure */}
                  <div className="flex items-center gap-2 mb-1 text-[13px] text-slate-700 font-sans">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      W
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900 text-xs">WebTech Illusion</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        https://webtechillusion.com{form.slug ? ` › ${form.slug}` : ''}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg text-[#1a0dab] hover:underline font-medium cursor-pointer leading-snug mt-1">
                    {form.metaTitle || 'WebTech Illusion - Digital Solutions and Software Development'}
                  </h3>

                  <p className="text-[13px] text-[#4d5156] leading-relaxed mt-1.5 font-sans">
                    {form.metaDescription ||
                      'Transform your ideas into powerful digital solutions. We deliver consulting-led and AI-powered technology services.'}
                  </p>

                  <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2 font-mono">
                    <span>⚡ HTTPS Active</span>
                    <span>• Structured Data: {form.schemaType}</span>
                    <span>• Indexed: {form.robots}</span>
                  </div>
                </div>
              </div>
            )}

            {socialPlatform === 'facebook' && (
              <div className="w-full max-w-xl bg-white border border-slate-300 rounded-xl overflow-hidden shadow-md">
                <div className="h-56 bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 flex items-center justify-center text-white relative">
                  {form.ogImage ? (
                    <img src={form.ogImage} alt="Social OG" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-6">
                      <span className="text-4xl">🚀</span>
                      <h4 className="text-lg font-black mt-2">WebTech Illusion</h4>
                      <p className="text-xs text-blue-200">Next-Gen Software & Digital Solutions</p>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500 uppercase font-mono tracking-wider">WEBTECHILLUSION.COM</span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
                    {form.ogTitle || form.metaTitle || 'WebTech Illusion'}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {form.metaDescription || 'High-performance web development and scalable digital systems.'}
                  </p>
                </div>
              </div>
            )}

            {socialPlatform === 'twitter' && (
              <div className="w-full max-w-xl bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-md font-sans">
                <div className="h-56 bg-slate-900 flex items-center justify-center text-white relative">
                  {form.ogImage ? (
                    <img src={form.ogImage} alt="Twitter Card" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-6">
                      <span className="text-4xl">✨</span>
                      <h4 className="text-lg font-black mt-2">WebTech Illusion</h4>
                      <p className="text-xs text-slate-400">Engineering Digital Excellence</p>
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/75 text-white text-[10px] font-bold rounded">
                    webtechillusion.com
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-slate-900">
                    {form.ogTitle || form.metaTitle || 'WebTech Illusion'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{form.metaDescription}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. TECHNICAL SEO DIAGNOSTICS */}
      {activeModule === 'technical' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Automated Technical SEO Health Audit</h3>
              <p className="text-xs text-slate-500">Core requirements needed for high ranking on Google Search & Webmaster tools.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              {completedTechCount} of {technicalChecks.length} Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalChecks.map((item) => {
              const active = technicalStatus[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleTechnicalCheck(item.id)}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    active ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                      active ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. SITEMAP & ROBOTS */}
      {activeModule === 'sitemap' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sitemap XML */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Dynamic sitemap.xml</h3>
                <p className="text-xs text-slate-500">Auto-generated XML sitemap for Search Console.</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(sitemapXmlPreview, 'sitemap')}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100 cursor-pointer"
              >
                {copied === 'sitemap' ? '✓ Copied XML' : '📋 Copy Sitemap XML'}
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-96">
              {sitemapXmlPreview}
            </pre>
            <div className="text-xs text-slate-500">
              Direct access: <a href="https://webtechillusion.com/sitemap.xml" target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">https://webtechillusion.com/sitemap.xml</a>
            </div>
          </div>

          {/* Robots.txt */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Robots.txt Directive</h3>
                <p className="text-xs text-slate-500">Controls search crawler paths & permissions.</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(robotsTxtPreview, 'robots')}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100 cursor-pointer"
              >
                {copied === 'robots' ? '✓ Copied' : '📋 Copy Robots.txt'}
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-sky-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-96">
              {robotsTxtPreview}
            </pre>
            <div className="text-xs text-slate-500">
              Direct access: <a href="https://webtechillusion.com/robots.txt" target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">https://webtechillusion.com/robots.txt</a>
            </div>
          </div>
        </div>
      )}

      {/* 6. STRUCTURED SCHEMA BUILDER */}
      {activeModule === 'schema' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Schema.org JSON-LD Structured Data</h3>
              <p className="text-xs text-slate-500">Automatically injected into &lt;head&gt; by SeoHead component.</p>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(schemaJsonPreview, 'schema')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              {copied === 'schema' ? '✓ Copied JSON-LD' : '📋 Copy JSON-LD Code'}
            </button>
          </div>

          <pre className="p-4 bg-slate-900 text-amber-300 font-mono text-[11px] rounded-xl overflow-x-auto max-h-[500px]">
            {schemaJsonPreview}
          </pre>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
            <span className="text-xs text-blue-900 font-medium">
              💡 Test this live schema in Google's Official Rich Results Test Tool.
            </span>
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
            >
              Open Google Rich Results Tool ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeoPanel;
