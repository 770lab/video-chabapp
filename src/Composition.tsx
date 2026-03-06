import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Scene1Logo } from "./scenes/Scene1Logo";
import { Scene2Mockup } from "./scenes/Scene2Mockup";
import { Scene3Prieres } from "./scenes/Scene3Prieres";
import { Scene4Zmanim } from "./scenes/Scene4Zmanim";
import { Scene5Communaute } from "./scenes/Scene5Communaute";
import { Scene6CTA } from "./scenes/Scene6CTA";

export const MyComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Scene 1: Logo fade in (0-2s) */}
      <Sequence from={0} durationInFrames={2 * fps} premountFor={fps}>
        <Scene1Logo />
      </Sequence>
      {/* Scene 2: Mockup iPhone slide up (2-5s) */}
      <Sequence from={2 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <Scene2Mockup />
      </Sequence>
      {/* Scene 3: Feature Prières & Siddur (5-8s) */}
      <Sequence from={5 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <Scene3Prieres />
      </Sequence>
      {/* Scene 4: Feature Zmanim (8-11s) */}
      <Sequence from={8 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <Scene4Zmanim />
      </Sequence>
      {/* Scene 5: Feature Communauté (11-14s) */}
      <Sequence from={11 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <Scene5Communaute />
      </Sequence>
      {/* Scene 6: CTA final (14-17s) */}
      <Sequence from={14 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <Scene6CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
