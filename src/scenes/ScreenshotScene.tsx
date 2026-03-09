import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  staticFile,
  Easing,
} from "remotion";

type Props = {
  screenshot: string;
  scrollAmount?: number;
};

export const ScreenshotScene: React.FC<Props> = ({
  screenshot,
  scrollAmount = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scrollOffset = interpolate(
    frame,
    [0.6 * fps, 2.5 * fps],
    [0, -scrollAmount],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        opacity: fadeIn,
        backgroundColor: "#fafafa",
      }}
    >
      <Img
        src={staticFile(`screenshots/${screenshot}`)}
        style={{
          width: "100%",
          height: "auto",
          transform: `translateY(${scrollOffset}px)`,
        }}
      />
    </div>
  );
};
