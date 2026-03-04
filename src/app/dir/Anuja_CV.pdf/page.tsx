import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Anuja Jayasinghe | Resume",
    description: "Download or view the resume of Anuja Jayasinghe.",
    icons: [
        {
            media: "(prefers-color-scheme: light)",
            url: "/logo-black.svg",
            href: "/logo-black.svg",
            type: "image/svg+xml",
        },
        {
            media: "(prefers-color-scheme: dark)",
            url: "/logo-white.svg",
            href: "/logo-white.svg",
            type: "image/svg+xml",
        },
    ],
};

export default function ResumeRenderer() {
    return (
        <div style={{ margin: 0, padding: 0, height: "100vh", overflow: "hidden", backgroundColor: "white" }}>
            <iframe
                src="/Anuja_CV.pdf#toolbar=0"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Anuja Jayasinghe Resume"
            />
        </div>
    );
}
