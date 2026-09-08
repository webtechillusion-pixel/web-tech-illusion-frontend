import { useCallback, useEffect, useMemo, useState } from 'react';

const pages = [
  { value: 'home', label: 'Home' },
  { value: 'about', label: 'About' },
  { value: 'services', label: 'Services' },
  { value: 'projects', label: 'Projects' },
  { value: 'team', label: 'Team' },
  { value: 'contact', label: 'Contact' },
  { value: 'industries', label: 'Industries' },
  { value: 'careers', label: 'Careers' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'blog', label: 'Blog' }
];

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
  ogTitle: '',
  ogImageLink: '',
  metaTitleLink: '',
  metaDescriptionLink: '',
  metaKeywordsLink: '',
  h1HeadingLink: ''
};

const fields = [
  { key: 'slug', label: 'URL slug', hint: 'Example: web-development-services' },
  { key: 'canonicalUrl', label: 'Canonical URL', hint: 'Preferred absolute page URL' },
  { key: 'robots', label: 'Robots directive', hint: 'Example: index, follow' },
  { key: 'schemaType', label: 'Schema type', hint: 'Example: WebPage, Article, Service' },
  { key: 'focusKeyword', label: 'Focus keyword', hint: 'Primary keyword for this page' },
  { key: 'imageAltText', label: 'Default image alt text', hint: 'Descriptive alt text for the page image' },
  { key: 'metaTitle', label: 'Meta title', hint: 'Recommended: 50-60 characters', maxLength: 60, required: true },
  { key: 'metaDescription', label: 'Meta description', hint: 'Recommended: 120-160 characters', maxLength: 160, multiline: true },
  { key: 'metaKeywords', label: 'Target keywords', hint: 'Comma-separated keywords' },
  { key: 'h1Heading', label: 'H1 heading', hint: 'Use one clear primary heading' },
  { key: 'ogTitle', label: 'Open Graph title', hint: 'Social sharing title' },
  { key: 'ogImage', label: 'Open Graph image URL', hint: 'Absolute image URL' },
  { key: 'ogImageLink', label: 'Open Graph image link', hint: 'Optional click-through URL' },
  { key: 'metaTitleLink', label: 'Meta title source link', hint: 'Optional reference URL' },
  { key: 'metaDescriptionLink', label: 'Meta description source link', hint: 'Optional reference URL' },
  { key: 'metaKeywordsLink', label: 'Keywords source link', hint: 'Optional reference URL' },
  { key: 'h1HeadingLink', label: 'H1 source link', hint: 'Optional reference URL' }
];

const technicalChecks = [
  ['SSL / HTTPS', 'Live site must use HTTPS and redirect HTTP traffic.'],
  ['Mobile friendly', 'Verify responsive layouts at mobile breakpoints.'],
  ['XML sitemap', 'Publish /sitemap.xml and submit it to Search Console.'],
  ['Robots.txt', 'Allow important routes and block private dashboard routes.'],
  ['Canonical URLs', 'Use one canonical URL for every indexable page.'],
  ['Structured data', 'Validate Organization, LocalBusiness and Article schema.'],
  ['Broken links', 'Run a crawl and fix 4xx links before publishing.'],
  ['Core Web Vitals', 'Monitor LCP, INP and CLS in PageSpeed Insights.']
];

function scoreLabel(score) {
  if (score >= 80) return { text: 'Healthy', className: 'text-green-700 bg-green-100' };
  if (score >= 50) return { text: 'Needs work', className: 'text-yellow-700 bg-yellow-100' };
  return { text: 'Incomplete', className: 'text-red-700 bg-red-100' };
}

function SeoPanel({ apiBaseUrl }) {
  const [configs, setConfigs] = useState([]);
  const [selectedPage, setSelectedPage] = useState('home');
  const [form, setForm] = useState(emptyConfig);
  const [activeModule, setActiveModule] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [technicalStatus, setTechnicalStatus] = useState({});
  const token = localStorage.getItem('adminToken');

  const loadConfigs = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}api/seo`);
      const data = await response.json();
      if (data.success) setConfigs(data.data || []);
    } catch {
      setMessage('Unable to load SEO settings.');
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    loadConfigs();
  }, [loadConfigs]);

  useEffect(() => {
    const existing = configs.find((config) => config.pageName === selectedPage);
    setForm({ ...emptyConfig, pageName: selectedPage, ...(existing || {}) });
  }, [configs, selectedPage]);

  const score = useMemo(() => {
    const checks = [
      form.metaTitle.length >= 30 && form.metaTitle.length <= 60,
      form.metaDescription.length >= 120 && form.metaDescription.length <= 160,
      Boolean(form.metaKeywords.trim()),
      Boolean(form.h1Heading.trim()),
      Boolean(form.slug.trim()),
      Boolean(form.canonicalUrl.trim()),
      Boolean(form.ogTitle.trim()),
      Boolean(form.ogImage.trim())
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [form]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage('');
  };

  const saveConfig = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch(`${apiBaseUrl}api/seo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to save SEO settings.');
      setConfigs((current) => [...current.filter((config) => config.pageName !== selectedPage), data.data]);
      setMessage('SEO settings saved successfully.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleTechnicalCheck = (label) => {
    setTechnicalStatus((current) => ({ ...current, [label]: !current[label] }));
  };

  const status = scoreLabel(score);
  const completedTechnical = Object.values(technicalStatus).filter(Boolean).length;

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading SEO settings...</div>;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <i className="fas fa-search mr-2 text-blue-600"></i> SEO Control Panel
          </h3>
          <p className="text-sm text-gray-500 mt-1">Manage page metadata and track the first SEO health checks.</p>
        </div>
        <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>
          {status.text} · {score}/100
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-gray-200 mb-6">
        {[
          ['overview', 'Overview', 'fa-chart-line'],
          ['on-page', 'On-Page SEO', 'fa-file-alt'],
          ['technical', 'Technical SEO', 'fa-cogs'],
          ['integrations', 'Integrations', 'fa-plug']
        ].map(([value, label, icon]) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveModule(value)}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${activeModule === value ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            <i className={`fas ${icon} mr-2`}></i>{label}
          </button>
        ))}
      </div>

      {activeModule === 'overview' && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm text-blue-700">Configured pages</p>
            <p className="mt-2 text-3xl font-bold text-blue-950">{configs.length}/{pages.length}</p>
            <p className="mt-2 text-xs text-blue-700">Page-level metadata records in the backend</p>
          </div>
          <div className="rounded-xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm text-green-700">Current page score</p>
            <p className="mt-2 text-3xl font-bold text-green-950">{score}/100</p>
            <p className="mt-2 text-xs text-green-700">Based on title, description, headings and social fields</p>
          </div>
          <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
            <p className="text-sm text-orange-700">Technical checks</p>
            <p className="mt-2 text-3xl font-bold text-orange-950">{completedTechnical}/{technicalChecks.length}</p>
            <p className="mt-2 text-xs text-orange-700">Mark checks after validating the live site</p>
          </div>
          <div className="md:col-span-3 rounded-xl border border-gray-200 bg-white p-5">
            <h4 className="font-semibold text-gray-900">Quick actions</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => setActiveModule('on-page')} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Edit page SEO</button>
              <button type="button" onClick={() => setActiveModule('technical')} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Run technical checklist</button>
              <button type="button" onClick={loadConfigs} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Refresh data</button>
            </div>
          </div>
        </div>
      )}

      {activeModule === 'on-page' && (
        <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
            <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Pages</p>
            <div className="space-y-1">
              {pages.map((page) => (
                <button key={page.value} type="button" onClick={() => setSelectedPage(page.value)} className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${selectedPage === page.value ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-white'}`}>
                  {page.label}
                  {configs.some((config) => config.pageName === page.value) && <span className="float-right text-xs">✓</span>}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={saveConfig} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-semibold text-gray-900">{pages.find((page) => page.value === selectedPage)?.label} metadata</h4>
                <p className="text-xs text-gray-500">Saved to the SEO collection and available publicly through the API.</p>
              </div>
              <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save SEO settings'}</button>
            </div>
            {message && <div className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">{message}</div>}
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <label key={field.key} className={field.multiline ? 'md:col-span-2' : ''}>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">{field.label}{field.required && ' *'}</span>
                  {field.multiline ? (
                    <textarea required={field.required} maxLength={field.maxLength} rows="4" value={form[field.key]} onChange={(event) => updateField(field.key, event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                  ) : (
                    <input required={field.required} maxLength={field.maxLength} type="text" value={form[field.key]} onChange={(event) => updateField(field.key, event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                  )}
                  <span className="mt-1 block text-xs text-gray-500">{field.hint}{field.maxLength ? ` · ${form[field.key].length}/${field.maxLength}` : ''}</span>
                </label>
              ))}
            </div>
          </form>
        </div>
      )}

      {activeModule === 'technical' && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div><h4 className="font-semibold text-gray-900">Technical SEO checklist</h4><p className="text-sm text-gray-500">Record verified checks for the current site.</p></div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">{completedTechnical}/{technicalChecks.length} complete</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {technicalChecks.map(([label, description]) => (
              <button key={label} type="button" onClick={() => toggleTechnicalCheck(label)} className={`flex items-start gap-3 rounded-lg border p-4 text-left ${technicalStatus[label] ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'}`}>
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${technicalStatus[label] ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 text-transparent'}`}>✓</span>
                <span><span className="block text-sm font-semibold text-gray-900">{label}</span><span className="mt-1 block text-xs text-gray-500">{description}</span></span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeModule === 'integrations' && (
        <div className="grid gap-4 md:grid-cols-2">
          {['Google Search Console', 'Google Analytics 4', 'Google Business Profile', 'PageSpeed Insights', 'Ahrefs / SEMrush / Moz', 'Email / WhatsApp reports'].map((name) => (
            <div key={name} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between"><h4 className="font-semibold text-gray-900">{name}</h4><span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">Not connected</span></div>
              <p className="mt-2 text-sm text-gray-500">Connect credentials and API scopes to enable live {name} data.</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SeoPanel;
