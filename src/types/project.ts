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
