'use client';

import React, { useState, useEffect } from 'react';
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

const useActiveCardLoop = (length, interval = 2000) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % length);
    }, interval);
    return () => clearInterval(timer);
  }, [length, interval]);
  return activeIndex;
};

const MobileProjectsCarousel = ({ projects, activeIndex }) => {
  const [current, setCurrent] = useState(0);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [cardWidth, setCardWidth] = useState(320);
  const cardHeight = 240;

  const randomTransforms = React.useRef(
    projects.map(() => ({
      rotate: Math.random() * 40 - 20,
      scale: 0.92 + Math.random() * 0.16,
      y: Math.random() * 20 - 10,
    }))
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCardWidth(0.85 * window.innerWidth);
    }
  }, []);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    let newIndex = current - Math.round((offset + velocity * 0.2) / cardWidth);
    newIndex = Math.max(0, Math.min(projects.length - 1, newIndex));
    setCurrent(newIndex);
    controls.start({ x: -newIndex * cardWidth });
  };

  useEffect(() => {
    controls.start({ x: -current * cardWidth });
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
            const isActive = idx === activeIndex;
            const { rotate, scale, y } = randomTransforms.current[idx];
            return (
              <motion.div
                key={idx}
                className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-blue-500/30 p-8 rounded-3xl shadow-2xl mx-3 flex-shrink-0 flex flex-col items-center justify-between transition-transform duration-300 text-center"
                style={{
                  minWidth: cardWidth,
                  maxWidth: cardWidth,
                  height: cardHeight,
                  transform: `perspective(800px) rotateY(${rotate}deg) scale(${scale}) translateY(${y}px)`,
                  zIndex: isActive ? 2 : 1,
                  transition: 'transform 0.3s',
                }}
              >
                <div className="absolute -inset-8 z-0 pointer-events-none">
                  <div className={`w-full h-full rounded-3xl bg-gradient-to-tr from-blue-400/20 via-purple-400/10 to-white/5 blur-2xl opacity-70 ${isActive ? "animate-spin-slow" : ""}`}></div>
                </div>
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
                <div className="relative z-10 w-full flex flex-col items-center">
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">{project.title}</h3>
                  <p className="mb-4 text-gray-200 text-lg leading-relaxed drop-shadow text-justify">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {project.tech.map((tech, tIdx) => (
                      <span key={tIdx} className="bg-blue-500/80 px-3 py-1 rounded-lg text-base font-medium text-white shadow">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 mt-auto justify-center">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 text-base font-semibold transition-colors duration-200">
                      GitHub
                    </a>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 text-base font-semibold transition-colors duration-200">
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
      <div className="flex items-center justify-center mt-2 mb-4 text-gray-400 text-xs select-none md:hidden">
        <svg className="w-4 h-4 mr-1 animate-bounce-x" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-4-4 4 4-4 4" />
        </svg>
        Swipe to see more
      </div>
    </>
  );
};

const ProjectsSection = () => {
  const [row1, row2] = splitProjects(projects);
  const activeIndex = useActiveCardLoop(projects.length, 2000);
  return (
    <section id="projects" className="py-10 md:py-20 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 md:mb-10 text-center">Some Things I've Built</h2>
        <div className="block md:hidden space-y-8">
          <MobileProjectsCarousel projects={row1} activeIndex={activeIndex < row1.length ? activeIndex : -1} />
          <MobileProjectsCarousel projects={row2} activeIndex={activeIndex >= row1.length ? activeIndex - row1.length : -1} />
        </div>
        {/* Desktop Grid (omitted for brevity if needed) */}
      </div>
    </section>
  );
};

export default ProjectsSection;
