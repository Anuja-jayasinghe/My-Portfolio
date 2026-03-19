import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6">
      <div className="w-full max-w-2xl border border-black/10 rounded-2xl p-8 sm:p-12 shadow-sm">
        <p className="font-mono text-xs tracking-[0.2em] text-accent mb-4">ERROR::404</p>
        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          This route does not exist.
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          The page may have moved, been removed, or the URL may be incorrect.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded font-mono font-bold hover:bg-accent transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="border border-black px-6 py-3 rounded font-mono font-bold hover:border-accent hover:text-accent transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </main>
  );
}
