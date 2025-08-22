import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen  py-16 px-4 sm:px-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-3xl p-8 space-y-6 border border-purple-100">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 drop-shadow-md">
            Contact Us 🎀
          </h2>
          <p className="text-gray-700">
            We'd love to hear from you! Whether you have a question, a suggestion, or just want to say hi — reach out!
          </p>
          <div className="space-y-3 text-sm text-gray-800">
            <p><strong>Email:</strong>ShoppingTime@gmail.com</p>
            <p><strong>Phone:</strong> +91 123 456 789</p>
            <p><strong>Address:</strong> 2701 Red Street, Chennai, India</p>
          </div>
          <div className="pt-4">
            <p className="text-purple-600 text-xs italic">We typically respond within 24 hours 🌙</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-pink-200 shadow-2xl rounded-3xl p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Charmy Name"
                required />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Fairytail@gmail.com"
                required />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Write something with ur creativity 📝"
                required>
              </textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-pink-400 text-white rounded-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300">
              Send Message 🎀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
