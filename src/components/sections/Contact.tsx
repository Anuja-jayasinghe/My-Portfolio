export default function Contact() {
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

                <form className="max-w-2xl mx-auto space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-bold font-mono text-black">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-white border border-black/20 rounded px-4 py-3 text-black focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold font-mono text-black">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-white border border-black/20 rounded px-4 py-3 text-black focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-bold font-mono text-black">Message</label>
                        <textarea
                            id="message"
                            rows={5}
                            className="w-full bg-white border border-black/20 rounded px-4 py-3 text-black focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                            placeholder="What do you want to build?"
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full bg-black text-white font-bold font-mono py-4 rounded hover:bg-accent hover:text-white transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
