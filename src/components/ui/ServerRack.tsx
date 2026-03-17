"use client";
import React, { useState } from "react";
import { ExternalLink, Award, Cpu, HardDrive, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import certificatesData from "../../data/certificates.json";

export default function ServerRack() {
  const [activeBladeId, setActiveBladeId] = useState<string | null>(null);

  const toggleBlade = (id: string) => {
    setActiveBladeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-[850px] mx-auto mb-20 mt-10 px-4">
      {/* Rack Header */}
      <div className="mb-4 flex items-end justify-between border-b-2 border-gray-900 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-sm">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-black font-mono tracking-tighter uppercase text-black">
            JaySync_Lab :: CERT_VAULT_v2
          </h3>
        </div>
        <div className="text-[10px] font-mono text-gray-500 flex gap-4 uppercase">
          <span>Fans: Optimal</span>
          <span className="text-green-600 animate-pulse">● System Live</span>
        </div>
      </div>

      {/* The Main Chassis - Natural Height (Scroll Trap Fixed) */}
      <div
        onMouseLeave={() => setActiveBladeId(null)}
        className="relative bg-[#0f0f0f] rounded-lg border-x-[12px] border-gray-800 shadow-2xl shadow-black/60 overflow-hidden"
      >

        {/* PART 1: TOP PANEL REDESIGN */}
        <div className="relative h-10 w-full bg-[#0a0a0a] border-b border-black flex items-center px-4 overflow-hidden">
          {/* Brushed Metal Texture Layer */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(90deg,#fff,#fff_1px,transparent_1px,transparent_4px)]" />
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,transparent_50%,rgba(0,0,0,0.5)_100%)]" />

          {/* Unit Markers - Left */}
          <div className="absolute left-[-8px] top-0 bottom-0 w-2 flex flex-col justify-around py-1.5 opacity-40 select-none">
            <span className="text-[6px] font-mono font-bold text-gray-500">1U</span>
            <span className="text-[6px] font-mono font-bold text-gray-500">2U</span>
          </div>

          <div className="flex-1 flex flex-col gap-1 z-10">
            {/* Industrial Vent Grille Pattern */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex gap-[3px] opacity-40 h-1.5">
                {[...Array(15)].map((_, i) => (
                  <div key={`l-${i}`} className="flex-1 max-w-[4px] h-full bg-black rounded-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
                ))}
              </div>

              {/* PRIMARY AIR INTAKE - Central Focus */}
              <div className="flex gap-1.5 px-3 py-1 bg-black/40 rounded-full border border-white/5 shadow-inner">
                {[...Array(6)].map((_, i) => (
                  <div key={`intake-${i}`} className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] flex items-center justify-center">
                    <div className="w-[1px] h-[1px] bg-blue-500/20 rounded-full" />
                  </div>
                ))}
              </div>

              <div className="flex-1 flex gap-[3px] opacity-40 h-1.5 justify-end">
                {[...Array(15)].map((_, i) => (
                  <div key={`r-${i}`} className="flex-1 max-w-[4px] h-full bg-black rounded-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
                ))}
              </div>
            </div>
            {/* Cable Management Bar Detail */}
            <div className="h-0.5 w-full bg-gray-900 border-y border-black/50 opacity-50" />
          </div>

          {/* Unit Markers - Right */}
          <div className="absolute right-[-8px] top-0 bottom-0 w-2 flex flex-col justify-around py-1.5 opacity-40 select-none">
            <span className="text-[6px] font-mono font-bold text-gray-500">1U</span>
            <span className="text-[6px] font-mono font-bold text-gray-500">2U</span>
          </div>
        </div>

        {/* Blades Container - Grows to fit all 17, now in 2 columns on desktop */}
        <div className="py-2 px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-0.5">
            {certificatesData.map((cert, index) => {
              const isActive = activeBladeId === cert.id;

              return (
                <motion.div
                  key={cert.id}
                  layout
                  className={`group relative overflow-hidden rounded-sm transition-all duration-300 border-b border-black/50 ${isActive ? "z-10 scale-[1.012] md:col-span-2" : "z-0"
                    }`}
                >
                  {/* Blade UI - Button for a11y & interaction */}
                  <button
                    onClick={() => toggleBlade(cert.id)}
                    onMouseEnter={() => setActiveBladeId(cert.id)}
                    onMouseLeave={() => !isActive && setActiveBladeId(null)}
                    className={`w-full flex items-center h-[42px] px-3 gap-3 text-left transition-colors ${isActive ? "bg-[#1e1e1e]" : "bg-[#161616] hover:bg-[#1a1a1a]"
                      }`}
                  >
                    {/* Mounting Screw Detail */}
                    <div className="w-1.5 h-1.5 rounded-full bg-black border border-gray-700 shadow-inner shrink-0" />

                    {/* Status LED */}
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-500 ${isActive ? "animate-pulse" : "opacity-20 blur-[0.5px]"
                        }`}
                      style={{
                        backgroundColor: cert.ledColor,
                        boxShadow: isActive ? `0 0 10px ${cert.ledColor}` : "none",
                      }}
                    />

                    {/* Blade Title Block */}
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <p className="font-mono text-[10px] font-bold text-gray-400 tracking-tight truncate">
                        <span className="text-gray-600 mr-1.5">
                          SLOT_{String(certificatesData.length - index).padStart(2, "0")}
                        </span>
                        {cert.issuer.toUpperCase()}::{cert.title.replace(/\s+/g, "_").toUpperCase()}
                      </p>
                      <div className="flex gap-2 shrink-0 ml-2">
                        <span className="text-[8px] font-mono text-gray-700 group-hover:text-blue-500 transition-colors uppercase">
                          {isActive ? "Reading..." : "STBY"}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content - Pulled out look */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[#1c1c1c] border-t border-blue-500/30"
                      >
                        <div className="p-5 flex flex-col md:flex-row gap-6 items-start">
                          {/* Image Preview with CRT Filter */}
                          <div className="relative w-full md:w-56 aspect-video rounded border border-white/10 overflow-hidden bg-black shrink-0">
                            {cert.image && (
                              <Image
                                src={cert.image}
                                alt={cert.title}
                                fill
                                className="object-contain p-1 opacity-70 group-hover:opacity-100 transition-opacity"
                              />
                            )}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%]" />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <Terminal size={12} className="text-blue-500" />
                              <span className="text-[10px] font-mono text-blue-500 uppercase tracking-tighter">
                                Verified_Credential_Metadata
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white leading-tight uppercase tracking-wide">
                              {cert.title}
                            </h4>

                            <div className="flex items-center gap-5 mt-4">
                              <a
                                href={cert.verifyUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black font-mono px-4 py-2 rounded-sm transition-all shadow-lg shadow-blue-900/20"
                              >
                                <ExternalLink size={10} />
                                PUSH_TO_VERIFY
                              </a>
                              <div className="flex flex-col">
                                <span className="text-[8px] font-mono text-gray-600 uppercase">Category</span>
                                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">
                                  {cert.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* PART 2: BOTTOM PANEL REDESIGN */}
        <div className="relative h-7 bg-[#0a0a0a] border-t border-black px-4 flex items-center overflow-hidden">
          {/* Flash Effect on state change */}
          <div key={activeBladeId} className="absolute inset-0 bg-green-500/10 pointer-events-none animate-status-flash" />

          <div className="flex items-center justify-between w-full h-full font-mono text-[9px] tracking-tight">
            {/* Status Information */}
            <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              {activeBladeId ? (
                <div className="flex items-center gap-1.5 text-green-400">
                  <span className="text-green-500/50">{">"}</span>
                  <div className="flex gap-1 overflow-hidden">
                    <span className="font-bold">READING:</span>
                    {certificatesData.find(c => c.id === activeBladeId) && (
                      <span className="animate-typing-active">
                        {certificatesData.find(c => c.id === activeBladeId)?.issuer.toUpperCase()}::{certificatesData.find(c => c.id === activeBladeId)?.title.replace(/\s+/g, '_').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="w-1.5 h-3 bg-green-400 animate-terminal-cursor ml-0.5" />
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-green-600/40">
                  <span className="animate-marquee whitespace-nowrap">
                    {">"} CERT_VAULT_v2 — ALL SYSTEMS NOMINAL —— {">"} CERT_VAULT_v2 — ALL SYSTEMS NOMINAL ——
                  </span>
                  <div className="flex gap-0.5 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600/20 animate-pulse" />
                    <span className="w-3 h-1 bg-green-600/10 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-green-600/30 animate-scan-bar" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Diagnostic Indicators */}
            <div className="flex items-center gap-3 shrink-0 ml-4 opacity-50 uppercase text-[8px] text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-green-500/50" />
                LNK::UP
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                CPU::MOD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for the scrollbar and industrial effects */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        @keyframes status-flash {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .animate-status-flash {
          animation: status-flash 0.4s ease-out forwards;
        }

        @keyframes terminal-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-terminal-cursor {
          animation: terminal-cursor 0.8s step-end infinite;
        }

        @keyframes scan-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan-bar {
          animation: scan-bar 2s linear infinite;
        }

        @keyframes typing-active {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-typing-active {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typing-active 0.3s steps(30, end);
        }
      `}</style>
    </div>
  );
}