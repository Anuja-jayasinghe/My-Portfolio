"use client";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Typewriter effect setup
  const roles = [
    { text: "Software Engineering Student", color: "text-blue-400" },
    { text: "AI Enthusiast", color: "text-purple-400" },
    { text: "Open Source Contributor", color: "text-green-400" },
    { text: "Tech Explorer ", color: "text-orange-400" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentIndex].text;
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText((prev) => prev.slice(0, -1));
      } else {
        setDisplayText((prev) => currentRole.slice(0, prev.length + 1));
      }

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1000);
      }

      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  // Parallax scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const titleTransform = `translateY(${scrollY * -0.3}px)`;
  const subtitleTransform = `translateY(${scrollY * -0.2}px)`;
  const buttonTransform = `translateY(${scrollY * -0.1}px)`;
  const bounceTransform = `translateY(${scrollY * 0.15}px)`;

  // const Particles = () => {
  //   const [particles, setParticles] = useState([]);

  //   useEffect(() => {
  //     const generateParticles = () => {
  //       const count = 15;
  //       const newParticles = [];

  //       for (let i = 0; i < count; i++) {
  //         newParticles.push({
  //           id: i,
  //           x: Math.random() * 100,
  //           y: Math.random() * 100,
  //           size: Math.random() * 8 + 2,
  //           speed: Math.random() * 0.6 + 0.2,
  //           depth: Math.random() * 0.5 + 0.5,
  //           opacity: Math.random() * 0.5 + 0.1
  //         });
  //       }

  //       setParticles(newParticles);
  //     };

  //     generateParticles();
  //   }, []);

  //   return (
  //     <div className="absolute inset-0 overflow-hidden pointer-events-none">
  //       {particles.map((particle) => (
  //         <div
  //           key={particle.id}
  //           className="absolute rounded-full bg-white"
  //           style={{
  //             left: `${particle.x}%`,
  //             top: `${particle.y}%`,
  //             width: `${particle.size}px`,
  //             height: `${particle.size}px`,
  //             opacity: particle.opacity,
  //             transform: `translateY(${scrollY * particle.speed * particle.depth}px)`,
  //             transition: "transform 0.1s ease-out"
  //           }}
  //         />
  //       ))}
  //     </div>
  //   );
  // };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center h-screen text-center px-4"
      >
        <div className="z-10 relative">
          <div
            style={{ transform: titleTransform, transition: "transform 0.2s ease-out" }}
            className="mb-4 relative"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Hello, I'm Anuja Jayasinghe
            </h1>
          </div>

          <div
            style={{ transform: subtitleTransform, transition: "transform 0.2s ease-out" }}
            className="mb-8 relative h-10 md:h-12"
          >
            <h2 className={`text-2xl md:text-4xl font-mono ${roles[currentIndex].color}`}>
              {displayText}
              <span className="border-r-2 border-white animate-pulse ml-1" />
            </h2>
          </div>

          <div
            style={{ transform: buttonTransform, transition: "transform 0.2s ease-out" }}
            className="relative"
          >
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all 
                         hover:scale-105 shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm"
              onClick={scrollToAbout}
            >
              About Me
            </button>
          </div>

          <div
            style={{ transform: bounceTransform, transition: "transform 0.2s ease-out" }}
            className="mt-10 animate-bounce text-gray-300 relative"
          >
            ↓
          </div>
        </div>

        {/* Particle Background
        <Particles /> */}

        {/* Extra glow blob */}
        <div
          className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl"
          style={{
            top: "20%",
            left: "15%",
            transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.05}px)`,
            transition: "transform 0.2s ease-out"
          }}
        />

        {/* Gradient depth overlay */}
        <div
          className="absolute inset-0 -z-5 bg-gradient-to-b from-transparent to-black/30 opacity-70"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
      </section>
    </>
  );
}
