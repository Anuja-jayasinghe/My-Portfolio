import type { Metadata } from "next";

export function generateMetadata(): Metadata {
    return {
        title: "Resume",
        description: "Download or view the resume of Anuja Jayasinghe.",
        alternates: {
            canonical: "/dir/Anuja_CV.pdf",
        },
    };
}

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
