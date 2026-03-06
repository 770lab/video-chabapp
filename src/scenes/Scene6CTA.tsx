import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gradient background sweep
  const gradientAngle = interpolate(frame, [0, 3 * fps], [135, 225]);

  const bgOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Logo entry
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.4, 1]);

  // CTA text
  const ctaSpring = spring({
    frame: frame - Math.floor(0.4 * fps),
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });
  const ctaTranslateY = interpolate(ctaSpring, [0, 1], [60, 0]);

  // Subtitle
  const subSpring = spring({
    frame: frame - Math.floor(0.7 * fps),
    fps,
    config: { damping: 14, stiffness: 70, mass: 0.9 },
  });

  // Button
  const btnSpring = spring({
    frame: frame - Math.floor(1.0 * fps),
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.5 },
  });
  // Button pulse after entry
  const pulseFrame = Math.max(0, frame - Math.floor(1.8 * fps));
  const pulse = Math.sin((pulseFrame / fps) * Math.PI * 2.5) * 0.04;
  const btnPulse = btnSpring > 0.9 ? 1 + pulse : interpolate(btnSpring, [0, 1], [0, 1]);

  // Particles
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 300 + Math.sin(i * 1.5) * 80;
    const speed = 0.3 + (i % 3) * 0.15;
    const particleProgress = interpolate(
      frame,
      [0.3 * fps, 2.5 * fps],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const currentAngle = angle + frame * speed * 0.02;
    const x = Math.cos(currentAngle) * radius * particleProgress;
    const y = Math.sin(currentAngle) * radius * particleProgress;
    const size = 4 + (i % 4) * 2;
    return { x, y, size, opacity: particleProgress * (0.3 + (i % 3) * 0.2) };
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity,
          background: `linear-gradient(${gradientAngle}deg, #833ab4, #fd1d1d, #fcb045)`,
        }}
      />

      {/* Dark overlay for contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.5) 100%)",
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

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            fontSize: 100,
            fontFamily,
            fontWeight: 800,
            color: "white",
            textShadow: "0 4px 40px rgba(0,0,0,0.4)",
          }}
        >
          Chab'app
        </div>

        {/* CTA text */}
        <div
          style={{
            transform: `translateY(${ctaTranslateY}px)`,
            opacity: ctaSpring,
            fontSize: 48,
            fontFamily,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            lineHeight: 1.3,
          }}
        >
          Votre vie juive,{"\n"}simplifiée.
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${interpolate(subSpring, [0, 1], [30, 0])}px)`,
            fontSize: 30,
            fontFamily,
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          Disponible sur iOS et Android
        </div>

        {/* Download button */}
        <div
          style={{
            transform: `scale(${btnPulse})`,
            padding: "24px 64px",
            borderRadius: 50,
            backgroundColor: "white",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          }}
        >
          <span
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: 32,
              background:
                "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Télécharger
          </span>
        </div>
      </div>
    </div>
  );
};
