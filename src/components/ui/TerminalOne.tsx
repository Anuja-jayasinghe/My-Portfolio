"use client";
import { useState, useEffect } from "react";
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
      `[STAT] Repository: ${activeProject.repoUrl.replace('https://', '')}`,
      ...(activeProject.liveUrl ? [`[STAT] Live URI:  ${activeProject.liveUrl.replace('https://', '')}`] : []),
      `[TECH] Stack: ${activeProject.techStack.join(' • ')}`,
      `==================================================`,
      `${activeProject.description}`,
      ` `
    ].join('\n');

    let currentIdx = 0;
    const interval = setInterval(() => {
      setTypedOutput(payload.slice(0, currentIdx + 1));
      currentIdx++;
      if (currentIdx === payload.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15); // incredibly fast typing speed for smooth UX

    return () => clearInterval(interval);
  }, [activeProject]);

  return (
    <div className="w-full max-w-[1200px] mx-auto rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-gray-700/50 flex flex-col md:flex-row h-[500px] md:h-[600px] font-mono text-sm">
      
      {/* Sidebar: File Explorer */}
      <div className="w-full md:w-64 bg-[#252526] border-r border-[#333] flex flex-col shrink-0 overflow-y-auto">
        <div className="p-3 text-[11px] font-bold text-gray-400 tracking-wider flex items-center gap-2 uppercase border-b border-[#333]">
          <FolderCode className="w-4 h-4" /> EXPLORER: PROJECTS
        </div>
        
        <div className="py-2 flex flex-col">
          {miniProjects.map((project) => (
            <button
              key={project.id}
              onMouseEnter={() => setActiveProject(project)}
              onClick={() => {
                if (project.liveUrl) window.open(project.liveUrl, '_blank');
                else window.open(project.repoUrl, '_blank');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 w-full text-left transition-colors duration-100 group ${
                activeProject?.id === project.id 
                ? 'bg-[#37373d] text-blue-400' 
                : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200'
              }`}
            >
              <FileCode2 className={`w-4 h-4 shrink-0 ${activeProject?.id === project.id ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-300'}`} />
              <span className="truncate">{project.id.toLowerCase()}.sh</span>
              
              {/* Type Badge */}
              <span className="ml-auto text-[10px] bg-[#333] px-1.5 rounded text-gray-500 hidden md:block">
                {project.type.substring(0, 4)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Window: Terminal Output */}
      <div className="flex-1 bg-[#1e1e1e] flex flex-col relative overflow-hidden">
        {/* Editor Tabs */}
        <div className="flex bg-[#2d2d2d] h-10 shrink-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 px-4 border-t-2 border-blue-500 bg-[#1e1e1e] text-white min-w-[140px]">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>bash — terminal</span>
          </div>
        </div>

        {/* Terminal Content Area */}
        <div className="p-4 md:p-6 flex-1 overflow-y-auto relative">
          
          {!activeProject ? (
              <div className="text-gray-500 italic h-full flex flex-col justify-center items-center opacity-50 select-none">
                <Terminal className="w-16 h-16 mb-4 opacity-20" />
                <span>Hover over a file in the explorer to execute script...</span>
              </div>
          ) : (
            <>
              {/* Output log */}
              <pre className="text-gray-300 whitespace-pre-wrap font-mono leading-relaxed pb-8">
                {typedOutput}
                {isTyping && <span className="inline-block w-2.5 h-4 ml-1 bg-gray-400 animate-pulse align-middle" />}
              </pre>

              {/* Once typed, show asset & quick action buttons if it has one */}
              <AnimatePresence>
                {!isTyping && activeProject && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex flex-col md:flex-row gap-6 border-t border-[#333] pt-6"
                  >
                    {activeProject.imagePath ? (
                      <div className="relative w-full md:w-56 overflow-hidden rounded-md border border-[#444] shadow-lg shrink-0 aspect-video md:aspect-auto md:h-32">
                        <Image 
                          src={activeProject.imagePath} 
                          alt={activeProject.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full md:w-56 h-32 bg-[#252526] rounded-md border border-[#333] flex items-center justify-center text-gray-600 italic text-[10px] shrink-0">
                        [NO UI ASSET]
                      </div>
                    )}

                    <div className="flex flex-col gap-3 justify-center">
                      <a 
                        href={activeProject.repoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors w-max"
                      >
                        <Github className="w-4 h-4" /> root@github:/{activeProject.id}
                      </a>
                      
                      {activeProject.liveUrl && (
                        <a 
                          href={activeProject.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors w-max"
                        >
                          <ExternalLink className="w-4 h-4" /> curl https://{activeProject.liveUrl.replace('https://', '')}
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
  );
}
