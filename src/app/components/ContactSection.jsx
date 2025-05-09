"use client";
import React, { useRef, useState } from "react";
import SocialIconsCircle from './SocialIconsHorizontal';

const ContactSection = () => {
  const formRef = useRef(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => {
      formRef.current.submit();
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-[calc(100vh-64px-60px)] px-4 text-white flex flex-col justify-center items-center relative"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">Let's Connect</h2>
        <p className="mb-8 text-gray-300">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>

        {/* Email Display */}
        <div className="mb-8">
          <a
            href="mailto:anujajayasinhe@gmail.com"
            className="text-xl text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            anujajayasinhe@gmail.com
          </a>
        </div>

        <form
          ref={formRef}
          action="https://formcarry.com/s/iA3YQgTg3b9"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6 text-left"
        >
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
              autoComplete="off"
              spellCheck="false"
              data-ms-editor="false"
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
      </div>

      <div className="flex flex-col gap-6 items-center mt-10">
        <SocialIconsCircle />
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
