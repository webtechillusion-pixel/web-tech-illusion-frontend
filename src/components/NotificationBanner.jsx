import React, { useState, useEffect } from 'react';
import NotificationService from '../services/NotificationService';

const NotificationBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    if (NotificationService.isSupported) {
      setPermission(Notification.permission);
      if (Notification.permission === 'default') {
        setShowBanner(true);
      }
    }
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await NotificationService.requestPermission();
    if (granted) {
      setShowBanner(false);
      NotificationService.showNotification('Notifications Enabled!', {
        body: 'You will now receive updates from Web Tech Illusion',
        tag: 'enabled'
      });
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
  };

  if (!showBanner || permission !== 'default') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <i className="fas fa-bell text-blue-600 text-sm"></i>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            Stay Updated!
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Enable notifications to get updates about our services and offers.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleEnableNotifications}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Enable
            </button>
            <button
              onClick={handleDismiss}
              className="text-gray-500 px-3 py-1 rounded text-sm hover:text-gray-700 transition-colors"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;