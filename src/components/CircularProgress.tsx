import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, fontFamily } from "../config";

export const CircularProgress: React.FC<{
  targetCount?: number;
  totalCount?: number;
  label?: string;
  delay?: number;
}> = ({ targetCount = 9, totalCount = 13, label = "objectifs accomplis", delay = 30 }) => {
  const frame = useCurrentFrame();

  const adjustedFrame = Math.max(0, frame - delay);

  // Animate from 0 to target percentage over 60 frames
  const targetPercent = (targetCount / totalCount) * 100;
  const progress = interpolate(adjustedFrame, [0, 60], [0, targetPercent], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Animated count
  const displayCount = Math.round(
    interpolate(adjustedFrame, [0, 60], [0, targetCount], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Entrance opacity
  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Pulse
  const pulse = 1 + Math.sin(adjustedFrame / 12) * 0.02;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `scale(${pulse})`,
      }}
    >
      <div style={{ position: "relative", width: 200, height: 200 }}>
        {/* Background circle */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(0, 0, 0, 0.08)"
            strokeWidth="10"
          />
        </svg>

        {/* Progress circle */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#progressGradientObj)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="progressGradientObj" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.accent} />
              <stop offset="100%" stopColor={COLORS.accentLight} />
            </linearGradient>
          </defs>
        </svg>

        {/* Count text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 48,
              fontWeight: 800,
              color: "#222",
              lineHeight: 1,
            }}
          >
            {displayCount}/{totalCount}
          </div>
        </div>
      </div>

      <div
        style={{
          fontFamily,
          fontSize: 16,
          fontWeight: 500,
          color: "#666",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
};
