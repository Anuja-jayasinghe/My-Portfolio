"use client";
import React, { useEffect, useRef, useState } from "react";

const socialLinks = [
  {
    href: "https://github.com/Anuja-jayasinghe",
    label: "GitHub",
    blackIcon: "/icons/github-black.svg",
    colorIcon: "/icons/github.svg",
    angle: 0,
  },
  {
    href: "https://linkedin.com/in/anuja-jayasinghe",
    label: "LinkedIn",
    blackIcon: "/icons/linkedin-black.svg",
    colorIcon: "/icons/linkedin.svg",
    angle: 60,
  },
  {
    href: "https://twitter.com/anujajayasinhe",
    label: "Twitter",
    blackIcon: "/icons/twitter-black.svg",
    colorIcon: "/icons/twitter.svg",
    angle: 120,
  },
  {
    href: "https://instagram.com/anu.ja_j",
    label: "Instagram",
    blackIcon: "/icons/instagram-black.svg",
    colorIcon: "/icons/instagram.svg",
    angle: 180,
  },
  {
    href: "https://discordapp.com/users/758840991691046933/",
    label: "Discord",
    blackIcon: "/icons/discord-black.svg",
    colorIcon: "/icons/discord.svg",
    angle: 240,
  },
  {
    href: "https://www.facebook.com/anuja.jayasinghe.75",
    label: "Facebook",
    blackIcon: "/icons/facebook-black.svg",
    colorIcon: "/icons/facebook.svg",
    angle: 300,
  },
];

const SocialIconsCircle = () => {
  const radius = 100; // px
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef();

  useEffect(() => {
    let start = null;
    const duration = 20000; // 20s for a full rotation
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const rot = ((elapsed % duration) / duration) * 360;
      setRotation(rot);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="fixed right-[200px] top-1/2 -translate-y-1/2 z-0 pr-8">
      <div className="relative w-64 h-64 group">
        {/* Spinning circle container */}
        <div
          className="absolute inset-0"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${link.angle}deg) translateY(-${radius}px) rotate(${-link.angle - rotation}deg)`
              }}
            >
              <div className="relative w-11 h-11 group/link">
                <img
                  src={link.blackIcon}
                  alt={`${link.label} icon`}
                  className="w-full h-full transition-all duration-300 group-hover/link:opacity-0"
                />
                <img
                  src={link.colorIcon}
                  alt={`${link.label} icon colored`}
                  className="absolute inset-0 w-full h-full opacity-0 group-hover/link:opacity-100 transition-all duration-300 group-hover/link:scale-110"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialIconsCircle;