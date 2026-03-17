"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

type Phase = "intro" | "done";

export default function SplashScreen() {
    const [phase, setPhase] = useState<Phase>("intro");

    useEffect(() => {
        // Logo animation takes about ~3 seconds total (1.5 pathLength, 0.8 fill delay starts at 1.2)
        // Keep splash screen for 3.5s total before unmounting
        const doneTimer = setTimeout(() => setPhase("done"), 3500);
        return () => {
            clearTimeout(doneTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {phase === "intro" && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Elegant ease out curtain effect
                    className="fixed inset-0 z-[150] pointer-events-none flex flex-col justify-center items-center" 
                    style={{ backgroundColor: '#00001A' }}
                >
                    <motion.div
                        initial={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                            scale: 0.9,
                            opacity: 1,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="z-[151] w-[300px] md:w-[450px]"
                    >
                        <AnimatedLogo className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>

                    {/* Loading indicator line optional, elegant */}
                    <motion.div
                        className="absolute bottom-20 w-48 h-[2px] bg-white/20 rounded-full overflow-hidden"
                    >
                        <motion.div 
                            className="h-full bg-white/80"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.2, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
