import React, { useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import RingBoxCanvas from "./RingBox/RingBoxCanvas";
import RingBoxCanvas2 from "./RingBoxCanvas2";

const Hero = () => {
  const textRef = useRef(null);
  const words = ["Romance", "Rings", "Relationships"];
  let currentIndex = 0;
  useGSAP(() => {
    let split;

    function animateWord() {
      if (textRef.current) {
        textRef.current.textContent = words[currentIndex];
        split = new SplitType(textRef.current, { type: "chars" });

        // Immediately set the starting state so the text isn't visible yet
        gsap.set(split.chars, { yPercent: 100, opacity: 1 });

        // Animate characters in (staggered)
        gsap.to(split.chars, {
          yPercent: 0,
          stagger: 0.03,
          duration: 1.5,
          ease: "power4.out",
          onComplete: () => {
            // Hold the word on screen for 2 seconds, then animate it out
            gsap.delayedCall(1, () => {
              gsap.to(split.chars, {
                opacity: 0,
                duration: 0,
                ease: "power4.in",
                onComplete: () => {
                  split.revert();
                  // Move to the next word
                  currentIndex = (currentIndex + 1) % words.length;
                  animateWord();
                },
              });
            });
          },
        });
      }
    }

    animateWord();

    return () => {
      if (split) split.revert();
    };
  }, []);

  return (
    <main className="hero h-screen">
      <div className="flex md:flex-row flex-col h-full">
        <div className="left self-end flex flex-1 h-[90vh] px-4 sm:px-8 md:px-16 lg:px-24 pb-[46px]">
          <h1 className="self-end font-light text-[clamp(3rem,7vw,11rem)] mb-4">
            <div className="mask overflow-hidden primary-h1">
              <span ref={textRef}></span>
            </div>
            <div className="mask overflow-hidden">Redefined</div>
          </h1>
        </div>
        <div className="right h-screen flex-[0.65] hidden md:block relative pointer-events-none overflow-hidden">
          <div className="vid-overlay absolute z-[0] top-0 left-0 w-full h-full opacity-50 bg-blue-600"></div>
          <RingBoxCanvas />
        </div>
      </div>
    </main>
  );
};

export default Hero;
