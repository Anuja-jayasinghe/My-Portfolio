"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Phase = "intro" | "move" | "done";

export default function SplashScreen() {
    const [phase, setPhase] = useState<Phase>("intro");

    useEffect(() => {
        // Phase 1: Show logo centered for 2s
        const moveTimer = setTimeout(() => setPhase("move"), 2000);
        // Phase 2: Logo moves toward navbar and fades out, done after 4s total
        const doneTimer = setTimeout(() => setPhase("done"), 4500);
        return () => {
            clearTimeout(moveTimer);
            clearTimeout(doneTimer);
        };
    }, []);

    if (phase === "done") return null;

    return (
        <AnimatePresence>
            {phase && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: phase === "move" ? 0 : 1 }}
                    transition={{ duration: 1.5, delay: phase === "move" ? 0.5 : 0, ease: "easeInOut" }}
                    className="fixed inset-0 z-[150] pointer-events-none" style={{ backgroundColor: '#00001A' }}
                >
                    <motion.div
                        initial={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                            scale: 0.8,
                            opacity: 0,
                        }}
                        animate={
                            phase === "intro"
                                ? {
                                    top: "50%",
                                    left: "50%",
                                    x: "-50%",
                                    y: "-50%",
                                    scale: 1,
                                    opacity: 1,
                                }
                                : {
                                    top: "20%",
                                    left: "30%",
                                    x: "-50%",
                                    y: "-50%",
                                    scale: 0.45,
                                    opacity: 0,
                                }
                        }
                        transition={
                            phase === "intro"
                                ? { duration: 1.2, ease: "easeOut" }
                                : { duration: 2.0, ease: [0.25, 0.1, 0.25, 1] }
                        }
                        className="z-[151]"
                    >
                        <Image
                            src="/logo-white.svg"
                            alt="Anuja Logo"
                            width={400}
                            height={130}
                            priority
                            className="object-contain"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
