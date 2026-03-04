export default function Hero() {
    return (
        <section id="home" className="min-h-[90vh] flex items-center pt-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl">
                    <h2 className="text-xl md:text-2xl font-mono text-accent mb-4">Hello, it&apos;s me</h2>
                    <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight mb-6 text-black">
                        Anuja Jayasinghe.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                        I build clean, purposeful solutions that solve real-world problems. Continuous learner.
                    </p>
                    <div className="flex gap-4">
                        <a href="#portfolio" className="bg-black text-white px-8 py-3 rounded hover:bg-accent hover:text-white transition-colors font-bold font-mono">
                            View Work
                        </a>
                        <a href="#contact" className="border border-black text-black px-8 py-3 rounded hover:border-accent hover:text-accent transition-colors font-bold font-mono">
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
