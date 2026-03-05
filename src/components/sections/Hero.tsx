export default function Hero() {
    return (
        <section id="home" className="min-h-[90vh] flex items-center pt-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-5xl">
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-mono text-accent mb-4 sm:mb-6">Hello, it&apos;s me</h2>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-sans tracking-tight mb-6 sm:mb-8 text-black leading-tight">
                        Anuja Jayasinghe.
                    </h1>
                    <p className="text-lg sm:text-2xl md:text-3xl text-gray-600 mb-8 sm:mb-12 max-w-3xl leading-relaxed">
                        I build clean, purposeful solutions that solve real-world problems. Continuous learner.
                    </p>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        <a href="#portfolio" className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded hover:bg-accent hover:text-white transition-colors font-bold font-mono">
                            View Work
                        </a>
                        <a href="/dir/Anuja_CV.pdf" target="_blank" rel="noopener noreferrer" className="border border-black text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded hover:border-accent hover:text-accent transition-colors font-bold font-mono">
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
