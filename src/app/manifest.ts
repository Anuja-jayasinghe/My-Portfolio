import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anuja Jayasinghe Portfolio",
    short_name: "AnujaJay",
    description:
      "Personal portfolio of Anuja Jayasinghe, a software engineer focused on building impactful digital experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000075",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
