// src/app/page.js
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import CurvyBackground from "./components/BackgroundGraphics";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div>
      <CurvyBackground />
      <Header/>
      <Hero />
      <AboutSection />
      <ProjectsSection/>
      <ContactSection/>
      <Footer/>
    </div>
  );
}
export const metadata = {
  title: 'Anuja Jayasinghe',
  icons: {
    icon: '/favicon.svg',
  },
};
