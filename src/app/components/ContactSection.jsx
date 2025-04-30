'use client';
import React from 'react';

export default function ContactSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">Get In Touch</h2>
        <p className="text-center text-gray-400 mb-12">
          I'd love to hear from you! Whether you have a project, question, or just want to say hi.
        </p>

        <form
          action="https://formcarry.com/s/YOUR_FORM_ID"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-sm text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-gray-800 border border-gray-700 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-gray-800 border border-gray-700 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full bg-gray-800 border border-gray-700 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center space-y-3">
          <p>📧 <a href="mailto:anujajayasinhe@gmail.com" className="text-blue-400">anujajayasinhe@gmail.com</a></p>
          <div className="flex justify-center gap-4 mt-4 text-xl">
            <a href="https://linkedin.com/in/anuja-jayasinghe" target="_blank" rel="noreferrer">🔗 LinkedIn</a>
            <a href="https://twitter.com/anujajayasinhe" target="_blank" rel="noreferrer">🐦 Twitter</a>
            <a href="https://instagram.com/anu.ja_j" target="_blank" rel="noreferrer">📸 Instagram</a>
            <a href="https://discordapp.com/users/758840991691046933/" target="_blank" rel="noreferrer">💬 Discord</a>
            <a href="https://facebook.com/anuja.jayasinghe.75" target="_blank" rel="noreferrer">📘 Facebook</a>
          </div>
        </div>
      </div>
    </section>
  );
}
