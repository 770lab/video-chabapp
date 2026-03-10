import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadGrandHotel } from "@remotion/google-fonts/GrandHotel";
import { ASSETS, CARDS, ETUDES, SCENES, VIDEO, fontFamily } from "./config";
import { CircularProgress } from "./components/CircularProgress";

// ─── Fonts ──────────────────────────────────────────────
const { fontFamily: grandHotel } = loadGrandHotel();

// ─── Assets ─────────────────────────────────────────────
const SIDDUR_COVERS = {
  tehilatHachem: staticFile("video2/tehilat-hachem-cover.png"),
  patahEliyahou: staticFile("video2/patah-eliyahou-cover.png"),
};


// ─── Instagram gradient ─────────────────────────────────
const INSTA_GRADIENT =
  "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)";

const instaTextStyle: React.CSSProperties = {
  background: INSTA_GRADIENT,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

// ─── Phone constants ────────────────────────────────────
const PHONE_W = 340;
const PHONE_H = 700;
const PHONE_RADIUS = 50;
const PHONE_BEZEL = 4;
// iPhone 17 orange metallic (warm, saturated, smooth)
const PHONE_COLOR_LIGHT = "#F2A04A";
const PHONE_COLOR_MID = "#E8862B";
const PHONE_COLOR_DARK = "#CC6B18";
const PHONE_COLOR_SHINE = "#FBCA85";
const PHONE_SCALE = 2.7;
const SCREEN_W = PHONE_W - PHONE_BEZEL * 2; // 332

// ─── App frame: header/footer from home screen ──────────
// The homeScreen image includes the status bar area at top.
// The Dynamic Island in our phone covers ~44px from screen top.
// KOULAM + date + avatars = next ~90px below that.
// So header = ~135px to keep KOULAM, date and avatar row visible.
// Tab bar = ~45px at bottom (just the icon row).
const APP_HEADER_H = 160;
const APP_TABBAR_H = 50;

const AppFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: "100%", height: "100%", position: "relative" }}>
    {/* Header: home screen image (top portion) - zIndex 3 to stay above content */}
    <Img
      src={ASSETS.homeScreen}
      style={{
        position: "absolute",
        width: "100%",
        height: APP_HEADER_H,
        objectFit: "cover",
        objectPosition: "top center",
        top: 14,
        left: 0,
        zIndex: 3,
      }}
    />
    {/* Center content area */}
    <div
      style={{
        position: "absolute",
        top: APP_HEADER_H + 14,
        bottom: APP_TABBAR_H,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {children}
    </div>
    {/* Footer tab bar */}
    <Img
      src={ASSETS.homeScreen}
      style={{
        position: "absolute",
        width: "100%",
        height: APP_TABBAR_H,
        objectFit: "cover",
        objectPosition: "bottom center",
        bottom: 0,
        left: 0,
        zIndex: 2,
      }}
    />
    {/* White overlays to hide card tops above tab bar, preserve center Objectifs circle */}
    <div style={{ position: "absolute", bottom: APP_TABBAR_H - 10, left: 0, width: "40%", height: 12, backgroundColor: "#FFFFFF", zIndex: 2 }} />
    <div style={{ position: "absolute", bottom: APP_TABBAR_H - 10, right: 0, width: "40%", height: 12, backgroundColor: "#FFFFFF", zIndex: 2 }} />
  </div>
);

// ═══════════════════════════════════════════════════════════
// SCENE CONTENT COMPONENTS
// ═══════════════════════════════════════════════════════════

// ─── Intro: Star Wars reveal ────────────────────────────
const IntroContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomSpring = spring({
    frame, fps,
    config: { damping: 25, stiffness: 35, mass: 1.2 },
    durationInFrames: 70,
  });
  const scale = interpolate(zoomSpring, [0, 1], [0.02, 1]);
  const z = interpolate(zoomSpring, [0, 1], [-1200, 0]);

  const opacity = interpolate(frame, [0, 10, 85, 115], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const presenEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 55, durationInFrames: 20 });
  const presenOpacity =
    interpolate(presenEntrance, [0, 1], [0, 1]) *
    interpolate(frame, [85, 115], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const presenY = interpolate(presenEntrance, [0, 1], [20, 0]);

  const glowAlpha = 0.15 + 0.08 * Math.sin(frame / 6);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(232,119,46,${glowAlpha}) 0%, transparent 70%)`, transform: `scale(${scale})` }} />
      <div style={{ transform: `perspective(600px) translateZ(${z}px)`, opacity }}>
        <Img src={ASSETS.logo770} style={{ width: 200, height: 200 }} />
      </div>
      <div style={{ fontFamily, fontSize: 22, fontWeight: 500, letterSpacing: 6, marginTop: 16, opacity: presenOpacity, transform: `translateY(${presenY}px)`, ...instaTextStyle }}>
        PRÉSENTE
      </div>
    </div>
  );
};

// ─── Splash: Recreated ──────────────────────────────────
const SplashContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const igEntrance = spring({ frame, fps, config: { damping: 15, stiffness: 100 }, durationInFrames: 20 });
  const igScale = interpolate(igEntrance, [0, 1], [0.7, 1]);
  const igOpacity = interpolate(frame, [0, 10, 40, 55], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const crownEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 50, durationInFrames: 30 });
  const crownOpacity = interpolate(crownEntrance, [0, 1], [0, 1]);
  const crownScale = interpolate(crownEntrance, [0, 1], [0.8, 1]);

  const igTextOpacity = interpolate(frame, [10, 18, 45, 55], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const koulOpacity = interpolate(spring({ frame, fps, config: { damping: 200 }, delay: 55, durationInFrames: 25 }), [0, 1], [0, 1]);

  const subEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 80, durationInFrames: 20 });
  const subOpacity = interpolate(subEntrance, [0, 1], [0, 1]);
  const subY = interpolate(subEntrance, [0, 1], [10, 0]);

  const tapEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 105, durationInFrames: 20 });
  const tapOpacity = interpolate(tapEntrance, [0, 1], [0, 1]);
  const tapPulse = 0.4 + 0.3 * Math.sin(frame * 0.15);

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", padding: "50px 16px 20px" }}>
      <div style={{ position: "absolute", top: 52, right: 14, fontFamily: "serif", fontSize: 16, fontWeight: 700, color: "#1a1a1a", direction: "rtl" as const, opacity: subOpacity }}>
        ב״ה
      </div>

      <div style={{ display: "grid", placeItems: "center", marginBottom: 10 }}>
        <svg viewBox="0 0 100 100" width="100" height="100" style={{ gridArea: "1/1", opacity: igOpacity, transform: `scale(${igScale})` }}>
          <defs>
            <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" /><stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" /><stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect x="5" y="5" width="90" height="90" rx="22" fill="none" stroke="url(#igGrad)" strokeWidth="7" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="url(#igGrad)" strokeWidth="6" />
          <circle cx="74" cy="26" r="5.5" fill="url(#igGrad)" />
        </svg>
        <Img src={staticFile("video2/splash-logo.png")} style={{ gridArea: "1/1", width: 130, height: "auto", opacity: crownOpacity, transform: `scale(${crownScale})` }} />
      </div>

      <div style={{ display: "grid", placeItems: "center", marginBottom: 12, textTransform: "none" as const }}>
        <div style={{ gridArea: "1/1", fontFamily: grandHotel, fontSize: 40, color: "#1a1a1a", opacity: igTextOpacity }}>Instagram</div>
        <div style={{ gridArea: "1/1", fontFamily: grandHotel, fontSize: 40, color: "#1a1a1a", opacity: koulOpacity }}>Koulam</div>
      </div>

      <div style={{ fontFamily, fontSize: 8, fontWeight: 600, letterSpacing: 2, color: "#666", opacity: subOpacity, transform: `translateY(${subY}px)`, textAlign: "center" }}>
        MACHIA&apos;H ARRIVE, SOYONS PRÊT À L&apos;ACCUEILLIR
      </div>

      <div style={{ position: "absolute", bottom: 60, fontFamily, fontSize: 8, letterSpacing: 2, color: "#999", opacity: tapOpacity * tapPulse }}>
        APPUYEZ POUR COMMENCER
      </div>

      <div style={{ position: "absolute", bottom: 24, opacity: tapOpacity * 0.5 }}>
        <Img src={ASSETS.logo770} style={{ height: 30, width: "auto" }} />
      </div>
    </div>
  );
};

// ─── Home ───────────────────────────────────────────────
const HomeContent: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const screenH = PHONE_H - PHONE_BEZEL * 2;
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", opacity: entrance }}>
      {/* Main content (top portion, stops above tab bar) */}
      <Img src={ASSETS.homeScreen} style={{ position: "absolute", width: "100%", height: screenH - APP_TABBAR_H, objectFit: "cover", objectPosition: "top center", top: 14, left: 0 }} />
      {/* White strip to cover card tops above tab bar */}
      <div style={{ position: "absolute", bottom: APP_TABBAR_H, left: 0, right: 0, height: 30, backgroundColor: "#FFFFFF" }} />
      {/* Footer tab bar (bottom strip) */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: APP_TABBAR_H, overflow: "hidden" }}>
        <Img src={ASSETS.homeScreen} style={{ position: "absolute", width: "100%", bottom: 0, left: 0 }} />
        {/* White overlays to hide card tops, preserve center Objectifs circle */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "42%", height: 30, backgroundColor: "#FFFFFF" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "42%", height: 30, backgroundColor: "#FFFFFF" }} />
      </div>
    </div>
  );
};

// ─── Generic Card (compact, inside AppFrame) ────────────
const CardContent: React.FC<{
  cardImage: string;
  cardLabel: string;
  cardSubtitle: string;
  cardBullets: readonly string[];
  isShabbat?: boolean;
  isSmallImage?: boolean;
  imagePosition?: string;
}> = ({ cardImage, cardLabel, cardSubtitle, cardBullets, isShabbat, isSmallImage, imagePosition }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 });
  const imgScale = interpolate(imgEntrance, [0, 1], [0.9, 1]);
  const imgOpacity = interpolate(imgEntrance, [0, 1], [0, 1]);

  const titleEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 8, durationInFrames: 20 });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [15, 0]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 14px", gap: 10, backgroundColor: "#FFFFFF" }}>
      <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: isSmallImage ? "none" : "0 6px 20px rgba(0,0,0,0.1)", width: isSmallImage ? 140 : SCREEN_W - 24, opacity: imgOpacity, transform: `scale(${imgScale})`, flexShrink: 0 }}>
        <Img src={cardImage} style={{ width: "100%", height: isSmallImage ? 140 : 240, objectFit: isSmallImage ? "contain" : isShabbat ? "contain" : "cover", objectPosition: imagePosition || "center", backgroundColor: isShabbat ? "#1a1a2e" : undefined }} />
      </div>

      <div style={{ textAlign: "center", opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontFamily, fontSize: 28, fontWeight: 800, letterSpacing: 2, ...instaTextStyle }}>{cardLabel}</div>
        <div style={{ fontFamily, fontSize: 12, marginTop: 4, color: "#333", fontWeight: 500 }}>{cardSubtitle}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start", width: "100%", paddingLeft: 14 }}>
        {cardBullets.map((bullet, i) => {
          const isHighlight = bullet.startsWith("✦");
          const displayText = isHighlight ? bullet.slice(1) : bullet;
          const bulletDelay = 18 + i * 8;
          const bulletEntrance = spring({ frame, fps, config: { damping: 200 }, delay: bulletDelay, durationInFrames: 20 });
          const pulse = isHighlight ? 0.9 + 0.1 * Math.sin(frame * 0.25) : 1;
          return (
            <div key={bullet} style={{ fontFamily, fontSize: 12, fontWeight: isHighlight ? 800 : 600, ...(isHighlight ? instaTextStyle : { color: "#222" }), opacity: interpolate(bulletEntrance, [0, 1], [0, 1]), transform: `translateY(${interpolate(bulletEntrance, [0, 1], [10, 0])}px) scale(${isHighlight ? pulse : 1})`, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: isHighlight ? 7 : 5, height: isHighlight ? 7 : 5, borderRadius: "50%", background: INSTA_GRADIENT, flexShrink: 0 }} />
              {displayText}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Objectifs (compact) ────────────────────────────────
const ObjectifsContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = CARDS[1];

  const imgEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 });
  const imgScale = interpolate(imgEntrance, [0, 1], [0.9, 1]);
  const imgOpacity = interpolate(imgEntrance, [0, 1], [0, 1]);

  const titleEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 8, durationInFrames: 20 });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [15, 0]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 14px", gap: 10, backgroundColor: "#FFFFFF" }}>
      <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.1)", width: SCREEN_W - 28, opacity: imgOpacity, transform: `scale(${imgScale})`, flexShrink: 0 }}>
        <Img src={card.image} style={{ width: "100%", height: 190, objectFit: "cover" }} />
      </div>
      <div style={{ textAlign: "center", opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontFamily, fontSize: 24, fontWeight: 800, letterSpacing: 2, ...instaTextStyle }}>{card.label}</div>
        <div style={{ fontFamily, fontSize: 11, color: "#333", marginTop: 3, fontWeight: 500 }}>{card.subtitle}</div>
      </div>
      <div style={{ transform: "scale(0.5)", transformOrigin: "center center", marginTop: -8 }}>
        <CircularProgress targetCount={9} totalCount={13} delay={20} />
      </div>
    </div>
  );
};

// ─── Tefila (compact, with siddur covers) ───────────────
const TefilaContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = CARDS[2];

  const imgEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 });
  const imgScale = interpolate(imgEntrance, [0, 1], [0.9, 1]);
  const imgOpacity = interpolate(imgEntrance, [0, 1], [0, 1]);

  const titleEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 8, durationInFrames: 20 });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [15, 0]);

  const coversEntrance = spring({ frame, fps, config: { damping: 15, stiffness: 120 }, delay: 30, durationInFrames: 25 });
  const coversScale = interpolate(coversEntrance, [0, 1], [0.5, 1]);
  const coversOpacity = interpolate(coversEntrance, [0, 1], [0, 1]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6px 14px", gap: 6, backgroundColor: "#FFFFFF" }}>
      <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.1)", width: SCREEN_W - 24, opacity: imgOpacity, transform: `scale(${imgScale})`, flexShrink: 0 }}>
        <Img src={card.image} style={{ width: "100%", height: 200, objectFit: "cover" }} />
      </div>
      <div style={{ textAlign: "center", opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontFamily, fontSize: 24, fontWeight: 800, letterSpacing: 2, ...instaTextStyle }}>{card.label}</div>
        <div style={{ fontFamily, fontSize: 11, marginTop: 2, color: "#333", fontWeight: 500 }}>{card.subtitle}</div>
      </div>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", opacity: coversOpacity, transform: `scale(${coversScale})` }}>
        {[
          { src: SIDDUR_COVERS.tehilatHachem, label: "TEHILAT HACHEM" },
          { src: SIDDUR_COVERS.patahEliyahou, label: "PATAKH ELIYAHOU" },
        ].map((siddur) => (
          <div key={siddur.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ borderRadius: 6, overflow: "hidden", boxShadow: "0 3px 10px rgba(0,0,0,0.12)", width: 65, height: 95, backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={siddur.src} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ fontFamily, fontSize: 7, fontWeight: 700, textAlign: "center", ...instaTextStyle }}>{siddur.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Études (compact) ───────────────────────────────────
const EtudesContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 8px", gap: 10, backgroundColor: "#FFFFFF" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily, fontSize: 20, fontWeight: 800, letterSpacing: 1, ...instaTextStyle, opacity: interpolate(spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 }), [0, 1], [0, 1]) }}>
          ÉTUDES QUOTIDIENNES
        </div>
        <div style={{ fontFamily, fontSize: 10, color: "#555", marginTop: 3, opacity: interpolate(spring({ frame, fps, config: { damping: 200 }, delay: 10, durationInFrames: 20 }), [0, 1], [0, 1]) }}>
          TOUT TON LIMOUD EN UN SEUL ENDROIT
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", width: "100%" }}>
        {ETUDES.map((etude, i) => {
          const delay = 10 + i * 8;
          const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 120 }, delay, durationInFrames: 25 });
          const scale = interpolate(entrance, [0, 1], [0.5, 1]);
          const opacity = interpolate(entrance, [0, 1], [0, 1]);
          return (
            <div key={etude.label} style={{ width: 140, opacity, transform: `scale(${scale})` }}>
              <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 3px 10px rgba(0,0,0,0.08)" }}>
                <Img src={etude.image} style={{ width: "100%", height: 140, objectFit: "cover" }} />
              </div>
              <div style={{ fontFamily, fontSize: 10, fontWeight: 700, textAlign: "center", marginTop: 3, ...instaTextStyle }}>{etude.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Halakh'IA (compact) ────────────────────────────────
const HalakhiaContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = CARDS[9];

  const emojiEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 });
  const emojiScale = interpolate(emojiEntrance, [0, 1], [0.5, 1]);
  const emojiOpacity = interpolate(emojiEntrance, [0, 1], [0, 1]);

  const titleEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 8, durationInFrames: 20 });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [15, 0]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 14px", gap: 12, backgroundColor: "#FFFFFF" }}>
      <div style={{ fontSize: 70, opacity: emojiOpacity, transform: `scale(${emojiScale})` }}>⚖️</div>
      <div style={{ textAlign: "center", opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontFamily, fontSize: 28, fontWeight: 800, letterSpacing: 2, ...instaTextStyle }}>{card.label}</div>
        <div style={{ fontFamily, fontSize: 12, color: "#333", marginTop: 4, fontWeight: 500 }}>{card.subtitle}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start", width: "100%", paddingLeft: 14 }}>
        {card.bullets.map((bullet, i) => {
          const bulletDelay = 18 + i * 8;
          const bulletEntrance = spring({ frame, fps, config: { damping: 200 }, delay: bulletDelay, durationInFrames: 20 });
          return (
            <div key={bullet} style={{ fontFamily, fontSize: 12, fontWeight: 600, color: "#222", opacity: interpolate(bulletEntrance, [0, 1], [0, 1]), transform: `translateY(${interpolate(bulletEntrance, [0, 1], [10, 0])}px)`, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: 3, background: INSTA_GRADIENT, flexShrink: 0 }} />
              {bullet}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Outro ──────────────────────────────────────────────
const OutroContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const crownEntrance = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, durationInFrames: 30 });
  const crownScale = interpolate(crownEntrance, [0, 1], [0.5, 1]);
  const crownOpacity = interpolate(crownEntrance, [0, 1], [0, 1]);

  const nameEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 20, durationInFrames: 20 });
  const nameOpacity = interpolate(nameEntrance, [0, 1], [0, 1]);
  const nameY = interpolate(nameEntrance, [0, 1], [15, 0]);

  const subEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 35, durationInFrames: 20 });
  const subOpacity = interpolate(subEntrance, [0, 1], [0, 1]);

  const bdEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 55, durationInFrames: 20 });
  const bdOpacity = interpolate(bdEntrance, [0, 1], [0, 1]);
  const bdScale = interpolate(bdEntrance, [0, 1], [0.9, 1]);

  const followEntrance = spring({ frame, fps, config: { damping: 200 }, delay: 75, durationInFrames: 20 });
  const followOpacity = interpolate(followEntrance, [0, 1], [0, 1]);

  return (
    <div style={{ width: "100%", height: "100%", background: INSTA_GRADIENT, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "50px 14px 20px", gap: 10 }}>
      <Img src={ASSETS.crown} style={{ width: 120, height: 120, opacity: crownOpacity, transform: `scale(${crownScale})` }} />
      <div style={{ fontFamily, fontSize: 42, fontWeight: 800, color: "#FFFFFF", letterSpacing: 3, textShadow: "0 2px 15px rgba(0,0,0,0.3)", opacity: nameOpacity, transform: `translateY(${nameY}px)` }}>KOULAM</div>
      <div style={{ fontFamily, fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.9)", textAlign: "center", letterSpacing: 1, opacity: subOpacity }}>LE RETOUR DE TOUT LE PEUPLE</div>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 12, padding: "10px 24px", marginTop: 14, textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", opacity: bdOpacity, transform: `scale(${bdScale})` }}>
        <span style={{ fontFamily, fontSize: 18, fontWeight: 800, background: INSTA_GRADIENT, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>BIENTÔT DISPONIBLE</span>
      </div>
      <div style={{ fontFamily, fontSize: 16, fontWeight: 700, color: "#FFFFFF", letterSpacing: 1, marginTop: 6, textShadow: "0 1px 10px rgba(0,0,0,0.2)", opacity: followOpacity * (0.5 + 0.5 * Math.sin(frame * 0.3)) }}>SUIVEZ @KOUL.AM</div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════
export const ChabappPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone entrance: scale in + full 360° spin
  const phoneEntrance = spring({ frame, fps, config: { damping: 14, stiffness: 60 }, durationInFrames: 40 });
  const phoneScaleFactor = interpolate(phoneEntrance, [0, 1], [0, PHONE_SCALE]);

  // 360° spin only during intro
  const spinSpring = spring({ frame, fps, config: { damping: 30, stiffness: 30, mass: 1.5 }, durationInFrames: 100 });
  const rotY = frame < SCENES.splash.from ? spinSpring * 360 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", textTransform: "uppercase" as const }}>
      {/* ─── Whoosh sound on intro 360° spin ─── */}
      <Sequence from={0} durationInFrames={SCENES.intro.duration}>
        <Audio src={staticFile("whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* ─── Music (starts at splash) ─── */}
      <Sequence from={SCENES.splash.from}>
        <Audio
          src={staticFile("av fried.mp3")}
          volume={(f) => {
            const g = f + SCENES.splash.from;
            return interpolate(
              g,
              [SCENES.splash.from, SCENES.splash.from + 30, VIDEO.durationInFrames - 60, VIDEO.durationInFrames],
              [0, 0.4, 0.4, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
          }}
          loop
        />
      </Sequence>

      {/* ─── Single persistent phone ─── */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", perspective: 1800 }}>
        <div
          style={{
            position: "relative",
            width: PHONE_W,
            height: PHONE_H,
            transform: `scale(${phoneScaleFactor}) rotateY(${rotY}deg)`,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Phone body */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: PHONE_RADIUS,
            background: `linear-gradient(160deg, ${PHONE_COLOR_SHINE} 0%, ${PHONE_COLOR_LIGHT} 12%, ${PHONE_COLOR_MID} 35%, ${PHONE_COLOR_DARK} 55%, ${PHONE_COLOR_MID} 75%, ${PHONE_COLOR_LIGHT} 90%, ${PHONE_COLOR_SHINE} 100%)`,
            boxShadow: `
              0 0 0 0.5px ${PHONE_COLOR_DARK},
              0 0 0 1px rgba(255,255,255,0.3),
              0 30px 80px rgba(0,0,0,0.35),
              0 8px 25px rgba(0,0,0,0.2),
              inset 0 1px 0 rgba(255,255,255,0.5),
              inset 0 -1px 0 rgba(0,0,0,0.15),
              inset 1.5px 0 3px rgba(255,255,255,0.2),
              inset -1.5px 0 3px rgba(0,0,0,0.1)
            `,
            backfaceVisibility: "hidden" as const,
          }} />
          {/* Left edge light reflection */}
          <div style={{ position: "absolute", top: 50, left: 0, width: 1.5, height: PHONE_H - 100, borderRadius: 1, background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 15%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.4) 80%, transparent 100%)`, zIndex: 1 }} />
          {/* Right edge subtle shadow */}
          <div style={{ position: "absolute", top: 50, right: 0, width: 1, height: PHONE_H - 100, borderRadius: 1, background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.08) 70%, transparent 100%)`, zIndex: 1 }} />

          {/* Screen */}
          <div style={{ position: "absolute", top: PHONE_BEZEL, left: PHONE_BEZEL, right: PHONE_BEZEL, bottom: PHONE_BEZEL, borderRadius: PHONE_RADIUS - PHONE_BEZEL, overflow: "hidden", backgroundColor: "#FFFFFF", backfaceVisibility: "hidden" as const }}>

            {/* Intro + Splash + Home: full screen */}
            <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.duration}>
              <IntroContent />
            </Sequence>
            <Sequence from={SCENES.splash.from} durationInFrames={SCENES.splash.duration}>
              <SplashContent />
            </Sequence>
            <Sequence from={SCENES.home.from} durationInFrames={SCENES.home.duration}>
              <HomeContent />
            </Sequence>

            {/* Card scenes: inside AppFrame (persistent header/footer) */}
            <Sequence from={SCENES.shabbat.from} durationInFrames={SCENES.shabbat.duration}>
              <AppFrame><CardContent cardImage={CARDS[0].image} cardLabel={CARDS[0].label} cardSubtitle={CARDS[0].subtitle} cardBullets={CARDS[0].bullets} isShabbat /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.objectifs.from} durationInFrames={SCENES.objectifs.duration}>
              <AppFrame><ObjectifsContent /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.tefila.from} durationInFrames={SCENES.tefila.duration}>
              <AppFrame><TefilaContent /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.tehilim.from} durationInFrames={SCENES.tehilim.duration}>
              <AppFrame><CardContent cardImage={CARDS[3].image} cardLabel={CARDS[3].label} cardSubtitle={CARDS[3].subtitle} cardBullets={CARDS[3].bullets} /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.ayeka.from} durationInFrames={SCENES.ayeka.duration}>
              <AppFrame><CardContent cardImage={CARDS[4].image} cardLabel={CARDS[4].label} cardSubtitle={CARDS[4].subtitle} cardBullets={CARDS[4].bullets} /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.rabbi.from} durationInFrames={SCENES.rabbi.duration}>
              <AppFrame><CardContent cardImage={CARDS[5].image} cardLabel={CARDS[5].label} cardSubtitle={CARDS[5].subtitle} cardBullets={CARDS[5].bullets} imagePosition="top center" /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.club.from} durationInFrames={SCENES.club.duration}>
              <AppFrame><CardContent cardImage={CARDS[6].image} cardLabel={CARDS[6].label} cardSubtitle={CARDS[6].subtitle} cardBullets={CARDS[6].bullets} /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.jewtube.from} durationInFrames={SCENES.jewtube.duration}>
              <AppFrame><CardContent cardImage={CARDS[7].image} cardLabel={CARDS[7].label} cardSubtitle={CARDS[7].subtitle} cardBullets={CARDS[7].bullets} /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.tsedakif.from} durationInFrames={SCENES.tsedakif.duration}>
              <AppFrame><CardContent cardImage={CARDS[8].image} cardLabel={CARDS[8].label} cardSubtitle={CARDS[8].subtitle} cardBullets={CARDS[8].bullets} isSmallImage /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.halakhia.from} durationInFrames={SCENES.halakhia.duration}>
              <AppFrame><HalakhiaContent /></AppFrame>
            </Sequence>
            <Sequence from={SCENES.etudes.from} durationInFrames={SCENES.etudes.duration}>
              <AppFrame><EtudesContent /></AppFrame>
            </Sequence>

            {/* Outro: full screen (no AppFrame) */}
            <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.duration}>
              <OutroContent />
            </Sequence>
          </div>

          {/* Back face (visible during 360° spin) */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: PHONE_RADIUS,
            overflow: "hidden",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden" as const,
          }}>
            <Img src={ASSETS.iphoneBack} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Dynamic Island */}
          <div style={{ position: "absolute", top: PHONE_BEZEL + 10, left: "50%", transform: "translateX(-50%)", width: 115, height: 34, backgroundColor: "#000", borderRadius: 17, zIndex: 10, backfaceVisibility: "hidden" as const }} />

          {/* Buttons */}
          {/* Side buttons */}
          <div style={{ position: "absolute", right: -2, top: 180, width: 2.5, height: 55, background: `linear-gradient(180deg, ${PHONE_COLOR_LIGHT}, ${PHONE_COLOR_MID}, ${PHONE_COLOR_LIGHT})`, borderRadius: "0 1.5px 1.5px 0", boxShadow: "1px 0 2px rgba(0,0,0,0.2)" }} />
          <div style={{ position: "absolute", left: -2, top: 150, width: 2.5, height: 28, background: `linear-gradient(180deg, ${PHONE_COLOR_LIGHT}, ${PHONE_COLOR_MID}, ${PHONE_COLOR_LIGHT})`, borderRadius: "1.5px 0 0 1.5px", boxShadow: "-1px 0 2px rgba(0,0,0,0.2)" }} />
          <div style={{ position: "absolute", left: -2, top: 195, width: 2.5, height: 45, background: `linear-gradient(180deg, ${PHONE_COLOR_LIGHT}, ${PHONE_COLOR_MID}, ${PHONE_COLOR_LIGHT})`, borderRadius: "1.5px 0 0 1.5px", boxShadow: "-1px 0 2px rgba(0,0,0,0.2)" }} />
          <div style={{ position: "absolute", left: -2, top: 252, width: 2.5, height: 45, background: `linear-gradient(180deg, ${PHONE_COLOR_LIGHT}, ${PHONE_COLOR_MID}, ${PHONE_COLOR_LIGHT})`, borderRadius: "1.5px 0 0 1.5px", boxShadow: "-1px 0 2px rgba(0,0,0,0.2)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
