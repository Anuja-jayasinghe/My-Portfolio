"use client";
import React, { useState } from "react";
import { ExternalLink, Award, Cpu, HardDrive, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import certificatesData from "../../data/certificates.json";

export default function ServerRack() {
  const [activeBladeId, setActiveBladeId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[850px] mx-auto mb-20 mt-10 px-4">
      {/* Rack Header */}
      <div className="mb-4 flex items-end justify-between border-b-2 border-gray-900 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-sm">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-black font-mono tracking-tighter uppercase text-black">
            JaySync::CERT_VAULT_v2
          </h3>
        </div>
        <div className="text-[10px] font-mono text-gray-500 flex gap-4 uppercase">
          <span>Fans: Optimal</span>
          <span className="text-green-600 animate-pulse">● System Live</span>
        </div>
      </div>

      {/* The Main Chassis with Fixed Height */}
      <div className="relative bg-[#0f0f0f] rounded-lg border-x-[12px] border-gray-800 shadow-2xl shadow-black/60">

        {/* Top Vent Detail */}
        <div className="h-4 w-full bg-gradient-to-b from-gray-900 to-transparent flex justify-center gap-1 py-1">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-full bg-black/40 rounded-full" />
          ))}
        </div>

        {/* SCROLLABLE AREA - This solves your height issue */}
        <div className="max-h-[550px] overflow-y-auto overflow-x-hidden custom-scrollbar py-2 px-3">
          <div className="space-y-1">
            {certificatesData.map((cert, index) => {
              const isActive = activeBladeId === cert.id;

              return (
                <motion.div
                  key={cert.id}
                  layout
                  onMouseEnter={() => setActiveBladeId(cert.id)}
                  onMouseLeave={() => setActiveBladeId(null)}
                  className={`group relative overflow-hidden rounded-sm transition-all duration-300 border-b border-black/50 ${isActive ? "z-10 scale-[1.02]" : "z-0"
                    }`}
                >
                  {/* Blade UI */}
                  <div className={`flex items-center h-[45px] px-4 gap-4 cursor-pointer transition-colors ${isActive ? "bg-[#1e1e1e]" : "bg-[#161616] hover:bg-[#1a1a1a]"
                    }`}>
                    {/* Mounting Screw Detail */}
                    <div className="w-2 h-2 rounded-full bg-black border border-gray-700 shadow-inner shrink-0" />

                    {/* Status LED */}
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 transition-all duration-500 ${isActive ? "animate-pulse" : "opacity-20 blur-[1px]"}`}
                      style={{
                        backgroundColor: cert.ledColor,
                        boxShadow: isActive ? `0 0 12px ${cert.ledColor}` : 'none'
                      }}
                    />

                    {/* Blade Title Block */}
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <p className="font-mono text-[11px] font-bold text-gray-400 tracking-tight truncate">
                        <span className="text-gray-600 mr-2">SLOT_{String(certificatesData.length - index).padStart(2, '0')}</span>
                        {cert.issuer.toUpperCase()}::{cert.title.replace(/\s+/g, '_').toUpperCase()}
                      </p>
                      <div className="flex gap-2 shrink-0 ml-4">
                        <span className="text-[9px] font-mono text-gray-700 group-hover:text-blue-500 transition-colors uppercase">
                          {isActive ? "Reading_Data..." : "Standby"}
                        </span>
                      </div>
                    </div>
                  </div>

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
                          <div className="relative w-full md:w-48 aspect-video rounded border border-white/10 overflow-hidden bg-black shrink-0">
                            {cert.image && (
                              <Image src={cert.image} alt={cert.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            )}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%]" />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <Terminal size={12} className="text-blue-500" />
                              <span className="text-[10px] font-mono text-blue-500 uppercase tracking-tighter">Verified_Credential_Metadata</span>
                            </div>
                            <h4 className="text-sm font-bold text-white leading-snug uppercase tracking-wide">{cert.title}</h4>

                            <div className="flex items-center gap-4">
                              <a
                                href={cert.verifyUrl}
                                target="_blank"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black font-mono px-3 py-1.5 rounded-sm transition-all"
                              >
                                <ExternalLink size={10} />
                                PUSH_TO_VERIFY
                              </a>
                              <span className="text-[10px] font-mono text-gray-500 italic">Issued: {cert.category}</span>
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

        {/* Bottom Panel Detail */}
        <div className="h-8 bg-gray-900 rounded-b-lg border-t border-black flex items-center justify-between px-6">
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-red-600 animate-ping" />
            <div className="w-1 h-1 rounded-full bg-red-600" />
          </div>
          <div className="w-24 h-1.5 bg-black rounded-full overflow-hidden">
            <motion.div
              animate={{ x: [-100, 100] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-1/2 h-full bg-blue-500/40"
            />
          </div>
        </div>
      </div>

      {/* Global CSS for the scrollbar to keep it looking industrial */}
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
      `}</style>
    </div>
  );
}