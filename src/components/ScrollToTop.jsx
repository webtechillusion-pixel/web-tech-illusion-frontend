import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Automatically scrolls window to top on route change (pathname, search, hash)
 * Ensures that clicking any navigation or sub-navbar link starts from the top of the page,
 * not remaining at the previous scroll position or footer.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigating with a hash (e.g. #consultation-section), smoothly scroll to that element
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Scroll to the very top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
