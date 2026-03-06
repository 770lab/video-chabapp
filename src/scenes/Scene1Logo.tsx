import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Scene1Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 1.2 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scale = interpolate(frame, [0, 1.2 * fps], [0.8, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowOpacity = interpolate(frame, [0.8 * fps, 1.8 * fps], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontFamily:
              "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            letterSpacing: 2,
            position: "relative",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #6228d7, #ee2a7b, #f9ce34)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 ${30 * glowOpacity}px rgba(238, 42, 123, ${glowOpacity}))`,
            }}
          >
            Chab'app
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            fontFamily:
              "'EB Garamond', Georgia, serif",
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 3,
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 700,
            opacity: interpolate(frame, [0.6 * fps, 1.4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Machia'h arrive, soyons prêt à l'accueillir
        </div>
      </div>
    </div>
  );
};
