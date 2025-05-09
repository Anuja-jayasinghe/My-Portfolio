// components/Footer.jsx
"use client";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-gray-900/80 to-transparent border-t border-blue-500/20 py-8 text-center text-white mt-10 overflow-hidden">
      {/* Soft animated glow */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-16 bg-blue-400/20 blur-2xl rounded-full pointer-events-none animate-spin-slow" />
      <div className="flex flex-col items-center gap-2 z-10 relative">
        <span className="text-xs text-blue-300 animate-pulse">Thank you for visiting!</span>
        <span className="text-sm text-gray-300 mt-1">© {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  );
}
