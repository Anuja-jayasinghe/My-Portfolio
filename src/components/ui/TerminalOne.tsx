"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, Github, FolderCode, Terminal, FileCode2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../../data/projects.json";

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

export default function TerminalOne() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [typedOutput, setTypedOutput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);

  const miniProjects = projectsData.filter((p) => p.type === "mini");

  const selectProject = useCallback((project: Project) => {
    setActiveProject(project);
  }, []);

  useEffect(() => {
    if (!activeProject) {
      setTypedOutput("");
      return;
    }

    setIsTyping(true);
    setTypedOutput("");

    const payload = [
      `$ ./describe --target="${activeProject.id}.sh"`,
      `[INFO] Target acquired: ${activeProject.title}`,
      `[STAT] Repository: ${activeProject.repoUrl.replace("https://", "")}`,
      ...(activeProject.liveUrl
        ? [`[STAT] Live URI:  ${activeProject.liveUrl.replace("https://", "")}`]
        : []),
      `[TECH] Stack: ${activeProject.techStack.join(" · ")}`,
      `${"─".repeat(50)}`,
      `${activeProject.description}`,
      ` `,
    ].join("\n");

    let currentIdx = 0;
    const interval = setInterval(() => {
      setTypedOutput(payload.slice(0, currentIdx + 1));
      currentIdx++;
      if (currentIdx === payload.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [activeProject]);

  return (
    <div className="w-full max-w-[1200px] mx-auto rounded-xl overflow-hidden border border-black/10 flex flex-col font-mono text-sm shadow-sm bg-white">

      {/* Window Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-black/10 shrink-0">
        <span className="w-3 h-3 rounded-full bg-black/10" />
        <span className="w-3 h-3 rounded-full bg-black/10" />
        <span className="w-3 h-3 rounded-full bg-black/10" />
        <div className="flex items-center gap-1.5 ml-3 text-xs text-gray-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>bash — terminal</span>
        </div>
      </div>

      {/* Body: sidebar + output stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:flex-row">

        {/* Sidebar: File Explorer */}
        <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-black/10 flex flex-col shrink-0">
          <div className="p-3 text-[10px] font-bold text-gray-400 tracking-widest flex items-center gap-2 uppercase border-b border-black/10">
            <FolderCode className="w-3.5 h-3.5" />
            EXPLORER: PROJECTS
          </div>

          {/* On mobile: horizontal scroll row. On desktop: vertical list */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible overflow-y-visible md:overflow-y-auto md:max-h-[420px] py-1.5 md:py-2">
            {miniProjects.map((project) => (
              <button
                key={project.id}
                onMouseEnter={() => selectProject(project)}
                onClick={() => selectProject(project)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-1.5 shrink-0 md:w-full text-left transition-all duration-100 group border-b-2 md:border-b-0 md:border-l-2 ${activeProject?.id === project.id
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
              >
                <FileCode2
                  className={`w-3.5 h-3.5 shrink-0 ${activeProject?.id === project.id ? "text-accent" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                />
                <span className="truncate text-xs">{project.id.toLowerCase()}.sh</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Window: Terminal Output */}
        <div className="flex-1 bg-white flex flex-col min-h-[280px] md:min-h-[420px]">

          {/* Active tab */}
          <div className="flex bg-gray-50 border-b border-black/10 h-9 shrink-0">
            <div className="flex items-center gap-2 px-4 border-b-2 border-accent bg-white text-gray-700 text-xs">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>
                {activeProject ? `${activeProject.id}.sh` : "bash — terminal"}
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 md:p-6 flex-1 overflow-y-auto">
            {!activeProject ? (
              <div className="text-gray-300 italic h-full flex flex-col justify-center items-center select-none gap-3">
                <Terminal className="w-12 h-12 opacity-20" />
                <span className="text-xs text-gray-400">
                  {/* Mobile hint */}
                  <span className="md:hidden">Tap a file above to run it...</span>
                  <span className="hidden md:inline">Hover over a file to execute its script...</span>
                </span>
              </div>
            ) : (
              <>
                {/* Typed output with syntax colouring */}
                <pre className="whitespace-pre-wrap font-mono text-xs md:text-sm leading-relaxed pb-4 text-gray-700">
                  {typedOutput.split("\n").map((line, i) => {
                    if (line.startsWith("$"))
                      return <span key={i} className="text-accent font-bold">{line}{"\n"}</span>;
                    if (line.startsWith("[INFO]"))
                      return <span key={i} className="text-gray-800 font-semibold">{line}{"\n"}</span>;
                    if (line.startsWith("[STAT]"))
                      return <span key={i} className="text-gray-500">{line}{"\n"}</span>;
                    if (line.startsWith("[TECH]"))
                      return <span key={i} className="text-gray-600">{line}{"\n"}</span>;
                    if (line.startsWith("─"))
                      return <span key={i} className="text-gray-200">{line}{"\n"}</span>;
                    return <span key={i}>{line}{"\n"}</span>;
                  })}
                  {isTyping && (
                    <span className="inline-block w-2 h-4 ml-0.5 bg-accent animate-pulse align-middle opacity-70" />
                  )}
                </pre>

                {/* Post-typing actions */}
                <AnimatePresence>
                  {!isTyping && activeProject && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex flex-col sm:flex-row gap-4 border-t border-black/5 pt-4"
                    >
                      {activeProject.imagePath ? (
                        <div className="relative w-full sm:w-48 overflow-hidden rounded border border-black/10 shrink-0 aspect-video">
                          <Image
                            src={activeProject.imagePath}
                            alt={activeProject.title}
                            fill
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full sm:w-48 h-28 bg-gray-50 rounded border border-black/10 flex items-center justify-center text-gray-300 italic text-[10px] shrink-0">
                          [NO UI ASSET]
                        </div>
                      )}

                      <div className="flex flex-col gap-3 justify-center">
                        <a
                          href={activeProject.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-gray-700 hover:text-accent transition-colors text-xs font-mono font-bold"
                        >
                          <Github className="w-4 h-4" />
                          root@github:/{activeProject.id}
                        </a>

                        {activeProject.liveUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-accent hover:opacity-70 transition-opacity text-xs font-mono font-bold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            curl https://{activeProject.liveUrl.replace("https://", "")}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
