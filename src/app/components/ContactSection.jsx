"use client";
import React, { useRef, useState } from "react";

const ContactSection = () => {
  const formRef = useRef(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowThankYou(true);

    // Submit the form after a short delay
    setTimeout(() => {
      formRef.current.submit();
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 text-white relative">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">Let's Connect</h2>
        <p className="mb-8 text-gray-300">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>

        <form
          ref={formRef}
          action="https://formcarry.com/s/iA3YQgTg3b9"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6 text-left"
        >
          {/* 👇 Updated to redirect to your /thank-you page */}
          <input type="hidden" name="_redirect" value="https://anujajay.com/thank-you" />

          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 flex justify-center space-x-6 text-xl">
          <a href="https://linkedin.com/in/anuja-jayasinghe" target="_blank" className="hover:text-blue-400">LinkedIn</a>
          <a href="mailto:anujajayasinhe@gmail.com" className="hover:text-blue-400">Email</a>
          <a href="https://twitter.com/anujajayasinhe" target="_blank" className="hover:text-blue-400">Twitter</a>
          <a href="https://instagram.com/anu.ja_j" target="_blank" className="hover:text-pink-500">Instagram</a>
          <a href="https://discordapp.com/users/758840991691046933/" target="_blank" className="hover:text-indigo-400">Discord</a>
          <a href="https://www.facebook.com/anuja.jayasinghe.75" target="_blank" className="hover:text-blue-600">Facebook</a>
        </div>
      </div>

      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center border border-blue-500">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">Thank you!</h3>
            <p className="text-gray-300">Redirecting...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
