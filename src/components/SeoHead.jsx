import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL, buildApiUrl } from '../config/api';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://webtechillusion.com').replace(/\/$/, '');

const pageNames = {
  '/': 'home',
  '/about': 'about',
  '/services': 'services',
  '/projects': 'projects',
  '/team': 'team',
  '/contact': 'contact',
  '/industries': 'industries',
  '/careers': 'careers',
  '/services/web-development': 'services',
  '/services/mobile-app-development': 'services',
  '/services/e-commerce-solutions': 'services',
  '/services/digital-marketing': 'services',
  '/services/cloud-services': 'services',
  '/industries/healthcare': 'industries',
  '/industries/e-commerce': 'industries',
  '/industries/education': 'industries',
  '/industries/travel-tourism': 'industries',
  '/industries/real-estate': 'industries',
  '/case-studies': 'case-studies',
  '/documentation': 'documentation',
  '/blog': 'blog'
};

const defaultSeo = {
  home: {
    metaTitle: 'Best Software Company in Lucknow | Web Development, App Development & Digital Marketing',
    metaDescription: 'WebTech Illusion is the best software company in Lucknow for web development, mobile app development, AI solutions, SEO, and digital marketing services that grow businesses.',
    metaKeywords: 'best software company in lucknow, software company in lucknow, web development company in lucknow, digital marketing agency in lucknow, mobile app development, SEO services, UI/UX design, AI solutions',
    schemaType: 'WebSite',
    h1Heading: 'Best Software Company in Lucknow for Digital Growth',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  about: {
    metaTitle: 'About WebTech Illusion | Best Software Company in Lucknow',
    metaDescription: 'Learn about WebTech Illusion, a leading software company in Lucknow helping ambitious brands grow with web, app, AI, and digital marketing solutions.',
    metaKeywords: 'about webtech illusion, software company in lucknow, digital marketing agency in lucknow, web design company in lucknow, software team',
    schemaType: 'AboutPage',
    h1Heading: 'Pioneering Digital Excellence with Passion and Precision',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  services: {
    metaTitle: 'Web Development, Mobile Apps & Digital Marketing Services in Lucknow | WebTech Illusion',
    metaDescription: 'WebTech Illusion provides web development, mobile app development, digital marketing, SEO, and cloud services in Lucknow for businesses that want growth and visibility.',
    metaKeywords: 'best software company in lucknow, digital marketing agency in lucknow, web development company in lucknow, mobile app development, SEO services, cloud services',
    schemaType: 'Service',
    h1Heading: 'Comprehensive Digital Capabilities Built for Modern Scale',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  projects: {
    metaTitle: 'Projects & Case Studies | Proven Digital Results - WebTech Illusion',
    metaDescription: 'Explore our portfolio of delivered web applications, mobile apps, e-commerce stores, and enterprise solutions with verified client growth results.',
    metaKeywords: 'portfolio, software projects, web apps case studies, client success stories',
    schemaType: 'CollectionPage',
    h1Heading: 'Showcasing Breakthrough Digital Solutions & Client Success',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  team: {
    metaTitle: 'Meet the Team | Experts, Engineers & Designers - WebTech Illusion',
    metaDescription: 'Meet the talented engineers, architects, designers, and growth specialists driving innovation and delivering exceptional products at WebTech Illusion.',
    metaKeywords: 'tech team, software engineers, UI/UX designers, leadership, WebTech Illusion team',
    schemaType: 'AboutPage',
    h1Heading: 'The Minds and Craftsmen Behind Every Breakthrough',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  contact: {
    metaTitle: 'Contact WebTech Illusion | Best Software Company in Lucknow',
    metaDescription: 'Get in touch with WebTech Illusion for web development, mobile apps, SEO, and digital marketing services in Lucknow and across India.',
    metaKeywords: 'contact software company in lucknow, digital marketing agency in lucknow, web development company in lucknow, hire web developers, tech consultation',
    schemaType: 'ContactPage',
    h1Heading: 'Let’s Build Something Remarkable Together',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  industries: {
    metaTitle: 'Industry Solutions | Tech, SEO & Digital Growth for Every Sector - WebTech Illusion',
    metaDescription: 'WebTech Illusion builds digital solutions for healthcare, e-commerce, education, travel, and real estate businesses with performance-driven software and digital marketing.',
    metaKeywords: 'best software company in lucknow, digital marketing agency in lucknow, healthcare software, ecommerce solutions, edtech platforms, real estate tech',
    schemaType: 'WebPage',
    h1Heading: 'Domain-Specific Digital Solutions Engineered for Industry Leaders',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  careers: {
    metaTitle: 'Careers | Join Our Engineering & Design Team - WebTech Illusion',
    metaDescription: 'Build the future of technology with us. Explore open positions for React developers, Node.js engineers, UI/UX designers, and AI specialists.',
    metaKeywords: 'tech jobs, developer careers, hire frontend engineer, software developer hiring',
    schemaType: 'WebPage',
    h1Heading: 'Shape the Future of Technology with Us',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  'case-studies': {
    metaTitle: 'Case Studies | Measurable Digital Impact - WebTech Illusion',
    metaDescription: 'In-depth case studies showcasing how we helped brands achieve 200%+ revenue growth, sub-second load times, and massive user scale.',
    metaKeywords: 'digital transformation case studies, ecommerce growth study, web performance case study',
    schemaType: 'CollectionPage',
    h1Heading: 'Real Challenges. Bold Engineering. Measurable Results.',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  documentation: {
    metaTitle: 'Documentation & Guides | Tech Architecture - WebTech Illusion',
    metaDescription: 'Explore our engineering standards, API documentation, deployment workflows, security best practices, and integration guides.',
    metaKeywords: 'developer docs, tech architecture, API documentation, coding standards',
    schemaType: 'TechArticle',
    h1Heading: 'Engineering Standards & Developer Documentation',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  },
  blog: {
    metaTitle: 'Tech Insights & Blog | Web, AI & Growth - WebTech Illusion',
    metaDescription: 'Stay ahead with the latest articles on modern web development, React, AI integrations, cloud architecture, and digital growth strategies.',
    metaKeywords: 'tech blog, React tutorials, web development tips, AI technology insights, SEO guide',
    schemaType: 'Blog',
    h1Heading: 'Insights, Guides & Trends from Technology Leaders',
    ogImage: `${SITE_URL}/assets/illusionlogo.jpeg`,
    robots: 'index, follow'
  }
};

function setMetaTag(attribute, key, content) {
  if (content === undefined || content === null) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
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
    fetch(buildApiUrl(`api/seo/${pageName}`))
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
    const fallback = defaultSeo[pageName] || defaultSeo.home;
    const title = seoData?.metaTitle || fallback.metaTitle;
    const description = seoData?.metaDescription || fallback.metaDescription;
    const keywords = seoData?.metaKeywords || fallback.metaKeywords;
    const canonicalHref = seoData?.canonicalUrl || `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    const robots = seoData?.robots || fallback.robots || 'index, follow';
    const ogImage = seoData?.ogImage || fallback.ogImage;
    const ogTitle = seoData?.ogTitle || title;
    const schemaType = seoData?.schemaType || fallback.schemaType || 'WebPage';

    // Set Document Title
    document.title = title;

    // Standard SEO Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', robots);
    setMetaTag('name', 'author', 'WebTech Illusion');
    setMetaTag('name', 'theme-color', '#2563eb');

    // OpenGraph Meta Tags
    setMetaTag('property', 'og:title', ogTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', pageName === 'blog' ? 'article' : 'website');
    setMetaTag('property', 'og:url', canonicalHref);
    setMetaTag('property', 'og:site_name', 'WebTech Illusion');
    setMetaTag('property', 'og:locale', 'en_US');
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
      setMetaTag('property', 'og:image:alt', seoData?.imageAltText || title);
    }

    // Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', ogTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:site', '@WebTechIllusion');
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // Canonical Link
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    // Multi-Schema JSON-LD Structured Data
    let schemaScript = document.head.querySelector('script[data-seo-schema="true"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-seo-schema', 'true');
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'WebTech Illusion',
          url: SITE_URL,
          logo: `${SITE_URL}/assets/illusionlogo.jpeg`,
          description: 'Premier Digital Solutions and Software Development Agency',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-7380497919',
            contactType: 'Customer Support',
            email: 'info@webtechillusion.com',
            availableLanguage: ['English', 'Hindi']
          },
          sameAs: [
            'https://linkedin.com/company/webtechillusion',
            'https://facebook.com/webtechillusion',
            'https://instagram.com/webtechillusion'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'WebTech Illusion',
          description: 'High-performance web development, AI integration, and digital growth solutions.',
          publisher: {
            '@id': `${SITE_URL}/#organization`
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': schemaType,
          '@id': `${canonicalHref}/#webpage`,
          url: canonicalHref,
          name: title,
          headline: seoData?.h1Heading || title,
          description,
          inLanguage: 'en-US',
          isPartOf: {
            '@id': `${SITE_URL}/#website`
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL
              },
              ...(pathname !== '/'
                ? [
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: pageName.charAt(0).toUpperCase() + pageName.slice(1).replace('-', ' '),
                      item: canonicalHref
                    }
                  ]
                : [])
            ]
          }
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(structuredData);
  }, [pageName, pathname, seoData]);

  return null;
}

export default SeoHead;
