// src/app/page.js
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import CurvyBackground from "./components/BackgroundGraphics";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SplashCursor from "./components/AnimatedCursor";


export default function Home() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <CurvyBackground />
          <Header />
          <SplashCursor />
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />     
        </div>
      </div>
    </>
  );
}
export const metadata = {
  title: 'Anuja Jayasinghe',
  icons: {
    icon: '/favicon.svg',
  },
};
