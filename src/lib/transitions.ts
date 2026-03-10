import { interpolate } from "remotion";

/** Scene fade in/out envelope */
export const sceneEnvelope = (
  frame: number,
  duration: number,
  fadeInFrames = 20,
  fadeOutFrames = 15
) => {
  return interpolate(
    frame,
    [0, fadeInFrames, duration - fadeOutFrames, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
};

/** Parallax offset based on frame */
export const parallax = (
  frame: number,
  duration: number,
  distance = 30
) => {
  return interpolate(frame, [0, duration], [distance / 2, -distance / 2], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
};

/** Slow zoom (Ken Burns style) */
export const slowZoom = (
  frame: number,
  duration: number,
  from = 1,
  to = 1.05
) => {
  return interpolate(frame, [0, duration], [from, to], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
};
