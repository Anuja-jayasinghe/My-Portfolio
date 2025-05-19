"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000); // redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-center px-4 text-white">
      <h1 className="text-4xl font-bold mb-2">🎉 Thank you!</h1>
      <p className="text-lg mb-1">Your message has been sent.</p>
      <p className="text-sm opacity-80">Redirecting to homepage...</p>
    </div>
  );
} 