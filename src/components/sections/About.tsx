export default function About() {
    return (
        <section id="about" className="py-24 bg-gray-50 border-y border-black/5">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 flex items-center gap-4 text-black">
                    <span className="text-accent">01.</span> The Real Me
                </h2>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold font-mono text-black border-b border-black/10 pb-2">General</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            I’m a Computer Science undergrad hooked on technology since childhood. I love architecting clean, purposeful solutions that solve real-world problems. I prioritize clean code, proper formatting, and modern execution in everything I build.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold font-mono text-black border-b border-black/10 pb-2">For Recruiters</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            I’m a highly adaptable developer who thrives on the &apos;learn by doing&apos; approach. Adept at full-stack development, with a strong interest in exploring new fields like ML and IoT. I consistently deliver disciplined, reliable, and scalable work that gets straight to the point.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold font-mono text-black border-b border-black/10 pb-2">For Developers/Peers</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            I’m an engineer who values readable code, solid formatting, and robust architectures. I&apos;m always open to collaborating on interesting projects, tackling hackathons, or geeking out over new tools and automation. Hit me up if you want to build something cool!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
