import React from "react";
import { COLORS } from "../config";

interface PhoneMockupProps {
  children: React.ReactNode;
  scale?: number;
  glowColor?: string;
  showGlow?: boolean;
  style?: React.CSSProperties;
}

const W = 340;
const H = 700;
const RADIUS = 48;
const BEZEL = 6;

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  scale = 1,
  glowColor = COLORS.accent,
  showGlow = true,
  style,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: W,
        height: H,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        ...style,
      }}
    >
      {/* Glow behind phone */}
      {showGlow && (
        <div
          style={{
            position: "absolute",
            inset: -40,
            background: `radial-gradient(ellipse at center, ${glowColor}20 0%, transparent 70%)`,
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />
      )}

      {/* Phone body */}
      <div
        style={{
          position: "relative",
          width: W,
          height: H,
          zIndex: 1,
        }}
      >
        {/* Frame */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: RADIUS,
            background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.08),
              0 20px 60px rgba(0,0,0,0.6),
              0 4px 20px rgba(0,0,0,0.4),
              inset 0 1px 0 rgba(255,255,255,0.05)
            `,
          }}
        />

        {/* Screen */}
        <div
          style={{
            position: "absolute",
            top: BEZEL,
            left: BEZEL,
            right: BEZEL,
            bottom: BEZEL,
            borderRadius: RADIUS - BEZEL,
            overflow: "hidden",
            backgroundColor: COLORS.bg.dark,
          }}
        >
          {children}
        </div>

        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: BEZEL + 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 32,
            backgroundColor: "#000",
            borderRadius: 16,
            zIndex: 10,
          }}
        />

        {/* Side buttons */}
        <div
          style={{
            position: "absolute",
            right: -2.5,
            top: 180,
            width: 3,
            height: 55,
            backgroundColor: "#222",
            borderRadius: "0 2px 2px 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2.5,
            top: 150,
            width: 3,
            height: 30,
            backgroundColor: "#222",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2.5,
            top: 200,
            width: 3,
            height: 45,
            backgroundColor: "#222",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2.5,
            top: 258,
            width: 3,
            height: 45,
            backgroundColor: "#222",
            borderRadius: "2px 0 0 2px",
          }}
        />
      </div>
    </div>
  );
};
