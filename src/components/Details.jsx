import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const ringBgRef = useRef(null);
  const marqueeRef = useRef(null);

  useGSAP(() => {
    const inspectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom 50%",
        scrub: true,
        markers: false,
      },
    });

    inspectionTl
      .from(titleRef.current, {
        yPercent: 100,
      })
      .from(
        ringBgRef.current,
        {
          yPercent: 50,
        },
        "<"
      );

    gsap.to(marqueeRef.current, {
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: "top bottom",
        end: "bottom 20%",
        scrub: true,
      },
      x: 200,
    });
  }, []);

  return (
    <section className="details flex flex-col h-screen mb-0 md:mb-0 justify-end ">
      <div
        ref={sectionRef}
        className="inspection text-center md:flex md:items-center md:gap-8 md:max-w-screen-xl md:mx-auto px-4 sm:px-8 md:px-16 lg:px-24"
      >
        <h2
          ref={titleRef}
          className="text-[clamp(5rem,6vw,8rem)] m-0 md:flex-[0.3]"
        >
          68
        </h2>
        <div
          ref={ringBgRef}
          className="ring-bg bg-black bg-[url('/images/rings.jpg')] bg-no-repeat bg-cover py-12 text-white font-bold rounded md:flex-1 md:h-[350px] md:grid md:place-content-center"
        >
          <p className="md:text-center">Point Inspection</p>
        </div>
        <p className="md:flex-1 md:text-left">
          Our 68-point inspection at Ringston meticulously examines every aspect
          of the jewelry, from clasp strength to gemstone clarity, guaranteeing
          unparalleled quality in every piece.
        </p>
      </div>
      <div className="mask  marquee overflow-hidden">
        <h3
          ref={marqueeRef}
          className="text-[clamp(7rem,17vw,23rem)] m-0 text-[#F5F5F5]"
        >
          precision
        </h3>
      </div>
    </section>
  );
};

export default Details;
