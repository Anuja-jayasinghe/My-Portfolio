"use client";

import Image from "next/image";
import GooeyNav from "./BubleHeader";
import { Home, User, Mail, FolderKanban } from "lucide-react";

const Header = () => {
    const items = [
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "About", href: "/#about", icon: <User className="w-4 h-4" /> },
        { label: "Projects", href: "/#projects", icon: <FolderKanban className="w-4 h-4" /> },
        { label: "Contact", href: "/#contact", icon: <Mail className="w-4 h-4" /> },
    ];

    return (
        <header
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 
                    transition-all duration-300 ease-in-out 
                    bg-transparent hover:bg-black/60 hover:backdrop-blur-md"
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
                <h1 className="text-2xl font-bold font-[cursive] text-white">
                    Anuja Jayasinghe
                </h1>
            </div>

            {/* Right: Navigation */}
            <div className="relative">
                <GooeyNav
                    items={items}
                    particleCount={20}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
            </div>
        </header>
    );
};

export default Header;
