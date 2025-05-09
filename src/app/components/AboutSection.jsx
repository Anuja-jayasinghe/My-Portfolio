'use client';

import { motion } from "motion/react"; // Ensure named imports are used explicitly
import Image from 'next/image'; // We'll use Next.js Image component
import '../styles/aboutGlow.css';

const AboutSection = () => {
  return (
    <section id="about" className="w-full min-h-screen flex items-center justify-center text-white py-10 px-5">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-shrink-0 relative"
        >
          {/* Rotating Glow */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-white via-gray-300 to-gray-400 opacity-60 blur-2xl animate-spin-slow"></div>
          </div>
          <Image
            src="/profile.jpg" 
            alt="Profile Picture"
            width={300}
            height={300}
            className="rounded-full object-cover w-66 h-66 md:w-72 md:h-72 relative z-10"
          />
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl font-bold mb-6">Where creativity meets authenticity</h2>
          <p className="text-lg text-gray-300">
            I'm currently pursuing a Software Engineering degree at the University of Westminster (UOW),
            through the Informatics Institute of Technology (IIT). Passionate about building tech that
            blends innovation and real-world value.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
