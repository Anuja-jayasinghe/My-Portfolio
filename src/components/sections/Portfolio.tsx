"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 sm:gap-8 md:gap-12 items-center group`}
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
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-black mb-4 group-hover:text-accent transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
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

// ─── Mini Project Data ──────────────────────────────────────────────────────

interface MiniProject {
    title: string;
    tech: string[];
    desc: string;
    link: string;
}

const allMiniProjects: MiniProject[] = [
    {
        title: "NIC Detail Extractor",
        tech: ["Python", "JS"],
        desc: "Extracts birthdate, gender, and age from SL NIC numbers using custom regex logic.",
        link: "https://github.com/Anuja-jayasinghe/NIC-detailExtracter",
    },
    {
        title: "Mouse Auto-Active",
        tech: ["Python", "PyAutoGUI"],
        desc: "Keeps computer sessions active by simulating periodic mouse movement.",
        link: "https://github.com/Anuja-jayasinghe/Mouse-auto-active",
    },
    {
        title: "CEB Management",
        tech: ["JS", "Firebase"],
        desc: "Manages and calculates electricity consumption based on CEB rates.",
        link: "https://github.com/Anuja-jayasinghe/CEB_Management",
    },
    {
        title: "JaySync-Lab",
        tech: ["Proxmox", "Docker"],
        desc: "Home lab for media automation and network security via Pi-hole and tunneling.",
        link: "https://github.com/Anuja-jayasinghe/JaySync-Lab",
    },
    {
        title: "Project Management",
        tech: ["Java", "MySQL"],
        desc: "Backend system for managing software development lifecycles and tasks.",
        link: "https://github.com/Anuja-jayasinghe/Project-manegement-system",
    },
    {
        title: "Hangman",
        tech: ["JS", "HTML", "CSS"],
        desc: "Classic word-guessing game built with vanilla JavaScript and DOM manipulation.",
        link: "https://github.com/Anuja-jayasinghe/HangMan",
    },
    {
        title: "Ranking Calculator",
        tech: ["Python"],
        desc: "Calculates and sorts student rankings based on weighted module scores.",
        link: "https://github.com/Anuja-jayasinghe/Python-ranking-calculator",
    },
    {
        title: "JS Calculator",
        tech: ["HTML", "CSS", "JS"],
        desc: "A clean, functional calculator built with vanilla HTML, CSS and JavaScript.",
        link: "https://github.com/Anuja-jayasinghe/Simple_JS_Calculator",
    },
    {
        title: "EcoAction",
        tech: ["HTML", "CSS", "JS"],
        desc: "Environmental awareness platform promoting sustainable community actions.",
        link: "https://github.com/Anuja-jayasinghe/EcoAction",
    },
];

// ─── Looping terminal for first card ────────────────────────────────────────
function LoopingTerminal({ project, active }: { project: MiniProject; active: boolean }) {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    const terminalLines = [
        { text: `$ ssh anuja@${slug}.dev`, color: "text-green-400" },
        { text: "Connecting...", color: "text-white/30" },
        { text: `Welcome to ${project.title}`, color: "text-white font-semibold" },
        { text: "─".repeat(28), color: "text-white/10" },
        { text: project.desc, color: "text-white/50" },
        { text: "", color: "" },
        { text: `stack: ${project.tech.join(" · ")}`, color: "text-blue-400/70" },
        { text: `repo:  github.com/.../${slug}`, color: "text-yellow-400/50" },
    ];

    const [visibleLines, setVisibleLines] = useState(0);
    const [phase, setPhase] = useState<"typing" | "erasing">("typing");
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if (!active) {
            setVisibleLines(0);
            setPhase("typing");
            setOpacity(1);
            return;
        }
        let timeout: ReturnType<typeof setTimeout>;
        if (phase === "typing") {
            if (visibleLines < terminalLines.length) {
                timeout = setTimeout(() => setVisibleLines(v => v + 1), 160);
            } else {
                timeout = setTimeout(() => setPhase("erasing"), 3000);
            }
        } else if (phase === "erasing") {
            setOpacity(0);
            timeout = setTimeout(() => {
                setVisibleLines(0);
                setOpacity(1);
                setPhase("typing");
            }, 600);
        }
        return () => clearTimeout(timeout);
    }, [phase, visibleLines, terminalLines.length, active]);

    return (
        <div style={{ opacity, transition: phase === "erasing" ? "opacity 0.5s ease" : "opacity 0.2s ease" }}
            className="space-y-2">
            {terminalLines.slice(0, visibleLines).map((line, li) => (
                <div key={li} className={`${line.color} leading-relaxed`}>
                    {line.text || "\u00A0"}
                </div>
            ))}
            {visibleLines < terminalLines.length && phase === "typing" && (
                <span className="inline-block w-2 h-4 bg-green-400/70 animate-pulse" />
            )}
            {visibleLines >= terminalLines.length && phase !== "erasing" && (
                <div className="flex items-center gap-1.5 mt-3">
                    <span className="text-green-400">$</span>
                    <span className="w-2 h-4 bg-green-400/70 animate-pulse" />
                </div>
            )}
        </div>
    );
}

// ─── One-shot typewriter for hover/tap activated cards ───────────────────────
function TerminalContent({ project }: { project: MiniProject }) {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    const terminalLines = [
        { text: `$ ssh anuja@${slug}.dev`, color: "text-green-400" },
        { text: "Connecting...", color: "text-white/30" },
        { text: `Welcome to ${project.title}`, color: "text-white font-bold" },
        { text: "─".repeat(28), color: "text-white/10" },
        { text: project.desc, color: "text-white/50" },
        { text: "", color: "" },
        { text: `stack: ${project.tech.join(" · ")}`, color: "text-blue-400/70" },
        { text: `repo:  github.com/.../${slug}`, color: "text-yellow-400/50" },
    ];
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        setVisibleLines(0);
        let line = 0;
        const interval = setInterval(() => {
            line++;
            setVisibleLines(line);
            if (line >= terminalLines.length) clearInterval(interval);
        }, 160);
        return () => clearInterval(interval);
    }, [project.title, terminalLines.length]);

    return (
        <div className="space-y-2">
            {terminalLines.slice(0, visibleLines).map((line, li) => (
                <div key={li} className={`${line.color} leading-relaxed`}>
                    {line.text || "\u00A0"}
                </div>
            ))}
            {visibleLines < terminalLines.length && (
                <span className="inline-block w-2 h-4 bg-green-400/70 animate-pulse" />
            )}
            {visibleLines >= terminalLines.length && (
                <div className="flex items-center gap-1.5 mt-3">
                    <span className="text-green-400">$</span>
                    <span className="w-2 h-4 bg-green-400/70 animate-pulse" />
                </div>
            )}
        </div>
    );
}

// ─── Desktop fan card ────────────────────────────────────────────────────────
function DesktopCard({
    project, index, total, offsetX, cardWidth, isActive, isAnyActive, onMouseEnter, onMouseLeave,
}: {
    project: MiniProject; index: number; total: number; offsetX: number; cardWidth: number;
    isActive: boolean; isAnyActive: boolean; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    const isFirst = index === 0;

    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 cursor-pointer"
            style={{
                left: `${offsetX}px`,
                zIndex: isActive ? 50 : total - index,
                width: `${cardWidth}px`,
            }}
            animate={{ y: isActive ? -50 : 0, scale: isActive ? 1.15 : 1, rotate: isActive ? 0 : 40 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                    backgroundColor: "#0d0d1f",
                    height: "420px",
                    border: isActive ? "1.5px solid rgba(74,222,128,0.35)" : "1.5px solid transparent",
                    boxShadow: isActive
                        ? "0 30px 60px rgba(0,0,0,0.55), 0 0 30px rgba(74,222,128,0.08)"
                        : "0 6px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04)",
                    transition: "box-shadow 0.25s ease, border 0.25s ease",
                }}>
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 shrink-0"
                    style={{ backgroundColor: "#080816", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/60" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <span className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] text-white/20 font-mono ml-2 tracking-wider">
                        {(isActive || isFirst) ? `${slug}.dev` : `terminal-${String(index + 1).padStart(2, "0")}`}
                    </span>
                </div>

                {/* Body */}
                <div className="flex-1 px-5 py-4 font-mono text-[11px] overflow-hidden relative leading-relaxed">
                    {isFirst ? (
                        (!isAnyActive || isActive)
                            ? <LoopingTerminal project={project} active={!isAnyActive || isActive} />
                            : (
                                <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                                    <span className="font-mono select-none"
                                        style={{ fontSize: "52px", color: "rgba(74,222,128,0.08)", lineHeight: 1 }}>~</span>
                                    <span className="font-mono select-none tracking-widest"
                                        style={{ fontSize: "13px", color: "rgba(255,255,255,0.06)" }}>ssh://idle</span>
                                </div>
                            )
                    ) : !isActive ? (
                        <div className="absolute inset-0" />
                    ) : (
                        <TerminalContent project={project} />
                    )}
                </div>
            </div>
        </motion.a>
    );
}

// ─── Desktop fan deck with ResizeObserver ────────────────────────────────────
function DesktopDeck({ projects, hoveredIndex, setHoveredIndex }: {
    projects: MiniProject[]; hoveredIndex: number | null; setHoveredIndex: (i: number | null) => void;
}) {
    const total = projects.length;
    const CARD_WIDTH = 260;
    const DECK_HEIGHT = 480;
    const [containerWidth, setContainerWidth] = useState(1200);

    const containerRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;
        setContainerWidth(node.getBoundingClientRect().width);
        const ro = new ResizeObserver(entries => {
            setContainerWidth(entries[0].contentRect.width);
        });
        ro.observe(node);
    }, []);

    const step = total > 1 ? (containerWidth - CARD_WIDTH) / (total - 1) : 0;

    return (
        <div ref={containerRef} style={{ position: "relative", width: "100%", height: `${DECK_HEIGHT}px` }}>
            {[...projects].reverse().map((project, reversedIdx) => {
                const index = total - 1 - reversedIdx;
                const offsetX = Math.round(index * step);
                return (
                    <DesktopCard
                        key={project.title}
                        project={project}
                        index={index}
                        total={total}
                        offsetX={offsetX}
                        cardWidth={CARD_WIDTH}
                        isActive={hoveredIndex === index}
                        isAnyActive={hoveredIndex !== null}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    />
                );
            })}
        </div>
    );
}

// ─── Mobile card (tap-to-expand accordion) ───────────────────────────────────
function MobileCard({ project, index, isExpanded, onTap }: {
    project: MiniProject; index: number; isExpanded: boolean; onTap: () => void;
}) {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    const isFirst = index === 0;

    return (
        <motion.div layout className="rounded-xl overflow-hidden"
            style={{
                backgroundColor: "#0d0d1f",
                boxShadow: isExpanded
                    ? "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)"
                    : "0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
                transition: "box-shadow 0.25s ease",
            }}>
            {/* Tap header */}
            <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                style={{ backgroundColor: "#080816", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                onClick={onTap}>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] text-white/25 font-mono tracking-wider">
                        {isExpanded ? `${slug}.dev` : `terminal-${String(index + 1).padStart(2, "0")}`}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {!isExpanded && (
                        <div className="flex gap-1.5">
                            {project.tech.map(t => (
                                <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                                    style={{ backgroundColor: "rgba(96,165,250,0.1)", color: "rgba(147,197,253,0.6)" }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                    <motion.span className="font-mono text-white/20 text-xs"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}>
                        ▾
                    </motion.span>
                </div>
            </div>

            {/* Collapsed: title row */}
            {!isExpanded && (
                <div className="px-4 py-3">
                    <span className="font-mono text-xs text-white/50">{project.title}</span>
                </div>
            )}

            {/* Expanded: terminal + github button */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden">
                        <div className="px-4 py-4 font-mono text-[11px] leading-relaxed">
                            {isFirst
                                ? <LoopingTerminal project={project} active={isExpanded} />
                                : <TerminalContent project={project} />
                            }
                        </div>
                        <div className="px-4 pb-4">
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="block w-full text-center font-mono py-2.5 rounded-lg no-underline"
                                style={{
                                    fontSize: "11px",
                                    backgroundColor: "rgba(74,222,128,0.07)",
                                    color: "rgba(74,222,128,0.65)",
                                    border: "1px solid rgba(74,222,128,0.15)",
                                    letterSpacing: "0.1em",
                                }}>
                                $ open github ↗
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function MobileDeck({ projects }: { projects: MiniProject[] }) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    return (
        <div className="flex flex-col gap-2 w-full">
            {projects.map((project, index) => (
                <MobileCard
                    key={project.title}
                    project={project}
                    index={index}
                    isExpanded={expandedIndex === index}
                    onTap={() => setExpandedIndex(prev => prev === index ? null : index)}
                />
            ))}
        </div>
    );
}

// ─── Main Portfolio ──────────────────────────────────────────────────────────
export default function Portfolio() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section id="portfolio" className="py-16 sm:py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-12 sm:mb-20 flex items-center gap-3 sm:gap-4 text-black">
                    <span className="text-accent">02.</span> Selected Work
                </h2>

                {/* Featured Projects - Alternating Layout */}
                <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 mb-16 sm:mb-28">
                    {featuredProjects.map((project, i) => (
                        <FeaturedCard key={i} project={project} index={i} />
                    ))}
                </div>

                {/* Mini Projects Header */}
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-black mb-2">
                        Mini Projects
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-mono">
                        {allMiniProjects.length} projects · {isMobile ? "tap to explore" : "hover to explore"}
                    </p>
                </div>
            </div>

            {/* SSH Card Deck - full width */}
            <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pb-8">
                {isMobile
                    ? <MobileDeck projects={allMiniProjects} />
                    : <DesktopDeck projects={allMiniProjects} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
                }
            </div>
        </section>
    );
}
