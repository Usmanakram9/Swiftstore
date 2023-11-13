// ScrollButton.js
import React from 'react';
import { Link } from 'react-scroll';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import '../assets/CSS/ScrollButton.css'; 

const ScrollButton = ({ to, text, style }) => {
  return (
    <Link
      activeClass="active"
      to={to}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      className="scroll-button" // Add a class for styling
      style={style} // Apply the style prop
    >
      {text}
    </Link>
  );
};

// Add prop type validation
ScrollButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.object, // Accepts a style object
};

export default ScrollButton;
