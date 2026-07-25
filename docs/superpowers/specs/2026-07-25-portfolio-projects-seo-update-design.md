# Portfolio Projects & SEO Update — Design

Date: 2026-07-25
Status: Approved (pending final user sign-off on written spec)

## 1. Background

`src/data/projects.json` and the featured/mini project sections have drifted
from the actual GitHub account. A GitHub audit (via `gh api`, covering both
the personal account and the `MaporiaSL` / `JaySync-Lab` orgs) found:

- **A broken link**: the featured CheckMS card links to
  `github.com/Anuja-jayasinghe/CheckMS`, which does not exist. The real repo
  is `check-management-system` and is currently private.
- **Stale copy**: SolarEdge Analytics' GitHub description now mentions
  Clerk-based auth; the site copy doesn't reflect that.
- **Missing projects**: several real, shippable projects exist on GitHub with
  no presence on the site (Maporia SL, JaySync-Lab's docs site + hardware
  playground, ChessAcademySystem_Java).
- **Terminal One UX gaps**: most mini projects have no screenshot (renders a
  blank placeholder), and the typewriter animation has no skip control.
- **No SEO structured data**: zero JSON-LD on the site; generic keyword list.

This spec covers the full content refresh and the associated SEO and UX
fixes needed to ship it at a professional-grade bar.

## 2. Data schema changes

A static screenshot isn't enough to represent this level of work. Featured
projects move from a single `imagePath` to an ordered **media gallery** that
can mix images and videos, browsable via a thumbnail strip / prev-next
controls on the card. Mini projects (Terminal One) keep the existing
single-asset model — a gallery UI doesn't fit that hover/click panel, and
`imagePath` there already gets the GitHub-banner fallback (§6.1).

```ts
interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;   // video only — still frame shown before playback/load
  alt: string;
}

interface Project {
  id: string;
  title: string;
  type: "featured" | "mini";
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  imagePath?: string;                                // mini projects only
  media?: MediaItem[];                                // NEW — featured projects
  secondaryLink?: { label: string; url: string };     // NEW
}
```

- `media` — ordered list of gallery items for a featured card. First item is
  shown by default. Videos render muted/looped/autoplay/`playsInline` with
  `preload="metadata"` and their `poster` frame shown immediately (no
  waiting on video download for first paint); images render via `next/image`
  with a `sizes` attribute tuned to the card's actual rendered width at each
  breakpoint, so the browser fetches an appropriately-sized file rather than
  the full source. If a project has only one media item, the card renders it
  without gallery controls (no dead UI for the common case). If `media` is
  absent, the card falls back to the existing "[No Image]" state.
- At ship time, every featured project gets a `media` array with exactly one
  image item (the existing screenshots, reshaped into the new format) —
  the gallery UI is built and ready, but multi-item galleries and video
  clips are populated by the user afterward, project by project.
- `secondaryLink` — renders as a third icon/button on featured cards
  (alongside the existing Code/Live icons), for projects that have more than
  one meaningful destination. Generic and reusable, not JaySync-Lab-specific.

## 3. Featured projects (5, display order preserved as listed)

1. **PayLedger** — unchanged.
2. **SolarEdge Analytics** — description updated to mention Clerk-based
   auth, matching the current GitHub description.
3. **CheckMS** — `repoUrl` corrected to
   `https://github.com/Anuja-jayasinghe/check-management-system`. This link
   only resolves once the user makes that repo public (see Action Items).
   Live link (`checkms.anujajay.com`) unaffected.
4. **ComponentOps** — unchanged.
5. **JaySync-Lab** *(new, promoted from mini)*:
   - `liveUrl`: `https://jaysynclab.com` (docs site — primary CTA)
   - `repoUrl`: `https://github.com/JaySync-Lab/JaySync-Lab`
   - `secondaryLink`: `{ label: "Playground", url: "https://jslnode.jaysynclab.com" }`
   - Description covers the homelab (Proxmox, Docker, Tailscale, Pi-hole,
     Jellyfin, ArrStack) and calls out that visitors can interact with real
     hardware via the playground.
   - `media`: single-image item to be supplied by the user before ship; the
     card already falls back gracefully if absent.

## 4. Mini projects ("Terminal One")

Additions to `groupedProjects` in `TerminalOne.tsx`:

- **ChessAcademySystem_Java** → `tools/` group. Java console app (auth,
  persistence, role-based access). `repoUrl`:
  `https://github.com/Anuja-jayasinghe/ChessAcademySystem_Java`.
- **Maporia SL** → `web/` group, single consolidated card (not split into
  mobile + marketing entries). `repoUrl`:
  `https://github.com/MaporiaSL/MaporaSL_Mobile` (primary product repo),
  `liveUrl`: `https://maporiasl.com`. Description mentions it's a gamified
  travel app + companion marketing site.
- **jaysync-lab-playground** → `web/` group, own card. `repoUrl`:
  `https://github.com/JaySync-Lab/jaysync-lab-playground`, `liveUrl`:
  `https://jslnode.jaysynclab.com`.

Removal: `jaysync-lab` id removed from the `WEB_IDS` list (superseded by the
featured card).

## 5. Excluded projects

Not added to the site, with reasoning:

- **Medicare-Project** — dropped per user decision.
- **DueMate** — empty scaffold (0 bytes, no commits), dropped per user
  decision.
- **DrawIo_Projects** — just diagram source files, not a shippable project.
- **official-website** — ambiguous/likely superseded, excluded.
- All forks, the profile-readme repo, and private scaffolding repos
  (`meter-automation`, `a2a-ballerina`, `demo-repository`,
  `Documentation-vault-`, `Ballerina-A2A-Protocol`,
  `Google-Colab-projects`, `AcyclicityChecker`, `CEB-photo-library`,
  `form-manegement`) — not public-facing project work.

## 6. Terminal One UX fixes

### 6.1 Asset fallback
For any mini project without a custom `imagePath`, default the rendered
image to GitHub's auto-generated repo social-preview banner:

```
https://opengraph.githubassets.com/1/{owner}/{repo}
```

`{owner}/{repo}` derived by parsing `repoUrl`. This requires no manual
asset work and applies automatically to all current and future mini
projects that lack a screenshot. A custom `imagePath`, when present,
still takes priority over the GitHub banner.

Requires adding `opengraph.githubassets.com` to `images.remotePatterns` in
`next.config.ts` (currently only `cdn.jsdelivr.net` is allowlisted) —
otherwise `next/image` rejects the remote URL at request time.

Additionally, polish the true-empty-state (banner fails to load, e.g. a
private repo) into an intentional terminal-styled placeholder, replacing
the current plain "[Null_Asset_Record]" box with something more designed
(e.g. an ASCII/scanline pattern consistent with the CRT aesthetic already
used elsewhere in `TerminalOne.tsx`).

### 6.2 Typing animation
- **Click-to-skip**: clicking the terminal output area while `isTyping` is
  true immediately renders the full `payload` and clears the typing
  interval, matching the standard terminal/visual-novel skip pattern.
- **Faster base pace**: reduce the per-character interval from the current
  10ms step so the default (non-skipped) animation resolves noticeably
  faster, especially for longer manifests.

## 7. Sitewide performance optimization

The user asked for this to cover the *entire* site, not just the new project
media, so it's audited as a distinct pass. Current-state findings (via
direct inspection):

- Four existing project screenshots are large source PNGs (208KB–648KB).
  `next/image` re-encodes to AVIF/WebP and resizes per-request, but a
  smaller, properly-compressed source still reduces origin bandwidth and
  the worst-case first-load size before the optimizer cache is warm.
- No component on the site uses `next/dynamic` — everything, including
  heavy below-the-fold interactive pieces (`TerminalOne`'s CRT/typewriter
  effects, `ServerRack`), ships in the initial JS bundle even though users
  may never scroll to them.
- The logo SVGs are unusually heavy for "signature-style text" assets
  (`logo-black2.svg` / `logo-white2.svg` at 104KB each, others at ~40KB) —
  almost certainly unoptimized editor exports (embedded metadata, excess
  path precision) rather than genuinely complex artwork.
- `next/font/google` is already in use for both typefaces (self-hosted,
  subsetted automatically by Next) — this is already best-practice, no
  change needed.

Planned work:

- **Image compression**: re-export the 4 existing project screenshots at
  reasonable dimensions/compression before committing new ones alongside
  them (this becomes the baseline for all future project screenshots too).
- **Responsive `sizes`**: audit every `next/image` usage (featured cards,
  Terminal One, gallery items) and set a `sizes` attribute matching the
  actual rendered width at each breakpoint, so the browser/CDN never
  fetches a desktop-sized file on mobile.
- **Video delivery discipline**: compressed H.264 mp4 (short clips), always
  paired with a `poster` image, `preload="metadata"`, and mounted only when
  the containing card is in/near the viewport (avoid N autoplaying videos
  loading simultaneously on initial page load).
- **Code-splitting**: dynamically import `TerminalOne` (and any other
  heavy, below-the-fold, non-critical-for-LCP component) via `next/dynamic`
  so its JS isn't part of the initial bundle for a visitor who never
  scrolls that far.
- **SVG cleanup**: run the logo SVGs through an optimizer (SVGO) to strip
  editor cruft and reduce file size — same visual output, faster fetch.
- **Lazy-loading consistency**: confirm every below-the-fold image
  explicitly uses `loading="lazy"` (already true in some places) and that
  only genuinely above-the-fold assets are eager/`priority`.
- **OG/Twitter image check**: verify `opengraph-image.png` /
  `twitter-image.tsx` still reflect current branding/content — quick
  correctness check, not a redesign.

Out of scope for this pass: CDN/hosting migration, font strategy changes
(already optimal), and any framework/build-tool changes.

## 8. SEO layer

- **JSON-LD structured data**: add `Person` schema (name, jobTitle, url,
  sameAs → GitHub + LinkedIn profile URLs) and `WebSite` schema, rendered on
  the home page (`src/app/page.tsx` or `layout.tsx`, via a `<script
  type="application/ld+json">` tag). This is currently entirely absent from
  the site.
- **Metadata refresh** (`src/app/layout.tsx`): expand the `keywords` array
  to include Flutter, Dart, Homelab, Proxmox, IoT alongside the existing
  terms, reflecting the newly added project domains.
- **Sitemap** (`src/app/sitemap.ts`): bump `siteLastModified` to the ship
  date, per the file's existing convention (only changes when content
  actually changes, to avoid unnecessary recrawls).
- **Out of scope**: no new sitemap URLs — the site remains a single page
  with no per-project routes, so no additional sitemap entries are needed.

## 9. Action items for the user (outside this codebase)

- Make `check-management-system` public (or confirm a different final URL)
  so the CheckMS GitHub link resolves.
- Provide a JaySync-Lab screenshot for `public/projects/`.
- Confirm whether to open an issue on `JaySync-Lab/jaysync-lab-site`
  requesting a direct, easy link from the docs site to the live playground
  — this should be confirmed explicitly during plan execution, not done
  silently.
- Confirm the Maporia SL repo URL to link if `MaporaSL_Mobile` isn't the
  preferred one.
- Supply additional gallery items (more images, video clips) for featured
  projects at some point after this ships — the gallery UI and schema will
  already support them, one item at a time, no further code changes needed.

## 10. Explicitly out of scope

- Producing actual video assets or additional gallery images for featured
  projects (schema/component support only — ships with one image per
  project).
- Device-specific image crops (mobile vs. desktop) — one crop, scaled
  responsively.
- Splitting Maporia SL into two separate project cards.
- Featuring Medicare-Project or DueMate.
- Any new routed pages / sitemap URLs.
- CDN/hosting migration, font-loading strategy changes, build-tool changes.
