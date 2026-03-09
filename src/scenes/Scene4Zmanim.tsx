import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";

const ZMANIM_ITEMS = [
  { label: "Alot Hacha'har", time: "05:48" },
  { label: "Nets Ha'hama", time: "06:42" },
  { label: "Sof Zman Chema", time: "09:18" },
  { label: "Sof Zman Tefila", time: "10:22" },
  { label: "Hatsot", time: "12:34" },
  { label: "Min'ha Guedola", time: "13:04" },
  { label: "Min'ha Ketana", time: "16:10" },
  { label: "Chkia", time: "18:26" },
  { label: "Tset Hakokhavim", time: "19:02" },
];

export const Scene4Zmanim: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Scroll to show all items
  const scrollOffset = interpolate(
    frame,
    [1.0 * fps, 2.5 * fps],
    [0, -80],
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
          padding: "68px 18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <div
            style={{
              fontSize: 32,
              fontFamily: FONT,
              fontWeight: 800,
              background: "linear-gradient(135deg, #f9ce34, #ee2a7b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Zmanim
          </div>
          <div
            style={{
              fontSize: 13,
              fontFamily: FONT,
              fontWeight: 500,
              color: "#8e8e8e",
              marginTop: 4,
            }}
          >
            Paris · Jeudi 6 Mars 2026
          </div>
        </div>

        {/* Zmanim list */}
        {ZMANIM_ITEMS.map((item, i) => {
          const delay = 0.2 + i * 0.08;
          const itemSpring = spring({
            frame: frame - Math.floor(delay * fps),
            fps,
            config: { damping: 13, stiffness: 100, mass: 0.5 },
          });

          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 16px",
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #efefef",
                opacity: itemSpring,
                transform: `translateY(${interpolate(itemSpring, [0, 1], [20, 0])}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#262626",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 16,
                  background: "linear-gradient(135deg, #f9ce34, #ee2a7b)",
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
