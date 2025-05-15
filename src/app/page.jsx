'use client';
// src/app/page.js
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import CurvyBackground from "./components/BackgroundGraphics";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SplashCursor from "./components/AnimatedCursor";
import AnimatedCursorToggle from "./components/AnimatedCursorToggle";
import { useState } from "react";

export default function Home() {
  const [showCursor, setShowCursor] = useState(false);

  return (
    <>
      <AnimatedCursorToggle showCursor={showCursor} setShowCursor={setShowCursor} />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <CurvyBackground />
          <Header />
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />  
          <SplashCursor show={showCursor} />  
        </div>
      </div>
    </>
  );
}