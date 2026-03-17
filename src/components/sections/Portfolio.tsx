"use client";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import projectsData from "../../data/projects.json";
import TerminalOne from "../ui/TerminalOne";

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

function FeaturedCard({ project, index }: { project: Project; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 sm:gap-8 md:gap-12 items-center group`}
        >
            {/* Screenshot */}
            <div className="w-full md:w-3/5 relative overflow-hidden rounded-lg border border-black/10">
                <a href={project.liveUrl || project.repoUrl} target="_blank" rel="noopener noreferrer" className="block">
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
            <div className={`w-full md:w-2/5 ${isEven ? "md:text-left" : "md:text-right"}`}>
                <p className="text-sm font-mono text-accent mb-2 font-bold">Featured Project</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-black mb-4 group-hover:text-accent transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                    {project.description}
                </p>
                <div className={`flex flex-wrap gap-2 mb-8 ${isEven ? "" : "md:justify-end"}`}>
                    {project.techStack.map(tech => (
                        <span key={tech} className="text-xs font-mono bg-gray-100 text-gray-700 px-3 py-1.5 rounded">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className={`flex gap-5 ${isEven ? "" : "md:justify-end"}`}>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono">
                        <Github className="w-5 h-5" /> Code
                    </a>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono">
                            <ExternalLink className="w-5 h-5" /> Live
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Portfolio ──────────────────────────────────────────────────────────
export default function Portfolio() {
    const featuredProjects = projectsData.filter((p) => p.type === "featured");

    return (
        <section id="portfolio" className="py-16 sm:py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-12 sm:mb-20 flex items-center gap-3 sm:gap-4 text-black">
                    <span className="text-accent">02.</span> Selected Work
                </h2>

                {/* Featured Projects - Alternating Layout */}
                <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 mb-16 sm:mb-28">
                    {featuredProjects.map((project, i) => (
                        <FeaturedCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                {/* Mini Projects Header */}
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-black mb-2 flex items-center gap-3">
                        <TerminalOneIcon />
                        Terminal One
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-mono max-w-xl">
                        A collection of smaller experiments, scripts, and utilities. Hover over a file in the explorer to execute its manifest.
                    </p>
                </div>
            </div>

            {/* Terminal One Container - full width on mobile, constrained on desktop */}
            <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pb-8">
                <TerminalOne />
            </div>
        </section>
    );
}

function TerminalOneIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal">
            <polyline points="4 17 10 11 4 5"/>
            <line x1="12" x2="20" y1="19" y2="19"/>
        </svg>
    );
}
