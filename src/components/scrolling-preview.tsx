"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePerfProfile } from "@/hooks/use-perf-profile";

// Pan speed (CSS px/sec). Higher value = faster scroll.
const PAN_SPEED = 120;

// A page only pans if it overflows the frame by at least this fraction of the
// frame height. Anything shorter (landscape/square screenshots) is shown
// "cover" instead, so any image looks right with no per-image config.
const MIN_SCROLL_OVERFLOW = 0.2;

// Neutral wallpaper when a card has no `bg` (or it fails to load), so adding a
// project with just a screenshot still looks intentional.
const FALLBACK_BG = "linear-gradient(135deg, #1e293b, #0f172a)";

/**
 * Card preview: a screenshot floating over a wallpaper. Tall landing pages pan
 * on hover and smoothly return to top on mouse leave; normal (landscape/square)
 * screenshots are shown "cover", centered.
 */
const ScrollingPreview = ({
  src,
  images,
  alt,
  bg,
  isHovered = false,
}: {
  src: string;
  images?: string[];
  alt: string;
  bg?: string;
  isHovered?: boolean;
}) => {
  const { reducedMotion: reduceMotion } = usePerfProfile();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollPx, setScrollPx] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  const stackedImages = images && images.length > 1 ? images : undefined;

  useEffect(() => {
    let cancelled = false;
    const hasStackedImages = images !== undefined && images.length > 1;
    const sources = hasStackedImages ? images : [src];
    const loadedImages = sources.map((source) => {
      const image = new window.Image();
      image.src = source;
      return image;
    });
    const compute = () => {
      const vp = viewportRef.current;
      if (
        cancelled ||
        !vp ||
        loadedImages.some((image) => !image.naturalWidth)
      ) {
        return;
      }
      const displayedHeight = loadedImages.reduce(
        (height, image) =>
          height + vp.clientWidth * (image.naturalHeight / image.naturalWidth),
        0
      );
      const overflow = displayedHeight - vp.clientHeight;
      setScrollPx(
        hasStackedImages || overflow > vp.clientHeight * MIN_SCROLL_OVERFLOW
          ? Math.max(overflow, 0)
          : 0
      );
    };
    loadedImages.forEach((image) => {
      image.onload = compute;
    });
    if (loadedImages.every((image) => image.complete)) compute();
    window.addEventListener("resize", compute);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", compute);
    };
  }, [src, images]);

  // Preload the wallpaper so a missing/404 file falls back to the gradient
  // instead of rendering a broken background.
  useEffect(() => {
    if (!bg) {
      setBgReady(false);
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => !cancelled && setBgReady(true);
    img.onerror = () => !cancelled && setBgReady(false);
    img.src = bg;
    return () => {
      cancelled = true;
    };
  }, [bg]);

  const scrolls = scrollPx > 0;
  const animate = !reduceMotion && scrolls;

  const pan = scrollPx / PAN_SPEED;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={alt}
    >
      {/* wallpaper background (falls back to a gradient when `bg` is absent) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0f172a",
          backgroundImage: bgReady && bg ? `url("${bg}")` : FALLBACK_BG,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* floating screenshot panel */}
      <div
        ref={viewportRef}
        className="sp-shot"
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: 20,
          bottom: 0,
          overflow: "hidden",
          borderRadius: 10,
          boxShadow:
            "0 24px 50px -12px rgba(8,20,55,0.55), 0 8px 18px -8px rgba(8,20,55,0.45)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        {stackedImages ? (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
            animate={{ y: animate && isHovered ? -scrollPx : 0 }}
            transition={
              animate
                ? {
                    duration: isHovered
                      ? pan
                      : Math.min(Math.max(pan * 0.35, 0.4), 0.75),
                    ease: isHovered ? "linear" : [0.25, 1, 0.5, 1],
                  }
                : { duration: 0 }
            }
          >
            {stackedImages.map((image) => (
              <Image
                key={image}
                src={image}
                alt=""
                width={1600}
                height={1000}
                sizes="(max-width: 768px) 100vw, 400px"
                aria-hidden="true"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${src}")`,
              backgroundSize: scrolls ? "100% auto" : "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: scrolls ? "50% 0%" : "center",
            }}
            animate={
              animate
                ? {
                    backgroundPosition: isHovered ? "50% 100%" : "50% 0%",
                  }
                : { backgroundPosition: scrolls ? "50% 0%" : "center" }
            }
            transition={
              animate
                ? {
                    duration: isHovered
                      ? pan
                      : Math.min(Math.max(pan * 0.35, 0.4), 0.75),
                    ease: isHovered ? "linear" : [0.25, 1, 0.5, 1],
                  }
                : { duration: 0 }
            }
          />
        )}
      </div>
    </div>
  );
};

export default ScrollingPreview;
