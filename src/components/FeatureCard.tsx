import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fontFamily } from "../config";
import { premiumEntry, stagger } from "../lib/animations";

interface FeatureCardProps {
  icon: string;
  title: string;
  subtitle?: string;
  index?: number;
  delay?: number;
  size?: "small" | "medium" | "large";
}

const SIZES = {
  small: { w: 160, h: 160, iconSize: 32, titleSize: 13, gap: 8 },
  medium: { w: 200, h: 90, iconSize: 28, titleSize: 15, gap: 12 },
  large: { w: 320, h: 100, iconSize: 36, titleSize: 18, gap: 16 },
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  subtitle,
  index = 0,
  delay = 0,
  size = "medium",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = SIZES[size];

  const entry = premiumEntry(frame, fps, {
    delay: stagger(index, delay),
    slideFrom: "bottom",
    slideDistance: 40,
    scaleFrom: 0.92,
  });

  const isVertical = size === "small";

  return (
    <div
      style={{
        width: s.w,
        height: isVertical ? s.h : s.h,
        borderRadius: 20,
        backgroundColor: COLORS.bg.card,
        border: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: isVertical ? "center" : "flex-start",
        gap: s.gap,
        padding: isVertical ? 16 : "0 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        ...entry,
      }}
    >
      <div style={{ fontSize: s.iconSize, flexShrink: 0 }}>{icon}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isVertical ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: s.titleSize,
            fontWeight: 600,
            color: COLORS.text.primary,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily,
              fontSize: s.titleSize - 3,
              fontWeight: 400,
              color: COLORS.text.secondary,
              marginTop: 2,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
