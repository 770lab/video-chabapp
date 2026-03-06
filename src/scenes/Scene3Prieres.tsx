import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";

const SiddurIcon: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    style={{ opacity }}
  >
    <rect
      x="20"
      y="10"
      width="80"
      height="100"
      rx="6"
      fill="url(#bookGrad)"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="2"
    />
    <rect x="20" y="10" width="12" height="100" rx="4" fill="url(#spineGrad)" />
    <g transform="translate(60, 55)">
      <polygon
        points="0,-18 15.6,9 -15.6,9"
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="2.5"
      />
      <polygon
        points="0,18 15.6,-9 -15.6,-9"
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="2.5"
      />
    </g>
    <rect x="42" y="82" width="46" height="3" rx="1.5" fill="rgba(255,255,255,0.4)" />
    <rect x="48" y="90" width="34" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
    <defs>
      <linearGradient id="bookGrad" x1="20" y1="10" x2="100" y2="110">
        <stop offset="0%" stopColor="#6228d7" />
        <stop offset="100%" stopColor="#ee2a7b" />
      </linearGradient>
      <linearGradient id="spineGrad" x1="20" y1="10" x2="32" y2="110">
        <stop offset="0%" stopColor="#4a1fa8" />
        <stop offset="100%" stopColor="#c41656" />
      </linearGradient>
    </defs>
  </svg>
);

export const Scene3Prieres: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 90, mass: 0.7 },
  });

  const iconTranslateX = interpolate(slideIn, [0, 1], [-400, 0]);

  const textSlide = spring({
    frame: frame - Math.floor(0.2 * fps),
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const textTranslateX = interpolate(textSlide, [0, 1], [-300, 0]);
  const textOpacity = interpolate(textSlide, [0, 1], [0, 1]);

  const subtitleSlide = spring({
    frame: frame - Math.floor(0.5 * fps),
    fps,
    config: { damping: 14, stiffness: 70, mass: 0.9 },
  });

  const subtitleTranslateX = interpolate(subtitleSlide, [0, 1], [-300, 0]);
  const subtitleOpacity = interpolate(subtitleSlide, [0, 1], [0, 1]);

  const glowIntensity = interpolate(frame, [0.8 * fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        padding: "0 80px",
        gap: 50,
      }}
    >
      <div
        style={{
          transform: `translateX(${iconTranslateX}px)`,
          filter: `drop-shadow(0 0 ${40 * glowIntensity}px rgba(98, 40, 215, ${0.5 * glowIntensity}))`,
          flexShrink: 0,
        }}
      >
        <SiddurIcon opacity={slideIn} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            transform: `translateX(${textTranslateX}px)`,
            opacity: textOpacity,
            fontSize: 64,
            fontFamily: FONT,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
          }}
        >
          Tefila &{"\n"}
          <span
            style={{
              background:
                "linear-gradient(135deg, #6228d7, #ee2a7b, #f9ce34)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tehilim
          </span>
        </div>
        <div
          style={{
            transform: `translateX(${subtitleTranslateX}px)`,
            opacity: subtitleOpacity,
            fontSize: 30,
            fontFamily: FONT,
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.5,
            maxWidth: 500,
          }}
        >
          Toutes vos prières et Tehilim au même endroit
        </div>
      </div>
    </div>
  );
};
