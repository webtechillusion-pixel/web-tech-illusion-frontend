import { Link, useLocation, useParams } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiCode, FiShoppingCart, FiSmartphone, FiCloud, FiTrendingUp, FiHeart, FiBookOpen, FiMapPin, FiHome, FiTarget } from 'react-icons/fi';

const servicePages = {
  'web-development': {
    label: 'Web Development',
    badge: 'Best Software Company in Lucknow',
    title: 'Custom Web Development for Brands That Need Growth',
    description:
      'We design and build high-performing websites and web apps for businesses that want better leads, stronger trust, and real digital scale.',
    keywords: ['best software company in lucknow', 'website development', 'custom web apps', 'SEO-ready websites'],
    highlights: [
      'Responsive, conversion-focused websites',
      'Custom portals, dashboards, and CRM logic',
      'High-performance frontends and scalable APIs',
      'SEO, analytics, and launch support'
    ],
    icon: <FiCode className="w-8 h-8" />,
    cta: 'Talk to an Expert'
  },
  'mobile-app-development': {
    label: 'Mobile App Development',
    badge: 'Mobile-first growth solutions',
    title: 'Mobile Apps That Keep Users Engaged',
    description:
      'From iOS and Android apps to enterprise mobile experiences, we build apps that feel fast, polished, and built for retention.',
    keywords: ['mobile app development', 'android app', 'ios app', 'startup app development'],
    highlights: [
      'Cross-platform app architecture',
      'UX designed around real user behavior',
      'App store-ready release support',
      'Performance monitoring and updates'
    ],
    icon: <FiSmartphone className="w-8 h-8" />,
    cta: 'Build My App'
  },
  'e-commerce-solutions': {
    label: 'E-Commerce Solutions',
    badge: 'Sales-driven online stores',
    title: 'High-Converting E-Commerce Experiences',
    description:
      'We build sleek, reliable online stores that improve trust, simplify checkout, and increase revenue with a better customer journey.',
    keywords: ['ecommerce website', 'online store development', 'shopping cart', 'digital commerce'],
    highlights: [
      'Custom storefront design',
      'Secure payment integrations',
      'Product and inventory workflows',
      'Optimized customer journeys'
    ],
    icon: <FiShoppingCart className="w-8 h-8" />,
    cta: 'Launch My Store'
  },
  'digital-marketing': {
    label: 'Digital Marketing',
    badge: 'SEO & growth marketing',
    title: 'Digital Marketing That Brings Real Pipeline',
    description:
      'We help brands rank higher, generate leads, and convert attention into business growth through search, content, paid ads, and funnel optimization.',
    keywords: ['digital marketing', 'best software company in lucknow', 'SEO services', 'performance marketing'],
    highlights: [
      'SEO strategy and content growth',
      'Paid media and social campaign planning',
      'Landing page optimization',
      'Analytics, reporting, and CRO'
    ],
    icon: <FiTrendingUp className="w-8 h-8" />,
    cta: 'Grow My Brand'
  },
  'cloud-services': {
    label: 'Cloud Services',
    badge: 'Scalable infrastructure',
    title: 'Cloud & DevOps That Keep You Fast and Reliable',
    description:
      'We set up cloud infrastructure, automation, monitoring, and DevOps pipelines so your platform is stable, scalable, and ready for growth.',
    keywords: ['cloud services', 'devops services', 'AWS hosting', 'deployment automation'],
    highlights: [
      'Cloud architecture design',
      'CI/CD deployment pipelines',
      'Security and monitoring setup',
      'Performance optimization'
    ],
    icon: <FiCloud className="w-8 h-8" />,
    cta: 'Upgrade Infrastructure'
  }
};

const industryPages = {
  healthcare: {
    label: 'Healthcare',
    badge: 'Healthcare technology solutions',
    title: 'Technology for More Trusted and Efficient Care',
    description:
      'We build patient engagement platforms, healthcare portals, and digital workflows that balance security, accessibility, and service quality.',
    keywords: ['healthcare software', 'clinic management system', 'patient portal', 'healthcare technology'],
    highlights: [
      'HIPAA-aware product design',
      'Patient and appointment workflows',
      'Data reporting and dashboards',
      'Scalable digital front doors'
    ],
    icon: <FiHeart className="w-8 h-8" />,
    cta: 'Discuss Healthcare Tech'
  },
  'e-commerce': {
    label: 'E-Commerce',
    badge: 'Retail growth systems',
    title: 'Commerce Platforms Built for Conversion',
    description:
      'We help modern retailers and brands create storefronts and digital experiences that increase trust, revenue, and repeat purchases.',
    keywords: ['ecommerce software', 'retail website development', 'online store', 'commerce platform'],
    highlights: [
      'Omnichannel-friendly storefronts',
      'Catalog and pricing flexibility',
      'Faster checkout and better UX',
      'Marketing and growth integration'
    ],
    icon: <FiShoppingCart className="w-8 h-8" />,
    cta: 'Build My Commerce Platform'
  },
  education: {
    label: 'Education',
    badge: 'Digital learning platforms',
    title: 'Learning Platforms That Actually Engage',
    description:
      'We design educational ecosystems for schools, academies, and edtech startups to improve learning experiences and operational efficiency.',
    keywords: ['edtech solutions', 'online learning platform', 'education software', 'student portal'],
    highlights: [
      'Course and learner management',
      'Interactive dashboards and portals',
      'Track engagement and progress',
      'Mobile-friendly learning access'
    ],
    icon: <FiBookOpen className="w-8 h-8" />,
    cta: 'Plan an EdTech Project'
  },
  'travel-tourism': {
    label: 'Travel & Tourism',
    badge: 'Booking and travel experiences',
    title: 'Travel Experiences That Convert Better',
    description:
      'From travel booking portals to destination platforms, we create digital experiences that inspire people and simplify planning.',
    keywords: ['travel website', 'tourism platform', 'booking website', 'travel booking'],
    highlights: [
      'Booking flow optimization',
      'Destination and itinerary pages',
      'Lead capturing and inquiry forms',
      'Responsive, mobile-first layouts'
    ],
    icon: <FiMapPin className="w-8 h-8" />,
    cta: 'Build a Travel Platform'
  },
  'real-estate': {
    label: 'Real Estate',
    badge: 'Property listing & lead capture',
    title: 'Property Platforms for Better Leads and Faster Sales',
    description:
      'We help real estate businesses design listing ecosystems, lead funnels, and property portals that streamline buyer journeys.',
    keywords: ['real estate website', 'property listings', 'real estate software', 'property portal'],
    highlights: [
      'High-quality property listings',
      'Lead capture and CRM integrations',
      'Agent dashboard and search flows',
      'Optimized mobile browsing'
    ],
    icon: <FiHome className="w-8 h-8" />,
    cta: 'Build My Property Platform'
  }
};

const CategoryDetailPage = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const type = pathname.startsWith('/services/') ? 'services' : 'industries';
  const data = type === 'services' ? servicePages[slug] : industryPages[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f3f8ff] flex items-center justify-center px-6">
        <div className="max-w-xl text-center bg-white rounded-3xl border border-[#dfeafc] shadow-sm p-10">
          <div className="w-16 h-16 bg-[#edf4ff] rounded-full flex items-center justify-center mx-auto mb-5 text-[#2563eb]">
            <FiTarget className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-[#0f172a] mb-3">Page not found</h1>
          <p className="text-[#6b7280] mb-6">This solution page is not available yet.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1d4ed8] transition-colors">
            Request a custom solution <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f8ff]">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/60 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#dfeafc] text-[#2563eb] text-sm font-semibold shadow-sm">
            {data.badge}
          </div>
          <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] items-center gap-10">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] leading-tight">
                {data.title}
              </h1>
              <p className="mt-6 text-xl text-[#5b6475] leading-relaxed max-w-2xl">
                {data.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1d4ed8] transition-colors">
                  {data.cta}
                  <FiArrowRight />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 bg-white text-[#0f172a] px-6 py-3 rounded-xl font-semibold border border-[#dfeafc] hover:border-[#2563eb] transition-colors">
                  Explore more services
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#dfeafc] shadow-[0_20px_60px_rgba(37,99,235,0.08)] p-8">
              <div className="w-16 h-16 rounded-2xl bg-[#edf4ff] flex items-center justify-center text-[#2563eb] mb-5">
                {data.icon}
              </div>
              <div className="space-y-4">
                {data.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[#374151]">
                    <FiCheckCircle className="mt-1 w-5 h-5 text-[#2563eb] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#dfeafc] p-8 md:p-10 shadow-sm">
            <div className="flex items-center gap-2 text-[#2563eb] font-semibold uppercase tracking-[0.16em] text-xs mb-4">
              Why businesses choose us
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-6">
              Built for speed, trust, and measurable growth
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Strategy-first planning',
                'Technical execution with clarity',
                'Clear communication and delivery',
                'SEO and marketing-aligned build'
              ].map((item) => (
                <div key={item} className="p-5 rounded-2xl bg-[#f3f8ff] border border-[#dfeafc]">
                  <div className="mb-3 w-10 h-10 rounded-xl bg-[#edf4ff] flex items-center justify-center text-[#2563eb]">
                    <FiCheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-[#374151] font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryDetailPage;
