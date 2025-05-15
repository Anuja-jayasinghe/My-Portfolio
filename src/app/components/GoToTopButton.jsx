"use client";

import React, { useState, useEffect } from 'react';
import styles from '../styles/GoToTopButton.module.css';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorOffset, setCursorOffset] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
        setCursorOffset(50); // Move cursor toggle to the left
      } else {
        setIsVisible(false);
        setCursorOffset(0); // Reset cursor toggle position
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button
        className={isVisible ? styles.visible : styles.hidden}
        onClick={scrollToTop}
        aria-label="Go to top"
        style={{ width: '30px', height: '30px', borderRadius: '0', backgroundColor: 'inherit', marginRight: '5px', marginLeft:'-20' }} // Match cursor toggle size, make square, and align closer
      >
        ↑
      </button>
      <div
        style={{ transform: `translateX(-${cursorOffset}px)`, transition: 'transform 0.3s ease-in-out', backgroundColor: 'inherit' }}
        className="cursor-toggle"
      >
        {/* Cursor toggle content */}
      </div>
    </>
  );
};

export default GoToTopButton;