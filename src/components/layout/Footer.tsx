export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-black/10 py-10 text-center mt-auto font-mono">
            <p className="text-sm text-gray-600 font-bold">
                © {new Date().getFullYear()} Anuja Jayasinghe.
            </p>
        </footer>
    );
}
