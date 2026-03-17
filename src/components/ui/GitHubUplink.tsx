"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap, RefreshCcw } from "lucide-react";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

export default function GitHubUplink() {
    const [data, setData] = useState<ContributionDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Using the requested v4 API endpoint
                const response = await fetch('https://github-contributions-api.jogruber.de/v4/Anuja-jayasinghe');
                const result = await response.json();
                
                // Extract last ~30 weeks (last 210 days)
                const contributions = result.contributions.slice(-210);
                setData(contributions);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch GitHub data:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getColor = (level: number) => {
        switch (level) {
            case 0: return "bg-gray-200/40";
            case 1: return "bg-blue-400/30";
            case 2: return "bg-blue-500/50";
            case 3: return "bg-accent/70";
            case 4: return "bg-accent shadow-[0_0_10px_rgba(0,0,117,0.4)]";
            default: return "bg-gray-200/40";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-gray-100 rounded-lg border-[6px] md:border-[10px] border-gray-200 shadow-xl overflow-hidden mb-12 relative group"
        >
            {/* Module Top Bar */}
            <div className="h-8 bg-gray-200 border-b border-gray-300 flex items-center px-4 justify-between">
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
                    <span className="font-mono text-[9px] font-bold text-gray-500 flex items-center gap-1">
                        <Activity size={10} className="animate-spin-slow" /> GITHUB_MANIFEST::UPLINK_SYNCHRONIZED
                    </span>
                </div>
                <div className="flex gap-1">
                    <span className="font-mono text-[8px] text-gray-400 font-black uppercase tracking-widest mr-2">SECURE_LINK::v2.2.0</span>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-3 h-1 bg-gray-400 rounded-full opacity-30" />
                    ))}
                </div>
            </div>

            <div className="p-4 md:p-8 bg-white/50">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Diagnostic Info - Persistent */}
                    <div className="w-full lg:w-48 space-y-4 shrink-0">
                        <div className="space-y-1">
                            <span className="font-mono text-[8px] font-extrabold text-blue-600/50 uppercase block">Activity_Feed</span>
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-accent" />
                                <span className="font-mono text-xs font-black text-black">LIVE_PULSE</span>
                            </div>
                        </div>
                        
                        <div className="bg-gray-200/50 rounded p-3 space-y-2 border border-black/5 shadow-inner">
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-[8px] font-bold text-gray-500 font-mono uppercase">Status</span>
                                {loading ? (
                                    <RefreshCcw size={10} className="text-blue-500 animate-spin" />
                                ) : error ? (
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                ) : (
                                    <ShieldCheck size={10} className="text-green-600" />
                                )}
                            </div>
                            <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                                <motion.div 
                                    className={`h-full ${error ? 'bg-red-500' : 'bg-accent'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: loading ? "30%" : error ? "100%" : "100%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </div>
                            <span className="font-mono text-[7px] text-gray-400 block text-right font-mono uppercase">
                                {loading ? "Establishing..." : error ? "Fallback_Mode" : "AES_256_ACTIVE"}
                            </span>
                        </div>
                    </div>

                    {/* The Calendar Itself (Custom Rendering with Flexwrap) */}
                    <div className="flex-1 w-full py-2 flex flex-wrap gap-1 md:gap-[4px] justify-start content-start">
                        {loading ? (
                            <div className="h-32 w-full flex flex-col items-center justify-center gap-2 border border-gray-200 border-dashed rounded bg-gray-50/50">
                                <RefreshCcw size={24} className="text-gray-300 animate-spin" />
                                <span className="font-mono text-[10px] text-gray-400 animate-pulse uppercase">Downlinking_Manifest...</span>
                            </div>
                        ) : error ? (
                            <div className="h-32 w-full flex flex-col items-center justify-center gap-2 border border-red-200 bg-red-50/50 rounded">
                                <span className="font-mono text-[10px] text-red-500 font-bold">UPLINK_FAILURE: TARGET_REPOSITORY_OFFLINE</span>
                                <span className="font-mono text-[8px] text-red-400 uppercase tracking-tighter">Retrying_Emergency_Datalink_Protocol_v4</span>
                            </div>
                        ) : (
                            data.map((day, i) => (
                                <motion.div
                                    key={day.date}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.001 }}
                                    className={`w-[11px] h-[11px] md:w-4 md:h-4 rounded-[1.5px] ${getColor(day.level)} transition-all hover:scale-125 hover:z-10 cursor-crosshair shrink-0`}
                                    title={`${day.date}: ${day.count} contributions`}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Industrial Mounting Detail - Persistent Layout */}
            <div className="absolute top-10 right-4 flex flex-col gap-1 opacity-20 group-hover:opacity-40 transition-opacity z-10">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-900 shadow-inner" />
                ))}
            </div>

            <style jsx global>{`
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </motion.div>
    );
}
