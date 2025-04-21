import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const useLenisGsap = () => {
  const lenisRef = useRef<Lenis>(null);

  useEffect(() => {
    lenisRef.current = new Lenis();

    const update = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenisRef.current?.on("scroll", ScrollTrigger.update);
    const rafId = requestAnimationFrame(update);

    // Attach GSAP ticker
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(update);
    };
  }, []);

  return lenisRef;
};
