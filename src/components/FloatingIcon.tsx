import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { fadeIn, SPRING_CONFIGS } from "../lib/animations";

interface FloatingIconProps {
  emoji: string;
  x: number;
  y: number;
  size?: number;
  delay?: number;
  floatAmplitude?: number;
  floatSpeed?: number;
}

export const FloatingIcon: React.FC<FloatingIconProps> = ({
  emoji,
  x,
  y,
  size = 40,
  delay = 0,
  floatAmplitude = 8,
  floatSpeed = 0.05,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeIn(frame, fps, delay, SPRING_CONFIGS.gentle);
  const floatY = Math.sin((frame - delay) * floatSpeed) * floatAmplitude;
  const scale = interpolate(opacity, [0, 1], [0.6, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: size,
        opacity,
        transform: `translateY(${floatY}px) scale(${scale})`,
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
      }}
    >
      {emoji}
    </div>
  );
};
