import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock } from 'react-icons/fi';
import Footer from '../components/Footer';
import { useSettings } from '../context/SettingsContext';
import apiConfig from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', projectType: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  const { contactEmail, contactPhone, contactAddress } = useSettings();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const response = await fetch(apiConfig.endpoints.contact.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to send your message.');
      setSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', projectType: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Unable to send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f8ff]">

      {/* --- Hero --- */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#edf4ff]/50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-badge mb-4">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0f172a] mb-6 leading-tight">
            Contact <span className="text-[#2563eb]">Us</span>
          </h1>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto leading-relaxed">
            Ready to grow with the best software company in Lucknow for website design, app development, SEO, and digital marketing? Let’s discuss your next project.
          </p>
        </div>
      </section>

      {/* --- Form + Info --- */}
      <section className="py-16 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Form card */}
            <div className="bg-white rounded-3xl p-8 border border-[#dfeafc] shadow-sm">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Send us a Message</h2>
              <p className="text-sm text-[#9ca3af] mb-6">We'll get back to you within 2-4 hours.</p>

              {success && (
                <div className="mb-6 p-4 bg-[#d1fae5] border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#4b5563] mb-1.5 uppercase tracking-wide">First Name *</label>
                    <input
                      type="text" name="firstName" value={formData.firstName}
                      onChange={handleChange} placeholder="John" required
                      className="w-full px-4 py-3 border border-[#dfeafc] rounded-xl bg-[#f3f8ff] text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4b5563] mb-1.5 uppercase tracking-wide">Last Name *</label>
                    <input
                      type="text" name="lastName" value={formData.lastName}
                      onChange={handleChange} placeholder="Doe" required
                      className="w-full px-4 py-3 border border-[#dfeafc] rounded-xl bg-[#f3f8ff] text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4b5563] mb-1.5 uppercase tracking-wide">Email *</label>
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="john@example.com" required
                    className="w-full px-4 py-3 border border-[#dfeafc] rounded-xl bg-[#f3f8ff] text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4b5563] mb-1.5 uppercase tracking-wide">Phone *</label>
                  <input
                    type="tel" name="phone" value={formData.phone}
                    onChange={handleChange} placeholder="+91 98765 43210" required
                    className="w-full px-4 py-3 border border-[#dfeafc] rounded-xl bg-[#f3f8ff] text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4b5563] mb-1.5 uppercase tracking-wide">Project Type *</label>
                  <select
                    name="projectType" value={formData.projectType}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 border border-[#dfeafc] rounded-xl bg-[#f3f8ff] text-[#0f172a] focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                  >
                    <option value="">Select a service</option>
                    <option value="static">Static Website (₹15,000)</option>
                    <option value="dynamic">Dynamic Website (₹30,000)</option>
                    <option value="functional">Fully Functional (₹1,00,000+)</option>
                    <option value="ecommerce">E-Commerce Store</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4b5563] mb-1.5 uppercase tracking-wide">Message *</label>
                  <textarea
                    rows={4} name="message" value={formData.message}
                    onChange={handleChange} placeholder="Tell us about your project..." required
                    className="w-full px-4 py-3 border border-[#dfeafc] rounded-xl bg-[#f3f8ff] text-[#0f172a] placeholder-[#cbd5e1] focus:outline-none focus:border-[#2563eb] transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="button-shine w-full py-4 bg-[#0f172a] text-white font-bold rounded-xl hover:bg-[#2d2d3a] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? 'Sending...' : <><FiSend className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </div>

            {/* Info column */}
            <div className="space-y-6">
              {/* Contact details */}
              <div className="bg-white rounded-3xl p-8 border border-[#dfeafc] shadow-sm">
                <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: <FiMapPin className="w-5 h-5" />,
                      label: 'Office Address',
                      value: contactAddress || 'Address not set',
                      iconBg: '#edf4ff', iconColor: '#2563eb',
                    },
                    {
                      icon: <FiPhone className="w-5 h-5" />,
                      label: 'Phone',
                      value: contactPhone,
                      sub: 'Available 24/7',
                      iconBg: '#d1fae5', iconColor: '#059669',
                    },
                    {
                      icon: <FiMail className="w-5 h-5" />,
                      label: 'Email',
                      value: contactEmail,
                      sub: 'We respond within 24 hours',
                      iconBg: '#dbeafe', iconColor: '#2563eb',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: item.iconBg, color: item.iconColor }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0f172a] text-sm mb-0.5">{item.label}</h3>
                        <p className="text-[#4b5563] text-sm">{item.value}</p>
                        {item.sub && <p className="text-xs text-[#9ca3af] mt-0.5">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Business hours */}
                <div className="mt-7 pt-6 border-t border-[#edf4ff]">
                  <div className="flex items-center gap-2 mb-4">
                    <FiClock className="w-4 h-4 text-[#2563eb]" />
                    <h3 className="font-bold text-[#0f172a] text-sm">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm text-[#6b7280]">
                    {[
                      { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
                      { day: 'Saturday',        hours: '10:00 AM - 5:00 PM' },
                      { day: 'Sunday',          hours: 'Closed' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{row.day}</span>
                        <span className="font-semibold text-[#0f172a]">{row.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-3xl p-6 border border-[#dfeafc] shadow-sm">
                <h3 className="font-bold text-[#0f172a] mb-4 text-sm">Find Our Office</h3>
                <div className="w-full h-64 rounded-2xl overflow-hidden border border-[#dfeafc]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14232.722544521492!2d80.99815679999999!3d26.897761749999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1772009178269!5m2!1sen!2sin"
                    width="100%" height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Office Location"
                  />
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

export default Contact;

