import React, { useState, useEffect } from "react";

export default function AnimatedCursorToggle({ showCursor, setShowCursor }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setOffset(60); // Move toggle left when GoToTopButton appears
      } else {
        setOffset(0); // Reset position when GoToTopButton disappears
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => setShowCursor((prev) => !prev)}
        className={`cursor-toggle-btn${showCursor ? " active" : ""}`}
        aria-pressed={showCursor}
        aria-label={showCursor ? "Disable animated cursor" : "Enable animated cursor"}
        style={{ right: `${24 + offset}px`, transition: "right 0.3s ease-in-out", width: '30px', height: '30px', borderRadius: '8px',marginRight:'0'}} // Match cursor toggle size and make square
      >
        <span className="cursor-icon-box">
          <img
            src={showCursor ? "/cursor-blue.svg" : "/cursor-white.svg"}
            alt="Toggle animated cursor"
            className="toggle-cursor-icon"
          />
        </span>
      </button>
      <style jsx global>{`
        .cursor-toggle-btn {
          position: fixed;
          bottom: 24px;
          z-index: 100;
          width: 30px;
          height: 30px;
          background: rgba(34,34,59,0.35);
          border: none;
          border-radius: 8px; /* Adjusted to make it square */
          box-shadow: 0 2px 16px 0 rgba(0,0,0,0.18);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, box-shadow 0.2s;
          backdrop-filter: blur(8px) saturate(1.5);
          -webkit-backdrop-filter: blur(8px) saturate(1.5);
        }
        .cursor-toggle-btn .cursor-icon-box {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.18);
          box-shadow: 0 1px 4px 0 rgba(0,0,0,0.10);
          backdrop-filter: blur(4px) saturate(1.2);
          -webkit-backdrop-filter: blur(4px) saturate(1.2);
          transition: background 0.2s, box-shadow 0.2s;
        }
        .cursor-toggle-btn .toggle-cursor-icon {
          width: 20px;
          height: 20px;
          display: block;
          transition: transform 0.3s cubic-bezier(.4,2,.6,1), filter 0.2s;
          transform: rotate(0deg) scale(1);
        }
        .cursor-toggle-btn:hover {
          background: rgba(108,99,255,0.18);
        }
        .cursor-toggle-btn:hover .cursor-icon-box {
          background: rgba(255,255,255,0.32);
          box-shadow: 0 2px 8px 0 #6c63ff44;
        }
        .cursor-toggle-btn:hover .toggle-cursor-icon {
          transform: rotate(-20deg) scale(1.15);
          filter: drop-shadow(0 0 8px #6c63ff88) brightness(1.2);
        }
        .cursor-toggle-btn:active {
          background: #6c63ff;
        }
        .cursor-toggle-btn.active .cursor-icon-box {
          background: rgba(115,208,244,0.18);
          box-shadow: 0 2px 8px 0 #73d0f488;
        }
      `}</style>
    </>
  );
}