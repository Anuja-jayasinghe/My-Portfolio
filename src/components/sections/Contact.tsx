"use client";
import { useState, FormEvent } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Add Web3Forms access key
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
                setErrorMsg(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please check your connection and try again.");
        }
    }

    return (
        <section id="contact" className="py-16 sm:py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono mb-4 sm:mb-6 text-black">
                        Let&apos;s build something <span className="text-accent">extraordinary.</span>
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg px-2">
                        Have an interesting project, a hackathon idea, or just want to geek out over tech?
                        My inbox is always open.
                    </p>
                </div>

                {status === "success" ? (
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold font-mono text-black mb-3">Message sent!</h3>
                        <p className="text-gray-500 mb-8">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="bg-black text-white font-bold font-mono px-8 py-3 rounded hover:bg-accent transition-colors"
                        >
                            Send Another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                        {/* Honeypot for spam bots */}
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold font-mono text-black">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full bg-white border border-black/20 rounded px-4 py-3 text-black focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold font-mono text-black">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-white border border-black/20 rounded px-4 py-3 text-black focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-bold font-mono text-black">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                className="w-full bg-white border border-black/20 rounded px-4 py-3 text-black focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                                placeholder="What do you want to build?"
                            />
                        </div>

                        {status === "error" && (
                            <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-red-700 text-sm font-mono">
                                {errorMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full bg-black text-white font-bold font-mono py-4 rounded hover:bg-accent hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === "sending" ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
