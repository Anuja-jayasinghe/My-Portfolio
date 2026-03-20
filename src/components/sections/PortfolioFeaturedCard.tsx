"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  imagePath?: string;
}

export default function PortfolioFeaturedCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } gap-6 sm:gap-8 md:gap-12 items-center group`}
    >
      {/* Screenshot */}
      <div className="w-full md:w-3/5 relative overflow-hidden rounded-lg border border-black/10">
        <a
          href={project.liveUrl || project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="relative aspect-video overflow-hidden">
            {project.imagePath ? (
              <Image
                src={project.imagePath}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center font-mono text-gray-400">
                [No Image]
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        </a>
      </div>

      {/* Details */}
      <div
        className={`w-full md:w-2/5 ${
          isEven ? "md:text-left" : "md:text-right"
        }`}
      >
        <p className="text-sm font-mono text-accent mb-2 font-bold">
          Featured Project
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-black mb-4 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
          {project.description}
        </p>
        <div
          className={`flex flex-wrap gap-2 mb-8 ${
            isEven ? "" : "md:justify-end"
          }`}
        >
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono bg-gray-100 text-gray-700 px-3 py-1.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className={`flex gap-5 ${isEven ? "" : "md:justify-end"}`}>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono"
          >
            <Github className="w-5 h-5" /> Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono"
            >
              <ExternalLink className="w-5 h-5" /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
