"use client";

import { useState } from "react";

export default function Header() {
    const [activeNav, setActiveNav] = useState("");

    const handleScroll = (e, section) => {
        e.preventDefault();
        setActiveNav(section); // Set active class to the clicked section
        document.getElementById(section)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-opacity-30 backdrop-filter backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
                <a 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setActiveNav("home");
                    }}
                    className="flex items-center hover:opacity-80 transition-opacity duration-300"
                >
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                    <h1 className="text-xl font-bold text-blue-300 font-sans">Anuja Jayasinghe</h1>
                </a>
                <nav className="space-x-14 text-base font-medium">
                    <a 
                        href="#home" 
                        onClick={(e) => handleScroll(e, "home")} 
                        className={`hover:text-blue-300 transition-colors duration-300 ${activeNav === "home" ? "text-blue-300" : ""}`}
                    >
                        Home
                    </a>
                    <a 
                        href="#about" 
                        onClick={(e) => handleScroll(e, "about")} 
                        className={`hover:text-blue-300 transition-colors duration-300 ${activeNav === "about" ? "text-blue-300" : ""}`}
                    >
                        About
                    </a>
                    <a 
                        href="#projects" 
                        onClick={(e) => handleScroll(e, "projects")} 
                        className={`hover:text-blue-300 transition-colors duration-300 ${activeNav === "projects" ? "text-blue-300" : ""}`}
                    >
                        Projects
                    </a>
                    <a 
                        href="#contact" 
                        onClick={(e) => handleScroll(e, "contact")} 
                        className={`hover:text-blue-300 transition-colors duration-300 ${activeNav === "contact" ? "text-blue-300" : ""}`}
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    );
}
