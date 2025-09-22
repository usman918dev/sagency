"use client";
import React from "react";
import Button from "../btn/Button";

const CallToAction = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-60
                 bg-fixed bg-center bg-cover rounded-tr-[200px] rounded-bl-[200px]"
    //   style={{ backgroundImage: "url('/assets/bg.png')" }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/10"></div> */}

      {/* Content Box */}
      <div
        className="relative z-10 px-6 py-24 text-center 
                   rounded-tr-[200px] rounded-bl-[200px] bg-gradient-to-tr from-[#F25725] via-[#F25725] to-[#333] 
                    "
      >
        <p className="text-orange-400 text-md font-extrabold uppercase tracking-wider mb-4">
          Have You Project In Mind?
        </p>
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8">
          Let's Make Something Great <br />
          Together!
        </h2>
        <Button text={"Contact Us"} />
      </div>
    </section>
  );
};

export default CallToAction;
