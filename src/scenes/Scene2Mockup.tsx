import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";

const MENU_ITEMS = [
  { label: "Tefila", color: "#6228d7" },
  { label: "Tehilim", color: "#8b2fb8" },
  { label: "Hayom Yom", color: "#b43599" },
  { label: "Tanya", color: "#ee2a7b" },
  { label: "Rambam", color: "#f26a57" },
  { label: "'Houmach", color: "#f59c42" },
  { label: "Beth Chabad", color: "#f9ce34" },
];

export const Scene2Mockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Gentle scroll
  const scrollOffset = interpolate(
    frame,
    [0.8 * fps, 2.5 * fps],
    [0, -50],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fafafa",
        overflow: "hidden",
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          transform: `translateY(${scrollOffset}px)`,
          padding: "60px 14px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* ב״ה */}
        <div
          style={{
            textAlign: "right",
            fontSize: 16,
            fontWeight: 700,
            color: "#000",
            fontFamily: "serif",
          }}
        >
          ב״ה
        </div>

        {/* App header */}
        <div
          style={{
            fontSize: 26,
            fontFamily: FONT,
            fontWeight: 800,
            color: "#000",
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Chab'app
        </div>

        {/* Date */}
        <div
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#8e8e8e",
            fontFamily: FONT,
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          Jeudi 6 Mars 2026 · 6 Adar II 5786
        </div>

        {/* Shabbat card */}
        <div
          style={{
            borderRadius: 12,
            background: "linear-gradient(135deg, #1a1a2e, #2d1b4e)",
            padding: "16px 14px",
            color: "white",
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            Parashat Vayikra
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              fontFamily: FONT,
              opacity: 0.8,
            }}
          >
            <span>Allumage 18:24</span>
            <span>Havdalah 19:28</span>
          </div>
        </div>

        {/* Menu items */}
        {MENU_ITEMS.map((item, i) => {
          const itemDelay = 0.3 + i * 0.08;
          const itemSpring = spring({
            frame: frame - Math.floor(itemDelay * fps),
            fps,
            config: { damping: 14, stiffness: 100, mass: 0.6 },
          });
          const itemX = interpolate(itemSpring, [0, 1], [200, 0]);

          return (
            <div
              key={item.label}
              style={{
                width: "100%",
                padding: "14px 14px",
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #dbdbdb",
                borderLeft: `3px solid ${item.color}`,
                display: "flex",
                alignItems: "center",
                gap: 12,
                transform: `translateX(${itemX}px)`,
                opacity: itemSpring,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: item.color,
                  opacity: 0.9,
                }}
              />
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#262626",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
