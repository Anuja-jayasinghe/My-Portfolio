// components/Footer.jsx
"use client";

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 text-white py-6 text-center text-sm">
      &copy; {new Date().getFullYear()} Anuja Jayasinghe. All rights reserved.
    </footer>
  );
}
