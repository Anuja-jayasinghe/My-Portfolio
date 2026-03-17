"use client";
import React, { useState } from "react";
import { ExternalLink, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import certificatesData from "../../data/certificates.json";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: string;
  ledColor: string;
  image?: string;
  verifyUrl: string;
}

export default function ServerRack() {
  const [activeBladeId, setActiveBladeId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1000px] mx-auto perspective-[1200px] mb-20 mt-12 px-2 sm:px-6 relative">
      <div className="mb-8 flex items-center gap-3">
        <Award className="w-6 h-6 text-accent" />
        <h3 className="text-xl sm:text-2xl font-bold font-mono text-black">
          Certifications Infrastructure
        </h3>
      </div>

      {/* The main physical Server Rack Chassis */}
      <div 
        className="w-full bg-[#111] p-2 md:p-4 rounded-lg border-[3px] border-[#222] shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] relative"
      >
        {/* Left and Right solid structural pillars */}
        <div className="absolute left-0 top-0 bottom-0 w-2 md:w-3 bg-gradient-to-r from-[#171717] to-[#111] border-r border-[#333] z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-2 md:w-3 bg-gradient-to-l from-[#171717] to-[#111] border-l border-[#333] z-20" />
        
        <div className="flex flex-col gap-[3px] md:gap-1.5 z-10 relative">
          {certificatesData.map((cert: Certificate, index: number) => {
            const isActive = activeBladeId === cert.id;
            const rackSlot = `U${index + 1}`;

            return (
              <div 
                key={cert.id}
                onMouseEnter={() => setActiveBladeId(cert.id)}
                onMouseLeave={() => setActiveBladeId(null)}
                className="group relative"
              >
                {/* 1. Hardware Blade Front Plate */}
                <div 
                  className={`w-full h-12 md:h-16 rounded flex items-center justify-between px-3 md:px-6 cursor-default transition-all duration-300 relative z-10 ${
                    isActive ? "bg-[#252528] shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "bg-[#18181A] hover:bg-[#1E1E20]"
                  } border-y border-white/5 border-x-4 border-x-[#333]`}
                >
                  {/* Left Controls & LEDs */}
                  <div className="flex items-center gap-4 md:gap-8">
                    {/* Rack Unit Label */}
                    <div className="text-[10px] md:text-xs font-mono text-gray-600 font-bold bg-black px-1.5 py-0.5 rounded shadow-inner">
                      {rackSlot}
                    </div>

                    {/* Vents (Hardware aesthetic) */}
                    <div className="hidden sm:flex flex-col gap-1 w-12 opacity-30">
                      <div className="h-0.5 w-full bg-black rounded-full" />
                      <div className="h-0.5 w-full bg-black rounded-full" />
                      <div className="h-0.5 w-full bg-black rounded-full" />
                    </div>

                    {/* LEDs */}
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-tighter">PWR</span>
                      </div>
                      
                      {/* Activity Indicator LED */}
                      <div className="flex flex-col items-center gap-1 ml-2">
                        <span 
                          className={`w-2 h-2 rounded-full transition-all duration-75 ${isActive ? "animate-pulse" : "opacity-40"}`} 
                          style={{
                            backgroundColor: cert.ledColor,
                            boxShadow: isActive ? `0 0 10px ${cert.ledColor}cc` : "none"
                          }}
                        />
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-tighter">ACT</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Disk Arrays / Badges */}
                  <div className="flex items-center gap-6">
                    <div className="font-mono text-xs md:text-sm text-gray-300 truncate max-w-[150px] sm:max-w-xs font-semibold tracking-wide">
                      {cert.issuer.toUpperCase()}
                    </div>
                    
                    {/* Fake Server Drive bays */}
                    <div className="flex gap-1 md:gap-1.5 opacity-20 hidden md:flex">
                      <div className="w-8 h-8 rounded border border-gray-600 flex flex-col justify-between p-1 bg-black/50">
                        <div className="w-full h-[2px] bg-red-400" />
                        <div className="w-full h-1 bg-[#333]" />
                      </div>
                      <div className="w-8 h-8 rounded border border-gray-600 flex flex-col justify-between p-1 bg-black/50">
                        <div className="w-full h-[2px] bg-green-400" />
                        <div className="w-full h-1 bg-[#333]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Slide Out Information Panel (The Extracted Data Module) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -20 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full bg-[#0d0d12] border-x-4 border-b border-x-[#333] border-b-blue-500/30 overflow-hidden relative z-0 origin-top shadow-2xl"
                    >
                      <div className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        
                        <div className="flex-1">
                          <p className="text-xs font-mono mb-1" style={{ color: cert.ledColor }}>[CATEGORY_SCAN: {cert.category}]</p>
                          <h4 className="text-lg md:text-xl font-bold text-white font-sans">{cert.title}</h4>
                          <p className="text-sm text-gray-400 mt-1 font-mono hover:text-white transition-colors">By: {cert.issuer}</p>
                        </div>

                        <a 
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded transition-colors text-sm font-mono whitespace-nowrap"
                        >
                          <ExternalLink className="w-4 h-4" /> VERIFY_CREDENTIAL
                        </a>

                      </div>

                      {/* Hardware circuit aesthetic background */}
                      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none scale-150 transform translate-x-10 translate-y-10">
                        <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 50L50 50L70 30L120 30L140 10L200 10" fill="none" stroke="white" strokeWidth="2" />
                          <circle cx="200" cy="10" r="4" fill="white" />
                          <path d="M0 80L30 80L50 60L100 60L120 40L200 40" fill="none" stroke="white" strokeWidth="2" />
                          <circle cx="200" cy="40" r="4" fill="white" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
