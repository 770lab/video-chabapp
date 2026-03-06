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

const MEMBERS = [
  { name: "David", color: "#833ab4" },
  { name: "Sarah", color: "#fd1d1d" },
  { name: "Moshe", color: "#fcb045" },
  { name: "Rachel", color: "#833ab4" },
  { name: "Yaakov", color: "#fd1d1d" },
];

const PeopleIcon: React.FC<{ progress: number }> = ({ progress }) => {
  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      style={{ transform: `scale(${scale})`, opacity: progress }}
    >
      {/* Center person */}
      <circle cx="60" cy="38" r="14" fill="url(#pGrad1)" />
      <path
        d="M36 82c0-13.3 10.7-24 24-24s24 10.7 24 24"
        stroke="url(#pGrad1)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left person */}
      <circle cx="28" cy="48" r="10" fill="url(#pGrad2)" opacity="0.7" />
      <path
        d="M12 80c0-8.8 7.2-16 16-16s16 7.2 16 16"
        stroke="url(#pGrad2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Right person */}
      <circle cx="92" cy="48" r="10" fill="url(#pGrad3)" opacity="0.7" />
      <path
        d="M76 80c0-8.8 7.2-16 16-16s16 7.2 16 16"
        stroke="url(#pGrad3)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <defs>
        <linearGradient id="pGrad1" x1="40" y1="30" x2="80" y2="80">
          <stop offset="0%" stopColor="#833ab4" />
          <stop offset="100%" stopColor="#fd1d1d" />
        </linearGradient>
        <linearGradient id="pGrad2" x1="12" y1="40" x2="44" y2="80">
          <stop offset="0%" stopColor="#fd1d1d" />
          <stop offset="100%" stopColor="#fcb045" />
        </linearGradient>
        <linearGradient id="pGrad3" x1="76" y1="40" x2="108" y2="80">
          <stop offset="0%" stopColor="#fcb045" />
          <stop offset="100%" stopColor="#833ab4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Scene5Communaute: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconEntry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85, mass: 0.7 },
  });

  const iconScale = interpolate(iconEntry, [0, 1], [0.3, 1]);

  const titleSlide = spring({
    frame: frame - Math.floor(0.15 * fps),
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const titleTranslateX = interpolate(titleSlide, [0, 1], [-300, 0]);
  const titleOpacity = interpolate(titleSlide, [0, 1], [0, 1]);

  const subtitleSlide = spring({
    frame: frame - Math.floor(0.35 * fps),
    fps,
    config: { damping: 14, stiffness: 70, mass: 0.9 },
  });

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
      {/* Top: icon + title */}
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
            transform: `scale(${iconScale})`,
            filter: `drop-shadow(0 0 35px rgba(131, 58, 180, ${0.5 * iconEntry}))`,
            flexShrink: 0,
          }}
        >
          <PeopleIcon progress={iconEntry} />
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
                "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Communauté
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily,
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              opacity: subtitleSlide,
              transform: `translateX(${interpolate(subtitleSlide, [0, 1], [-200, 0])}px)`,
            }}
          >
            Connectez-vous avec votre communauté
          </div>
        </div>
      </div>

      {/* Members bubbles */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {MEMBERS.map((member, i) => {
          const delay = 0.5 + i * 0.12;
          const bubbleSpring = spring({
            frame: frame - Math.floor(delay * fps),
            fps,
            config: { damping: 12, stiffness: 120, mass: 0.5 },
          });
          const bubbleScale = interpolate(bubbleSpring, [0, 1], [0, 1]);

          return (
            <div
              key={member.name}
              style={{
                transform: `scale(${bubbleScale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  fontFamily,
                  fontWeight: 700,
                  color: "white",
                  boxShadow: `0 0 20px ${member.color}44`,
                }}
              >
                {member.name[0]}
              </div>
              <span
                style={{
                  fontFamily,
                  fontWeight: 400,
                  fontSize: 20,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {member.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Connection lines animation */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
        }}
      >
        {["Événements", "Minyanim", "Entraide"].map((tag, i) => {
          const tagDelay = 1.0 + i * 0.15;
          const tagSpring = spring({
            frame: frame - Math.floor(tagDelay * fps),
            fps,
            config: { damping: 13, stiffness: 100, mass: 0.6 },
          });

          return (
            <div
              key={tag}
              style={{
                opacity: tagSpring,
                transform: `translateY(${interpolate(tagSpring, [0, 1], [30, 0])}px)`,
                padding: "12px 24px",
                borderRadius: 30,
                background:
                  "linear-gradient(135deg, rgba(131,58,180,0.2), rgba(253,29,29,0.15))",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily,
                fontWeight: 600,
                fontSize: 22,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};
