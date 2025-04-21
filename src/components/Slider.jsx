import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Slider = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const slider = document.querySelector(".slider");
      const slides = gsap.utils.toArray(".slide");

      const sliderTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: slider,
          pin: true,
          scrub: 1,
          end: () => "+=" + slider.offsetWidth,
        },
      });

      sliderTl
        .to(slider, { xPercent: -66.8 }, "<")
        .to(".progress", { width: "100%" }, "<");

      slides.forEach((slide) => {
        const slideText = new SplitType(slide.querySelector(".slide-p"), {
          types: "chars",
        });
        sliderTl.from(slideText.chars, {
          opacity: 0,
          y: 10,
          stagger: 0.03,
          scrollTrigger: {
            trigger: slide.querySelector(".slide-p"),
            start: "top bottom",
            end: "bottom center",
            containerAnimation: sliderTl,
            scrub: true,
          },
        });
      });
    });
  }, []);

  return (
    <div className="no-overflow overflow-hidden relative">
      <section className="slider flex w-[300vw]">
        <div
          className="slide w-screen h-screen bg-cover bg-no-repeat flex "
          style={{ backgroundImage: "url('/images/slide1.jpg')" }}
        >
          <div className="inner w-full p-4 md:p-20">
            <p className="slide-p text-[clamp(1.2rem,2vw,2.5rem)] text-white">
              This stunning new necklace from Elegance Collection features a
              radiant sapphire centerpiece, encircled by a halo of ethereal
              diamonds, making it a breathtaking addition to any attire.
            </p>
          </div>
        </div>
        <div
          className="slide w-screen h-screen bg-cover bg-no-repeat flex "
          style={{ backgroundImage: "url('/images/slide2.jpg')" }}
        >
          <div className="inner w-full p-4 md:p-20">
            <p className="slide-p font-normal text-[clamp(1.2rem,2vw,2.5rem)] text-black">
              This stunning new necklace from Elegance Collection features a
              radiant sapphire centerpiece, encircled by a halo of ethereal
              diamonds, making it a breathtaking addition to any attire.
            </p>
          </div>
        </div>
        <div
          className="slide w-screen h-screen bg-cover bg-no-repeat flex"
          style={{ backgroundImage: "url('/images/slide3.jpg')" }}
        >
          <div className="inner w-full p-4 md:p-20">
            <p className="slide-p text-[clamp(1.2rem,2vw,2.5rem)] text-white">
              This stunning new necklace from Elegance Collection features a
              radiant sapphire centerpiece, encircled by a halo of ethereal
              diamonds, making it a breathtaking addition to any attire.
            </p>
          </div>
        </div>
        <div className="progress absolute top-[80%] left-0 h-[1px] border-b border-white"></div>
      </section>
    </div>
  );
};

export default Slider;
