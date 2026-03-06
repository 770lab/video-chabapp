import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const ZMANIM_ITEMS = [
  { label: "Nets Ha'hama", time: "06:42", icon: "☀" },
  { label: "Chema", time: "09:18", icon: "✡" },
  { label: "Hatsot", time: "12:34", icon: "◐" },
  { label: "Chkia", time: "18:26", icon: "🌙" },
];

const SunIcon: React.FC<{ progress: number }> = ({ progress }) => {
  const rotation = interpolate(progress, [0, 1], [-90, 0]);
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <g transform={`translate(60,60) rotate(${rotation})`}>
        {/* Sun circle */}
        <circle r="24" fill="url(#sunGrad)" />
        {/* Rays */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="-3"
            y="-44"
            width="6"
            height="14"
            rx="3"
            fill="#fcb045"
            opacity={0.8}
            transform={`rotate(${i * 45})`}
          />
        ))}
      </g>
      <defs>
        <linearGradient id="sunGrad" x1="-24" y1="-24" x2="24" y2="24">
          <stop offset="0%" stopColor="#fcb045" />
          <stop offset="100%" stopColor="#fd1d1d" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Scene4Zmanim: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconEntry = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 90, mass: 0.7 },
  });

  const iconTranslateX = interpolate(iconEntry, [0, 1], [-400, 0]);

  const titleSlide = spring({
    frame: frame - Math.floor(0.15 * fps),
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const titleTranslateX = interpolate(titleSlide, [0, 1], [-300, 0]);
  const titleOpacity = interpolate(titleSlide, [0, 1], [0, 1]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        padding: "0 80px",
        gap: 50,
      }}
    >
      {/* Top row: icon + title */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 40,
          alignSelf: "flex-start",
        }}
      >
        <div
          style={{
            transform: `translateX(${iconTranslateX}px)`,
            filter: `drop-shadow(0 0 30px rgba(252, 176, 69, ${0.5 * iconEntry}))`,
            flexShrink: 0,
          }}
        >
          <SunIcon progress={iconEntry} />
        </div>
        <div
          style={{
            transform: `translateX(${titleTranslateX}px)`,
            opacity: titleOpacity,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontFamily,
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Zmanim
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily,
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Horaires halakhiques en temps réel
          </div>
        </div>
      </div>

      {/* Zmanim list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          width: "100%",
        }}
      >
        {ZMANIM_ITEMS.map((item, i) => {
          const delay = 0.4 + i * 0.15;
          const itemSpring = spring({
            frame: frame - Math.floor(delay * fps),
            fps,
            config: { damping: 13, stiffness: 100, mass: 0.6 },
          });
          const itemTranslateX = interpolate(itemSpring, [0, 1], [-500, 0]);
          const itemOpacity = interpolate(itemSpring, [0, 1], [0, 1]);

          return (
            <div
              key={item.label}
              style={{
                transform: `translateX(${itemTranslateX}px)`,
                opacity: itemOpacity,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 28px",
                borderRadius: 20,
                background:
                  "linear-gradient(135deg, rgba(252,176,69,0.1), rgba(253,29,29,0.08))",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily,
                    fontWeight: 600,
                    fontSize: 26,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily,
                  fontWeight: 700,
                  fontSize: 28,
                  background:
                    "linear-gradient(135deg, #fcb045, #fd1d1d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
