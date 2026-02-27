import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [stats, setStats] = useState({ totalContacts: 0, totalSubscribers: 0, newContacts: 0, totalBlogs: 0 });
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'web-development',
    author: '',
    image: '',
    readTime: '5 min read',
    status: 'draft',
    isFeatured: false
  });
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}api/auth/verify`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          setIsAuthenticated(true);
          loadData();
        }
      } catch (error) {
        localStorage.removeItem('adminToken');
      }
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        loadData();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoginForm({ email: '', password: '' });
  };

  const loadData = async () => {
    const token = localStorage.getItem('adminToken');
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const [contactsRes, newsletterRes, blogsRes] = await Promise.all([
        fetch(`${API_BASE_URL}api/contact`, { headers }),
        fetch(`${API_BASE_URL}api/newsletter`, { headers }),
        fetch(`${API_BASE_URL}api/blog/admin/all`, { headers })
      ]);

      const contactsData = await contactsRes.json();
      const newsletterData = await newsletterRes.json();
      const blogsData = await blogsRes.json();

      if (contactsData.success) {
        setContacts(contactsData.data);
        setStats(prev => ({
          ...prev,
          totalContacts: contactsData.pagination.totalRecords,
          newContacts: contactsData.data.filter(c => c.status === 'new').length
        }));
      }

      if (newsletterData.success) {
        setSubscribers(newsletterData.data);
        setStats(prev => ({
          ...prev,
          totalSubscribers: newsletterData.pagination.totalRecords
        }));
      }

      if (blogsData.success) {
        setBlogs(blogsData.data);
        setStats(prev => ({
          ...prev,
          totalBlogs: blogsData.pagination.totalRecords
        }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const url = editingBlog 
        ? `${API_BASE_URL}api/blog/${editingBlog._id}`
        : `${API_BASE_URL}api/blog`;
      
      const method = editingBlog ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogForm)
      });

      const data = await response.json();
      
      if (data.success) {
        setShowBlogModal(false);
        setEditingBlog(null);
        setBlogForm({
          title: '',
          excerpt: '',
          content: '',
          category: 'web-development',
          author: '',
          image: '',
          readTime: '5 min read',
          status: 'draft',
          isFeatured: false
        });
        loadData();
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      setError('Failed to save blog');
    }
    
    setLoading(false);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      image: blog.image,
      readTime: blog.readTime,
      status: blog.status,
      isFeatured: blog.isFeatured
    });
    setShowBlogModal(true);
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}api/blog/${blogId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      
      if (data.success) {
        loadData();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const updateContactStatus = async (contactId, newStatus) => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}api/contact/${contactId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportContacts = () => {
    const headers = ['Name', 'Email', 'Phone', 'Message', 'Status', 'Date'];
    const csvContent = [headers.join(',')];
    
    contacts.forEach(contact => {
      const row = [
        contact.name || '',
        contact.email || '',
        contact.phone || '',
        (contact.message || '').replace(/,/g, ';'),
        contact.status || '',
        new Date(contact.createdAt).toLocaleDateString()
      ];
      csvContent.push(row.join(','));
    });
    
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-lock text-white text-xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600 text-sm mt-2">Sign in to access the dashboard</p>
          </div>
          <form onSubmit={login}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                <i className="fas fa-envelope mr-2"></i>Email Address
              </label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                <i className="fas fa-key mr-2"></i>Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all font-semibold"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <i className="fas fa-sign-in-alt mr-2"></i>Sign In
                </span>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-chart-line text-white text-lg"></i>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Illusion Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-600">Admin Control Panel</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-center sm:text-right">
                <p className="text-xs sm:text-sm text-gray-600">Welcome back</p>
                <p className="text-sm font-semibold text-gray-900">Administrator</p>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 rounded-lg transition-colors flex items-center space-x-2 text-sm"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Contacts</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalContacts}</p>
                <p className="text-xs text-green-600 mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>+12%
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <i className="fas fa-envelope text-blue-600 text-lg sm:text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Subscribers</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalSubscribers}</p>
                <p className="text-xs text-green-600 mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>+8%
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                <i className="fas fa-users text-green-600 text-lg sm:text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">New Contacts</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.newContacts}</p>
                <p className="text-xs text-yellow-600 mt-1">
                  <i className="fas fa-clock mr-1"></i>Today
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                <i className="fas fa-bell text-yellow-600 text-lg sm:text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Response Rate</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">94%</p>
                <p className="text-xs text-green-600 mt-1">
                  <i className="fas fa-check mr-1"></i>Excellent
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                <i className="fas fa-chart-pie text-purple-600 text-lg sm:text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-8 border-b-2 font-semibold text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'contacts'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className="fas fa-envelope"></i>
                <span>Contact Forms</span>
                {stats.newContacts > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                    {stats.newContacts}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('newsletter')}
                className={`py-4 px-8 border-b-2 font-semibold text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'newsletter'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className="fas fa-newspaper"></i>
                <span>Newsletter</span>
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`py-4 px-8 border-b-2 font-semibold text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'blogs'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className="fas fa-blog"></i>
                <span>Blogs</span>
              </button>
            </nav>
          </div>

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <i className="fas fa-envelope mr-2 text-blue-600"></i>
                  Contact Submissions
                </h3>
                <button
                  onClick={exportContacts}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                >
                  <i className="fas fa-download"></i>
                  <span>Export CSV</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Info</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-user text-blue-600"></i>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{contact.name}</div>
                              <div className="text-sm text-gray-500">{contact.email || 'No email'}</div>
                              <div className="text-sm text-gray-500">{contact.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {contact.message ? (contact.message.length > 100 ? contact.message.substring(0, 100) + '...' : contact.message) : 'No message'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={contact.status}
                            onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="new">🔴 New</option>
                            <option value="read">🟡 Read</option>
                            <option value="responded">🟢 Responded</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Newsletter Tab */}
          {activeTab === 'newsletter' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <i className="fas fa-newspaper mr-2 text-green-600"></i>
                  Newsletter Subscribers
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subscriber</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subscribed Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-at text-green-600"></i>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{subscriber.email}</div>
                              <div className="text-sm text-gray-500">Newsletter Subscriber</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(subscriber.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {subscriber.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <i className="fas fa-blog mr-2 text-purple-600"></i>
                  Blog Management
                </h3>
                <button
                  onClick={() => {
                    setEditingBlog(null);
                    setBlogForm({
                      title: '',
                      excerpt: '',
                      content: '',
                      category: 'web-development',
                      author: '',
                      image: '',
                      readTime: '5 min read',
                      status: 'draft',
                      isFeatured: false
                    });
                    setShowBlogModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Blog</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Blog</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img 
                              src={blog.image} 
                              alt={blog.title} 
                              className="w-16 h-12 object-cover rounded-lg mr-3"
                            />
                            <div>
                              <div className="text-sm font-semibold text-gray-900 line-clamp-1">{blog.title}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{blog.excerpt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {blog.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {blog.status === 'published' ? '🟢 Published' : '📝 Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(blog.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditBlog(blog)}
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                </h3>
                <button
                  onClick={() => {
                    setShowBlogModal(false);
                    setEditingBlog(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <form onSubmit={handleBlogSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <i className="fas fa-heading mr-2"></i>Title
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter blog title"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <i className="fas fa-align-left mr-2"></i>Excerpt
                  </label>
                  <textarea
                    required
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter short description"
                    rows="2"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <i className="fas fa-paragraph mr-2"></i>Content
                  </label>
                  <textarea
                    required
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter full content"
                    rows="6"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <i className="fas fa-folder mr-2"></i>Category
                  </label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="mobile-apps">Mobile Apps</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <i className="fas fa-user mr-2"></i>Author
                  </label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Author name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <i className="fas fa-image mr-2"></i>Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <i className="fas fa-clock mr-2"></i>Read Time
                  </label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="5 min read"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <i className="fas fa-toggle-on mr-2"></i>Status
                  </label>
                  <select
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({...blogForm, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowBlogModal(false);
                    setEditingBlog(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-all font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <i className="fas fa-save mr-2"></i>
                      {editingBlog ? 'Update Blog' : 'Create Blog'}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;