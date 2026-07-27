# Portfolio Projects & SEO Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the portfolio's project data (fixing a broken link, adding 4 real projects, dropping stale ones), give featured projects a media gallery instead of a single static image, fix Terminal One's missing-asset/slow-typing UX, add a professional SEO layer (structured data + metadata), and run a sitewide performance pass (image/SVG compression, code-splitting).

**Architecture:** This is a single-page Next.js 16 App Router site (`src/app/page.tsx`) with no per-route pages. All project content lives in `src/data/projects.json`, rendered by two components: `PortfolioFeaturedCard.tsx` (featured, alternating layout) and `TerminalOne.tsx` (mini projects, terminal-styled hover/click panel). Changes are data-first (schema + content), then component (gallery UI, asset fallback, typing UX), then cross-cutting (SEO, performance).

**Tech Stack:** Next.js 16.2.10 (App Router), React 19.2.3, TypeScript, Tailwind CSS v4, Framer Motion, `next/image`. No test runner is configured in this repo yet (`package.json` has no Jest/Vitest/RTL) — Task 9 introduces Vitest scoped to a couple of pure-function units; everything else in this plan still verifies via `npx tsc --noEmit`, `npm run lint`, `npm run build`, and manual browser checks against the dev server, since the rest of the change surface is presentational/layout and not worth component-testing.

## Global Constraints

- Spec of record: `docs/superpowers/specs/2026-07-25-portfolio-projects-seo-update-design.md` — every task below traces back to a section of it.
- No new sitemap URLs / routed pages (site stays single-page).
- No test framework exists at plan start — Tasks 1–8 still verify via type-check, lint, build, and manual dev-server checks; Task 9 introduces Vitest, scoped narrowly to pure-function unit tests (not component/DOM testing, which is overkill for this presentational site).
- Follow this repo's existing PR convention: feature branch → `gh pr create` → regular merge commit (not squash) — confirmed via `git log --merges` history.
- `check-management-system` (CheckMS's real repo) is private at time of writing — its `repoUrl` link will 404 until the user makes it public. This is expected and documented, not a bug to work around.
- JaySync-Lab's featured card ships with no `media` (no screenshot yet) — falls back to the existing "[No Image]" state. This is expected, not a bug.

---

### Task 1: Shared project types + `projects.json` content refresh

**Files:**
- Create: `src/types/project.ts`
- Modify: `src/data/projects.json` (full replace)
- Modify: `src/components/sections/PortfolioFeaturedCard.tsx:1-16` (interface + import)
- Modify: `src/components/ui/TerminalOne.tsx:1-18` (interface + import)

**Interfaces:**
- Produces: `Project`, `MediaItem`, `SecondaryLink` types from `src/types/project.ts`, imported as `import type { Project } from "@/types/project";` by both consuming components in Tasks 2 and 3.

This task lays down the data model every later task depends on: a shared `Project` type (removing the current duplication across the two components) and the full corrected/expanded project list from the spec (§2–§5).

- [ ] **Step 1: Create the shared type file**

Create `src/types/project.ts`:

```ts
export interface MediaItem {
  type: string; // "image" | "video"
  src: string;
  poster?: string; // video only — still frame shown before playback/load
  alt: string;
}

export interface SecondaryLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  type: string; // "featured" | "mini"
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  imagePath?: string; // mini projects only — featured projects use `media`
  media?: MediaItem[]; // featured projects only
  secondaryLink?: SecondaryLink;
}
```

`type` and `MediaItem.type` are kept as plain `string` (not a literal union) rather than `"featured" | "mini"` / `"image" | "video"`, matching the existing codebase convention — the original `Project` interface in `PortfolioFeaturedCard.tsx` already typed `type: string` rather than a union, because TypeScript widens string literals imported from a `.json` file to `string`, and a literal union field would fail to structurally match the JSON import.

- [ ] **Step 2: Replace `src/data/projects.json` with the full refreshed list**

```json
[
  {
    "id": "payledger",
    "title": "PayLedger",
    "type": "featured",
    "description": "A comprehensive financial tracking system featuring bill management, public dashboards, and automated email summaries.",
    "techStack": ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/PayLedger",
    "liveUrl": "https://payledger.anujajay.com",
    "media": [
      { "type": "image", "src": "/projects/payledger1.png", "alt": "PayLedger dashboard screenshot" }
    ]
  },
  {
    "id": "solaredge",
    "title": "SolarEdge Analytics",
    "type": "featured",
    "description": "Real-time solar energy monitoring dashboard with Clerk authentication, OCR-based CEB bill management, and SolarEdge API integration.",
    "techStack": ["Vite", "Supabase", "Clerk", "Chart.js", "SolarEdge API", "Tesseract.js"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/Solar-Analytics-Dashboard",
    "liveUrl": "https://solaredge.anujajay.com",
    "media": [
      { "type": "image", "src": "/projects/solaredge1.png", "alt": "SolarEdge Analytics dashboard screenshot" }
    ]
  },
  {
    "id": "checkms",
    "title": "CheckMS",
    "type": "featured",
    "description": "A professional check portfolio manager for tracking and organizing LKR financial transactions.",
    "techStack": ["Next.js", "Neon Postgres", "Tailwind CSS", "TypeScript"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/check-management-system",
    "liveUrl": "https://checkms.anujajay.com",
    "media": [
      { "type": "image", "src": "/projects/checkms1.png", "alt": "CheckMS dashboard screenshot" }
    ]
  },
  {
    "id": "componentops",
    "title": "ComponentOps",
    "type": "featured",
    "description": "A collection of reusable, motion-enhanced UI components for rapid frontend development.",
    "techStack": ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/React-Components-Library",
    "liveUrl": "https://componentops.anujajay.com",
    "media": [
      { "type": "image", "src": "/projects/componentops1.png", "alt": "ComponentOps component library screenshot" }
    ]
  },
  {
    "id": "jaysync-lab",
    "title": "JaySync-Lab",
    "type": "featured",
    "description": "An ongoing homelab documented end-to-end: Proxmox virtualization, Docker services, Tailscale networking, Pi-hole, Jellyfin, and a full *Arr media stack. Visitors can interact with real hardware through the live playground.",
    "techStack": ["Proxmox", "Docker", "Tailscale", "Bash", "Pi-hole", "Jellyfin"],
    "repoUrl": "https://github.com/JaySync-Lab/JaySync-Lab",
    "liveUrl": "https://jaysynclab.com",
    "secondaryLink": { "label": "Playground", "url": "https://jslnode.jaysynclab.com" }
  },
  {
    "id": "nic-detail",
    "title": "NIC Detail Extractor",
    "type": "mini",
    "description": "Extracts birthdate, gender, and age from SL NIC numbers using custom regex logic.",
    "techStack": ["Python", "JS"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/NIC-detailExtracter"
  },
  {
    "id": "mouse-active",
    "title": "Mouse Auto-Active",
    "type": "mini",
    "description": "Keeps computer sessions active by simulating periodic mouse movement.",
    "techStack": ["Python", "PyAutoGUI"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/Mouse-auto-active"
  },
  {
    "id": "ceb-management",
    "title": "CEB Management",
    "type": "mini",
    "description": "Manages and calculates electricity consumption based on CEB rates.",
    "techStack": ["JS", "Firebase"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/CEB_Management"
  },
  {
    "id": "project-mgmt",
    "title": "Project Management",
    "type": "mini",
    "description": "Backend system for managing software development lifecycles and tasks.",
    "techStack": ["Java", "MySQL"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/Project-manegement-system"
  },
  {
    "id": "chess-academy",
    "title": "Chess Academy System",
    "type": "mini",
    "description": "Java console application for chess academies to manage players and tournaments, with authentication, data persistence, and role-based access control.",
    "techStack": ["Java", "Maven"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/ChessAcademySystem_Java"
  },
  {
    "id": "hangman",
    "title": "Hangman",
    "type": "mini",
    "description": "Classic word-guessing game built with vanilla JavaScript and DOM manipulation.",
    "techStack": ["JS", "HTML", "CSS"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/HangMan"
  },
  {
    "id": "ranking-calc",
    "title": "Ranking Calculator",
    "type": "mini",
    "description": "Calculates and sorts student rankings based on weighted module scores.",
    "techStack": ["Python"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/Python-ranking-calculator"
  },
  {
    "id": "js-calculator",
    "title": "JS Calculator",
    "type": "mini",
    "description": "A clean, functional calculator built with vanilla HTML, CSS and JavaScript.",
    "techStack": ["HTML", "CSS", "JS"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/Simple_JS_Calculator"
  },
  {
    "id": "ecoaction",
    "title": "EcoAction",
    "type": "mini",
    "description": "Environmental awareness platform promoting sustainable community actions.",
    "techStack": ["HTML", "CSS", "JS"],
    "repoUrl": "https://github.com/Anuja-jayasinghe/EcoAction"
  },
  {
    "id": "maporia-sl",
    "title": "Maporia SL",
    "type": "mini",
    "description": "Gamified Flutter travel app for exploring Sri Lanka, paired with a companion marketing site.",
    "techStack": ["Flutter", "Dart"],
    "repoUrl": "https://github.com/MaporiaSL/MaporaSL_Mobile",
    "liveUrl": "https://maporiasl.com"
  },
  {
    "id": "jaysync-playground",
    "title": "JaySync-Lab Playground",
    "type": "mini",
    "description": "Live interactive node from the JaySync-Lab homelab, letting visitors trigger real hardware over the network.",
    "techStack": ["Node.js", "Homelab"],
    "repoUrl": "https://github.com/JaySync-Lab/jaysync-lab-playground",
    "liveUrl": "https://jslnode.jaysynclab.com"
  }
]
```

Note what changed vs. the old file: `checkms.repoUrl` corrected to the real (currently private) repo; `solaredge.description`/`techStack` updated for Clerk; `jaysync-lab` flipped from `type: "mini"` to `type: "featured"`, its `repoUrl` corrected to the `JaySync-Lab` org, and it gained `liveUrl`/`secondaryLink`; four new entries added (`chess-academy`, `maporia-sl`, `jaysync-playground`, and the promoted `jaysync-lab`); all four existing featured projects' `imagePath` converted to a one-item `media` array.

- [ ] **Step 3: Point both components at the shared type (compile-only change, behavior unchanged)**

In `src/components/sections/PortfolioFeaturedCard.tsx`, replace the local interface:

```ts
interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  imagePath?: string;
}
```

with:

```ts
import type { Project } from "@/types/project";
```

(placed with the other imports at the top of the file). In `src/components/ui/TerminalOne.tsx`, replace its local interface:

```ts
interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  imagePath?: string;
}
```

with the same `import type { Project } from "@/types/project";`. Leave the rest of both files untouched for now — Tasks 2 and 3 rewrite their bodies.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors. (`PortfolioFeaturedCard.tsx` and `TerminalOne.tsx` will still reference `project.imagePath` at this point for the old rendering logic, which remains valid since `imagePath` is still on the `Project` type — Task 2/3 replace that usage.)

- [ ] **Step 5: Commit**

```bash
git add src/types/project.ts src/data/projects.json src/components/sections/PortfolioFeaturedCard.tsx src/components/ui/TerminalOne.tsx
git commit -m "feat: add shared Project/MediaItem types and refresh project data"
```

---

### Task 2: Featured project media gallery + secondary link

**Files:**
- Modify: `src/components/sections/PortfolioFeaturedCard.tsx` (full rewrite of body, keeps the `import type { Project }` from Task 1)

**Interfaces:**
- Consumes: `Project`, `MediaItem`, `SecondaryLink` from `src/types/project.ts` (Task 1); `project.media?: MediaItem[]`, `project.secondaryLink?: SecondaryLink`.
- Produces: no new exports — this is a leaf UI component consumed by `Portfolio.tsx` (unchanged call site: `<PortfolioFeaturedCard key={project.id} project={project} index={i} />`).

Implements spec §2 (media gallery, one primary asset now, gallery UI ready for more later) and §3 (secondary link rendering), plus the responsive-image / priority-loading half of spec §7.

- [ ] **Step 1: Replace the full file content**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Link2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";

export default function PortfolioFeaturedCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const media = project.media ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } gap-6 sm:gap-8 md:gap-12 items-center group`}
    >
      {/* Media gallery */}
      <div className="w-full md:w-3/5 relative overflow-hidden rounded-lg border border-black/10">
        <div className="relative aspect-video overflow-hidden">
          {activeMedia ? (
            activeMedia.type === "video" ? (
              <video
                key={activeMedia.src}
                src={activeMedia.src}
                poster={activeMedia.poster}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <a
                href={project.liveUrl || project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                />
              </a>
            )
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center font-mono text-gray-400">
              [No Image]
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
        </div>

        {media.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {media.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Show media ${i + 1} of ${media.length}`}
                aria-current={i === activeIndex}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div
        className={`w-full md:w-2/5 ${
          isEven ? "md:text-left" : "md:text-right"
        }`}
      >
        <p className="text-sm font-mono text-accent mb-2 font-bold">
          Featured Project
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-black mb-4 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
          {project.description}
        </p>
        <div
          className={`flex flex-wrap gap-2 mb-8 ${
            isEven ? "" : "md:justify-end"
          }`}
        >
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono bg-gray-100 text-gray-700 px-3 py-1.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className={`flex gap-5 ${isEven ? "" : "md:justify-end"}`}>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono"
          >
            <Github className="w-5 h-5" /> Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono"
            >
              <ExternalLink className="w-5 h-5" /> Live
            </a>
          )}
          {project.secondaryLink && (
            <a
              href={project.secondaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-accent transition-colors flex items-center gap-2 text-sm font-bold font-mono"
            >
              <Link2 className="w-5 h-5" /> {project.secondaryLink.label}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

Note the behavior: `priority={index === 0}` + `loading={index === 0 ? undefined : "lazy"}` means only the first featured card (PayLedger, above the fold) is eager-loaded; the rest lazy-load — this is the priority/lazy-loading fix from spec §7. A project with zero or one media item renders with no gallery dots (no dead UI for the common single-image case, per spec §2).

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, open `http://localhost:3000#portfolio`.
Expected:
- PayLedger, SolarEdge, CheckMS, ComponentOps render their existing screenshots unchanged, each still linking out to its live URL/repo on click.
- JaySync-Lab (5th featured card) renders the "[No Image]" placeholder (no screenshot supplied yet) and shows **three** link icons: Code, Live, Playground.
- No gallery dots appear on any card (every project currently has exactly one or zero media items).
- Resize the browser to mobile width — cards stack vertically, image scales, no layout break.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/PortfolioFeaturedCard.tsx
git commit -m "feat: add media gallery and secondary link support to featured cards"
```

---

### Task 3: Terminal One — asset fallback, click-to-skip typing, updated mini groups

**Files:**
- Modify: `src/components/ui/TerminalOne.tsx` (full rewrite of body, keeps the `import type { Project }` from Task 1)
- Modify: `next.config.ts` (add `opengraph.githubassets.com` to `images.remotePatterns`)
- Delete: `src/lib/image-utils.ts` (its only caller, `TerminalOne.tsx`, stops using it in this task; it's a no-op passthrough with no other callers)

**Interfaces:**
- Consumes: `Project` type from Task 1; `groupedProjects.tools`/`.web` ids must match `id` values in `projects.json` from Task 1 (`chess-academy`, `maporia-sl`, `jaysync-playground` added; `jaysync-lab` removed from `WEB_IDS`).
- Produces: no new exports — leaf component consumed by `Portfolio.tsx` (call site unchanged in this task; Task 7 wraps it in `next/dynamic`).

Implements spec §4 (mini project group membership), §6.1 (GitHub-banner asset fallback + polished empty state), §6.2 (click-to-skip + faster typing).

- [ ] **Step 1: Add the remote pattern for GitHub's banner service**

In `next.config.ts`, add a second entry to `images.remotePatterns`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/cv",
        destination: "/Anuja_CV.pdf",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "/Anuja_CV.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

Without this, `next/image` rejects any `src` on that host at request time with a "hostname is not configured" error.

- [ ] **Step 2: Delete the now-unused image-utils helper**

Run: `rm src/lib/image-utils.ts` (or delete via your editor).

- [ ] **Step 3: Replace `src/components/ui/TerminalOne.tsx` in full**

```tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github, FolderCode, Terminal, FileCode2, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../../data/projects.json";
import type { Project } from "@/types/project";

function getGithubBannerUrl(repoUrl: string): string | null {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!match) return null;
  const [, owner, repo] = match;
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

export default function TerminalOne() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [lockedProjectId, setLockedProjectId] = useState<string | null>(null);
  const [typedOutput, setTypedOutput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [expandedDirs, setExpandedDirs] = useState<Record<string, boolean>>({ "tools": true, "web": true });
  const [isMobile, setIsMobile] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentPayloadRef = useRef<string>("");

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const miniProjects = projectsData.filter((p) => p.type === "mini");

  // Logical Grouping
  const TOOLS_IDS = ["nic-detail", "mouse-active", "ceb-management", "ranking-calc", "js-calculator", "project-mgmt", "chess-academy"];
  const WEB_IDS = ["hangman", "ecoaction", "maporia-sl", "jaysync-playground"];

  const groupedProjects = {
    tools: miniProjects.filter(p => TOOLS_IDS.includes(p.id)),
    web: miniProjects.filter(p => WEB_IDS.includes(p.id))
  };

  const handleMouseEnter = (project: Project) => {
    if (lockedProjectId) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setActiveProject(project);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (!lockedProjectId) {
      setActiveProject(null);
    }
  };

  const handleClick = (project: Project) => {
    if (lockedProjectId === project.id) {
      setLockedProjectId(null);
    } else {
      setLockedProjectId(project.id);
      setActiveProject(project);
    }
  };

  const toggleDir = (dir: string) => {
    setExpandedDirs(prev => ({ ...prev, [dir]: !prev[dir] }));
  };

  const handleSkipTyping = () => {
    if (!isTyping) return;
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setTypedOutput(currentPayloadRef.current);
    setIsTyping(false);
  };

  useEffect(() => {
    setImageFailed(false);

    if (!activeProject) {
      setTypedOutput("");
      return;
    }

    setIsTyping(true);
    setTypedOutput("");

    const payload = [
      `$ mount /dev/projects/${activeProject.id}.bin /mnt/preview`,
      `[  OK  ] Mounting filesystem...`,
      `[SYSTEM] OBJECT_NAME: ${activeProject.title.toUpperCase()}`,
      `[SOURCE] REPO: github.com/${activeProject.repoUrl.split('github.com/')[1]}`,
      ...(activeProject.liveUrl
        ? [`[REMOTE] URI:  ${activeProject.liveUrl.replace("https://", "")}`]
        : []),
      `[BINARY] STACK: ${activeProject.techStack.join(" // ")}`,
      `[MANIFEST_START]`,
      `${activeProject.description}`,
      `[EOF]`,
      ` `,
    ].join("\n");
    currentPayloadRef.current = payload;

    let currentIdx = 0;
    const interval = setInterval(() => {
      setTypedOutput(payload.slice(0, currentIdx + 1));
      currentIdx++;
      if (currentIdx === payload.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 4);
    typingIntervalRef.current = interval;

    return () => clearInterval(interval);
  }, [activeProject]);

  const resolvedImageSrc = activeProject
    ? activeProject.imagePath ?? getGithubBannerUrl(activeProject.repoUrl)
    : null;

  return (
    <div className="w-full max-w-[1200px] mx-auto rounded-lg overflow-hidden border border-black/10 flex flex-col font-mono text-sm shadow-2xl bg-gray-100">

      {/* Window Chrome - Light Industrial */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-200 border-b border-black/10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400 border border-black/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400 border border-black/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400 border border-black/10" />
          <div className="flex items-center gap-2 ml-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <Terminal className="w-3 h-3" />
            <span>Project_Terminal_v4.2</span>
          </div>
        </div>
        <div className="text-[10px] text-green-500/30 font-bold">MODE: CRT_EMULATION_ON</div>
      </div>

      <div className="flex flex-col md:flex-row relative">

        {/* Sidebar: File Explorer */}
        <div className="w-full md:w-64 bg-gray-200 border-b md:border-b-0 md:border-r border-black/10 flex flex-col shrink-0 z-10">
          <div className="p-3 text-[10px] font-bold text-gray-400 tracking-widest flex items-center gap-2 uppercase border-b border-black/10">
            <FolderCode className="w-3.5 h-3.5" />
            SRC/LAB/PROJECTS
          </div>

          {/* Directory Rendering */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible py-2 custom-scrollbar no-scrollbar-md">
            {Object.entries(groupedProjects).map(([dir, items]) => (
              <div key={dir} className="flex flex-row md:flex-col shrink-0 md:shrink-1 items-center md:items-stretch border-r md:border-r-0 border-black/5 last:border-r-0">
                <button
                  onClick={() => toggleDir(dir)}
                  className="flex items-center gap-1.5 px-3 py-1 text-gray-500 hover:text-gray-700 text-[10px] md:text-xs transition-colors shrink-0 whitespace-nowrap"
                >
                  {expandedDirs[dir] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span className="uppercase tracking-tighter font-black">📁 {dir}/</span>
                </button>

                <AnimatePresence initial={false}>
                  {(expandedDirs[dir] || isMobile) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex md:flex-col overflow-visible shrink-0"
                    >
                      {items.map((project) => (
                        <button
                          key={project.id}
                          onMouseEnter={() => handleMouseEnter(project)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleClick(project)}
                          className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-1.5 shrink-0 text-left transition-all duration-200 group relative min-w-fit ${activeProject?.id === project.id
                              ? "text-blue-600 bg-blue-500/5 shadow-inner"
                              : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                            }`}
                        >
                          {lockedProjectId === project.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                          )}
                          <FileCode2 className={`w-3 h-3 shrink-0 ${activeProject?.id === project.id ? "text-blue-500" : "text-gray-400"}`} />
                          <span className="text-[11px] font-bold whitespace-nowrap">{project.id.toLowerCase()}.bin</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Main Window: Terminal Output */}
        <div className="flex-1 bg-gray-900 flex flex-col min-h-[350px] md:min-h-[500px] relative overflow-hidden">

          {/* CRT Overlay Effects */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Scanlines */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            {/* Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            {/* Screen Flicker */}
            <div className="absolute inset-0 opacity-[0.015] bg-white animate-flicker pointer-events-none" />
          </div>

          <div
            className={`p-4 md:p-8 flex-1 overflow-y-auto relative z-10 custom-scrollbar ${isTyping ? "cursor-pointer" : ""}`}
            onClick={handleSkipTyping}
          >
            {!activeProject ? (
              <div className="h-full flex flex-col justify-center items-center select-none gap-4">
                <Terminal className="w-16 h-16 text-green-500/10 animate-pulse" />
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-[10px] text-green-500/30 uppercase tracking-[0.2em] font-bold">System_Idle</span>
                  <span className="text-[10px] text-gray-700 max-w-[200px]">SELECT A SOURCE BINARY FROM THE LEFT TO INITIATE SEQUENCE</span>
                </div>
              </div>
            ) : (
              <div className="max-w-[800px]">
                {/* Typed output with industrial syntax colouring */}
                <pre className="whitespace-pre-wrap font-mono text-[10px] md:text-xs leading-relaxed pb-8 terminal-glow">
                  {typedOutput.split("\n").map((line, i) => {
                    if (line.startsWith("$"))
                      return <span key={i} className="text-blue-400 font-bold">{line}{"\n"}</span>;
                    if (line.startsWith("[  OK  ]"))
                       return <span key={i} className="text-green-400 font-bold tracking-tighter "><span className="text-white/10">[</span>  OK  <span className="text-white/20">]</span> {line.split('OK  ] ')[1]}{"\n"}</span>;
                    if (line.startsWith("[SYSTEM]") || line.startsWith("[BINARY]"))
                      return <span key={i} className="text-cyan-400 font-bold">{line}{"\n"}</span>;
                    if (line.startsWith("[SOURCE]") || line.startsWith("[REMOTE]"))
                      return <span key={i} className="text-blue-300/80">{line}{"\n"}</span>;
                    if (line.startsWith("[MANIFEST"))
                      return <span key={i} className="text-gray-400 font-black tracking-widest block bg-white/5 px-2 py-0.5 my-2 uppercase">{line}{"\n"}</span>;
                    if (line.startsWith("[EOF]") || line.startsWith("[EOF]"))
                      return <span key={i} className="text-gray-500 italic">{line}{"\n"}</span>;
                    return <span key={i} className="text-blue-200/70">{line}{"\n"}</span>;
                  })}
                  {isTyping && (
                    <span className="inline-block w-2.5 h-4 ml-1 bg-blue-500 animate-terminal-cursor align-middle shadow-[0_0_8px_#3b82f6]" />
                  )}
                </pre>
                {isTyping && (
                  <span className="block text-[9px] text-gray-600 uppercase tracking-widest -mt-6 mb-6 select-none">
                    click to skip
                  </span>
                )}

                {/* Post-typing actions: Assets & Links */}
                <AnimatePresence>
                  {!isTyping && activeProject && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex flex-col md:flex-row gap-8 py-6 border-t border-white/5"
                    >
                      {resolvedImageSrc && !imageFailed ? (
                        <div className="relative w-full md:w-64 overflow-hidden rounded border border-white/10 shrink-0 aspect-video group/img">
                          <Image
                            src={resolvedImageSrc}
                            alt={activeProject.title}
                            fill
                            sizes="256px"
                            className="object-cover opacity-70 group-hover/img:opacity-100 transition-opacity duration-500"
                            loading="lazy"
                            onError={() => setImageFailed(true)}
                          />
                          <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
                        </div>
                      ) : (
                        <div className="relative w-full md:w-64 h-36 bg-white/[0.05] rounded border border-white/5 flex items-center justify-center text-gray-500 text-[10px] shrink-0 uppercase tracking-widest overflow-hidden">
                          <div className="absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_3px)]" />
                          <span className="italic relative z-10">[ Null_Asset_Record ]</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-4 justify-center">
                        <div className="space-y-1">
                          <span className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">Repository_Access</span>
                          <a
                            href={activeProject.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 text-gray-400 hover:text-white transition-all text-xs font-bold group/link"
                          >
                            <Github className="w-4 h-4 text-gray-600 group-hover/link:text-white transition-colors" />
                            <span className="border-b border-transparent group-hover/link:border-white">
                              anujajay://repo/{activeProject.id}
                            </span>
                          </a>
                        </div>

                        {activeProject.liveUrl && (
                          <div className="space-y-1">
                            <span className="text-[9px] text-gray-500 uppercase font-black tracking-tighter">Remote_Deployment</span>
                            <a
                              href={activeProject.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-3 text-blue-400 hover:text-blue-200 transition-all text-xs font-bold group/link"
                            >
                              <ExternalLink className="w-4 h-4 text-blue-500 group-hover/link:text-blue-200 transition-colors" />
                              <span className="border-b border-transparent group-hover/link:border-blue-200">
                                execute https://{activeProject.liveUrl.replace("https://", "")}
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .terminal-glow {
          text-shadow: 0 0 5px rgba(59, 130, 246, 0.4);
        }
        .no-scrollbar-md::-webkit-scrollbar {
          display: block;
        }
        @media (min-width: 768px) {
          .no-scrollbar-md::-webkit-scrollbar {
            display: none;
          }
        }
        @keyframes flicker {
          0% { opacity: 0.015; }
          5% { opacity: 0.02; }
          10% { opacity: 0.01; }
          15% { opacity: 0.03; }
          25% { opacity: 0.015; }
          30% { opacity: 0.025; }
          100% { opacity: 0.015; }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>
    </div>
  );
}
```

Key behavioral changes vs. the original: typing interval dropped from 10ms to 4ms per character; clicking the terminal output area while typing (`onClick={handleSkipTyping}`) immediately completes the payload and shows a "click to skip" hint only while typing is in progress; `resolvedImageSrc` falls back to `getGithubBannerUrl(activeProject.repoUrl)` whenever `imagePath` is absent, and an `onError` handler on the `Image` flips `imageFailed` so a failed remote fetch (e.g. a private repo with no banner) falls through to the polished scanline placeholder instead of a broken image; `useCallback` (unused in the original) is dropped from the import list.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, scroll to `#mini-projects`.
Expected:
- `tools/` group now includes "chess-academy.bin"; `web/` group includes "maporia-sl.bin" and "jaysync-playground.bin" but no longer "jaysync-lab.bin" (it's featured now).
- Hover/click any mini project that has no `imagePath` (e.g. `nic-detail`, `chess-academy`) — after the manifest finishes typing, the asset panel shows a real GitHub-generated banner image instead of a blank box.
- Click a project, then immediately click inside the terminal output while it's still typing — the full manifest renders instantly and the "click to skip" hint disappears.
- Confirm typing feels noticeably faster than before even without clicking.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/TerminalOne.tsx next.config.ts
git rm src/lib/image-utils.ts
git commit -m "feat: add GitHub banner fallback and click-to-skip typing to Terminal One"
```

---

### Task 4: SEO — structured data, metadata keywords, sitemap date

**Files:**
- Create: `src/lib/structured-data.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Produces: `getPersonJsonLd(siteUrl: string)`, `getWebsiteJsonLd(siteUrl: string)` from `src/lib/structured-data.ts`, consumed only by `layout.tsx` in this task.

Implements spec §8 (JSON-LD, metadata keywords, sitemap date).

- [ ] **Step 1: Create the structured data helper**

Create `src/lib/structured-data.ts`:

```ts
export function getPersonJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anuja Jayasinghe",
    url: siteUrl,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/Anuja-jayasinghe",
      "https://linkedin.com/in/anuja-jayasinghe",
    ],
  };
}

export function getWebsiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Anuja Jayasinghe Portfolio",
    url: siteUrl,
  };
}
```

- [ ] **Step 2: Wire it into the root layout and refresh keywords**

In `src/app/layout.tsx`, add the import near the top:

```ts
import { getPersonJsonLd, getWebsiteJsonLd } from "@/lib/structured-data";
```

Update the `keywords` array inside `metadata`:

```ts
  keywords: [
    "Anuja Jayasinghe",
    "Software Engineer",
    "Portfolio",
    "Web Development",
    "Next.js",
    "React",
    "Flutter",
    "Dart",
    "Homelab",
    "Proxmox",
    "IoT",
  ],
```

Then compute the JSON-LD payload and render it in `<body>`, right before `{children}`:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [getPersonJsonLd(siteUrl), getWebsiteJsonLd(siteUrl)];

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${numans.variable} ${turretRoad.variable} font-sans antialiased bg-white text-black min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
        <GoToTopButton />
      </body>
    </html>
  );
}
```

`siteUrl` is already defined at module scope earlier in this file — no new variable needed. The JSON-LD payload is built entirely from static, hardcoded strings (no user input), so `dangerouslySetInnerHTML` here carries no injection risk.

- [ ] **Step 3: Bump the sitemap's last-modified date**

In `src/app/sitemap.ts`, update the date to match the day this ships (replace `2026-06-26` with the actual current date at implementation time — do not leave the old date):

```ts
  const siteLastModified = new Date("2026-07-25");
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Manual verification**

Run: `npm run build && npm run start` (structured data renders the same in dev, but confirming against a production build catches any SSR-only issues), then in another terminal:

```bash
curl -s http://localhost:3000/ | grep -o '"@type":"Person"'
curl -s http://localhost:3000/ | grep -o '"@type":"WebSite"'
curl -s http://localhost:3000/sitemap.xml | grep "2026-07-25"
```

Expected: each command prints a match. Stop the `next start` process afterward.

- [ ] **Step 6: Commit**

```bash
git add src/lib/structured-data.ts src/app/layout.tsx src/app/sitemap.ts
git commit -m "feat: add JSON-LD structured data, refresh keywords, bump sitemap date"
```

---

### Task 5: Compress existing project screenshots

**Files:**
- Create: `scripts/optimize-images.mjs`
- Modify: `package.json` / `package-lock.json` (add `sharp` devDependency)
- Modify (binary): `public/projects/payledger1.png`, `public/projects/solaredge1.png`, `public/projects/checkms1.png`, `public/projects/componentops1.png`

Implements spec §7's image-compression item. Reused going forward for every future project screenshot (spec explicitly calls this "the baseline for all future project screenshots too") — kept as a permanent script, not a throwaway one-off.

- [ ] **Step 1: Install sharp as a dev dependency**

Run: `npm install -D sharp`
Expected: `package.json` gains `"sharp"` under `devDependencies`; `package-lock.json` updates.

- [ ] **Step 2: Add the optimization script**

Create `scripts/optimize-images.mjs`:

```js
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");
const MAX_WIDTH = 1600;

async function main() {
  const files = (await readdir(PROJECTS_DIR)).filter((f) =>
    /\.(png|jpe?g)$/i.test(f)
  );

  for (const file of files) {
    const filePath = path.join(PROJECTS_DIR, file);
    const buffer = await sharp(filePath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toBuffer();
    await sharp(buffer).toFile(filePath);
    console.log(`optimized ${file}`);
  }
}

main();
```

- [ ] **Step 3: Run it and confirm the size reduction**

Run:
```bash
git stash -- public/projects  # safety: keep a copy of originals reachable via stash if the script misbehaves
git stash pop
node scripts/optimize-images.mjs
du -h public/projects/*.png
```

Expected: the script prints `optimized <file>` four times; `du -h` shows all four files noticeably smaller than the originals (208KB/536KB/228KB/648KB baseline). If any file looks visually degraded when opened, re-run with a higher `quality` value in the script and re-run.

- [ ] **Step 4: Visual sanity check**

Open each of the 4 files in an image viewer (or `npm run dev` and view them via the featured cards from Task 2) and confirm no visible quality loss.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json scripts/optimize-images.mjs public/projects/
git commit -m "perf: compress project screenshots and add reusable optimize-images script"
```

---

### Task 6: Optimize logo/favicon SVGs

**Files:**
- Modify (binary/text): `public/logo.svg`, `public/logo-black.svg`, `public/logo-white.svg`, `public/logo-black2.svg`, `public/logo-white2.svg`, `public/favicon.svg`

Implements spec §7's SVG-cleanup item. This is a one-off cleanup (logos rarely change), so it uses `npx` rather than adding a permanent dependency.

- [ ] **Step 1: Record current sizes for comparison**

Run: `ls -la public/*.svg`
Expected baseline (from earlier audit): `logo.svg` ~40K, `logo-black.svg` ~40K, `logo-white.svg` ~40K, `logo-black2.svg` ~104K, `logo-white2.svg` ~104K, `favicon.svg` ~40K.

- [ ] **Step 2: Optimize in place**

Run:
```bash
npx --yes svgo public/logo.svg public/logo-black.svg public/logo-white.svg public/logo-black2.svg public/logo-white2.svg public/favicon.svg
```

Expected: SVGO prints a per-file before/after size summary; it overwrites each file in place by default.

- [ ] **Step 3: Confirm size reduction and visual correctness**

Run: `ls -la public/*.svg`
Expected: all six files noticeably smaller than Step 1's baseline.

Then run `npm run dev` and visually check: the navbar logo (top of page), the footer logo, and the browser tab favicon all still render identically to before (SVGO can occasionally strip attributes a design relies on — if anything looks visually wrong, re-run SVGO with `--multipass=false` or exclude that specific file from the optimization and note it in the commit message).

- [ ] **Step 4: Commit**

```bash
git add public/logo.svg public/logo-black.svg public/logo-white.svg public/logo-black2.svg public/logo-white2.svg public/favicon.svg
git commit -m "perf: optimize logo and favicon SVGs with svgo"
```

---

### Task 7: Code-split Terminal One and ServerRack

**Files:**
- Modify: `src/components/sections/Portfolio.tsx`
- Modify: `src/components/sections/Skills.tsx`

**Interfaces:**
- Consumes: default exports of `TerminalOne` (`src/components/ui/TerminalOne.tsx`) and `ServerRack` (`src/components/ui/ServerRack.tsx`) — unchanged signatures, just loaded differently.

Implements spec §7's code-splitting item. Both `Portfolio.tsx` and `Skills.tsx` are Server Components (no `"use client"` directive), so `next/dynamic` is used **without** `ssr: false` — that option is only valid inside a Client Component boundary in the App Router. Omitting it still achieves the goal (a separate JS chunk not bundled into the initial page load) while keeping server-rendered HTML for first paint.

- [ ] **Step 1: Dynamically import TerminalOne in Portfolio.tsx**

In `src/components/sections/Portfolio.tsx`, replace:

```tsx
import projectsData from "../../data/projects.json";
import TerminalOne from "../ui/TerminalOne";
import PortfolioFeaturedCard from "./PortfolioFeaturedCard";
```

with:

```tsx
import dynamic from "next/dynamic";
import projectsData from "../../data/projects.json";
import PortfolioFeaturedCard from "./PortfolioFeaturedCard";

const TerminalOne = dynamic(() => import("../ui/TerminalOne"), {
  loading: () => (
    <div className="w-full max-w-[1200px] mx-auto h-[500px] rounded-lg bg-gray-100 border border-black/10 animate-pulse" />
  ),
});
```

The rest of `Portfolio.tsx` (the `<TerminalOne />` usage inside the JSX) is unchanged.

- [ ] **Step 2: Dynamically import ServerRack in Skills.tsx**

In `src/components/sections/Skills.tsx`, replace:

```tsx
import Image from "next/image";
import ServerRack from "../ui/ServerRack";
import { GitHubTimelineServer } from "./GitHubTimelineServer";
```

with:

```tsx
import Image from "next/image";
import dynamic from "next/dynamic";
import { GitHubTimelineServer } from "./GitHubTimelineServer";

const ServerRack = dynamic(() => import("../ui/ServerRack"), {
  loading: () => (
    <div className="w-full h-64 rounded-lg bg-gray-100 border border-black/10 animate-pulse" />
  ),
});
```

Leave the rest of the file (including wherever `<ServerRack />` is used in JSX) unchanged.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify the chunk split**

Run: `npm run build`
Expected: build succeeds; in the route summary output, the page bundle for `/` no longer inlines `TerminalOne`/`ServerRack` code directly — Next prints a First Load JS size for `/` that should be equal to or smaller than the pre-Task-7 baseline. (Capture the pre-change `npm run build` output before Task 7 if you want an exact before/after diff — not required to pass, just useful confirmation.)

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, load the homepage, scroll to the Portfolio and Skills sections.
Expected: both `TerminalOne` and the server-rack visualization still render and are interactive — briefly (usually imperceptibly on localhost) showing the pulse skeleton first is acceptable and expected.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Portfolio.tsx src/components/sections/Skills.tsx
git commit -m "perf: code-split TerminalOne and ServerRack via next/dynamic"
```

---

### Task 8: OG/Twitter image check and final sitewide verification

**Files:**
- Modify (if stale — see Step 1): `src/app/opengraph-image.png` and/or `src/app/twitter-image.tsx`

Implements spec §7's OG/Twitter-image correctness check, plus a final full-site regression pass across every change in this plan.

- [ ] **Step 1: Check the OG/Twitter images for staleness**

Run: `npm run dev`, then open `http://localhost:3000/opengraph-image.png` and `http://localhost:3000/twitter-image` directly in a browser tab.
Expected: both show current, accurate branding (name, tagline, no outdated project mentions or old favicon). If either is visibly stale (e.g. references old content, wrong colors), update it — since these are pre-existing generated/static assets unrelated to any other task in this plan, treat any needed fix here as its own small change: if `twitter-image.tsx` (a `next/og` `ImageResponse` generator, similar in shape to `src/app/icon.tsx`) needs a copy update, edit its JSX directly; if `opengraph-image.png` is a stale static file, it needs a fresh export from wherever it was originally designed (flag this to the user rather than guessing at new artwork — regenerating on-brand marketing imagery is outside an implementation plan's scope).
If both already look correct, skip straight to Step 2 with no changes.

- [ ] **Step 2: Full lint pass**

Run: `npm run lint`
Expected: the same baseline as before this plan started — 1 pre-existing error (`AnimatedLogo.tsx:21` `no-explicit-any`) and 2 pre-existing warnings (`Contact.tsx` unused `Terminal`/`Twitter` imports). The `TerminalOne.tsx` `useCallback` unused-import warning from the original baseline should be **gone** (Task 3 removed it). No new errors or warnings should appear anywhere else. If any do, fix them before proceeding.

- [ ] **Step 3: Full type-check and production build**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed with no errors.

- [ ] **Step 4: Full manual QA walkthrough**

Run: `npm run start` (serves the production build from Step 3), open `http://localhost:3000`, and walk through:
- All 5 featured project cards render correctly, alternating left/right, with correct links (Code/Live/Playground where applicable).
- Terminal One shows all mini projects in their correct groups, GitHub-banner fallback images load for projects without a custom screenshot, click-to-skip works, typing feels fast.
- `view-source:http://localhost:3000/` contains both `"@type":"Person"` and `"@type":"WebSite"` JSON-LD blocks.
- `http://localhost:3000/sitemap.xml` shows the updated date.
- Site looks correct at mobile (375px), tablet (768px), and desktop (1440px) widths — no horizontal scroll, no broken layouts.
- No console errors in the browser devtools console on page load or during interaction.

Stop the `next start` process when done.

- [ ] **Step 5: Commit (only if Step 1 required an OG/Twitter image fix)**

```bash
git add src/app/opengraph-image.png src/app/twitter-image.tsx
git commit -m "fix: update stale OG/Twitter preview image"
```

If Step 1 required no changes, there is nothing to commit for this task — the plan is complete as of Task 7's commit.

---

### Task 9: Introduce Vitest for pure-function unit tests

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/structured-data.test.ts`
- Create: `src/components/ui/terminal-one-helpers.test.ts`
- Modify: `src/components/ui/TerminalOne.tsx` (extract `getGithubBannerUrl` so it's importable by the test)
- Modify: `package.json` (add `vitest` devDependency + `test` script)

This repo has no test runner. A full component/DOM testing setup (Jest/RTL or Vitest + jsdom + Testing Library) is overkill for a single-page, mostly-presentational portfolio site — everything visual is already covered by the manual QA steps in Tasks 2, 3, and 8. But two pieces of logic in this plan are pure functions with real edge cases (URL parsing, JSON-LD shape) that are cheap to pin down with unit tests and easy to silently break in a later refactor. Scope is deliberately narrow: Vitest with no DOM environment, testing only those functions.

- [ ] **Step 1: Install Vitest**

Run: `npm install -D vitest`
Expected: `package.json` gains `"vitest"` under `devDependencies`.

- [ ] **Step 2: Add a minimal Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

`environment: "node"` (not `jsdom`) is deliberate — nothing under test touches the DOM.

- [ ] **Step 3: Extract `getGithubBannerUrl` so it's testable in isolation**

In `src/components/ui/TerminalOne.tsx`, the `getGithubBannerUrl` function (added in Task 3) currently lives inline in that file, which is fine for the component but awkward to unit-test alongside a `"use client"` component. Move it to a new file `src/components/ui/terminal-one-helpers.ts`:

```ts
export function getGithubBannerUrl(repoUrl: string): string | null {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!match) return null;
  const [, owner, repo] = match;
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}
```

In `TerminalOne.tsx`, delete the inline function definition and import it instead:

```ts
import { getGithubBannerUrl } from "./terminal-one-helpers";
```

- [ ] **Step 4: Write the unit tests**

Create `src/components/ui/terminal-one-helpers.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getGithubBannerUrl } from "./terminal-one-helpers";

describe("getGithubBannerUrl", () => {
  it("builds an opengraph.githubassets.com URL from a github.com repo URL", () => {
    expect(getGithubBannerUrl("https://github.com/Anuja-jayasinghe/HangMan")).toBe(
      "https://opengraph.githubassets.com/1/Anuja-jayasinghe/HangMan"
    );
  });

  it("returns null for a non-github URL", () => {
    expect(getGithubBannerUrl("https://gitlab.com/foo/bar")).toBeNull();
  });

  it("returns null for a malformed github URL with no repo segment", () => {
    expect(getGithubBannerUrl("https://github.com/foo")).toBeNull();
  });
});
```

Create `src/lib/structured-data.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getPersonJsonLd, getWebsiteJsonLd } from "./structured-data";

describe("getPersonJsonLd", () => {
  it("returns a schema.org Person with the given site URL", () => {
    const result = getPersonJsonLd("https://anujajay.com");
    expect(result["@type"]).toBe("Person");
    expect(result.url).toBe("https://anujajay.com");
  });
});

describe("getWebsiteJsonLd", () => {
  it("returns a schema.org WebSite with the given site URL", () => {
    const result = getWebsiteJsonLd("https://anujajay.com");
    expect(result["@type"]).toBe("WebSite");
    expect(result.url).toBe("https://anujajay.com");
  });
});
```

- [ ] **Step 5: Add the `test` script and run it**

In `package.json`, add under `"scripts"`:

```json
"test": "vitest run"
```

Run: `npm run test`
Expected: all 5 tests pass, no TypeScript errors reported by Vitest's esbuild transform.

- [ ] **Step 6: Type-check the whole repo again**

Run: `npx tsc --noEmit`
Expected: no errors (confirms the `TerminalOne.tsx` extraction in Step 3 didn't break anything).

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts package.json package-lock.json src/lib/structured-data.test.ts src/components/ui/terminal-one-helpers.ts src/components/ui/terminal-one-helpers.test.ts src/components/ui/TerminalOne.tsx
git commit -m "test: add Vitest and unit tests for pure helper functions"
```

---

## Outside this plan: user action items

These come from spec §9 and are **not** implementable as code — they're tracked here so nothing falls through the cracks, but no task above depends on them being done first:

- Make `check-management-system` public (or provide a different final URL) so the CheckMS "Code" link resolves instead of 404ing.
- Provide a JaySync-Lab screenshot for `public/projects/` and add it as that project's `media` entry in `projects.json` (currently ships with no image, per Global Constraints).
- Decide whether to open an issue on `JaySync-Lab/jaysync-lab-site` requesting an easy link from the docs site to the live playground.
- Confirm the Maporia SL repo URL if `MaporaSL_Mobile` isn't the preferred link.
- Supply additional gallery items (more images, video clips) for featured projects over time — Task 2's gallery UI already supports adding more `media` array entries with zero further code changes.
