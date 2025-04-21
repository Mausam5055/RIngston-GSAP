import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
const NotSupported = () => {
  return (
    <div className="fixed space-y-3 top-0 left-0 flex flex-col h-screen w-screen items-center text-center justify-center bg-black text-white text-lg font-bold p-8">
      Hi Mausam There!
      <br />
      This viewport is not yet supported.<br></br> I'll be adding the support
      soon.
      <div>
        Please check on a landscape viewport. <br />
        Thanks!
      </div>
      <div className=" flex gap-6">
        <a href={"https://github.com/Mausam5055"}>
          <FaGithub className=" w-[6.5vw] h-[10vw] text-white" />
        </a>
        <a href={"https://www.linkedin.com/in/mausam-kar-6388861a7/"}>
          <FaLinkedin className="  w-[6.5vw] h-[10vw] text-white" />
        </a>
      </div>
    </div>
  );
};

export default NotSupported;
