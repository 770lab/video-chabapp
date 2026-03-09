import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IPhoneFrame } from "./components/IPhoneFrame";
import { Scene1Logo } from "./scenes/Scene1Logo";
import { ScreenshotScene } from "./scenes/ScreenshotScene";
import { Scene6CTA } from "./scenes/Scene6CTA";

const TRANSITION_FRAMES = 12;

// Total: 6 scenes, 5 transitions
// 60 + 96 + 96 + 96 + 96 + 96 - 5*12 = 480 + 60 = 540 - 60 = 480...
// Let's calculate: sum of durations - sum of transitions = total
// 66 + 99 + 99 + 99 + 99 + 99 - 5*12 = 561 - 60 = 501 ≈ 510

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // iPhone entrance: slides up and scales in during first 1.5s
  const phoneEntrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 70, mass: 1 },
  });
  const phoneTranslateY = interpolate(phoneEntrance, [0, 1], [400, 0]);
  const phoneScale = interpolate(phoneEntrance, [0, 1], [0.85, 1]);

  // Subtle breathing glow on the phone
  const breathe = Math.sin((frame / fps) * Math.PI * 0.8) * 0.5 + 0.5;
  const glowIntensity = interpolate(breathe, [0, 1], [0.15, 0.35]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          transform: `translateY(${phoneTranslateY}px) scale(${phoneScale})`,
          filter: `drop-shadow(0 0 60px rgba(245, 156, 66, ${glowIntensity}))`,
        }}
      >
        <IPhoneFrame>
          <TransitionSeries>
            {/* Scene 1: Splash logo */}
            <TransitionSeries.Sequence durationInFrames={Math.round(2.2 * fps)}>
              <Scene1Logo />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
            {/* Scene 2: Accueil */}
            <TransitionSeries.Sequence durationInFrames={Math.round(3.2 * fps)}>
              <ScreenshotScene screenshot="01-accueil.png" scrollAmount={200} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={slide({ direction: "from-right" })}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
            {/* Scene 3: Tefila */}
            <TransitionSeries.Sequence durationInFrames={Math.round(3.2 * fps)}>
              <ScreenshotScene screenshot="02-tefila.png" scrollAmount={150} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={slide({ direction: "from-right" })}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
            {/* Scene 4: Objectifs */}
            <TransitionSeries.Sequence durationInFrames={Math.round(3.2 * fps)}>
              <ScreenshotScene screenshot="08-objectifs.png" scrollAmount={180} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={slide({ direction: "from-right" })}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
            {/* Scene 5: Tehilim */}
            <TransitionSeries.Sequence durationInFrames={Math.round(3.2 * fps)}>
              <ScreenshotScene screenshot="06-tehilim.png" scrollAmount={200} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
            {/* Scene 6: CTA */}
            <TransitionSeries.Sequence durationInFrames={Math.round(3.2 * fps)}>
              <Scene6CTA />
            </TransitionSeries.Sequence>
          </TransitionSeries>
        </IPhoneFrame>
      </div>
    </AbsoluteFill>
  );
};
