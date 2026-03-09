import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/GrandHotel";

const { fontFamily: CURSIVE } = loadFont();

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";

// ─── Feature definitions ────────────────────────────────────────────

type Feature = {
  card: string;        // image path in public/cards/
  screenshot: string;  // screenshot in public/screenshots/
  title: string;
  subtitle: string;
  accent: string;
  scrollAmount: number;
};

const FEATURES: Feature[] = [
  {
    card: "cards/shabbat.png",
    screenshot: "screenshots/01-accueil.png",
    title: "Chabbat",
    subtitle: "Allumage des bougies, Havdalah\net Zmanim en temps réel",
    accent: "#f59c42",
    scrollAmount: 200,
  },
  {
    card: "cards/objectifs.jpg",
    screenshot: "screenshots/08-objectifs.png",
    title: "Objectifs",
    subtitle: "13 objectifs spirituels\nà accomplir chaque jour",
    accent: "#ee2a7b",
    scrollAmount: 180,
  },
  {
    card: "cards/tefila.jpg",
    screenshot: "screenshots/02-tefila.png",
    title: "Tefila",
    subtitle: "Hébreu, phonétique, Tehilat Hachem\nPatakh Eliyahou et plus",
    accent: "#6228d7",
    scrollAmount: 150,
  },
  {
    card: "cards/hayom-yom.jpg",
    screenshot: "screenshots/01-accueil.png",
    title: "Hayom Yom",
    subtitle: "L'enseignement du Rabbi\nau quotidien",
    accent: "#f9ce34",
    scrollAmount: 120,
  },
  {
    card: "cards/tanya.jpg",
    screenshot: "screenshots/01-accueil.png",
    title: "Tanya",
    subtitle: "Plongez dans la 'Hassidout\nde l'Alter Rabbi",
    accent: "#8b2fb8",
    scrollAmount: 120,
  },
  {
    card: "cards/rambam.jpg",
    screenshot: "screenshots/01-accueil.png",
    title: "Rambam",
    subtitle: "L'étude quotidienne\ndu Michné Torah",
    accent: "#285AEB",
    scrollAmount: 120,
  },
  {
    card: "cards/houmach.jpg",
    screenshot: "screenshots/01-accueil.png",
    title: "'Houmach",
    subtitle: "La Paracha de la semaine\navec commentaires",
    accent: "#fd5949",
    scrollAmount: 120,
  },
  {
    card: "cards/ayeka.jpg",
    screenshot: "screenshots/01-accueil.png",
    title: "Ayeka",
    subtitle: "Beth Chabad, miniane\net restau cacher près de vous",
    accent: "#2ecc71",
    scrollAmount: 150,
  },
  {
    card: "cards/jewtube.png",
    screenshot: "screenshots/01-accueil.png",
    title: "JewTube",
    subtitle: "Vidéos Torah, Farbrengen\net cours inspirants",
    accent: "#e74c3c",
    scrollAmount: 150,
  },
];

// Transition effects between features
type TransitionEffect = "slide-left" | "slide-right" | "flip" | "zoom" | "tilt" | "spin" | "slide-up";

const EFFECTS: TransitionEffect[] = [
  "slide-left",   // 1: Shabbat
  "flip",         // 2: Objectifs
  "slide-right",  // 3: Tefila
  "zoom",         // 4: Hayom Yom
  "tilt",         // 5: Tanya
  "slide-left",   // 6: Rambam
  "spin",         // 7: 'Houmach
  "slide-right",  // 8: Ayeka
  "flip",         // 9: JewTube
];

// ─── Timeline ───────────────────────────────────────────────────────
// Intro: 6s (180 frames)
// 9 features × 4.3s (130 frames) = 38.7s (1170 frames)
// CTA: 5s (150 frames)
// Total: ~50s = 1500 frames at 30fps

const INTRO_END = 180;
const FEATURE_DURATION = 130;
const FEATURE_TRANSITION = 20; // frames for transition animation
const CTA_START = INTRO_END + FEATURES.length * FEATURE_DURATION;
const TOTAL_FRAMES = CTA_START + 150;

// ─── iPhone Mockup Component ────────────────────────────────────────

const PHONE_WIDTH = 372;
const PHONE_HEIGHT = 748;
const SCREEN_INSET = { top: 18, left: 18, right: 18, bottom: 18 };
const SCREEN_RADIUS = 42;

const PhoneMockup: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      width: PHONE_WIDTH,
      height: PHONE_HEIGHT,
      position: "relative",
      ...style,
    }}
  >
    {/* Screen content behind the frame */}
    <div
      style={{
        position: "absolute",
        top: SCREEN_INSET.top,
        left: SCREEN_INSET.left,
        right: SCREEN_INSET.right,
        bottom: SCREEN_INSET.bottom,
        borderRadius: SCREEN_RADIUS,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {children}
    </div>
    {/* Frame overlay */}
    <Img
      src={staticFile("iphone-frame.png")}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  </div>
);

// ─── Splash Overlay (intro) ─────────────────────────────────────────

const InstagramSVG: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <defs>
      <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="22" fill="none" stroke="url(#igGrad)" strokeWidth="7" />
    <circle cx="50" cy="50" r="22" fill="none" stroke="url(#igGrad)" strokeWidth="6" />
    <circle cx="74" cy="26" r="5.5" fill="url(#igGrad)" />
  </svg>
);

const SplashOverlay: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame > INTRO_END) return null;

  const igLogoIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const igLogoScale = interpolate(igLogoIn, [0, 1], [0.8, 1]);
  const igTextIn = interpolate(frame, [9, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const igTextY = interpolate(igTextIn, [0, 1], [8, 0]);
  const strikeWidth = interpolate(frame, [45, 63], [0, 71], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const igLogoOut = interpolate(frame, [66, 105], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const crownIn = interpolate(frame, [75, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const igTextOut = interpolate(frame, [72, 105], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const koulIn = interpolate(frame, [80, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subIn = interpolate(frame, [120, 144], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const subY = interpolate(subIn, [0, 1], [8, 0]);
  const tapOpacity = frame > 135 ? 0.35 + Math.sin((frame / fps) * Math.PI * 2) * 0.2 : interpolate(frame, [130, 145], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bhIn = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [155, INTRO_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: SCREEN_RADIUS, opacity: fadeOut, zIndex: 10 }}>
      <div style={{ position: "absolute", top: 56, right: 20, fontSize: 18, fontFamily: "serif", fontWeight: 700, color: "#000", opacity: bhIn, direction: "rtl" }}>ב״ה</div>
      <div style={{ display: "grid", placeItems: "center", marginBottom: 12 }}>
        <div style={{ gridArea: "1/1", opacity: igLogoIn * igLogoOut, transform: `scale(${igLogoScale})` }}><InstagramSVG size={80} /></div>
        <div style={{ gridArea: "1/1", opacity: crownIn }}><Img src={staticFile("splash-logo.png")} style={{ width: 100, height: 100, objectFit: "contain" }} /></div>
      </div>
      <div style={{ display: "grid", placeItems: "center", marginBottom: 14 }}>
        <div style={{ gridArea: "1/1", opacity: igTextIn * igTextOut, transform: `translateY(${igTextY}px)`, fontSize: 44, fontFamily: CURSIVE, color: "#000", position: "relative" }}>
          Instagram
          <div style={{ position: "absolute", top: "55%", left: 0, width: `${strikeWidth}%`, height: 2.5, backgroundColor: "#000" }} />
        </div>
        <div style={{ gridArea: "1/1", opacity: koulIn, fontSize: 44, fontFamily: CURSIVE, color: "#000" }}>Koulam</div>
      </div>
      <div style={{ fontSize: 9, fontFamily: FONT, fontWeight: 700, color: "#555", letterSpacing: 2, textTransform: "uppercase", textAlign: "center", opacity: subIn, transform: `translateY(${subY}px)` }}>
        Machia'h arrive, soyons prêt à l'accueillir
      </div>
      <div style={{ marginTop: 28, fontSize: 11, fontFamily: FONT, color: "#999", letterSpacing: 1.5, opacity: tapOpacity }}>Appuyez pour commencer</div>
    </div>
  );
};

// ─── Feature Card Panel ─────────────────────────────────────────────

const FeatureCard: React.FC<{
  frame: number;
  fps: number;
  feature: Feature;
  side: "left" | "right";
  localFrame: number;
  duration: number;
}> = ({ fps, feature, side, localFrame, duration }) => {
  const enterProgress = spring({
    frame: Math.max(0, localFrame - 10),
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.7 },
  });
  const exitOpacity = interpolate(localFrame, [duration - 20, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slideX = side === "left" ? interpolate(enterProgress, [0, 1], [-80, 0]) : interpolate(enterProgress, [0, 1], [80, 0]);
  const opacity = enterProgress * exitOpacity;

  if (localFrame < 0 || localFrame > duration) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        [side]: 40,
        width: 440,
        opacity,
        transform: `translateX(${slideX}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: side === "left" ? "flex-start" : "flex-end",
        zIndex: 5,
      }}
    >
      {/* Card image */}
      <div
        style={{
          width: 380,
          height: 380,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 30px ${feature.accent}33`,
          border: `2px solid rgba(255,255,255,0.1)`,
          marginBottom: 24,
          transform: `scale(${interpolate(enterProgress, [0, 1], [0.9, 1])})`,
        }}
      >
        <Img
          src={staticFile(feature.card)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(transparent, ${feature.accent}55)` }} />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 42,
          fontFamily: FONT,
          fontWeight: 800,
          color: "white",
          textShadow: `0 2px 20px ${feature.accent}88`,
          marginBottom: 12,
          textAlign: side,
          opacity: spring({ frame: Math.max(0, localFrame - 18), fps, config: { damping: 200 } }),
        }}
      >
        {feature.title}
      </div>

      {/* Accent line */}
      <div
        style={{
          width: interpolate(spring({ frame: Math.max(0, localFrame - 20), fps, config: { damping: 200 } }), [0, 1], [0, 120]),
          height: 3,
          background: `linear-gradient(90deg, ${feature.accent}, transparent)`,
          borderRadius: 2,
          marginBottom: 14,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          fontSize: 20,
          fontFamily: FONT,
          fontWeight: 500,
          color: "rgba(255,255,255,0.8)",
          lineHeight: 1.5,
          whiteSpace: "pre-line",
          textAlign: side,
          opacity: spring({ frame: Math.max(0, localFrame - 24), fps, config: { damping: 200 } }),
        }}
      >
        {feature.subtitle}
      </div>
    </div>
  );
};

// ─── CTA Overlay ────────────────────────────────────────────────────

const CTAOverlay: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const localFrame = frame - CTA_START;
  if (localFrame < 0) return null;

  const bgOpacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const gradientAngle = interpolate(localFrame, [0, 150], [135, 360]);
  const logoSpring = spring({ frame: localFrame, fps, config: { damping: 10, stiffness: 80, mass: 0.6 } });
  const ctaSpring = spring({ frame: Math.max(0, localFrame - 10), fps, config: { damping: 200 } });
  const btnSpring = spring({ frame: Math.max(0, localFrame - 25), fps, config: { damping: 12, stiffness: 120, mass: 0.5 } });
  const pulseFrame = Math.max(0, localFrame - 50);
  const pulse = Math.sin((pulseFrame / fps) * Math.PI * 2.5) * 0.04;
  const btnScale = btnSpring > 0.9 ? 1 + pulse : interpolate(btnSpring, [0, 1], [0, 1]);

  const particles = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const radius = 250 + (i % 4) * 70;
    const appear = interpolate(localFrame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const drift = localFrame * 0.02 * (0.3 + (i % 3) * 0.2);
    return { x: Math.cos(angle + drift) * radius * appear, y: Math.sin(angle + drift) * radius * appear, size: 3 + (i % 4) * 2, opacity: appear * (0.1 + (i % 3) * 0.12) };
  });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
      <div style={{ position: "absolute", inset: 0, opacity: bgOpacity, background: `linear-gradient(${gradientAngle}deg, #6228d7, #8b2fb8, #ee2a7b, #f26a57, #f9ce34)` }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.2) 100%)" }} />
      {particles.map((p, i) => (
        <div key={i} style={{ position: "absolute", width: p.size, height: p.size, borderRadius: "50%", backgroundColor: "white", opacity: p.opacity, transform: `translate(${p.x}px, ${p.y}px)` }} />
      ))}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        <div style={{ transform: `scale(${interpolate(logoSpring, [0, 1], [0.3, 1])})`, opacity: logoSpring, fontSize: 88, fontFamily: CURSIVE, color: "white", textShadow: "0 4px 40px rgba(0,0,0,0.3)" }}>Koulam</div>
        <div style={{ opacity: ctaSpring, transform: `translateY(${interpolate(ctaSpring, [0, 1], [30, 0])}px)`, fontSize: 36, fontFamily: FONT, fontWeight: 700, color: "white", textAlign: "center", lineHeight: 1.4 }}>
          Votre vie juive,{"\n"}simplifiée.
        </div>
        <div style={{ transform: `scale(${btnScale})`, padding: "22px 60px", borderRadius: 50, backgroundColor: "white", boxShadow: "0 6px 40px rgba(0,0,0,0.3)", marginTop: 12 }}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 26, letterSpacing: 4, textTransform: "uppercase", background: "linear-gradient(135deg, #6228d7, #ee2a7b, #f9ce34)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Coming Soon</span>
        </div>
        <div style={{ opacity: ctaSpring, fontSize: 18, fontFamily: FONT, fontStyle: "italic", color: "rgba(255,255,255,0.65)", textAlign: "center" }}>Machia'h arrive, soyons prêt à l'accueillir</div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Phone animation helpers ────────────────────────────────────────

const getPhoneTransform = (
  effect: TransitionEffect,
  progress: number, // 0 = start of feature, 1 = fully in position
): { x: number; y: number; rotateY: number; rotateX: number; rotateZ: number; scale: number } => {
  const base = { x: 0, y: 0, rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1 };

  switch (effect) {
    case "slide-left":
      return { ...base, x: interpolate(progress, [0, 1], [0, -240]), rotateY: interpolate(progress, [0, 1], [0, 20]) };
    case "slide-right":
      return { ...base, x: interpolate(progress, [0, 1], [0, 240]), rotateY: interpolate(progress, [0, 1], [0, -20]) };
    case "flip":
      return { ...base, x: interpolate(progress, [0, 0.5, 1], [0, 0, -220]), rotateY: interpolate(progress, [0, 0.5, 1], [0, 180, 200]) };
    case "zoom":
      return { ...base, scale: interpolate(progress, [0, 0.4, 1], [1, 1.8, 0.85]), x: interpolate(progress, [0, 0.4, 1], [0, 0, 220]), rotateY: interpolate(progress, [0.4, 1], [0, -15]) };
    case "tilt":
      return { ...base, rotateX: interpolate(progress, [0, 0.4, 1], [0, 20, 5]), x: interpolate(progress, [0, 1], [0, -230]), rotateY: interpolate(progress, [0, 1], [0, 18]) };
    case "spin":
      return { ...base, rotateZ: interpolate(progress, [0, 0.5, 1], [0, 15, 0]), x: interpolate(progress, [0, 1], [0, 230]), rotateY: interpolate(progress, [0, 1], [0, -18]) };
    case "slide-up":
      return { ...base, y: interpolate(progress, [0, 0.5, 1], [0, -400, 0]), x: interpolate(progress, [0.5, 1], [0, -230]), rotateY: interpolate(progress, [0.5, 1], [0, 20]) };
    default:
      return base;
  }
};

// ─── Main Composition ───────────────────────────────────────────────

export const Presentation30s: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PHONE_SCALE = 1.45;

  // Phone entrance
  const entranceSpring = spring({ frame, fps, config: { damping: 14, stiffness: 60, mass: 1 } });
  const entranceScale = interpolate(entranceSpring, [0, 1], [0.6, 1]);
  const entranceY = interpolate(entranceSpring, [0, 1], [300, 0]);

  // Determine current feature
  const featureFrame = frame - INTRO_END;
  const currentFeatureIdx = Math.floor(featureFrame / FEATURE_DURATION);
  const featureLocalFrame = featureFrame - currentFeatureIdx * FEATURE_DURATION;

  // Phone position based on current effect
  let phoneTransform = { x: 0, y: 0, rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1 };

  if (frame >= INTRO_END && frame < CTA_START && currentFeatureIdx < FEATURES.length) {
    const effect = EFFECTS[currentFeatureIdx];
    const transitionProgress = interpolate(
      featureLocalFrame,
      [0, FEATURE_TRANSITION],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }
    );
    phoneTransform = getPhoneTransform(effect, transitionProgress);
  }

  // CTA: phone shrinks away
  const ctaProgress = frame >= CTA_START
    ? interpolate(frame, [CTA_START, CTA_START + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const ctaScale = interpolate(ctaProgress, [0, 1], [1, 0]);

  const finalScale = PHONE_SCALE * entranceScale * phoneTransform.scale * (frame >= CTA_START ? ctaScale : 1);

  // Breathing glow
  const breathe = Math.sin((frame / fps) * Math.PI * 0.8) * 0.5 + 0.5;
  const glowIntensity = interpolate(breathe, [0, 1], [0.15, 0.4]);

  // Current screenshot
  const activeFeature = currentFeatureIdx >= 0 && currentFeatureIdx < FEATURES.length
    ? FEATURES[currentFeatureIdx]
    : FEATURES[0];

  const scrollOffset = frame >= INTRO_END && frame < CTA_START
    ? interpolate(featureLocalFrame, [0.5 * fps, 3.5 * fps], [0, -activeFeature.scrollAmount], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) })
    : 0;

  // Background
  const bgAngle = interpolate(frame, [0, TOTAL_FRAMES], [135, 400]);

  // Feature side for card panel
  const getFeatureSide = (effect: TransitionEffect): "left" | "right" => {
    switch (effect) {
      case "slide-left": case "tilt": case "flip": return "right";
      case "slide-right": case "zoom": case "spin": return "left";
      default: return "right";
    }
  };

  return (
    <AbsoluteFill style={{ background: `linear-gradient(${bgAngle}deg, #0d0d1a 0%, #1a1a2e 40%, #2d1b4e 100%)`, overflow: "hidden" }}>
      {/* Background particles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const dist = 400 + (i % 3) * 120;
        const drift = frame * 0.006 * (0.5 + (i % 3) * 0.3);
        return (
          <div key={i} style={{ position: "absolute", left: 540 + Math.cos(angle + drift) * dist, top: 960 + Math.sin(angle + drift) * dist, width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2, borderRadius: "50%", backgroundColor: i % 3 === 0 ? "#ee2a7b" : i % 3 === 1 ? "#6228d7" : "#f9ce34", opacity: 0.1 }} />
        );
      })}

      {/* Feature card panels */}
      {FEATURES.map((feat, i) => {
        const fStart = INTRO_END + i * FEATURE_DURATION;
        const localF = frame - fStart;
        if (localF < -10 || localF > FEATURE_DURATION + 10) return null;
        const effect = EFFECTS[i];
        const side = getFeatureSide(effect);
        return (
          <FeatureCard
            key={i}
            frame={frame}
            fps={fps}
            feature={feat}
            side={side}
            localFrame={localF}
            duration={FEATURE_DURATION}
          />
        );
      })}

      {/* iPhone */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          perspective: 1200,
          transform: `translate(-50%, -50%) translateX(${phoneTransform.x}px) translateY(${phoneTransform.y + entranceY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            transform: `scale(${finalScale}) rotateY(${phoneTransform.rotateY}deg) rotateX(${phoneTransform.rotateX}deg) rotateZ(${phoneTransform.rotateZ}deg)`,
            transformStyle: "preserve-3d",
            filter: `drop-shadow(0 20px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(245,156,66,${glowIntensity}))`,
            transition: "filter 0.3s",
          }}
        >
          <PhoneMockup>
            {/* Screenshot layers */}
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              {FEATURES.map((feat, i) => {
                const fStart = INTRO_END + i * FEATURE_DURATION;
                const fadeIn = interpolate(frame, [fStart - 8, fStart + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                const isActive = i === currentFeatureIdx && frame >= INTRO_END && frame < CTA_START;
                const scroll = isActive ? scrollOffset : 0;
                return (
                  <div key={i} style={{ position: "absolute", inset: 0, opacity: fadeIn, overflow: "hidden", backgroundColor: "#fafafa", zIndex: i }}>
                    <Img src={staticFile(feat.screenshot)} style={{ width: "100%", height: "auto", transform: `translateY(${scroll}px)` }} />
                  </div>
                );
              })}
              <SplashOverlay frame={frame} fps={fps} />
            </div>
          </PhoneMockup>
        </div>
      </div>

      {/* CTA */}
      <CTAOverlay frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};
