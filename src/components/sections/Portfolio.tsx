import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
}

function ProjectCard({ title, description, technologies, githubUrl, liveUrl, featured = false }: ProjectProps) {
    return (
        <div className={`p-6 bg-white border ${featured ? 'border-accent/50 shadow-sm' : 'border-black/10'} hover:border-accent transition-colors flex flex-col h-full group`}>
            <h3 className="text-xl font-bold font-mono mb-3 text-black group-hover:text-accent transition-colors">{title}</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow">{description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {technologies.map(tech => (
                    <span key={tech} className="text-xs font-mono bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex gap-4 mt-auto">
                {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent transition-colors flex items-center gap-1 text-sm font-bold">
                        <Github className="w-4 h-4" /> Code
                    </a>
                )}
                {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent transition-colors flex items-center gap-1 text-sm font-bold">
                        <ExternalLink className="w-4 h-4" /> Live
                    </a>
                )}
            </div>
        </div>
    );
}

export default function Portfolio() {
    const featuredProjects = [
        {
            title: "PayLedger",
            description: "A comprehensive financial tracking system featuring bill management, public dashboards, and automated email summaries.",
            technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
            githubUrl: "https://github.com/Anuja-jayasinghe/PayLedger",
            liveUrl: "https://payledger.anujajay.com",
            featured: true
        },
        {
            title: "SolarEdge Analytics",
            description: "Real-time solar energy monitoring dashboard with OCR-based CEB bill management and API integration.",
            technologies: ["Vite", "Supabase", "Chart.js", "SolarEdge API", "Tesseract.js"],
            githubUrl: "https://github.com/Anuja-jayasinghe/Solar-Analytics-Dashboard",
            liveUrl: "https://solaredge.anujajay.com",
            featured: true
        },
        {
            title: "ComponentOps",
            description: "A collection of reusable, motion-enhanced UI components for rapid frontend development.",
            technologies: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
            githubUrl: "https://github.com/Anuja-jayasinghe/React-Components-Library",
            liveUrl: "https://componentops.anujajay.com",
            featured: true
        },
        {
            title: "CheckMS",
            description: "A professional check portfolio manager for tracking and organizing LKR financial transactions.",
            technologies: ["Next.js", "Neon Postgres", "Tailwind CSS", "TypeScript"],
            githubUrl: "https://github.com/Anuja-jayasinghe/CheckMS",
            liveUrl: "https://checkms.anujajay.com",
            featured: true
        }
    ];

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

    return (
        <section id="portfolio" className="py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 flex items-center gap-4 text-black">
                    <span className="text-accent">02.</span> Selected Work
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {featuredProjects.map((project, i) => (
                        <ProjectCard key={i} {...project} />
                    ))}
                </div>

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
