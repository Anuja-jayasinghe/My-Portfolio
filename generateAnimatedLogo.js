const fs = require('fs');

let svg = fs.readFileSync('public/logo-white.svg', 'utf8');

const replacementTop = `import { motion } from 'framer-motion';

export default function AnimatedLogo({ className }: { className?: string }) {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      fillOpacity: 0,
      stroke: '#d9d9d9',
      strokeWidth: 2
    },
    visible: (i) => ({
      pathLength: 1,
      fillOpacity: 1,
      strokeWidth: 0,
      transition: {
        pathLength: { duration: 1.5, ease: 'easeInOut', delay: i * 0.1 },
        fillOpacity: { duration: 0.8, ease: 'easeInOut', delay: 1.2 + i * 0.1 },
        strokeWidth: { delay: 1.2 + i * 0.1 }
      }
    })
  };

  return (
    <svg className={className} `;

svg = svg.replace('<svg ', replacementTop);

svg = svg.replace(/xmlns:xlink="[^"]*" /, '');
svg = svg.replace(/zoomAndPan="[^"]*" /, '');
svg = svg.replace(/version="1\\.0"/, '');

svg = svg.replace(/<rect ([^>]*)>/g, '<rect $1 />');
svg = svg.replace(/clip-path/g, 'clipPath');
svg = svg.replace(/fill-opacity/g, 'fillOpacity');

let i = 0;
svg = svg.replace(/<path d="([^"]*)"/g, (...args) => {
    return `<motion.path custom={${i++}} variants={pathVariants} initial="hidden" animate="visible" d="${args[1]}"`;
});

const replacementBottom = `    </svg>
  );
}`;

svg = svg.replace('</svg>', replacementBottom);

fs.writeFileSync('src/components/layout/AnimatedLogo.tsx', svg);
console.log("Success");
