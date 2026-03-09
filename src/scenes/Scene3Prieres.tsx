import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";

const PRAYERS = [
  "Cha'harit",
  "Min'ha",
  "Arvit",
  "Kriat Chéma al Hamita",
];

export const Scene3Prieres: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

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
          padding: "68px 18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 13,
              fontFamily: FONT,
              fontWeight: 600,
              color: "#8e8e8e",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Tefila
          </div>
          <div
            style={{
              fontSize: 32,
              fontFamily: FONT,
              fontWeight: 800,
              background: "linear-gradient(135deg, #6228d7, #ee2a7b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Prières & Tehilim
          </div>
        </div>

        {/* Star of David icon */}
        <div style={{ textAlign: "center", margin: "4px 0" }}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <polygon
              points="25,5 42,38 8,38"
              fill="none"
              stroke="#6228d7"
              strokeWidth="2"
              opacity="0.6"
            />
            <polygon
              points="25,45 42,12 8,12"
              fill="none"
              stroke="#ee2a7b"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Prayer list */}
        {PRAYERS.map((prayer, i) => {
          const delay = 0.3 + i * 0.12;
          const itemSpring = spring({
            frame: frame - Math.floor(delay * fps),
            fps,
            config: { damping: 14, stiffness: 100, mass: 0.6 },
          });

          return (
            <div
              key={prayer}
              style={{
                padding: "16px 16px",
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #dbdbdb",
                borderLeft: "3px solid #6228d7",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: itemSpring,
                transform: `translateX(${interpolate(itemSpring, [0, 1], [150, 0])}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#262626",
                }}
              >
                {prayer}
              </span>
              <span style={{ fontSize: 16, color: "#c7c7c7" }}>›</span>
            </div>
          );
        })}

        {/* Tehilim section */}
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            fontFamily: FONT,
            fontWeight: 700,
            color: "#8e8e8e",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Tehilim
        </div>
        {[1, 2, 3].map((book, i) => {
          const delay = 0.8 + i * 0.1;
          const bookSpring = spring({
            frame: frame - Math.floor(delay * fps),
            fps,
            config: { damping: 14, stiffness: 100, mass: 0.6 },
          });

          return (
            <div
              key={book}
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #dbdbdb",
                borderLeft: "3px solid #8b2fb8",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: bookSpring,
                transform: `translateX(${interpolate(bookSpring, [0, 1], [150, 0])}px)`,
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
                Livre {book}
              </span>
              <span style={{ fontSize: 16, color: "#c7c7c7" }}>›</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
