import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { slowZoom } from "../lib/transitions";

interface GradientBackgroundProps {
  variant?: "dark" | "subtle" | "warm";
  showGlow?: boolean;
  glowPosition?: { x: string; y: string };
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = "dark",
  showGlow = true,
  glowPosition = { x: "50%", y: "40%" },
}) => {
  const frame = useCurrentFrame();
  const zoom = slowZoom(frame, 300, 1, 1.02);

  const backgrounds: Record<string, string> = {
    dark: COLORS.bg.dark,
    subtle: COLORS.gradient.subtle,
    warm: `linear-gradient(135deg, ${COLORS.bg.dark} 0%, #1a1020 100%)`,
  };

  return (
    <AbsoluteFill>
      {/* Base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: backgrounds[variant],
          transform: `scale(${zoom})`,
        }}
      />

      {/* Grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Accent glow */}
      {showGlow && (
        <div
          style={{
            position: "absolute",
            left: glowPosition.x,
            top: glowPosition.y,
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 800,
            background: COLORS.gradient.glow,
            filter: "blur(60px)",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
