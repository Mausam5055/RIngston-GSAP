import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Header = () => {
  return (
    <header className="absolute w-full z-10 flex justify-between pt-9 px-4 sm:px-8 md:px-16 lg:px-24 font-bold">
      <a href="#" className="logo text-xl text-black">
        Ringston
      </a>
      <div className="collection flex items-center gap-2 text-white">
        <a
          className="hover:invert  transition-all duration-300"
          target="_blank"
          href="https://github.com/Mausam5055"
        >
          <FaGithub className=" w-9 h-9" />
        </a>

        <a
          className="hover:invert transition-all duration-300"
          target="_blank"
          href="https://www.linkedin.com/in/mausam-kar-6388861a7/"
        >
          {" "}
          <FaLinkedin className=" w-9 h-9" />
        </a>
      </div>
    </header>
  );
};

export default Header;
