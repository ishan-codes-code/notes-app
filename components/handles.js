"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Github, Linkedin } from "lucide-react";
import Xlogo from "@/public/x.svg";

const socialIcons = [
  { Icon: Instagram, link: "https://www.instagram.com/srivastava.ishan80/" },
  { image: Xlogo, link: "https://x.com/itsIshanS" }, // X logo as image
  { Icon: Github, link: "https://github.com/ishan-codes-code" },
  {
    Icon: Linkedin,
    link: "https://www.linkedin.com/in/ishan-srivastava-14309833b",
  },
];

const Handles = () => {
  return (
    <div className="inline-flex sm:ml-auto sm:mt-0 mt-4 gap-4 justify-center sm:justify-start">
      {socialIcons.map(({ Icon, image, link }, i) => (
        <a
          key={i}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-10 h-10 
            flex items-center justify-center cursor-pointer transition-all duration-500
            hover:rotate-360 hover:bg-white
          "
        >
          {Icon ? (
            <Icon size={22} className="text-[#2d2e32]" />
          ) : (
            <Image src={image} alt="X logo" width={22} height={22} />
          )}
        </a>
      ))}
    </div>
  );
};

export default Handles;
