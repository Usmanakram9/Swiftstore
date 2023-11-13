import React, { useEffect, useState } from 'react';
import '../assets/CSS/NewHeaders.css';
import ScrollButton from './ScrollButton';

const NewHeaders = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [buttonOpacity, setButtonOpacity] = useState(1);

  useEffect(() => {
    const updateParallax = () => {
      const scrollTop = window.scrollY;
      const sampleSectionTop = document.querySelector(".sample-section").offsetTop;
      const headerHeight = document.querySelector(".sample-header-section").offsetHeight;
      setHeaderHeight(headerHeight);

      // Calculate the scroll threshold for content opacity
      const scrollThreshold = headerHeight / 4;

      // Update content opacity based on scroll position
      setContentOpacity(scrollTop < scrollThreshold ? 1 : 0);

      // Update button opacity based on scroll position
      setButtonOpacity(scrollTop < scrollThreshold ? 1 : 0);

      document.querySelector(".sample-section").style.marginTop = `${headerHeight}px`;
      document.querySelector(".sample-header").style.height = `${headerHeight - scrollTop}px`;
    };

    // Initial call to set the parallax height
    updateParallax();

    // Event listeners for scroll and resize
    window.addEventListener("scroll", updateParallax);
    window.addEventListener("resize", updateParallax);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, [headerHeight]); // Dependency array to include headerHeight in dependencies

  return (
    <>
      <div className="sample-header" style={{ marginTop: '60px' }}>
        <div className="sample-header-section">
          <h1 style={{ opacity: contentOpacity, color: '#fff', fontSize: '3rem', marginBottom: '1rem' }}>Discover the Latest Electronics</h1>
          <h2 style={{ opacity: contentOpacity, color: '#fff', fontSize: '1.5rem' }}>Upgrade your lifestyle with cutting-edge technology</h2>
        
          <ScrollButton to='latestProducts' text='Shop Now' style={{ opacity: buttonOpacity }} />
       
        </div>
      </div>
      <div className="sample-section-wrap">
        <div className="sample-section">
          {/* Your content goes here */}
        </div>
      </div>
    </>
  );
};

export default NewHeaders;
