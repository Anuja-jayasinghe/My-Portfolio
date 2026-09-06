"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

type Phase = "intro" | "done";

export default function SplashScreen() {
    const [phase, setPhase] = useState<Phase>("intro");

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Logo animation takes about ~3 seconds total (1.5 pathLength, 0.8 fill delay starts at 1.2)
        // Keep splash screen for 3.5s total before unmounting, or skip straight through for
        // reduced-motion users instead of forcing the full animation.
        const doneTimer = setTimeout(
            () => setPhase("done"),
            prefersReducedMotion ? 0 : 3500
        );
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
                    className="fixed inset-0 z-[150] cursor-pointer flex flex-col justify-center items-center"
                    style={{ backgroundColor: '#00001A' }}
                    onClick={() => setPhase("done")}
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

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="absolute bottom-12 font-mono text-[9px] text-white/40 uppercase tracking-widest select-none"
                    >
                        Tap to skip
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
