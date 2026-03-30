import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL;

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/settings`);
      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (key, fallback = '') => {
    return settings[key] || fallback;
  };

  const value = {
    settings,
    loading,
    getSetting,
    fetchSettings,
    companyName: settings.company_name || 'WebTech Illusion',
    companyTagline: settings.company_tagline || 'Building Digital Excellence',
    companyDescription: settings.company_description || '',
    companyLogo: settings.company_logo || '',
    contactEmail: settings.contact_email || 'info@webtechillusion.com',
    contactPhone: settings.contact_phone || '+91 73804 97919',
    contactWhatsapp: settings.contact_whatsapp || '917380497919',
    contactAddress: settings.contact_address || 'Lucknow, India',
    socialFacebook: settings.social_facebook || '',
    socialTwitter: settings.social_twitter || '',
    socialInstagram: settings.social_instagram || '',
    socialLinkedin: settings.social_linkedin || '',
    socialGithub: settings.social_github || '',
    footerCopyright: settings.footer_copyright || '© 2024 WebTech Illusion. All rights reserved.',
    footerTagline: settings.footer_tagline || '',
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
