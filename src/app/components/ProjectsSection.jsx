'use client';

import React from 'react';
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

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Some Things I've Built
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-2xl hover:scale-105 transform transition duration-300 hover:shadow-blue-500/50 hover:shadow-lg hover:-translate-y-2 max-w-sm mx-auto w-full"
            >
              <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
              <p className="mb-4 text-gray-300">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-500 px-2 py-1 rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-400 transition-colors duration-300"
                >
                  GitHub
                </a>
                {index < 3 && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-400 transition-colors duration-300"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
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
