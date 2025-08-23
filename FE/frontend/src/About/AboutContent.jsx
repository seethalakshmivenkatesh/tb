import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen  py-6 px-6 sm:px-10 lg:px-24 mt-8 font-serif">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#6b21a8] drop-shadow-lg mb-4">
          🎀 About Us 🎀
        </h1>
        <p className="text-[#5e3a6f] text-lg mb-12 leading-relaxed">
          Welcome to <span className="font-semibold text-[#ff69b4]">Shopping Time</span>, where style meets technology, and Creativity meet delivery.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto text-[#4b006e]">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-l-4 border-[#ff6ec7]">
          <h2 className="text-2xl font-bold mb-3">🧭 Our Magical Mission</h2>
          <p className="text-base leading-relaxed">
            We exist to bring a sprinkle of joy to your daily shopping. Whether it’s a dazzling gadget or a mythical deal, we make the extraordinary feel easy.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-l-4 border-[#a78bfa]">
          <h2 className="text-2xl font-bold mb-3">🧙 Who We Are</h2>
          <p className="text-base leading-relaxed">
            We're a team of tech-loving, style-hunting dreamers curating enchanted collections for curious minds and whimsical hearts.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-l-4 border-[#facc15]">
          <h2 className="text-2xl font-bold mb-3">🎠 Why Choose Us?</h2>
          <ul className="list-disc pl-5 space-y-2 text-base">
            <li>Unique finds and limited-edition releases with creativity.</li>
            <li>Easy returns with no hesitations.</li>
            <li>Lightning-fast delivery (we swear it's not magic).</li>
            <li>Real humans creativity behind every support ticket.</li>
          </ul>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-l-4 border-[#60a5fa]">
          <h2 className="text-2xl font-bold mb-3">🦄 Our Promise</h2>
          <p className="text-base leading-relaxed">
            We promise to keep the charm alive — delivering not just products, but moments of delight. From first glance to final checkout, we’re here to enchant you.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-[#6948a0] text-sm italic">
          Shopping Time — where shopping feels like a fairytale.
        </p>
      </div>
    </div>
  );
};

export default About;
