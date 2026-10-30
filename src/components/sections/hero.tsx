import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, Linkedin, UserRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub } from "react-icons/si";
import { config } from "@/data/config";
import { useProfileShowcase } from "@/contexts/profile-showcase";
import { useLenis } from "@/lib/lenis";
import { usePerfProfile } from "@/hooks/use-perf-profile";

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const { isProfileOpen, toggleProfile } = useProfileShowcase();
  const lenis = useLenis();
  const { reducedMotion } = usePerfProfile();

  const handleHireMeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.replaceState(null, "", "#contact");

    const contactSection = document.getElementById("contact");
    if (!contactSection) {
      window.location.hash = "contact";
      return;
    }

    if (lenis) {
      lenis.scrollTo(contactSection, {
        duration: reducedMotion ? 0 : 2,
        immediate: reducedMotion,
      });
      return;
    }

    contactSection.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          {!isLoading && (
            <div className="flex w-full max-w-[calc(100vw-2rem)] flex-col md:max-w-none">
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-medium text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default text-center whitespace-nowrap bg-clip-text sm:text-xl md:self-start md:text-left md:text-xl"
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "w-full max-w-full leading-none text-transparent text-slate-800 md:-ml-[6px]",
                          "text-center text-5xl font-bold md:text-left md:text-7xl lg:text-8xl xl:text-8xl",
                          "cursor-default text-edge-outline font-display "
                        )}
                      >
                        {config.author.split(" ")[0]}
                        <br className="block" />
                        {config.author.split(" ").at(-1)}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      theres something waiting for you in devtools
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>
                {/* <div className="md:block hidden bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 w-screen h-px animate-fade-right animate-glow" /> */}
                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "mt-1 font-medium text-md text-slate-500 dark:text-zinc-400 md:mt-4 md:self-start",
                      "cursor-default whitespace-nowrap bg-clip-text text-center sm:text-xl md:text-left md:text-xl"
                    )}
                  >
                    Software Engineer
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 flex w-full max-w-[calc(100vw-2rem)] flex-col gap-3 md:w-fit md:max-w-none">
                <BoxReveal delay={2} width="100%">
                  <Button asChild className="flex items-center gap-2 w-full">
                    <Link
                      href="https://drive.google.com/file/d/1UdjNvzI-0m3PceU2uOa93Buai78JlnsQ/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <File size={24} />
                      <p>Resume</p>
                    </Link>
                  </Button>
                </BoxReveal>
                <div className="flex w-full items-center gap-2 md:w-fit md:self-start md:gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        className="block min-w-0 flex-1 overflow-hidden md:w-auto md:flex-none"
                      >
                        <Link href="#contact" onClick={handleHireMeClick}>
                          Hire Me
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>pls 🥹 🙏</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex h-full shrink-0 items-center gap-2">
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          aria-label={isProfileOpen ? "Hide profile photo" : "Show profile photo"}
                          aria-pressed={isProfileOpen}
                          onClick={toggleProfile}
                          className="h-10 w-10 shrink-0 p-0"
                        >
                          <UserRound size={24} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{isProfileOpen ? "Back to keyboard" : "A little about me"}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Button asChild variant="outline" className="h-10 w-10 shrink-0 p-0">
                      <Link
                        href={config.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <SiGithub size={24} />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-10 w-10 shrink-0 p-0">
                      <Link
                        href={config.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={24} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
