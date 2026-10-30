import { motion } from "motion/react";
import Link from "next/link";
import styles from "./style.module.scss";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";
import { useLenis } from "@/lib/lenis";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { usePathname } from "next/navigation";
import { useProfileShowcase } from "@/contexts/profile-showcase";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const params = useParams();
  const pathname = usePathname();
  const lenis = useLenis();
  const { reducedMotion } = usePerfProfile();
  const { setProfileOpen } = useProfileShowcase();
  const [currentHref, setCurrentHref] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, hash } = window.location;
    setCurrentHref(pathname + hash);
  }, [params]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsActive(false);
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const url = new URL(href, window.location.origin);
    const opensAboutProfile = url.pathname === "/" && url.hash === "#about";
    setProfileOpen(opensAboutProfile);

    if (opensAboutProfile && url.pathname === pathname) {
      event.preventDefault();
      window.history.replaceState(window.history.state, "", url.hash);
      setCurrentHref(`${url.pathname}${url.hash}`);

      const heroSection = document.getElementById("hero");
      if (heroSection) {
        if (lenis) {
          lenis.scrollTo(heroSection, {
            duration: reducedMotion ? 0 : 2,
            immediate: reducedMotion,
          });
        } else {
          heroSection.scrollIntoView({
            behavior: reducedMotion ? "instant" : "smooth",
          });
        }
      }

      return;
    }

    if (url.pathname !== pathname || !url.hash) return;

    event.preventDefault();
    const section = document.getElementById(
      decodeURIComponent(url.hash.slice(1))
    );
    if (!section) {
      window.location.assign(`${url.pathname}${url.hash}`);
      return;
    }

    window.history.replaceState(window.history.state, "", url.hash);
    setCurrentHref(`${url.pathname}${url.hash}`);
    if (lenis) {
      lenis.scrollTo(section, {
        duration: reducedMotion ? 0 : 2,
        immediate: reducedMotion,
      });
    } else {
      section.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
      });
    }
  };

  const getChars = (word: string) => {
    let chars: React.JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={cn(styles.body, "flex flex-col items-end md:flex-row")}>
      <FunnyThemeToggle className="w-6 h-6 mr-6 flex md:hidden" />
      {links.map((link, index) => {
        const { title, href, target } = link;

        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            className="cursor-can-hover rounded-lg"
            onClick={(event) => handleLinkClick(event, href)}
          >
            <motion.p
              className={cn(
                "font-display rounded-lg",
                currentHref !== href ? "text-muted-foreground" : "underline"
              )}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
