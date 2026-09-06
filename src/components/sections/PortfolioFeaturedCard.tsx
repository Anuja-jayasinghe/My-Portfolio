"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Link2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";

export default function PortfolioFeaturedCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const media = project.media ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];

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
      {/* Media gallery */}
      <div className="w-full md:w-3/5 relative overflow-hidden rounded-lg border border-black/10">
        <div className="relative aspect-video overflow-hidden">
          {activeMedia ? (
            activeMedia.type === "video" ? (
              <video
                key={activeMedia.src}
                src={activeMedia.src}
                poster={activeMedia.poster}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <a
                href={project.liveUrl || project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                />
              </a>
            )
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center font-mono text-gray-400">
              [No Image]
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
        </div>

        {media.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {media.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Show media ${i + 1} of ${media.length}`}
                aria-current={i === activeIndex}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
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
          {project.secondaryLink && (
            <a
              href={project.secondaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono"
            >
              <Link2 className="w-5 h-5" /> {project.secondaryLink.label}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
