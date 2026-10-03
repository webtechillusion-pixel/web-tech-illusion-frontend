import React, { useState, useEffect } from 'react';
import { FiPhone, FiX } from 'react-icons/fi';

const FloatingCallButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulse, setIsPulse] = useState(true);

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Stop pulsing after 10 seconds to reduce distraction
    const pulseTimer = setTimeout(() => {
      setIsPulse(false);
    }, 10000);

    return () => clearTimeout(pulseTimer);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+917379118083';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Floating Call Button */}
      <button
        onClick={handleCall}
        className={`group relative w-13 h-13 bg-gradient-to-br from-[#c8a96e] to-[#b59757] text-white rounded-full shadow-xl hover:shadow-[#c8a96e]/50 transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isPulse ? 'animate-pulse-soft' : ''
        }`}
        aria-label="Call us now"
        title="Call +91 73791 18083"
      >
        {/* Ripple Effect */}
        {isPulse && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#c8a96e] opacity-75 animate-ping"></span>
            <span className="absolute inset-0 rounded-full bg-[#c8a96e] opacity-50 animate-ping animation-delay-300"></span>
          </>
        )}
        
        {/* Phone Icon */}
        <FiPhone className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#1a1a2e] text-white px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          <div className="text-sm font-semibold">Call Us Now</div>
          <div className="text-xs text-white/70">+91 73791 18083</div>
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#1a1a2e]"></div>
        </div>
      </button>

      {/* Mobile: Show phone number label below */}
      <div className="md:hidden mt-2 text-center">
        <div className="text-xs font-semibold text-[#1a1a2e] bg-white px-3 py-1 rounded-full shadow-lg inline-block">
          📞 Call Now
        </div>
      </div>
    </div>
  );
};

export default FloatingCallButton;
