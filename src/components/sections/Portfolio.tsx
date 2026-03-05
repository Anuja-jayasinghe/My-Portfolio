"use client";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturedProject {
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    image: string;
}

const featuredProjects: FeaturedProject[] = [
    {
        title: "PayLedger",
        description: "A comprehensive financial tracking system featuring bill management, public dashboards, and automated email summaries.",
        technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/Anuja-jayasinghe/PayLedger",
        liveUrl: "https://payledger.anujajay.com",
        image: "/projects/payledger1.png",
    },
    {
        title: "SolarEdge Analytics",
        description: "Real-time solar energy monitoring dashboard with OCR-based CEB bill management and API integration.",
        technologies: ["Vite", "Supabase", "Chart.js", "SolarEdge API", "Tesseract.js"],
        githubUrl: "https://github.com/Anuja-jayasinghe/Solar-Analytics-Dashboard",
        liveUrl: "https://solaredge.anujajay.com",
        image: "/projects/solaredge1.png",
    },
    {
        title: "ComponentOps",
        description: "A collection of reusable, motion-enhanced UI components for rapid frontend development.",
        technologies: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
        githubUrl: "https://github.com/Anuja-jayasinghe/React-Components-Library",
        liveUrl: "https://componentops.anujajay.com",
        image: "/projects/componentops1.png",
    },
    {
        title: "CheckMS",
        description: "A professional check portfolio manager for tracking and organizing LKR financial transactions.",
        technologies: ["Next.js", "Neon Postgres", "Tailwind CSS", "TypeScript"],
        githubUrl: "https://github.com/Anuja-jayasinghe/CheckMS",
        liveUrl: "https://checkms.anujajay.com",
        image: "/projects/checkms1.png",
    },
];

function FeaturedCard({ project, index }: { project: FeaturedProject; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center group`}
        >
            {/* Screenshot */}
            <div className="w-full md:w-3/5 relative overflow-hidden rounded-lg border border-black/10">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative aspect-video overflow-hidden">
                        <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                </a>
            </div>

            {/* Details */}
            <div className={`w-full md:w-2/5 ${isEven ? "md:text-left" : "md:text-right"}`}>
                <p className="text-sm font-mono text-accent mb-2 font-bold">Featured Project</p>
                <h3 className="text-3xl md:text-4xl font-bold font-mono text-black mb-4 group-hover:text-accent transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">
                    {project.description}
                </p>
                <div className={`flex flex-wrap gap-2 mb-8 ${isEven ? "" : "md:justify-end"}`}>
                    {project.technologies.map(tech => (
                        <span key={tech} className="text-xs font-mono bg-gray-100 text-gray-700 px-3 py-1.5 rounded">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className={`flex gap-5 ${isEven ? "" : "md:justify-end"}`}>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono">
                        <Github className="w-5 h-5" /> Code
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono">
                        <ExternalLink className="w-5 h-5" /> Live
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

const miniProjects = [
    { title: "Hangman", tech: ["JavaScript", "HTML", "CSS"], link: "https://github.com/Anuja-jayasinghe/hangman" },
    { title: "Python Ranking Calculator", tech: ["Python"], link: "https://github.com/Anuja-jayasinghe/Python-ranking-calculator" },
    { title: "Mouse Auto-Active", tech: ["Python", "PyAutoGUI"], link: "https://github.com/Anuja-jayasinghe/mouse-auto-active" },
    { title: "NIC Detail Extractor", tech: ["Python", "JavaScript"], link: "https://github.com/Anuja-jayasinghe/NIC-detail-extractor" },
    { title: "Simple JS Calculator", tech: ["HTML", "CSS", "JS"], link: "https://github.com/Anuja-jayasinghe/Simple-JS-Calculator" },
    { title: "CEB Management", tech: ["JavaScript", "Firebase"], link: "https://github.com/Anuja-jayasinghe/ceb-management" },
];

const otherLab = [
    { title: "JaySync-Lab", tech: ["Proxmox", "Docker", "Tailscale", "Bash"], link: "https://github.com/Anuja-jayasinghe/JaySync-Lab" },
    { title: "EcoAction", tech: ["HTML", "CSS", "JavaScript"], link: "https://github.com/Anuja-jayasinghe/EcoAction" },
    { title: "Project Management", tech: ["Java", "MySQL", "JDBC"], link: "https://github.com/Anuja-jayasinghe/project-management-system" },
];

export default function Portfolio() {
    return (
        <section id="portfolio" className="py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-20 flex items-center gap-4 text-black">
                    <span className="text-accent">02.</span> Selected Work
                </h2>

                {/* Featured Projects - Alternating Layout */}
                <div className="flex flex-col gap-24 md:gap-32 mb-28">
                    {featuredProjects.map((project, i) => (
                        <FeaturedCard key={i} project={project} index={i} />
                    ))}
                </div>

                {/* Mini Projects */}
                <h3 className="text-2xl font-bold font-mono mb-8 text-black border-b border-black/10 pb-4">Mini Projects & Lab</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {[...miniProjects, ...otherLab].map((project, i) => (
                        <div key={i} className="p-4 bg-gray-50 border border-black/5 hover:border-accent transition-colors flex flex-col group">
                            <h4 className="font-bold font-mono text-black mb-2 group-hover:text-accent transition-colors">{project.title}</h4>
                            <p className="text-xs text-gray-500 mb-4 font-mono">{project.tech.join(" · ")}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto text-sm text-black group-hover:text-accent flex items-center gap-1 font-bold transition-colors">
                                <Github className="w-3 h-3" /> View Source
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
