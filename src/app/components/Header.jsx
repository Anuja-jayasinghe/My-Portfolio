"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Home, User, Mail, FolderKanban, Menu, X } from "lucide-react";

const Header = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const containerRef = useRef(null);
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const mobileNavRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const items = [
        { label: "Home", href: "#home", icon: <Home className="w-4 h-4" /> },
        { label: "About", href: "#about", icon: <User className="w-4 h-4" /> },
        { label: "Projects", href: "#projects", icon: <FolderKanban className="w-4 h-4" /> },
        { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = items.map(item => item.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            let foundSection = null;
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        foundSection = section;
                        break;
                    }
                }
            }
            setActiveSection(foundSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update indicator position when active section changes
    useEffect(() => {
        if (!navRef.current || !indicatorRef.current) return;
        
        const activeItem = navRef.current.querySelector(`[data-section="${activeSection}"]`);
        if (activeItem) {
            const { offsetLeft, offsetWidth } = activeItem;
            indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
            indicatorRef.current.style.width = `${offsetWidth}px`;
        } else {
            indicatorRef.current.style.width = `0px`;
        }
    }, [activeSection]);

    // Focus management for mobile menu
    useEffect(() => {
        if (isMobileMenuOpen && mobileNavRef.current) {
            const focusableElements = mobileNavRef.current.querySelectorAll('a[href], button');
            const firstElement = focusableElements[0];
            firstElement?.focus();

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    setIsMobileMenuOpen(false);
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isMobileMenuOpen]);

    // Detect mobile view (for center effect only)
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(targetId);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <style>
                {`
                    .nav-indicator {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height: 2px;
                        background: linear-gradient(90deg, #60A5FA, #3B82F6);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        border-radius: 2px;
                    }
                    .nav-item {
                        position: relative;
                        transition: color 0.3s ease;
                    }
                    .nav-item.active {
                        color: #60A5FA;
                    }
                    .nav-item::after {
                        content: '';
                        position: absolute;
                        bottom: -2px;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: #60A5FA;
                        transform: scaleX(0);
                        transition: transform 0.3s ease;
                    }
                    .nav-item:hover::after {
                        transform: scaleX(1);
                    }
                    .mobile-nav {
                        position: fixed;
                        top: 0;
                        right: 0;
                        width: 75%;
                        max-width: 300px;
                        height: 100%;
                        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
                        backdrop-filter: blur(10px);
                        transform: translateX(100%);
                        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        z-index: 1000;
                        box-shadow: -4px 0 10px rgba(0, 0, 0, 0.3);
                    }
                    .mobile-nav.open {
                        transform: translateX(0);
                    }
                    .mobile-nav ul {
                        flex-direction: column;
                        padding: 2rem 1rem;
                        margin: 0;
                        list-style: none;
                    }
                    .mobile-nav li {
                        margin: 0.5rem 0;
                    }
                    .mobile-nav a {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        padding: 0.75rem 1rem;
                        color: #ffffff;
                        font-size: 1.1rem;
                        font-weight: 500;
                        border-radius: 8px;
                        transition: background 0.2s ease, color 0.2s ease;
                        text-decoration: none;
                    }
                    .mobile-nav a:hover,
                    .mobile-nav a:focus {
                        background: rgba(96, 165, 250, 0.1);
                        color: #60A5FA;
                        outline: none;
                    }
                    .mobile-nav a.active {
                        color: #60A5FA;
                        background: rgba(96, 165, 250, 0.2);
                    }
                    .mobile-nav-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        opacity: 0;
                        visibility: hidden;
                        transition: opacity 0.3s ease, visibility 0.3s ease;
                        z-index: 999;
                    }
                    .mobile-nav-overlay.open {
                        opacity: 1;
                        visibility: visible;
                    }
                    @media (max-width: 767px) {
                        header {
                            background: rgba(0, 0, 0, 0.8);
                            backdrop-filter: blur(8px);
                        }
                    }
                `}
            </style>
            <header
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-4 
                        transition-all duration-300 ease-in-out"
                style={{ zIndex: 100 }}
            >
                {/* Left: Logo and Name */}
                <div className="flex items-center space-x-4">
                    <Image
                        src="/logo.png" 
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <h1 className="text-xl md:text-2xl font-bold font-[cursive] text-white">
                        Anuja Jayasinghe
                    </h1>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <div className="relative hidden md:block" ref={containerRef}>
                    <nav className="flex relative">
                        <ul
                            ref={navRef}
                            className="flex gap-8 list-none p-0 px-4 m-0 relative"
                        >
                            {items.map((item) => {
                                const sectionId = item.href.substring(1);
                                return (
                                    <li
                                        key={sectionId}
                                        data-section={sectionId}
                                        className={`nav-item py-[0.6em] px-[1em] relative cursor-pointer text-white ${
                                            activeSection === sectionId ? "active" : ""
                                        }`}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                    >
                                        <a
                                            href={item.href}
                                            className="flex items-center space-x-2 outline-none"
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                );
                            })}
                            <div ref={indicatorRef} className="nav-indicator" />
                        </ul>
                    </nav>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`mobile-nav-overlay ${isMobileMenuOpen ? "open" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <nav
                    ref={mobileNavRef}
                    className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}
                >
                    <ul>
                        {items.map((item) => {
                            const sectionId = item.href.substring(1);
                            return (
                                <li key={sectionId}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className={`flex items-center space-x-2 ${
                                            activeSection === sectionId ? "active" : ""
                                        }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;