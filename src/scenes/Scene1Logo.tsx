import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";

export const Scene1Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale + opacity with spring
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);

  // Gradient shimmer
  const shimmerX = interpolate(frame, [0, 2 * fps], [-100, 200], {
    extrapolateRight: "clamp",
  });

  // Subtitle
  const subSpring = spring({
    frame: frame - Math.floor(0.5 * fps),
    fps,
    config: { damping: 200 },
  });
  const subTranslateY = interpolate(subSpring, [0, 1], [20, 0]);

  // Decorative ring
  const ringScale = interpolate(frame, [0.3 * fps, 1.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ringOpacity = interpolate(frame, [0.3 * fps, 1 * fps, 1.8 * fps, 2.2 * fps], [0, 0.3, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Expanding ring */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "2px solid rgba(238, 42, 123, 0.5)",
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoSpring,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontFamily: FONT,
            fontWeight: 800,
            letterSpacing: 2,
            background:
              "linear-gradient(135deg, #6228d7, #ee2a7b, #f9ce34)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            position: "relative",
          }}
        >
          Chab'app
          {/* Shimmer overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transform: `translateX(${shimmerX}%)`,
            }}
          >
            Chab'app
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 20,
          fontSize: 13,
          fontFamily: "'EB Garamond', Georgia, serif",
          fontWeight: 500,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: 2,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.8,
          maxWidth: 260,
          opacity: subSpring,
          transform: `translateY(${subTranslateY}px)`,
        }}
      >
        Machia'h arrive,{"\n"}soyons prêt à l'accueillir
      </div>
    </div>
  );
};
