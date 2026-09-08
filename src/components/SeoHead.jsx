import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');

const pageNames = {
  '/': 'home',
  '/about': 'about',
  '/services': 'services',
  '/projects': 'projects',
  '/team': 'team',
  '/contact': 'contact',
  '/industries': 'industries',
  '/careers': 'careers',
  '/case-studies': 'case-studies',
  '/documentation': 'documentation',
  '/blog': 'blog'
};

const defaults = {
  home: {
    title: 'WebTech Illusion - Digital Solutions and Software Development',
    description: 'Web development, mobile applications, digital marketing and cloud solutions by WebTech Illusion.',
    type: 'WebSite'
  },
  blog: {
    title: 'WebTech Illusion Blog - Technology and Digital Marketing Insights',
    description: 'Expert insights on web development, design, technology and digital marketing.',
    type: 'Blog'
  }
};

function setMeta(attribute, value, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function SeoHead() {
  const { pathname } = useLocation();
  const pageName = pageNames[pathname] || (pathname.startsWith('/blog') ? 'blog' : 'home');
  const [seoState, setSeoState] = useState({ pageName: null, data: null });

  useEffect(() => {
    let active = true;

    fetch(`${API_BASE_URL}/api/seo/${pageName}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (active) setSeoState({ pageName, data: result?.success ? result.data : null });
      })
      .catch(() => {
        if (active) setSeoState({ pageName, data: null });
      });

    return () => {
      active = false;
    };
  }, [pageName]);

  const seoData = seoState.pageName === pageName ? seoState.data : null;

  useEffect(() => {
    const fallback = defaults[pageName] || {
      title: `${pageName.replace('-', ' ')} | WebTech Illusion`,
      description: 'WebTech Illusion builds practical digital products and growth solutions.',
      type: 'WebPage'
    };
    const title = seoData?.metaTitle || fallback.title;
    const description = seoData?.metaDescription || fallback.description;
    const url = seoData?.canonicalUrl || `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    const robots = seoData?.robots || 'index, follow';
    const image = seoData?.ogImage;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', seoData?.metaKeywords);
    setMeta('name', 'robots', robots);
    setMeta('name', 'author', 'WebTech Illusion');
    setMeta('property', 'og:title', seoData?.ogTitle || title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', pageName === 'blog' ? 'website' : 'website');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:site_name', 'WebTech Illusion');
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', seoData?.ogTitle || title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    let canonical = document.head.querySelector('link[data-seo-canonical]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('data-seo-canonical', 'true');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    let schema = document.head.querySelector('script[data-seo-schema]');
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.setAttribute('data-seo-schema', 'true');
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': seoData?.schemaType || fallback.type,
      name: title,
      headline: seoData?.h1Heading || title,
      description,
      url,
      image: image || undefined,
      keywords: seoData?.focusKeyword || seoData?.metaKeywords || undefined,
      publisher: {
        '@type': 'Organization',
        name: 'WebTech Illusion',
        url: SITE_URL
      }
    });
  }, [pageName, pathname, seoData]);

  return null;
}

export default SeoHead;
