import React, { useEffect, useState } from "react";
import "./App.css";
import { useLenisGsap } from "./hooks/useLenisGsap";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Details from "./components/Details";
import Slider from "./components/Slider";
import Contact from "./components/Contact";
import ThreeRing from "./components/ThreeRing";
import NotSupported from "./components/NotSupported";
const App = () => {
  useLenisGsap();
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  useEffect(() => {
    // Simulate preloading files then hide loader
    const timeout = setTimeout(() => {
      const loadingScreen = document.querySelector(".loading-screen");
      loadingScreen?.classList.add("hide-loader");
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);
  // Detect viewport orientation changes
  useEffect(() => {
    const handleResize = () => {
      const isNowPortrait = window.innerHeight > window.innerWidth;
      if (isNowPortrait !== isPortrait) {
        setIsPortrait(isNowPortrait);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isPortrait ? (
        <NotSupported />
      ) : (
        <div className="App relative overflow-x-hidden">
          <LoadingScreen />
          <Header />
          <Hero />
          <Details />
          <Slider />
          <Contact />
          <div className=" fixed top-0 left-0 w-full h-full z-50">
            <ThreeRing />
          </div>
          <div className=" h-screen w-screen"></div>
        </div>
      )}
    </>
  );
};

export default App;
