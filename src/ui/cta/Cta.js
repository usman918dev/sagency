"use client";
import React from "react";
import Button from "../btn/Button";

const CallToAction = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-30 bg-gradient-to-r from-[#1b2439] via-[#16213e] to-[#1b2439]
                 bg-fixed bg-center bg-cover "
    >
      {/* Overlay */}

      {/* Content Box */}
<div
  className="relative z-10 px-6 py-24 text-center overflow-hidden"
>
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-fixed bg-center bg-cover"
    style={{ backgroundImage: "url('/assets/bgg.png')" }}
  ></div>

  {/* Overlay ONLY on the image */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#1c2131]/70 via-[#1c2131]/60 to-[#1c2131]/70"></div>

  {/* Content */}
  <div className="relative z-10">
    <p className="text-orange-400 text-md font-extrabold uppercase tracking-wider mb-4">
      Have You Project In Mind?
    </p>
    <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8">
      Let&apos;s Make Something Great <br />
      Together!
    </h2>
    <Button text={"Contact Us"} />
  </div>
</div>

    </section>
  );
};

export default CallToAction;

export const CallToActionS = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-fixed bg-center bg-cover bg-[#08375D] rounded-tr-[200px] rounded-bl-[200px]"
    // style={{ backgroundImage: "url('/assets/nggg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

      {/* Top-Right Corner Fill */}
      <div className="absolute top-0 right-0 w-[220px] h-[220px] bg-orange-500 rounded-tr-[200px] z-10"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}>
      </div>

      {/* Bottom-Left Corner Fill */}
      <div className="absolute bottom-0 left-0 w-[220px] h-[220px] bg-orange-500 rounded-bl-[200px] z-10"
        style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}>
      </div>


      {/* Content Box */}
      <div className="relative z-20 px-6 py-24 text-center">
        <p className="text-orange-400 text-md font-extrabold uppercase tracking-wider mb-4">
          Ready to Take the Next Step?
        </p>

        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Let’s Build Your Vision <br />
          {/* Into Reality */}
        </h2>

        <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
          Whether it’s a website, a product, or a complete brand transformation,
          we’re here to bring your ideas to life with creativity and precision.
        </p>

        <Button text={"Start Your Project"} />
      </div>
    </section>

  );
};