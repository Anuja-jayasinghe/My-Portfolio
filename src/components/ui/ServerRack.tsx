"use client";
import React, { useState } from "react";
import { ExternalLink, Award, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

  const toggleBlade = (id: string) => {
    setActiveBladeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto mb-12 mt-10 px-2 sm:px-4">
      {/* Section heading */}
      <div className="mb-6 flex items-center gap-3">
        <Award className="w-5 h-5 text-accent" />
        <h3 className="text-lg sm:text-xl font-bold font-mono text-black">
          Certifications
        </h3>
        <span className="text-xs font-mono text-gray-400 ml-1">
          ({certificatesData.length} credentials)
        </span>
      </div>

      {/* Credential list */}
      <div className="flex flex-col border border-black/10 rounded-xl overflow-hidden bg-white divide-y divide-black/5">
        {certificatesData.map((cert: Certificate, index: number) => {
          const isActive = activeBladeId === cert.id;

          return (
            <div key={cert.id}>
              {/* Row / Blade */}
              <button
                className={`w-full flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-3.5 text-left transition-all duration-200 group ${isActive ? "bg-gray-50" : "bg-white hover:bg-gray-50/80"
                  }`}
                onMouseEnter={() => setActiveBladeId(cert.id)}
                onMouseLeave={() => !isActive && setActiveBladeId(null)}
                onClick={() => toggleBlade(cert.id)}
              >
                {/* Slot number */}
                <span className="text-[10px] font-mono text-gray-300 font-bold w-6 shrink-0 select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Activity LED */}
                <span
                  className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${isActive ? "animate-pulse" : "opacity-30"
                    }`}
                  style={{
                    backgroundColor: cert.ledColor,
                    boxShadow: isActive ? `0 0 8px ${cert.ledColor}aa` : "none",
                  }}
                />

                {/* Issuer & category */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold font-mono text-black truncate">
                      {cert.issuer}
                    </span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm"
                      style={{
                        backgroundColor: `${cert.ledColor}18`,
                        color: cert.ledColor,
                      }}
                    >
                      {cert.category}
                    </span>
                  </div>
                  {/* Show title inline on mobile when not active */}
                  <span className="text-xs text-gray-400 truncate block sm:hidden mt-0.5">
                    {cert.title}
                  </span>
                </div>

                {/* Full title on desktop */}
                <span className="hidden sm:block text-sm text-gray-500 truncate max-w-xs flex-1">
                  {cert.title}
                </span>

                {/* Expand indicator */}
                <ChevronDown
                  className={`w-4 h-4 text-gray-300 shrink-0 transition-transform duration-200 ${isActive ? "rotate-180 text-accent" : ""
                    }`}
                />
              </button>

              {/* Expanded detail panel */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 py-6 bg-gray-50 border-t border-black/5">
                      {/* Badge/Certificate Image */}
                      {cert.image ? (
                        <div className="w-full md:w-48 shrink-0">
                          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-black/10 shadow-sm bg-white group-hover:shadow-md transition-shadow">
                            <Image
                              src={cert.image}
                              alt={cert.title}
                              fill
                              className="object-contain p-2"
                              sizes="(max-width: 768px) 100vw, 192px"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full md:w-48 shrink-0">
                          <div className="w-full aspect-[4/3] rounded-lg border border-dashed border-black/10 flex flex-col items-center justify-center bg-white/50">
                            <Award className="w-8 h-8 text-gray-200" />
                            <span className="text-[10px] font-mono text-gray-300 mt-2">No Image</span>
                          </div>
                        </div>
                      )}

                      {/* Info & Action */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <p
                            className="text-[10px] font-mono mb-1 uppercase tracking-widest"
                            style={{ color: cert.ledColor }}
                          >
                            {cert.category}
                          </p>
                          <h4 className="text-base sm:text-lg font-bold text-black leading-tight">{cert.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 italic">Issued by {cert.issuer}</p>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-xs font-mono font-bold border border-black/10 px-5 py-2.5 rounded hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 shrink-0 text-gray-700"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Verify Credential
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
