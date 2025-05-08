import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const icons = [
  {
    href: "https://github.com/anujajay",
    label: "GitHub",
    icon: <FaGithub />,
  },
  {
    href: "https://linkedin.com/in/anujajay",
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: "https://twitter.com/anujajay",
    label: "Twitter",
    icon: <FaTwitter />,
  },
];

export default function SocialIcons() {
  return (
    <div className="flex gap-6 mt-4">
      {icons.map(({ href, label, icon }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative text-2xl text-white hover:text-cyan-400 transition duration-300"
        >
          <span className="peer">{icon}</span>
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-sm px-2 py-1 rounded opacity-0 peer-hover:opacity-100 transition-opacity duration-300 z-10">
            {label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
