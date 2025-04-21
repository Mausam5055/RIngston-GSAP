import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);
  const headingRef = useRef(null);
  const ctaTextRef = useRef(null);
  const descRef = useRef(null);

  useGSAP(() => {
    // Set initial states
    gsap.set([headingRef.current, ctaTextRef.current], {
      yPercent: 100,
    });

    gsap.set(descRef.current, {
      opacity: 0,
    });

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        end: "+=400",
        scrub: true,
        markers: false,
      },
    });

    contactTl
      .to([lineTopRef.current, lineBottomRef.current], {
        width: "100%",
      })
      .to(
        [headingRef.current, ctaTextRef.current],
        {
          yPercent: 0,
        },
        0
      )
      .to(
        descRef.current,
        {
          opacity: 1,
        },
        0
      );
  }, []);

  return (
    <section className="contact bg-[#0F0F0D] h-[130vh] grid text-white content-center">
      <div ref={contactRef} className="inner-contact relative">
        <div
          ref={lineTopRef}
          className="line-top absolute top-0  left-0 w-0 h-px border-b border-[#393939]"
        ></div>
        <div className="px-4  py-4  pb-8 sm:px-8 md:px-16 lg:px-24">
          <div className="mask overflow-hidden">
            <h4 ref={headingRef} className="text-[clamp(2rem,4vw,5rem)] m-0">
              Reserve yours today.
            </h4>
          </div>
          <a
            href="#"
            className="cta bg-white inline-block p-4 rounded-full font-semibold text-[clamp(1rem,2vw,1.3rem)] my-5 md:my-6 text-black"
          >
            <div className="mask overflow-hidden">
              <span ref={ctaTextRef} className="block">
                Put me on the list
              </span>
            </div>
          </a>
          <p ref={descRef} className="contact-desc text-lg m-0 md:w-2/5">
            Due to the overwhelming demand for our latest luxury ring
            collection, we've initiated an exclusive waitlist for eager
            customers, ensuring you'll be among the first to experience the
            elegance and craftsmanship of this exquisite piece as soon as it
            becomes available.
          </p>
        </div>
        <div
          ref={lineBottomRef}
          className="line-bottom absolute bottom-0 left-0 w-0  h-px border-b border-[#393939]"
        ></div>
      </div>
    </section>
  );
};

export default Contact;
