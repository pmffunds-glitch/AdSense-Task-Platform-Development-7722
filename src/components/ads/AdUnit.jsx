import React, { useEffect, useRef } from 'react';
import { useRevenue } from '../../contexts/RevenueContext';

const AdUnit = ({ 
  adSlot = 'XXXXXXXXXX',
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style = {}
}) => {
  const adRef = useRef(null);
  const { trackAdView } = useRevenue();

  useEffect(() => {
    try {
      // Track ad view for revenue calculation
      trackAdView(adSlot, window.location.href);

      // Push ad to AdSense queue
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading ad:', error);
    }
  }, [adSlot, trackAdView]);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
      
      {/* Fallback content for development/ad-blocked environments */}
      <div className="ad-fallback bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 text-sm">
        <p>Advertisement Space</p>
        <p className="text-xs mt-1">AdSense Unit: {adSlot}</p>
      </div>
    </div>
  );
};

export default AdUnit;