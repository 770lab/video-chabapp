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

const IPhoneMockup: React.FC = () => {
  return (
    <div
      style={{
        width: 340,
        height: 700,
        borderRadius: 50,
        border: "4px solid rgba(255,255,255,0.15)",
        backgroundColor: "#fafafa",
        position: "relative",
        overflow: "hidden",
        boxShadow:
          "0 0 60px rgba(98, 40, 215, 0.3), 0 0 120px rgba(238, 42, 123, 0.15)",
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 160,
          height: 34,
          backgroundColor: "#000",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          zIndex: 10,
        }}
      />
      {/* Screen content */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 16,
          right: 16,
          bottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* App header */}
        <div
          style={{
            fontSize: 24,
            fontFamily: FONT,
            fontWeight: 800,
            color: "#000",
            textAlign: "center",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          Chab'app
        </div>
        {/* Menu items matching real app */}
        {MENU_ITEMS.map((item) => (
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
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: item.color,
                opacity: 0.9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 17,
                color: "#262626",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene2Mockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 80,
      mass: 0.8,
    },
  });

  const translateY = interpolate(slideUp, [0, 1], [800, 0]);

  const shadowOpacity = interpolate(slideUp, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          filter: `drop-shadow(0 0 80px rgba(98, 40, 215, ${0.4 * shadowOpacity}))`,
        }}
      >
        <IPhoneMockup />
      </div>
    </div>
  );
};
