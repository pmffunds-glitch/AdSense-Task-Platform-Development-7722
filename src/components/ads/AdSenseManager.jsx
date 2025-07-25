import React, { useEffect } from 'react';
import { useRevenue } from '../../contexts/RevenueContext';

const AdSenseManager = () => {
  const { trackAdView } = useRevenue();

  useEffect(() => {
    // Initialize Google AdSense
    const initAdSense = () => {
      try {
        // Check if AdSense script is already loaded
        if (window.adsbygoogle) {
          return;
        }

        // Create and append AdSense script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX';
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          console.log('AdSense script loaded successfully');
        };
        
        script.onerror = () => {
          console.warn('AdSense script failed to load');
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Error initializing AdSense:', error);
      }
    };

    initAdSense();
  }, []);

  // Track page views for revenue calculation
  useEffect(() => {
    const handlePageView = () => {
      if (window.location.pathname !== '/') {
        trackAdView('main-ad-unit', window.location.href);
      }
    };

    // Track initial page load
    handlePageView();

    // Track navigation changes
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      setTimeout(handlePageView, 100);
    };

    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      setTimeout(handlePageView, 100);
    };

    window.addEventListener('popstate', handlePageView);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePageView);
    };
  }, [trackAdView]);

  return null;
};

export default AdSenseManager;