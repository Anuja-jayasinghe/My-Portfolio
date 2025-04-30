// src/app/page.js
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { Metadata } from 'next';

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ProjectsSection/>
      <ContactSection/>
    </div>
  );
}
export const metadata = {
  title: 'Anuja Jayasinghe',
  icons: {
    icon: '/favicon.svg',
  },
};
