const fs = require('fs');
const path = require('path');

const dir = path.join('public', 'certifications');
const mapping = {
  'AI-for-beginners_HP-LIFEcertificate-1.png': 'hp-ai.png',
  'CertificateOfCompletion_Java Data Structures.png': 'linkedin-java-ds.png',
  'CertificateOfCompletion_Learning Java 11 (1)-1.png': 'linkedin-java11.png',
  'CertificateOfCompletion_Learning Linux Command Line 2023.png': 'linkedin-linux.png',
  'CertificateOfCompletion_Learning Next.png': 'linkedin-nextjs.png',
  'CertificateOfCompletion_Learning TypeScript.png': 'linkedin-typescript.png',
  'CertificateOfCompletion_Practical GitHub Actions-1.png': 'linkedin-github.png',
  'Coursera BEUTTPWU6O9E-1.png': 'coursera-python.png',
  'Introduction-to-Cybersecurity_HP-LIFE-1.png': 'hp-cyber.png',
  'JavaScript Bootcamp_LUEJSMAY1251087-1.png': 'letsupgrade-js.png',
  'LetsUpgrade-DSABootcamp_LUEDSAMAY125381-1.png': 'letsupgrade-dsa.png',
  'LetsUpgrade-JavaBootcamp_LUEJAVAAPR12599-1.png': 'letsupgrade-java.png',
  'Postman - Postman API Fundamentals Student Expert - 2025-04-27_page-0001.jpg': 'postman-api.jpg',
  'Python Bootcamp_LUEPYTMAY1251341.png': 'letsupgrade-python.png',
  'Python_for_Beginners_E-Certificate-1.png': 'mora-python.png'
};

Object.entries(mapping).forEach(([oldName, newName]) => {
  const oldPath = path.join(dir, oldName);
  const newPath = path.join(dir, newName);
  if (fs.existsSync(oldPath)) {
    try {
      const buf = fs.readFileSync(oldPath);
      fs.writeFileSync(newPath, buf);
      console.log(`Copied: ${oldName} -> ${newName}`);
    } catch (e) {
      console.log(`Failed to copy ${oldName}: ${e.message}`);
    }
  } else {
    console.log(`Skipped (not found): ${oldName}`);
  }
});
