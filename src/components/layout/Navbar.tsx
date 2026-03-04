"use client";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/10 font-mono">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image src="/logo-black.svg" alt="Anuja Logo" width={120} height={40} className="object-contain" priority />
                </Link>

                <nav className="hidden md:flex gap-8 items-center">
                    <Link href="#home" className="text-sm font-bold text-black hover:text-accent transition-colors">
                        Home
                    </Link>
                    <Link href="#about" className="text-sm font-bold text-black hover:text-accent transition-colors">
                        Real Me
                    </Link>
                    <Link href="#portfolio" className="text-sm font-bold text-black hover:text-accent transition-colors">
                        Portfolio
                    </Link>
                    <Link href="#contact" className="text-sm font-bold text-black hover:text-accent transition-colors">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-5">
                    <Link href="https://github.com/Anuja-jayasinghe" target="_blank" className="text-black hover:text-accent transition-colors">
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link href="https://linkedin.com/in/anuja-jayasinghe" target="_blank" className="text-black hover:text-accent transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link href="mailto:anujajayasinhe@gmail.com" className="text-black hover:text-accent transition-colors">
                        <Mail className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
