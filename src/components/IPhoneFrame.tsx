import React from "react";

const FONT =
  "system-ui, -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif";
const ORANGE = "#f59c42";
const ORANGE_DARK = "#e08830";

export const SCREEN_WIDTH = 348;
export const SCREEN_HEIGHT = 728;

export const IPhoneFrame: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        width: 372,
        height: 760,
        borderRadius: 54,
        border: `6px solid ${ORANGE}`,
        backgroundColor: "#000",
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 0 0 2px ${ORANGE_DARK},
          inset 0 0 0 2px rgba(0,0,0,0.3),
          0 20px 60px rgba(0,0,0,0.15),
          0 0 80px rgba(245, 156, 66, 0.2)
        `,
      }}
    >
      {/* Side button (right) */}
      <div
        style={{
          position: "absolute",
          right: -9,
          top: 160,
          width: 4,
          height: 50,
          borderRadius: 2,
          backgroundColor: ORANGE,
        }}
      />
      {/* Volume buttons (left) */}
      <div
        style={{
          position: "absolute",
          left: -9,
          top: 130,
          width: 4,
          height: 30,
          borderRadius: 2,
          backgroundColor: ORANGE,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -9,
          top: 170,
          width: 4,
          height: 30,
          borderRadius: 2,
          backgroundColor: ORANGE,
        }}
      />

      {/* Screen area */}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          right: 6,
          bottom: 6,
          borderRadius: 48,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 36,
            backgroundColor: "#000",
            borderRadius: 20,
            zIndex: 20,
          }}
        />

        {/* Status bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 54,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 28px 6px",
            zIndex: 15,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            9:41
          </span>
          <div
            style={{
              width: 22,
              height: 11,
              borderRadius: 3,
              border: "1.5px solid rgba(255,255,255,0.8)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: 1.5,
            }}
          >
            <div
              style={{
                flex: 1,
                height: "100%",
                borderRadius: 1.5,
                backgroundColor: "rgba(255,255,255,0.8)",
              }}
            />
          </div>
        </div>

        {/* Screen content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
          }}
        >
          {children}
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 15,
          }}
        />
      </div>
    </div>
  );
};
