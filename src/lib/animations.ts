import { spring, interpolate, SpringConfig } from "remotion";

// ─── Spring presets ──────────────────────────────────────
export const SPRING_CONFIGS = {
  smooth: { damping: 20, stiffness: 80, mass: 0.8 } as SpringConfig,
  snappy: { damping: 15, stiffness: 120, mass: 0.6 } as SpringConfig,
  gentle: { damping: 25, stiffness: 60, mass: 1 } as SpringConfig,
  bouncy: { damping: 10, stiffness: 150, mass: 0.5 } as SpringConfig,
} as const;

// ─── Animation helpers ──────────────────────────────────

/** Fade in with optional delay */
export const fadeIn = (
  frame: number,
  fps: number,
  delay = 0,
  config: SpringConfig = SPRING_CONFIGS.smooth
) => {
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config,
  });
  return interpolate(progress, [0, 1], [0, 1]);
};

/** Slide from a direction */
export const slideIn = (
  frame: number,
  fps: number,
  from: "left" | "right" | "bottom" | "top",
  distance = 80,
  delay = 0,
  config: SpringConfig = SPRING_CONFIGS.smooth
) => {
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config,
  });

  const offset = interpolate(progress, [0, 1], [distance, 0]);

  switch (from) {
    case "left":
      return { x: -offset, y: 0 };
    case "right":
      return { x: offset, y: 0 };
    case "bottom":
      return { x: 0, y: offset };
    case "top":
      return { x: 0, y: -offset };
  }
};

/** Scale in from a value */
export const scaleIn = (
  frame: number,
  fps: number,
  from = 0.9,
  delay = 0,
  config: SpringConfig = SPRING_CONFIGS.smooth
) => {
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config,
  });
  return interpolate(progress, [0, 1], [from, 1]);
};

/** Combined fade + slide + scale for premium entry */
export const premiumEntry = (
  frame: number,
  fps: number,
  options: {
    delay?: number;
    slideFrom?: "left" | "right" | "bottom" | "top";
    slideDistance?: number;
    scaleFrom?: number;
    config?: SpringConfig;
  } = {}
) => {
  const {
    delay = 0,
    slideFrom = "bottom",
    slideDistance = 60,
    scaleFrom = 0.95,
    config = SPRING_CONFIGS.smooth,
  } = options;

  const opacity = fadeIn(frame, fps, delay, config);
  const slide = slideIn(frame, fps, slideFrom, slideDistance, delay, config);
  const scale = scaleIn(frame, fps, scaleFrom, delay, config);

  return {
    opacity,
    transform: `translate(${slide.x}px, ${slide.y}px) scale(${scale})`,
  };
};

/** Stagger delay calculator */
export const stagger = (index: number, baseDelay = 0, interval = 6) =>
  baseDelay + index * interval;
