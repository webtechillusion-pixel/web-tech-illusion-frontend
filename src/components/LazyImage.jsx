import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const LazyImage = ({ src, alt, className, placeholder = null, ...props }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px'
  });

  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setHasLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {inView && !hasError ? (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${hasLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      ) : (
        placeholder || <div className="bg-gray-200 animate-pulse w-full h-full" />
      )}
    </div>
  );
};

export default LazyImage;