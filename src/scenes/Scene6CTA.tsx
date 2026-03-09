import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gradientAngle = interpolate(frame, [0, 3 * fps], [135, 270]);

  const bgOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80, mass: 0.6 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.3, 1]);

  const ctaSpring = spring({
    frame: frame - Math.floor(0.35 * fps),
    fps,
    config: { damping: 200 },
  });
  const ctaTranslateY = interpolate(ctaSpring, [0, 1], [30, 0]);

  const subSpring = spring({
    frame: frame - Math.floor(0.6 * fps),
    fps,
    config: { damping: 200 },
  });

  const btnSpring = spring({
    frame: frame - Math.floor(0.9 * fps),
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.5 },
  });

  const pulseFrame = Math.max(0, frame - Math.floor(1.6 * fps));
  const pulse = Math.sin((pulseFrame / fps) * Math.PI * 3) * 0.035;
  const btnScale = btnSpring > 0.9 ? 1 + pulse : interpolate(btnSpring, [0, 1], [0, 1]);

  // Floating particles
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 120 + (i % 3) * 30;
    const speed = 0.4 + (i % 3) * 0.1;
    const progress = interpolate(frame, [0.2 * fps, 2 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const currentAngle = angle + frame * speed * 0.025;
    return {
      x: Math.cos(currentAngle) * radius * progress,
      y: Math.sin(currentAngle) * radius * progress,
      size: 3 + (i % 3) * 2,
      opacity: progress * (0.2 + (i % 3) * 0.15),
    };
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity,
          background: `linear-gradient(${gradientAngle}deg, #6228d7, #ee2a7b, #f9ce34)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: p.opacity,
            transform: `translate(${p.x}px, ${p.y}px)`,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: 24,
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale})`,
            fontSize: 44,
            fontFamily: FONT,
            fontWeight: 800,
            color: "white",
            letterSpacing: 2,
            textShadow: "0 2px 24px rgba(0,0,0,0.3)",
          }}
        >
          Chab'app
        </div>

        <div
          style={{
            transform: `translateY(${ctaTranslateY}px)`,
            opacity: ctaSpring,
            fontSize: 22,
            fontFamily: FONT,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            textShadow: "0 2px 12px rgba(0,0,0,0.2)",
            lineHeight: 1.5,
          }}
        >
          Votre vie juive,{"\n"}simplifiée.
        </div>

        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${interpolate(subSpring, [0, 1], [15, 0])}px)`,
            fontSize: 13,
            fontFamily: "'EB Garamond', Georgia, serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            fontStyle: "italic",
            textShadow: "0 1px 8px rgba(0,0,0,0.2)",
          }}
        >
          Machia'h arrive,{"\n"}soyons prêt à l'accueillir
        </div>

        <div
          style={{
            transform: `scale(${btnScale})`,
            padding: "14px 36px",
            borderRadius: 50,
            backgroundColor: "white",
            boxShadow: "0 4px 30px rgba(0,0,0,0.25)",
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: 3,
              textTransform: "uppercase",
              background:
                "linear-gradient(135deg, #6228d7, #ee2a7b, #f9ce34)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};
