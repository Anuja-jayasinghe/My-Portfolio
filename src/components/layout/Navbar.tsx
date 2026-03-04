"use client";
import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Real Me", href: "#about" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Core Arsenal", href: "#resume" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/10 font-mono transition-transform duration-300">
            <div className="container mx-auto px-4 h-24 flex items-center justify-between relative">

                {/* LEFT: Hamburger Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="text-black hover:text-accent transition-colors p-2 -ml-2 rounded-lg hover:bg-black/5"
                    aria-label="Open Menu"
                >
                    <Menu className="w-8 h-8" />
                </button>

                {/* CENTER: Logo (shifted lower as requested) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-3">
                    <Link href="/" className="hover:opacity-80 transition-opacity block">
                        <Image
                            src="/logo-black.svg"
                            alt="Anuja Logo"
                            width={180}
                            height={60}
                            className="w-40 md:w-56 h-auto object-contain drop-shadow-sm"
                            priority
                        />
                    </Link>
                </div>

                {/* RIGHT: Social Icons */}
                <div className="flex items-center gap-4 md:gap-6">
                    <Link href="https://github.com/Anuja-jayasinghe" target="_blank" className="text-black hover:text-accent transition-colors hidden sm:block">
                        <Github className="w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                    <Link href="https://linkedin.com/in/anuja-jayasinghe" target="_blank" className="text-black hover:text-accent transition-colors hidden sm:block">
                        <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                    <Link href="mailto:anujajayasinhe@gmail.com" className="text-black hover:text-accent transition-colors">
                        <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                </div>
            </div>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Dark Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Sliding Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: "-100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm bg-white border-r border-black/10 shadow-2xl flex flex-col pt-8 px-8 pb-12 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-16">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Navigation</span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-black hover:text-accent transition-colors p-2 -mr-2 rounded-lg hover:bg-black/5"
                                    aria-label="Close Menu"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-8">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.05), ease: "easeOut" }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-4xl md:text-5xl font-bold font-sans text-black hover:text-accent transition-colors tracking-tighter block"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mt-auto pt-16 flex gap-6 sm:hidden border-t border-black/10">
                                <Link href="https://github.com/Anuja-jayasinghe" target="_blank" className="text-black hover:text-accent transition-colors">
                                    <Github className="w-6 h-6" />
                                </Link>
                                <Link href="https://linkedin.com/in/anuja-jayasinghe" target="_blank" className="text-black hover:text-accent transition-colors">
                                    <Linkedin className="w-6 h-6" />
                                </Link>
                                <Link href="mailto:anujajayasinhe@gmail.com" className="text-black hover:text-accent transition-colors">
                                    <Mail className="w-6 h-6" />
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
