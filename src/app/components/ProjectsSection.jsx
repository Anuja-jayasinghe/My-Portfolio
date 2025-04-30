'use client';

import React from 'react';

const projects = [
  {
    title: "Project Management System",
    description: "A Python program for managing company projects with efficient organization and tracking capabilities.",
    tech: ["Python", "MySQL"],
    link: "https://github.com/Anuja-jayasinghe/Project-manegement-system",
    github: "https://github.com/Anuja-jayasinghe/Project-manegement-system",
  },
  {
    title: "NIC Detail Extractor",
    description: "A Python script that extracts and processes information from Sri Lankan National Identity Card numbers.",
    tech: ["Python"],
    link: "https://github.com/Anuja-jayasinghe/NIC-detailExtracter",
    github: "https://github.com/Anuja-jayasinghe/NIC-detailExtracter",
  },
  {
    title: "Percolation Demonstration",
    description: "A Python program that demonstrates percolation theory in a simple and interactive manner.",
    tech: ["Python"],
    link: "https://github.com/Anuja-jayasinghe/percolation_demonstration",
    github: "https://github.com/Anuja-jayasinghe/percolation_demonstration",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-black text-white">
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
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-400 transition-colors duration-300"
                >
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
