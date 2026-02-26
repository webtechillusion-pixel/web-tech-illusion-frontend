import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiCalendar, FiUser, FiArrowRight, FiTag, FiClock, FiEye, FiMessageCircle } from 'react-icons/fi';
import Footer from '../components/Footer';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'ui-ux-design', label: 'UI/UX Design' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'mobile-apps', label: 'Mobile Apps' },
    { id: 'technology', label: 'Technology' },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Web Development Best Practices for 2024",
      excerpt: "Discover the latest web development trends and best practices that will help you build faster, more secure, and user-friendly websites.",
      category: "web-development",
      author: "WebTech Illusion Team",
      date: "February 20, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      views: 1250,
      comments: 15,
    },
    {
      id: 2,
      title: "How to Choose the Right Web Development Company in Lucknow",
      excerpt: "A comprehensive guide to selecting the best web development partner for your business. Learn what to look for and questions to ask.",
      category: "web-development",
      author: "WebTech Illusion Team",
      date: "February 18, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      views: 980,
      comments: 8,
    },
    {
      id: 3,
      title: "UI/UX Design Principles That Convert Visitors to Customers",
      excerpt: "Learn how professional UI/UX design can significantly improve your website's conversion rate and user satisfaction.",
      category: "ui-ux-design",
      author: "WebTech Illusion Team",
      date: "February 15, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      views: 1450,
      comments: 22,
    },
    {
      id: 4,
      title: "Why Your Business Needs a Mobile App in 2024",
      excerpt: "Explore the benefits of having a mobile app for your business and how it can help you reach more customers.",
      category: "mobile-apps",
      author: "WebTech Illusion Team",
      date: "February 12, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      views: 890,
      comments: 11,
    },
    {
      id: 5,
      title: "Local SEO Tips for Lucknow Businesses",
      excerpt: "Boost your local search rankings with these proven SEO strategies specifically designed for businesses in Lucknow.",
      category: "digital-marketing",
      author: "WebTech Illusion Team",
      date: "February 10, 2024",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
      views: 1100,
      comments: 18,
    },
    {
      id: 6,
      title: "The Future of Web Development: AI and Automation",
      excerpt: "Explore how artificial intelligence and automation are revolutionizing the web development industry.",
      category: "technology",
      author: "WebTech Illusion Team",
      date: "February 8, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      views: 1680,
      comments: 25,
    },
    {
      id: 7,
      title: "E-commerce Website Development: Complete Guide",
      excerpt: "Everything you need to know about building a successful e-commerce website that drives sales and growth.",
      category: "web-development",
      author: "WebTech Illusion Team",
      date: "February 5, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      views: 2100,
      comments: 32,
    },
    {
      id: 8,
      title: "Responsive Web Design: Why It Matters for Your Business",
      excerpt: "Learn why responsive design is crucial for your online success and how it affects your search engine rankings.",
      category: "ui-ux-design",
      author: "WebTech Illusion Team",
      date: "February 3, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=80",
      views: 1350,
      comments: 19,
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'web-development': 'bg-blue-100 text-blue-700',
      'ui-ux-design': 'bg-purple-100 text-purple-700',
      'digital-marketing': 'bg-green-100 text-green-700',
      'mobile-apps': 'bg-orange-100 text-orange-700',
      'technology': 'bg-teal-100 text-teal-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-[60vh] sm:min-h-[70vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-400 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Our Blog
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Latest Insights &
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Expert Articles
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Stay updated with the latest trends, tips, and insights in web development, design, and digital marketing.
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FiUser className="w-4 h-4 mr-1" />
                      <span className="truncate max-w-[100px]">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <FiClock className="w-3.5 h-3.5 mr-1" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <FiEye className="w-3.5 h-3.5 mr-1" />
                        {post.views}
                      </span>
                      <span className="flex items-center">
                        <FiMessageCircle className="w-3.5 h-3.5 mr-1" />
                        {post.comments}
                      </span>
                    </div>
                  </div>

                  {/* Read More */}
                  <button className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                    Read Article
                    <FiArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest articles, tips, and insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
