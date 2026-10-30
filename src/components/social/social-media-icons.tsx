"use client";

import React from "react";
import { Button } from "../ui/button";
import { SiGithub, SiInstagram, SiWhatsapp } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { config } from "@/data/config";
import Link from "next/link";

const BUTTONS = [
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} color={"#fff"} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <Linkedin size={24} color="#fff" />,
  },
  {
    name: "Instagram",
    href: config.social.instagram,
    icon: <SiInstagram size={"24"} color={"#fff"} />,
  },
  {
    name: "WhatsApp",
    href: config.social.whatsapp,
    icon: <SiWhatsapp size={"24"} color={"#fff"} />,
  },
];

const SocialMediaButtons = () => {
  return (
    <div className="z-10">
      {BUTTONS.map((button) => (
        <Button asChild key={button.name} variant="ghost">
          <Link
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={button.name}
          >
            {button.icon}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default SocialMediaButtons;
