'use client';

import React from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import "../styles/projectsGlitter.css";

const projects = [
  {
    title: "EcoAction",
    description: "An environmental action platform that helps users track and reduce their carbon footprint.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://anuja-jayasinghe.github.io/EcoAction/",
    github: "https://github.com/Anuja-jayasinghe/EcoAction",
  },
  {
    title: "Simple JS Calculator",
    description: "A clean and intuitive calculator built with vanilla JavaScript, featuring basic arithmetic operations.",
    tech: ["JavaScript", "HTML", "CSS"],
    link: "https://simple-js-cal.vercel.app/",
    github: "https://github.com/Anuja-jayasinghe/Simple_JS_Calculator",
  },
  {
    title: "My Portfolio",
    description: "A modern, responsive portfolio website showcasing my projects and skills.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    link: "https://anujajay.com",
    github: "https://github.com/Anuja-jayasinghe/my-portfolio",
  },
  {
    title: "Chess Academy System",
    description: "A Java-based management system for chess academies, handling student registrations and course management.",
    tech: ["Java", "JavaFX", "MySQL"],
    github: "https://github.com/Anuja-jayasinghe/ChessAcademySystem_Java",
  },
  {
    title: "Percolation Demonstration",
    description: "A Python program that demonstrates percolation theory in a simple and interactive manner.",
    tech: ["Python"],
    github: "https://github.com/Anuja-jayasinghe/percolation_demonstration",
  },
  {
    title: "Traffic Analyzer",
    description: "A system for analyzing and visualizing traffic patterns using real-time data.",
    tech: ["Python", "Pandas", "Matplotlib"],
    github: "https://github.com/Anuja-jayasinghe/traffic_analyzer",
  }
];

const splitProjects = (arr) => {
  const half = Math.ceil(arr.length / 2);
  return [arr.slice(0, half), arr.slice(half)];
};

// Mobile carousel with advanced swipe and 3D effect
const MobileProjectsCarousel = ({ projects }) => {
  const [current, setCurrent] = React.useState(0);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [cardWidth, setCardWidth] = React.useState(320); // default 320px for SSR
  const cardHeight = 240; // even more compact height

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCardWidth(0.85 * window.innerWidth);
    }
  }, []);

  // Snap to nearest card on drag end
  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    let newIndex = current - Math.round((offset + velocity * 0.2) / cardWidth);
    newIndex = Math.max(0, Math.min(projects.length - 1, newIndex));
    setCurrent(newIndex);
    controls.start({ x: -newIndex * cardWidth });
  };

  // Snap to current card when current changes
  React.useEffect(() => {
    controls.start({ x: -current * cardWidth });
    // eslint-disable-next-line
  }, [current]);

  return (
    <>
      <div className="relative w-full overflow-x-hidden" style={{ height: 260 }}>
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: -(projects.length - 1) * cardWidth, right: 0 }}
          style={{ x }}
          animate={controls}
          onDragEnd={handleDragEnd}
        >
          {projects.map((project, idx) => {
            // 3D effect: center card is flat, sides are tilted
            let rotate = 0;
            if (idx < current) rotate = 20;
            else if (idx > current) rotate = -20;
            return (
              <motion.div
                key={idx}
                className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-blue-500/30 p-8 rounded-3xl shadow-2xl mx-3 flex-shrink-0 flex flex-col items-center justify-between transition-transform duration-300 hover:scale-105 active:scale-100 text-center"
                style={{
                  minWidth: cardWidth,
                  maxWidth: cardWidth,
                  height: cardHeight,
                  transform: `perspective(800px) rotateY(${rotate}deg) scale(${idx === current ? 1 : 0.92})`,
                  zIndex: idx === current ? 2 : 1,
                  transition: 'transform 0.3s',
                }}
              >
                {/* Soft glow background */}
                <div className="absolute -inset-8 z-0 pointer-events-none">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-blue-400/20 via-purple-400/10 to-white/5 blur-2xl opacity-70 animate-spin-slow"></div>
                </div>
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
                <div className="relative z-10 w-full flex flex-col items-center">
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">{project.title}</h3>
                  <p className="mb-4 text-gray-200 text-lg leading-relaxed drop-shadow text-justify">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {project.tech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-blue-500/80 px-3 py-1 rounded-lg text-base font-medium text-white shadow"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 mt-auto justify-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-400 text-base font-semibold transition-colors duration-200"
                    >
                      GitHub
                    </a>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-400 text-base font-semibold transition-colors duration-200"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {/* Swipe hint */}
      <div className="flex items-center justify-center mt-2 mb-4 text-gray-400 text-xs select-none md:hidden">
        <svg className="w-4 h-4 mr-1 animate-bounce-x" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-4-4 4 4-4 4"/></svg>
        Swipe to see more
      </div>
    </>
  );
};

const ProjectsSection = () => {
  const [row1, row2] = splitProjects(projects);
  return (
    <section id="projects" className="py-10 md:py-20 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 md:mb-10 text-center">
          Some Things I've Built
        </h2>
        {/* Mobile: Two advanced carousels */}
        <div className="block md:hidden space-y-8">
          <MobileProjectsCarousel projects={row1} />
          <MobileProjectsCarousel projects={row2} />
        </div>
        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-blue-500/30 p-8 rounded-3xl shadow-2xl hover:scale-105 transform transition duration-300 hover:shadow-blue-500/50 hover:shadow-lg hover:-translate-y-2 max-w-sm mx-auto w-full"
            >
              {/* Soft glow background */}
              <div className="absolute -inset-8 z-0 pointer-events-none">
                <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-blue-400/20 via-purple-400/10 to-white/5 blur-2xl opacity-70 animate-spin-slow"></div>
              </div>
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
              <div className="relative z-10 w-full flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-lg">{project.title}</h3>
                <p className="mb-4 text-gray-300 text-base leading-relaxed drop-shadow text-justify">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-500/80 px-3 py-1 rounded-lg text-sm font-medium text-white shadow"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-auto justify-center">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-400 text-base font-semibold transition-colors duration-200"
                  >
                    GitHub
                  </a>
                  {index < 3 && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-400 text-base font-semibold transition-colors duration-200"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 md:mt-10 text-center">
          <a
            href="https://github.com/Anuja-jayasinghe"
            target="_blank"
            rel="noopener noreferrer"
            className="more-projects-btn inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">
              More projects
              <svg
                className="inline ml-2 align-baseline"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ verticalAlign: '-0.25em' }}
              >
                <line x1="4" y1="12" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polyline points="8,4 12,4 12,8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="glitter-effect" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
