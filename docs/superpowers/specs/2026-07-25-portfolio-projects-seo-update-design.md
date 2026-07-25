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

`src/data/projects.json` entries (and the `Project` interface duplicated in
`PortfolioFeaturedCard.tsx` and `TerminalOne.tsx`) gain two new optional
fields:

```ts
interface Project {
  id: string;
  title: string;
  type: "featured" | "mini";
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  imagePath?: string;
  videoPath?: string;                              // NEW
  secondaryLink?: { label: string; url: string };   // NEW
}
```

- `videoPath` — if present, the featured card renders a muted, looped,
  autoplay `<video>` in place of the static image. If absent, behavior is
  unchanged (falls back to `imagePath`, then the existing "[No Image]"
  state). This applies to **all** featured cards, not just JaySync-Lab — a
  static screenshot isn't enough to represent this level of work, and every
  featured project should eventually get a short video intro. No video
  assets are produced in this round — this is schema + component support
  only, so videos can be dropped in later per project without further code
  changes.
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
   - `imagePath`: to be supplied by the user before ship; component already
     falls back gracefully if absent.

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

## 7. SEO layer

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

## 8. Action items for the user (outside this codebase)

- Make `check-management-system` public (or confirm a different final URL)
  so the CheckMS GitHub link resolves.
- Provide a JaySync-Lab screenshot for `public/projects/`.
- Confirm whether to open an issue on `JaySync-Lab/jaysync-lab-site`
  requesting a direct, easy link from the docs site to the live playground
  — this should be confirmed explicitly during plan execution, not done
  silently.
- Confirm the Maporia SL repo URL to link if `MaporaSL_Mobile` isn't the
  preferred one.
- Supply video clips for all 5 featured projects at some point after this
  ships (schema/component will already support them).

## 9. Explicitly out of scope

- Producing actual video assets for featured projects (schema/component
  support only).
- Splitting Maporia SL into two separate project cards.
- Featuring Medicare-Project or DueMate.
- Any new routed pages / sitemap URLs.
