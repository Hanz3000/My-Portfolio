"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChibiScene, type ChibiSceneApi, type ScenePointerEvent, type RuntimeEvent } from "@chibi3d/runtime";
import { SKILLS } from "@/data/constants";
import { setSceneStatus } from "@/lib/scene-health";
import { usePreloader } from "../preloader";
import { createKeyboardScene, resolveKeyboardAsset, type KeyboardKey, type KeyboardSkill } from "./scene";
import { createKeyInput, isTypingTarget } from "./input";
import { createKeyboardMotion, type KeyboardSection } from "./motion";
import { useKeyboardSounds } from "./use-keyboard-sounds";
import { useAdaptiveGraphics } from "./use-adaptive-graphics";
import { useKeyboardCounts } from "./use-keyboard-counts";
import { keyWear } from "./wear";
import { createCounterMotion } from "./counter-motion";
import { useProfileShowcase } from "@/contexts/profile-showcase";
import { AnimatePresence, motion as motionComponent } from "motion/react";
import { X } from "lucide-react";

const SceneCanvas = memo(ChibiScene);
const SCENE_STYLE: CSSProperties = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100dvh",
};

export default function KeyboardScene({ maxDpr }: { maxDpr: number }) {
  const { isLoading, bypassLoading } = usePreloader();
  const { isProfileOpen, setProfileOpen } = useProfileShowcase();
  const api = useRef<ChibiSceneApi>(null);
  const failed = useRef(false);
  const motion = useRef<ReturnType<typeof createKeyboardMotion> | null>(null);
  const counterMotion = useRef<ReturnType<typeof createCounterMotion> | null>(null);
  const [loadVersion, setLoadVersion] = useState(0);
  const ready = loadVersion > 0;
  const [section, setSection] = useState<KeyboardSection>("hero");
  const [selected, setSelected] = useState<KeyboardSkill | null>(null);
  const [isProfileExpanded, setProfileExpanded] = useState(false);
  const playSound = useKeyboardSounds();
  const scene = useMemo(() => createKeyboardScene(Object.values(SKILLS).map((skill) => ({
    ...skill, icon: skill.keyboardIcon ?? skill.icon,
  }))), []);
  const { settings: graphics, markActive } = useAdaptiveGraphics(ready && !isLoading);
  const { shadows, softShadows, ao, bloom, lighting } = graphics;
  const environment = useMemo(() => ({
    ...scene.document.environment,
    shadows, softShadows, ao, bloom,
    contactShadows: false,
    vignette: false,
    preset: lighting ? scene.document.environment.preset : null,
  }), [scene, shadows, softShadows, ao, bloom, lighting]);
  const dpr = useMemo<[number, number]>(() =>
    [0.5, Math.min(graphics.dpr, maxDpr)], [maxDpr, graphics.dpr]);
  const visibleLabel = useRef<string | null>(null);
  const heldKeys = useRef<KeyboardKey[]>([]);
  const input = useMemo(() => createKeyInput(scene.keys, scene.columns), [scene]);
  const { counts, total, available, recordPress } = useKeyboardCounts();
  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createCounterMotion(api.current, scene.counter, markActive);
    counterMotion.current = controller;
    return () => { controller.dispose(); counterMotion.current = null; };
  }, [ready, loadVersion, scene, markActive]);
  useEffect(() => {
    counterMotion.current?.update(total, available);
  }, [total, available, ready, loadVersion, scene]);
  useEffect(() => {
    if (!ready) return;
    for (const key of scene.keys) {
      api.current?.setMaterial(key.materialId, keyWear(counts[key.skill.name] ?? 0));
    }
    markActive();
  }, [counts, ready, loadVersion, scene, markActive]);
  useEffect(() => input.subscribe((key, pressed) => {
    markActive();
    api.current?.transitionNodeTo(key.nodeId, pressed ? key.pressedStateId : "base", { duration: 0.1, ease: "easeInOut" });
    api.current?.setMaterial(key.materialId, {
      emissive: scene.document.materials[key.materialId].color,
      emissiveIntensity: pressed ? 0.7 : 0,
    });
    heldKeys.current = heldKeys.current.filter((held) => held !== key);
    if (pressed) {
      if (ready && !isLoading && !document.hidden) recordPress(key.skill.name);
      heldKeys.current.push(key);
    }
    // latest still-held key wins; none held -> back to default prompt
    const shown = heldKeys.current.at(-1) ?? null;
    const labelId = shown?.labelId ?? scene.defaultLabelId;
    if (labelId !== (visibleLabel.current ?? scene.defaultLabelId)) {
      api.current?.setNodeVisible(visibleLabel.current ?? scene.defaultLabelId, false);
      api.current?.setNodeVisible(labelId, true);
    }
    visibleLabel.current = shown?.labelId ?? null;
    setSelected(shown?.skill ?? null);
    playSound(pressed);
  }), [input, scene, playSound, markActive, ready, isLoading, recordPress]);

  const onPointerEvent = useCallback((event: ScenePointerEvent) => {
    const pointer = `pointer:${event.pointerId}`;
    switch (event.type) {
      case "hoverEnter":
        if (event.pointerType === "mouse") input.press("hover", event.nodeId);
        break;
      case "hoverExit": input.release("hover", event.nodeId); break;
      case "pointerDown": input.press(pointer, event.nodeId); break;
      case "pointerUp":
      case "pointerCancel": input.release(pointer); break;
    }
  }, [input]);
  const onLoad = useCallback(() => {
    if (failed.current) return;
    setLoadVersion((version) => version + 1);
    setSceneStatus("ready");
    bypassLoading();
  }, [bypassLoading]);
  const onError = useCallback((error: Error) => {
    failed.current = true;
    console.warn("Keyboard scene unavailable", error);
    setSceneStatus("failed");
    bypassLoading();
  }, [bypassLoading]);
  const onEvent = useCallback((event: RuntimeEvent) => {
    if (event.type === "contextLost") onError(new Error("WebGL context lost"));
  }, [onError]);

  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createKeyboardMotion(api.current, scene, (next) => {
      setSection(next);
      if (next !== "hero") setProfileOpen(false);
      input.releaseAll();
      const hash = next === "hero" ? "" : `#${next}`;
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search + hash);
    }, markActive);
    motion.current = controller;
    return () => { controller.dispose(); motion.current = null; };
  }, [ready, loadVersion, scene, input, markActive, setProfileOpen]);
  useEffect(() => {
    motion.current?.setCounterEnabled(available);
  }, [available, ready, loadVersion, scene, input, markActive]);
  // Rebind after each runtime load, once the replacement scene's nodes are mounted.
  useEffect(() => {
    if (ready && !isLoading) motion.current?.reveal();
  }, [ready, loadVersion, isLoading, scene, input]);

  useEffect(() => {
    if (!ready) return;
    // Restore the selected label if the runtime remounts.
    const active = visibleLabel.current ?? scene.defaultLabelId;
    for (const id of [scene.defaultLabelId, ...scene.keys.map((key) => key.labelId)]) {
      api.current?.setNodeVisible(id, id === active);
    }
  }, [ready, loadVersion, scene]);

  useEffect(() => {
    if (!ready) return;
    api.current?.setNodeVisible(scene.boardId, !isProfileOpen);
  }, [isProfileOpen, ready, loadVersion, scene]);

  useEffect(() => {
    if (!isProfileOpen || section !== "hero") setProfileExpanded(false);
  }, [isProfileOpen, section]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target)) return;
      const key = input.shortcuts.get(event.code);
      if (key) input.press(`key:${event.code}`, key.nodeId);
    };
    const up = (event: KeyboardEvent) => input.release(`key:${event.code}`);
    const release = () => input.releaseAll();
    const visibility = () => { if (document.hidden) release(); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
      release();
    };
  }, [input]);

  return (
    <>
      <SceneCanvas
        document={scene.document}
        environment={environment}
        resolveAsset={resolveKeyboardAsset}
        api={api}
        style={SCENE_STYLE}
        dpr={dpr}
        transparent
        orbit={false}
        orthographic
        pointerTargets={scene.pointerTargets}
        onPointerEvent={onPointerEvent}
        onLoad={onLoad}
        onError={onError}
        onEvent={onEvent}
      />
      <AnimatePresence>
        {isProfileOpen && section === "hero" && (
          <motionComponent.div
            className={`pointer-events-none fixed inset-0 z-30 overflow-hidden ${isProfileExpanded ? "grid place-items-center" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              backgroundColor: isProfileExpanded ? "rgba(2, 8, 18, 0.58)" : "rgba(2, 8, 18, 0)",
              backdropFilter: isProfileExpanded ? "blur(5px)" : "blur(0px)",
            }}
          >
            <motionComponent.div
              layout
              role={isProfileExpanded ? "dialog" : undefined}
              aria-label={isProfileExpanded ? "About Farhan" : undefined}
              className={`pointer-events-auto overflow-hidden rounded-lg border border-sky-400/60 bg-slate-950/95 shadow-[0_0_48px_rgba(0,132,255,0.24)] ${
                isProfileExpanded
                  ? "relative w-[min(88vw,850px)]"
                  : "absolute left-0 right-0 top-[52%] mx-auto w-[min(88vw,430px)] md:left-auto md:right-[8vw] md:top-[29%] md:mx-0 md:w-[min(38vw,540px)]"
              }`}
              initial={{ opacity: 0, y: 54, scale: 0.82, rotateX: 9, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -36, scale: 0.88, rotateX: -7, filter: "blur(10px)" }}
              transition={{ layout: { type: "spring", stiffness: 180, damping: 25 }, type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
              style={{ aspectRatio: "1650 / 830", maxHeight: isProfileExpanded ? "82dvh" : "46dvh" }}
            >
              <button
                type="button"
                className={`block size-full ${isProfileExpanded ? "cursor-default" : "cursor-zoom-in"}`}
                onClick={() => setProfileExpanded(true)}
                disabled={isProfileExpanded}
                aria-label="Expand profile photo"
              >
                <img
                  src="/assets/nav-link-previews/about1.png"
                  alt="About Farhan"
                  className="size-full object-contain"
                  draggable={false}
                />
              </button>
              <AnimatePresence>
                {isProfileExpanded && (
                  <motionComponent.button
                    type="button"
                    className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-white/25 bg-slate-950/80 text-white shadow-lg transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                    aria-label="Return profile photo to keyboard"
                    title="Return to keyboard"
                    initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    onClick={() => setProfileExpanded(false)}
                  >
                    <X size={20} aria-hidden="true" />
                  </motionComponent.button>
                )}
              </AnimatePresence>
              <motionComponent.div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-sky-300/80"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
              />
            </motionComponent.div>
          </motionComponent.div>
        )}
      </AnimatePresence>
      {section === "skills" && ready && (
        <div className="pointer-events-none fixed inset-x-4 bottom-8 z-20 text-center text-foreground">
          <p className="sr-only">{available ? `${total.toLocaleString("en-US")} keyboard presses by all visitors` : "Shared keyboard count unavailable"}</p>
          <div aria-live="polite" className="sr-only">
            <p className="text-xl font-semibold">{selected?.label ?? "Explore my skills"}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {selected?.shortDescription ?? "Hover, tap, or press a key"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
