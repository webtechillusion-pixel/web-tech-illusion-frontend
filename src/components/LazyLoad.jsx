import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const LazyLoad = ({ children, threshold = 0.1, rootMargin = '50px', fallback = null }) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (inView && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [inView, hasLoaded]);

  return (
    <div ref={ref}>
      {hasLoaded ? children : (fallback || <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full" />)}
    </div>
  );
};

export default LazyLoad;