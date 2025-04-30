// src/app/components/Hero.js
'use client';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

    return (
      <section className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Hello, I'm Anuja Jayasinghe
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 mb-8">
            Software Engineering Student | AI Enthusiast
        </p>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition"
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          About Me
        </button>
        <div className="mt-10 animate-bounce text-gray-400">
          ↓
        </div>
      </section>
    );
  }
