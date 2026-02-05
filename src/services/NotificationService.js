class NotificationService {
  constructor() {
    this.isSupported = 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
  }

  async requestPermission() {
    if (!this.isSupported) {
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  showNotification(title, options = {}) {
    if (this.permission !== 'granted') {
      return;
    }

    const defaultOptions = {
      icon: '/favicon.ico',
      vibrate: [200, 100, 200],
      tag: 'webtechillusion',
      ...options
    };

    return new Notification(title, defaultOptions);
  }

  showWelcomeNotification() {
    this.showNotification('Welcome to Web Tech Illusion!', {
      body: 'Thanks for visiting. We create amazing websites!',
      tag: 'welcome'
    });
  }
}

export default new NotificationService();