'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, Code } from "lucide-react";

const NotFound = () => {
  const router = useRouter();
  const [glitching, setGlitching] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const fullText = "> ERROR 404\n> FETCH_PAGE: NOT_FOUND\n> ATTEMPT_RECOVERY: FAILED\n> SYSTEM: REDIRECTING...";

  useEffect(() => {
    // Terminal typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTerminalText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 150);
    }, 2000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(glitchInterval);
    };
  }, []);

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
      
      <div className="z-10 relative">
        {/* Glitch effect 404 */}
        <div className={`relative ${glitching ? 'animate-[glitch_0.3s_ease]' : ''}`}>
          <h1 className={`text-8xl font-bold text-cyan-400 mb-4 drop-shadow-lg ${glitching ? 'translate-x-[2px]' : ''} font-mono`}>
            404
          </h1>
          
          {glitching && (
            <>
              <h1 className="text-8xl font-bold text-red-500 absolute inset-0 mb-4 drop-shadow-lg opacity-70 translate-x-[-2px] font-mono">
                404
              </h1>
              <h1 className="text-8xl font-bold text-green-500 absolute inset-0 mb-4 drop-shadow-lg opacity-70 translate-x-[2px] font-mono">
                404
              </h1>
            </>
          )}
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center font-mono">
          SYSTEM_ERROR
        </h2>
        
        {/* Terminal output */}
        <div className="mb-8 bg-black/50 p-4 rounded-md border border-cyan-500/30 max-w-md w-full">
          <pre className="text-green-400 font-mono text-sm whitespace-pre-line">
            {terminalText}
            <span className="inline-block w-2.5 h-5 bg-green-400 ml-1 animate-[blink_1s_step-end_infinite] align-text-bottom"></span>
          </pre>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold font-mono py-3 px-6 rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
          >
            <Code size={18} />
            Return to Index
          </Link>
          
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="border border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 font-mono py-3 px-6 rounded-sm transition-all"
          >
            sudo reboot
          </button>
        </div>
        
        {/* Curly braces animation (added from NotFoundStars) */}
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-transparent to-cyan-400"></div>
            <div className="animate-bounce text-4xl">
              <span className="font-mono text-xl bg-cyan-500 px-2 py-1 rounded">&#123;&#125;</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        `}
      </style>
    </div>
  );
};

export default NotFound;
