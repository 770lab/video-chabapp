import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { Presentation30s } from "./Presentation30s";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ChabappVideo"
        component={MyComposition}
        durationInFrames={486}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KoulamPresentation"
        component={Presentation30s}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
