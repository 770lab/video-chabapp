import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";

const CENTERS = [
  { name: "Beth Chabad Paris 11", address: "17 Rue des Bluets", dist: "0.8 km" },
  { name: "Beth Chabad Marais", address: "22 Rue des Rosiers", dist: "1.2 km" },
  { name: "Beth Loubavitch", address: "8 Rue Lamartine", dist: "2.1 km" },
  { name: "Beth Chabad Vincennes", address: "5 Av. de Paris", dist: "4.3 km" },
];

export const Scene5Communaute: React.FC = () => {
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
          gap: 14,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <div
            style={{
              fontSize: 32,
              fontFamily: FONT,
              fontWeight: 800,
              background: "linear-gradient(135deg, #6228d7, #ee2a7b, #f9ce34)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Beth Chabad
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
            Trouvez votre communauté
          </div>
        </div>

        {/* Map placeholder */}
        <div
          style={{
            borderRadius: 16,
            height: 160,
            background: "linear-gradient(135deg, #e8e0f0, #f0e0ea, #f5ebd5)",
            border: "1px solid #efefef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`h${i}`}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: i * 32,
                height: 1,
                backgroundColor: "rgba(0,0,0,0.04)",
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`v${i}`}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: i * 44,
                width: 1,
                backgroundColor: "rgba(0,0,0,0.04)",
              }}
            />
          ))}
          {/* Pin markers */}
          {[
            { x: "30%", y: "40%" },
            { x: "55%", y: "30%" },
            { x: "70%", y: "60%" },
            { x: "40%", y: "70%" },
          ].map((pos, i) => {
            const pinSpring = spring({
              frame: frame - Math.floor((0.4 + i * 0.15) * fps),
              fps,
              config: { damping: 10, stiffness: 150, mass: 0.4 },
            });
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y,
                  transform: `scale(${pinSpring}) translate(-50%, -100%)`,
                  fontSize: 22,
                }}
              >
                📍
              </div>
            );
          })}
          <div
            style={{
              fontSize: 12,
              fontFamily: FONT,
              fontWeight: 600,
              color: "#8e8e8e",
              position: "absolute",
              bottom: 8,
              right: 12,
              backgroundColor: "rgba(255,255,255,0.8)",
              padding: "2px 8px",
              borderRadius: 6,
            }}
          >
            🇫🇷 Paris
          </div>
        </div>

        {/* Centers list */}
        <div
          style={{
            fontSize: 11,
            fontFamily: FONT,
            fontWeight: 700,
            color: "#8e8e8e",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          À proximité
        </div>

        {CENTERS.map((center, i) => {
          const delay = 0.6 + i * 0.12;
          const cardSpring = spring({
            frame: frame - Math.floor(delay * fps),
            fps,
            config: { damping: 13, stiffness: 100, mass: 0.6 },
          });

          return (
            <div
              key={center.name}
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #dbdbdb",
                borderLeft: "3px solid #6228d7",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: cardSpring,
                transform: `translateX(${interpolate(cardSpring, [0, 1], [150, 0])}px)`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#262626",
                  }}
                >
                  {center.name}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#8e8e8e",
                    marginTop: 2,
                  }}
                >
                  {center.address}
                </div>
              </div>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#6228d7",
                }}
              >
                {center.dist}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
