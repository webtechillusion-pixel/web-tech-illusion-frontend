import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoPanel from '../components/SeoPanel';
import { API_BASE_URL, buildApiUrl } from '../config/api';
import './Dashboard.css';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [stats, setStats] = useState({ totalContacts: 0, totalSubscribers: 0, newContacts: 0, totalBlogs: 0 });
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const slugify = (value = '') => {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || '';
  };

  const [tagInput, setTagInput] = useState('');
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'General',
    author: 'Sofa Hi Sofa Team',
    authorEmail: '',
    teamMember: '',
    status: 'draft',
    tags: [],
    image: '',
    imageLink: '',
    excerpt: '',
    content: '',
    readTime: '5 min read',
    isFeatured: false,
    faqs: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  });
  const [serviceForm, setServiceForm] = useState({
    title: '',
    shortDescription: '',
    content: '',
    icon: 'web',
    features: '',
    status: 'published'
  });
  const [teamForm, setTeamForm] = useState({
    teamId: '',
    name: '',
    email: '',
    role: '',
    specialization: '',
    bio: '',
    experience: '',
    image: '',
    slug: '',
    skills: '',
    status: 'active',
    order: 0
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    
    if (token) {
      try {
        const response = await fetch(buildApiUrl('api/auth/verify'), {
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
      const response = await fetch(buildApiUrl('/api/auth/login'), {
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
      const [contactsRes, newsletterRes, blogsRes, servicesRes, teamRes] = await Promise.all([
        fetch(buildApiUrl('api/contact'), { headers }),
        fetch(buildApiUrl('api/newsletter'), { headers }),
        fetch(buildApiUrl('api/blog/admin/all'), { headers }),
        fetch(buildApiUrl('api/services/admin/all'), { headers }),
        fetch(buildApiUrl('api/team/admin/all'), { headers })
      ]);

      const contactsData = await contactsRes.json();
      const newsletterData = await newsletterRes.json();
      const blogsData = await blogsRes.json();
      const servicesData = await servicesRes.json();
      const teamData = await teamRes.json();

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

      if (servicesData.success) {
        setServices(servicesData.data || []);
      }

      if (teamData.success) {
        setTeamMembers(teamData.data || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleImageUpload = async (event, target = 'blog') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const response = await fetch(buildApiUrl('api/upload'), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Image upload failed');
      }

      const uploadedUrl = data.url;
      if (target === 'team') {
        setTeamForm((prev) => ({ ...prev, image: uploadedUrl }));
      } else {
        setBlogForm((prev) => ({
          ...prev,
          image: uploadedUrl,
          imageLink: uploadedUrl
        }));
      }
      setError('');
    } catch (error) {
      console.error('Image upload error:', error);
      setError(error.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  const handleAddTag = (tagToAdd) => {
    const val = (tagToAdd || tagInput).trim().replace(/^,+|,+$/g, '');
    if (!val) return;
    if (!blogForm.tags.includes(val)) {
      setBlogForm((prev) => ({
        ...prev,
        tags: [...prev.tags, val],
        metaKeywords: prev.metaKeywords ? `${prev.metaKeywords}, ${val}` : val
      }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setBlogForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove)
    }));
  };

  const handleAddFaq = () => {
    setBlogForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const handleUpdateFaq = (index, field, value) => {
    setBlogForm((prev) => {
      const updated = [...prev.faqs];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, faqs: updated };
    });
  };

  const handleRemoveFaq = (index) => {
    setBlogForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const url = editingBlog 
        ? buildApiUrl(`api/blog/${editingBlog._id}`)
        : buildApiUrl('api/blog');
      
      const method = editingBlog ? 'PUT' : 'POST';

      const wordCount = blogForm.content
        ? blogForm.content.trim().split(/\s+/).filter(Boolean).length
        : 0;
      const computedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

      const payload = {
        ...blogForm,
        slug: blogForm.slug ? slugify(blogForm.slug) : slugify(blogForm.title),
        readTime: blogForm.readTime || computedReadTime,
        metaTitle: blogForm.metaTitle || blogForm.title,
        metaDescription: blogForm.metaDescription || blogForm.excerpt
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        setShowBlogModal(false);
        setEditingBlog(null);
        setBlogForm({
          title: '',
          slug: '',
          category: 'General',
          author: 'Sofa Hi Sofa Team',
          authorEmail: '',
          teamMember: '',
          status: 'draft',
          tags: [],
          image: '',
          imageLink: '',
          excerpt: '',
          content: '',
          readTime: '5 min read',
          isFeatured: false,
          faqs: [],
          metaTitle: '',
          metaDescription: '',
          metaKeywords: ''
        });
        setTagInput('');
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
      title: blog.title || '',
      slug: blog.slug || slugify(blog.title || ''),
      category: blog.category || 'General',
      author: blog.author || 'Sofa Hi Sofa Team',
      authorEmail: blog.authorEmail || (blog.teamMember?.email || ''),
      teamMember: blog.teamMember?._id || blog.teamMember || '',
      image: blog.image || '',
      imageLink: blog.imageLink || blog.image || '',
      readTime: blog.readTime || '5 min read',
      status: blog.status || 'draft',
      isFeatured: Boolean(blog.isFeatured),
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      tags: Array.isArray(blog.tags) ? blog.tags : [],
      faqs: Array.isArray(blog.faqs) ? blog.faqs : [],
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      metaKeywords: blog.metaKeywords || ''
    });
    setTagInput('');
    setShowBlogModal(true);
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(buildApiUrl(`api/blog/${blogId}`), {
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

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const payload = {
      ...serviceForm,
      features: serviceForm.features
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    try {
      const response = await fetch(
        editingService ? buildApiUrl(`api/services/${editingService._id}`) : buildApiUrl('api/services'),
        {
          method: editingService ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to save service');
      }

      setShowServiceModal(false);
      setEditingService(null);
      setServiceForm({
        title: '',
        shortDescription: '',
        content: '',
        icon: 'web',
        features: '',
        status: 'published'
      });
      loadData();
    } catch (error) {
      console.error('Error saving service:', error);
      setError(error.message || 'Failed to save service');
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title || '',
      shortDescription: service.shortDescription || '',
      content: service.content || '',
      icon: service.icon || 'web',
      features: Array.isArray(service.features) ? service.features.join(', ') : '',
      status: service.status || 'published'
    });
    setShowServiceModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(buildApiUrl(`api/services/${serviceId}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Failed to delete service');
      loadData();
    } catch (error) {
      console.error('Error deleting service:', error);
      setError(error.message || 'Failed to delete service');
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const payload = {
      ...teamForm,
      teamId: teamForm.teamId ? teamForm.teamId.trim() : '',
      email: teamForm.email ? teamForm.email.trim() : '',
      skills: typeof teamForm.skills === 'string'
        ? teamForm.skills
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        : teamForm.skills,
      order: Number(teamForm.order || 0),
      slug: teamForm.slug ? slugify(teamForm.slug) : slugify(teamForm.name)
    };

    try {
      const response = await fetch(
        editingTeamMember ? buildApiUrl(`api/team/${editingTeamMember._id}`) : buildApiUrl('api/team'),
        {
          method: editingTeamMember ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to save team member');
      }

      setShowTeamModal(false);
      setEditingTeamMember(null);
      setTeamForm({
        teamId: '',
        name: '',
        email: '',
        role: '',
        specialization: '',
        bio: '',
        experience: '',
        image: '',
        slug: '',
        skills: '',
        status: 'active',
        order: 0
      });
      loadData();
    } catch (error) {
      console.error('Error saving team member:', error);
      setError(error.message || 'Failed to save team member');
    }
  };

  const handleEditTeamMember = (member) => {
    setEditingTeamMember(member);
    setTeamForm({
      teamId: member.teamId || '',
      name: member.name || '',
      email: member.email || '',
      role: member.role || '',
      specialization: member.specialization || '',
      bio: member.bio || '',
      experience: member.experience || '',
      image: member.image || '',
      slug: member.slug || '',
      skills: Array.isArray(member.skills) ? member.skills.join(', ') : (member.skills || ''),
      status: member.status || 'active',
      order: member.order || 0
    });
    setShowTeamModal(true);
  };

  const handleDeleteTeamMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(buildApiUrl(`api/team/${memberId}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Failed to delete team member');
      loadData();
    } catch (error) {
      console.error('Error deleting team member:', error);
      setError(error.message || 'Failed to delete team member');
    }
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

  const updateContactStatus = async (contactId, newStatus) => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(buildApiUrl(`api/contact/${contactId}/status`), {
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

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(buildApiUrl(`api/contact/${contactId}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete contact submission');
      }

      setContacts((prev) => prev.filter((c) => c._id !== contactId));
      setStats((prev) => ({
        ...prev,
        totalContacts: Math.max(0, (prev.totalContacts || 1) - 1)
      }));
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError(error.message || 'Failed to delete contact submission');
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

  if (!isAuthenticated) {
    return (
      <div className="dashboard-login fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
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
    <div className="dashboard-shell min-h-screen bg-gray-50">
      {/* Header */}
      <header className="dashboard-header bg-white shadow-lg border-b border-gray-200 relative z-50">
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
      <div className="dashboard-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
        <div className="dashboard-workspace bg-white rounded-xl shadow-lg border border-gray-100">
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
              <button
                onClick={() => setActiveTab('services')}
                className={`py-4 px-8 border-b-2 font-semibold text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'services'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className="fas fa-cogs"></i>
                <span>Services</span>
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`py-4 px-8 border-b-2 font-semibold text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'team'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className="fas fa-users"></i>
                <span>Team</span>
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`py-4 px-8 border-b-2 font-semibold text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'seo'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className="fas fa-search"></i>
                <span>SEO Panel</span>
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
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            type="button"
                            onClick={() => handleDeleteContact(contact._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            title="Delete Contact Submission"
                          >
                            <i className="fas fa-trash"></i>
                            <span>Delete</span>
                          </button>
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
                      slug: '',
                      category: 'General',
                      author: 'Sofa Hi Sofa Team',
                      authorEmail: '',
                      teamMember: '',
                      status: 'draft',
                      tags: [],
                      image: '',
                      imageLink: '',
                      excerpt: '',
                      content: '',
                      readTime: '5 min read',
                      isFeatured: false,
                      faqs: [],
                      metaTitle: '',
                      metaDescription: '',
                      metaKeywords: ''
                    });
                    setTagInput('');
                    setShowBlogModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors shadow-sm"
                >
                  <i className="fas fa-plus"></i>
                  <span>Create New Blog Post</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Blog Article</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
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
                              className="w-16 h-12 object-cover rounded-lg mr-3 border border-gray-200"
                            />
                            <div className="max-w-xs">
                              <div className="text-sm font-semibold text-gray-900 line-clamp-1">{blog.title}</div>
                              {blog.slug && (
                                <div className="text-[11px] font-mono text-purple-600 line-clamp-1">
                                  /{blog.slug}
                                </div>
                              )}
                              <div className="text-xs text-gray-500 line-clamp-1">{blog.excerpt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-gray-800">{blog.author || 'Team'}</span>
                            {blog.teamMember && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700" title="Connected to Team Member">
                                ✓ Team
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {blog.category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                          <div className="flex items-center gap-2">
                            <a
                              href={`/blog/${blog.slug || blog._id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                              title="View Public Post"
                            >
                              <i className="fas fa-external-link-alt"></i>
                              View
                            </a>
                            <button
                              onClick={() => handleEditBlog(blog)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <i className="fas fa-edit"></i>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <i className="fas fa-trash"></i>
                              Delete
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

          {activeTab === 'services' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <i className="fas fa-cogs mr-2 text-blue-600"></i>
                  Service Management
                </h3>
                <button
                  onClick={() => {
                    setEditingService(null);
                    setServiceForm({
                      title: '',
                      shortDescription: '',
                      content: '',
                      icon: 'web',
                      features: '',
                      status: 'published'
                    });
                    setShowServiceModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Service</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Icon</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr key={service._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{service.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{service.shortDescription}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{service.icon || 'web'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            service.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {service.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEditService(service)} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors">
                              <i className="fas fa-edit"></i>
                              Edit
                            </button>
                            <button onClick={() => handleDeleteService(service._id)} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors">
                              <i className="fas fa-trash"></i>
                              Delete
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

          {activeTab === 'team' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <i className="fas fa-users mr-2 text-purple-600"></i>
                    Team Management
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Manage team members, employee IDs, Cloudinary photos & blog authorship.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingTeamMember(null);
                    setTeamForm({
                      teamId: '',
                      name: '',
                      email: '',
                      role: '',
                      specialization: '',
                      bio: '',
                      experience: '',
                      image: '',
                      slug: '',
                      skills: '',
                      status: 'active',
                      order: 0
                    });
                    setShowTeamModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors shadow-sm"
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Team Member</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member &amp; ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role &amp; Specialization</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamMembers.map((member) => (
                      <tr key={member._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img 
                              src={member.image?.replace(/^http:\/\//, 'https://') || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'Team')}&background=0f172a&color=38bdf8&size=128&bold=true`} 
                              alt={member.name} 
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'Team')}&background=0f172a&color=38bdf8&size=128&bold=true`;
                              }}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-200 aspect-square shadow-sm mr-3" 
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">{member.name}</span>
                                {member.teamId && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-700 border border-purple-200">
                                    ID: {member.teamId}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 font-mono">
                                /team/{member.slug || slugify(member.name)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {member.email ? (
                            <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline text-xs">
                              {member.email}
                            </a>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{member.role}</div>
                          <div className="text-xs text-gray-500">{member.specialization || 'Team Member'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {member.status === 'active' ? '🟢 Active' : '🟡 Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <a
                              href={`/team/${member.slug || slugify(member.name)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                              title="View Public Profile"
                            >
                              <i className="fas fa-external-link-alt"></i>
                              View
                            </a>
                            <button onClick={() => handleEditTeamMember(member)} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors">
                              <i className="fas fa-edit"></i>
                              Edit
                            </button>
                            <button onClick={() => handleDeleteTeamMember(member._id)} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors">
                              <i className="fas fa-trash"></i>
                              Delete
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

          {activeTab === 'seo' && <SeoPanel apiBaseUrl={API_BASE_URL} />}
        </div>
      </div>

      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <button type="button" onClick={() => setShowServiceModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleServiceSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
                <input type="text" required value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Short Description</label>
                <textarea rows="3" required value={serviceForm.shortDescription} onChange={(e) => setServiceForm({...serviceForm, shortDescription: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Content</label>
                <textarea rows="4" value={serviceForm.content} onChange={(e) => setServiceForm({...serviceForm, content: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Icon Key</label>
                  <select value={serviceForm.icon} onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="marketing">Marketing</option>
                    <option value="cloud">Cloud</option>
                    <option value="security">Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Status</label>
                  <select value={serviceForm.status} onChange={(e) => setServiceForm({...serviceForm, status: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Features (comma separated)</label>
                <input type="text" value={serviceForm.features} onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="React, Node.js, SEO, Support" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowServiceModal(false)} className="px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTeamModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="p-2 bg-purple-600 text-white rounded-lg text-sm">
                    <i className="fas fa-user-plus"></i>
                  </span>
                  {editingTeamMember ? 'Edit Team Member' : 'Add New Team Member'}
                </h3>
                <p className="text-xs text-gray-600 mt-1">Fill in the details to publish or update a team member profile.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowTeamModal(false)} 
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleTeamSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Team ID No
                  </label>
                  <input
                    type="text"
                    value={teamForm.teamId}
                    onChange={(e) => setTeamForm({ ...teamForm, teamId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono font-medium"
                    placeholder="e.g. WTI-101"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={teamForm.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setTeamForm(prev => ({
                        ...prev,
                        name,
                        slug: (!editingTeamMember && (!prev.slug || prev.slug === slugify(prev.name))) ? slugify(name) : prev.slug
                      }));
                    }}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. Aarav Sharma"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={teamForm.email}
                    onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="aarav@webtechillusion.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Role / Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. Lead Full-Stack Developer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={teamForm.specialization}
                    onChange={(e) => setTeamForm({ ...teamForm, specialization: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. React, Node.js & Scalable Architecture"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={teamForm.experience}
                    onChange={(e) => setTeamForm({ ...teamForm, experience: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. 5+ years experience"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                  Bio / Overview
                </label>
                <textarea
                  rows="3"
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Professional biography highlighting achievements, leadership, and background..."
                />
              </div>

              {/* Photo Upload & Aspect Ratio Section */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-purple-900 text-xs font-bold uppercase tracking-wider">
                    Profile Photo (Cloudinary Upload or Link)
                  </label>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200">
                    Recommended: 1:1 Square (600×600px) • Max 5MB
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[112px_minmax(0,1fr)] gap-4 items-center">
                  {/* Aspect Ratio Preview */}
                  <div className="w-28 h-28 aspect-square rounded-2xl border-2 border-purple-200 bg-white overflow-hidden shadow-sm flex items-center justify-center relative shrink-0">
                    {teamForm.image ? (
                      <img 
                        src={teamForm.image.replace(/^http:\/\//, 'https://')} 
                        alt="Preview" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamForm.name || 'Team')}&background=0f172a&color=38bdf8&size=128&bold=true`;
                        }}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="text-center p-2 text-gray-400">
                        <i className="fas fa-camera text-2xl mb-1"></i>
                        <p className="text-[10px] font-medium leading-tight">1:1 Ratio</p>
                      </div>
                    )}
                  </div>

                  {/* Dual Upload Flow */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'team')}
                        />
                        <i className="fas fa-cloud-upload-alt mr-2"></i>
                        {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                      </label>
                      <span className="text-xs text-gray-500 font-medium">Auto-upload to Cloudinary</span>
                    </div>

                    <input
                      type="url"
                      required
                      value={teamForm.image}
                      onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                      placeholder="https://res.cloudinary.com/... or paste image link"
                      className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                    />
                    <p className="text-[11px] text-gray-500">
                      Photo displays in a consistent 1:1 square aspect ratio across Website, Team Page, and Blog cards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Public Profile Slug
                  </label>
                  <input
                    type="text"
                    value={teamForm.slug}
                    onChange={(e) => setTeamForm({ ...teamForm, slug: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                    placeholder="aarav-sharma"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    URL: /team/{teamForm.slug || slugify(teamForm.name) || 'member'}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <select
                    value={teamForm.status}
                    onChange={(e) => setTeamForm({ ...teamForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={teamForm.skills}
                  onChange={(e) => setTeamForm({ ...teamForm, skills: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="React, Node.js, TypeScript, Cloud, UI/UX"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-semibold text-sm shadow-md"
                >
                  {editingTeamMember ? 'Update Team Member' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Modal - Create New Blog Post */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[94vh] overflow-y-auto border border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-t-2xl flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Fill in the details to publish a new blog.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowBlogModal(false);
                  setEditingBlog(null);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleBlogSubmit} className="p-6 space-y-6">
              {/* Blog Title */}
              <div>
                <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setBlogForm((prev) => ({
                      ...prev,
                      title,
                      slug: (!editingBlog && (!prev.slug || prev.slug === slugify(prev.title))) ? slugify(title) : prev.slug,
                      metaTitle: (!prev.metaTitle || prev.metaTitle === prev.title) ? title : prev.metaTitle
                    }));
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base font-semibold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="e.g. Best Sofas for Small Living Rooms"
                />
              </div>

              {/* Custom URL (Slug) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider">
                    Custom URL (Slug)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (blogForm.title) {
                        setBlogForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
                      }
                    }}
                    className="text-xs text-purple-600 hover:text-purple-800 font-semibold inline-flex items-center gap-1"
                  >
                    <i className="fas fa-magic"></i> Auto-generate from title
                  </button>
                </div>
                <input
                  type="text"
                  value={blogForm.slug}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: slugify(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-purple-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Leave empty to auto-generate from title"
                />
                <p className="text-[11px] text-gray-500 mt-1 font-mono">
                  Preview: /blog/{blogForm.slug || slugify(blogForm.title) || 'your-slug'}
                </p>
              </div>

              {/* Category, Author, Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="General"
                    list="category-suggestions"
                  />
                  <datalist id="category-suggestions">
                    <option value="General" />
                    <option value="Web Development" />
                    <option value="UI/UX Design" />
                    <option value="Digital Marketing" />
                    <option value="Mobile Apps" />
                    <option value="Technology" />
                    <option value="E-Commerce" />
                    <option value="Furniture & Interior" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider mb-2">
                    Author
                  </label>
                  <div className="space-y-1.5">
                    <select
                      value={blogForm.teamMember || '__custom__'}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '__custom__') {
                          setBlogForm(prev => ({
                            ...prev,
                            teamMember: '',
                            author: prev.author || 'Sofa Hi Sofa Team',
                            authorEmail: ''
                          }));
                        } else {
                          const m = teamMembers.find(member => member._id === val);
                          if (m) {
                            setBlogForm(prev => ({
                              ...prev,
                              teamMember: m._id,
                              author: m.name,
                              authorEmail: m.email || ''
                            }));
                          }
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="__custom__">Custom Author Name</option>
                      {teamMembers.map((m) => (
                        <option key={m._id} value={m._id}>
                          {m.name} ({m.role}) {m.teamId ? `• ID: ${m.teamId}` : ''}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Sofa Hi Sofa Team"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <select
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Tags — Type tag and press Enter or Comma */}
              <div>
                <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider mb-2">
                  Tags — Type tag and press Enter or Comma
                </label>
                <div className="min-h-[46px] p-2 bg-gray-50 border border-gray-200 rounded-xl flex flex-wrap items-center gap-2 focus-within:bg-white focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
                  {blogForm.tags && blogForm.tags.map((tag, idx) => (
                    <span
                      key={`${tag}-${idx}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold shadow-xs"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-purple-200 text-purple-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        handleAddTag(tagInput);
                      } else if (e.key === 'Backspace' && !tagInput && blogForm.tags.length > 0) {
                        handleRemoveTag(blogForm.tags[blogForm.tags.length - 1]);
                      }
                    }}
                    placeholder={blogForm.tags.length === 0 ? "Type tag..." : "Add another..."}
                    className="flex-1 min-w-[120px] bg-transparent border-none text-sm text-gray-800 focus:outline-none px-2 py-1"
                  />
                  {tagInput && (
                    <button
                      type="button"
                      onClick={() => handleAddTag(tagInput)}
                      className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>

              {/* Featured Image URL & Upload */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider">
                    Featured Image URL
                  </label>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Recommended: 16:9 Banner (1200×675px) • Direct URL or Cloudinary Upload
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="url"
                    required
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value, imageLink: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://res.cloudinary.com/..."
                  />
                  <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'blog')}
                    />
                    <i className="fas fa-cloud-upload-alt mr-2"></i>
                    {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                  </label>
                </div>

                {blogForm.image && (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-[16/9] w-full max-w-lg bg-gray-100 flex items-center justify-center group">
                    <img src={blogForm.image} alt="Featured Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setBlogForm({ ...blogForm, image: '', imageLink: '' })}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors"
                      title="Remove Image"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )}
              </div>

              {/* Short Excerpt */}
              <div>
                <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider mb-2">
                  Short Excerpt
                </label>
                <textarea
                  required
                  rows="2"
                  value={blogForm.excerpt}
                  onChange={(e) => {
                    const excerpt = e.target.value;
                    setBlogForm((prev) => ({
                      ...prev,
                      excerpt,
                      metaDescription: (!prev.metaDescription || prev.metaDescription === prev.excerpt) ? excerpt : prev.metaDescription
                    }));
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="A short description for the blog listing page..."
                />
              </div>

              {/* Full Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-800 text-xs font-bold uppercase tracking-wider">
                    Full Content *
                  </label>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold font-mono text-purple-700">
                      {blogForm.content ? blogForm.content.trim().split(/\s+/).filter(Boolean).length : 0} words
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 border border-gray-200 rounded-t-xl text-xs text-gray-700">
                  <button
                    type="button"
                    onClick={() => setBlogForm(prev => ({ ...prev, content: prev.content + '\n## Heading 2\n' }))}
                    className="px-2.5 py-1 bg-white hover:bg-gray-200 rounded border border-gray-200 font-bold"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm(prev => ({ ...prev, content: prev.content + '\n### Heading 3\n' }))}
                    className="px-2.5 py-1 bg-white hover:bg-gray-200 rounded border border-gray-200 font-bold"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm(prev => ({ ...prev, content: prev.content + ' **bold text** ' }))}
                    className="px-2.5 py-1 bg-white hover:bg-gray-200 rounded border border-gray-200 font-bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm(prev => ({ ...prev, content: prev.content + ' *italic text* ' }))}
                    className="px-2.5 py-1 bg-white hover:bg-gray-200 rounded border border-gray-200 italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm(prev => ({ ...prev, content: prev.content + '\n- Bullet point\n- Second point\n' }))}
                    className="px-2.5 py-1 bg-white hover:bg-gray-200 rounded border border-gray-200"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm(prev => ({ ...prev, content: prev.content + '\n> Quote block here\n' }))}
                    className="px-2.5 py-1 bg-white hover:bg-gray-200 rounded border border-gray-200"
                  >
                    “ Quote
                  </button>
                </div>

                <textarea
                  required
                  rows="8"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-x border-b border-gray-200 rounded-b-xl text-sm leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans"
                  placeholder="Write the full blog post content here..."
                />
              </div>

              {/* Frequently Asked Questions (Optional) */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <i className="fas fa-question-circle text-purple-600"></i>
                      Frequently Asked Questions (Optional)
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Adds structured FAQ schema for Google Search & rich snippets.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <i className="fas fa-plus"></i> Add FAQ
                  </button>
                </div>

                {(!blogForm.faqs || blogForm.faqs.length === 0) ? (
                  <div className="text-center py-6 border border-dashed border-gray-300 rounded-xl bg-white">
                    <p className="text-xs font-semibold text-gray-600">No FAQs added yet.</p>
                    <p className="text-[11px] text-gray-400 mt-1">Click "Add FAQ" above to insert questions.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {blogForm.faqs.map((faq, fIndex) => (
                      <div key={fIndex} className="p-3.5 bg-white rounded-xl border border-gray-200 space-y-2 relative shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">FAQ #{fIndex + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFaq(fIndex)}
                            className="text-gray-400 hover:text-red-600 text-xs"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleUpdateFaq(fIndex, 'question', e.target.value)}
                          placeholder="Question e.g. What is the return policy?"
                          className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
                        />
                        <textarea
                          rows="2"
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(fIndex, 'answer', e.target.value)}
                          placeholder="Answer to the question..."
                          className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SEO Settings */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/60 border border-indigo-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <i className="fab fa-google text-blue-600"></i>
                    SEO Settings
                  </h4>
                  <span className="text-[11px] text-gray-500">Google Search Optimization</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={blogForm.metaTitle}
                      onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                      placeholder="Auto-generated if empty"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows="2"
                      value={blogForm.metaDescription}
                      onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                      placeholder="Auto-generated if empty"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  {/* Google Search Snippet Preview */}
                  <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Search Snippet Preview</p>
                    <div className="text-sm font-medium text-blue-700 hover:underline cursor-pointer truncate">
                      {blogForm.metaTitle || blogForm.title || 'Blog Title Preview'}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-mono truncate">
                      https://webtechillusion.com › blog › {blogForm.slug || slugify(blogForm.title) || 'slug'}
                    </div>
                    <div className="text-xs text-gray-600 line-clamp-2">
                      {blogForm.metaDescription || blogForm.excerpt || 'Article summary description will appear here on Google search results...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowBlogModal(false);
                    setEditingBlog(null);
                  }}
                  className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Publish</span>
                    </>
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