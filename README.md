# Anuja Jayasinghe's Portfolio

A modern, responsive portfolio website showcasing projects, skills, and professional experience. Built with Next.js 16, TypeScript, and Tailwind CSS.

## ✨ Features

- **Splash Screen Animation** - Eye-catching entry animation on initial load
- **Responsive Navigation** - Mobile-friendly navbar with smooth scrolling
- **Hero Section** - Engaging introduction with animated elements
- **About Section** - Personal bio and professional background
- **Portfolio Showcase** - Featured and mini projects with live demos and GitHub links
- **Skills Display** - Technical skills organized by category
- **Contact Form** - Easy way to get in touch
- **Dark Theme Ready** - Modern, professional dark-themed design
- **Smooth Animations** - Powered by Framer Motion for fluid interactions

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Linting:** ESLint (Next.js config)

## 📁 Project Structure

```
My-Portfolio/
├── public/
│   └── projects/          # Project images and assets
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Main page
│   │   └── globals.css    # Global styles
│   └── components/
│       ├── layout/
│       │   ├── Footer.tsx
│       │   ├── Navbar.tsx
│       │   └── SplashScreen.tsx
│       └── sections/
│           ├── About.tsx
│           ├── Contact.tsx
│           ├── Hero.tsx
│           ├── Portfolio.tsx
│           └── Skills.tsx
├── portfolio_data.md      # Content and project data
└── questionnaire.md       # Design requirements
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Anuja-jayasinghe/My-Portfolio.git
cd My-Portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Featured Projects

- **PayLedger** - Financial tracking system with bill management and automated email summaries
- **SolarEdge Analytics** - Real-time solar energy monitoring dashboard with OCR integration
- **ComponentOps** - Motion-enhanced React UI components library
- **CheckMS** - Professional check portfolio manager for LKR transactions

View all projects and details in [portfolio_data.md](portfolio_data.md).

## 🎨 Customization

To update portfolio content:
1. Edit `portfolio_data.md` for content structure
2. Modify components in `src/components/sections/` for layout changes
3. Update styles in `src/app/globals.css` or component-level Tailwind classes

## 📄 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 📧 Contact

- **Email:** anujajayasinhe@gmail.com
- **GitHub:** [@Anuja-jayasinghe](https://github.com/Anuja-jayasinghe)
- **LinkedIn:** [anuja-jayasinghe](https://linkedin.com/in/anuja-jayasinghe)

## 📜 License

This project is open source and available for personal use.

---

Built with ❤️ by Anuja Jayasinghe
