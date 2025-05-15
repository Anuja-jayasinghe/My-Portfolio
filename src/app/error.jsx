"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#090909] to-[#191932] text-white px-4 overflow-hidden">
      {/* TV scan lines effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_2px] pointer-events-none z-0"></div>
      {/* Vignette effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_150%)] pointer-events-none z-0"></div>
      {/* Matrix-like falling code */}
      <div className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 text-green-400 font-mono text-sm" 
            style={{
              left: `${i * 5}%`,
              animation: `fall ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} style={{ opacity: Math.random() * 0.9 + 0.1 }}>
                {String.fromCharCode(48 + Math.floor(Math.random() * 74))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="z-10 relative flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle size={64} className="text-yellow-400 animate-pulse" />
          <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg font-mono">Error</h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center font-mono">
          Something went wrong
        </h2>
        <div className="mb-8 bg-black/50 p-4 rounded-md border border-yellow-500/30 max-w-md w-full">
          <pre className="text-yellow-300 font-mono text-sm whitespace-pre-line">
            {error?.message || "An unexpected error occurred."}
          </pre>
        </div>
        <button
          onClick={() => reset ? reset() : window.location.reload()}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold font-mono py-3 px-6 rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
        >
          Try Again
        </button>
        <a
          href="/"
          className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold font-mono py-3 px-6 rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-yellow-500/50 text-center"
        >
          Return to Home
        </a>
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-transparent to-yellow-400"></div>
            <div className="animate-bounce text-4xl">
              <span className="font-mono text-xl bg-yellow-400 px-2 py-1 rounded">&#9888;</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
} 