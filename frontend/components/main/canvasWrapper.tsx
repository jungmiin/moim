import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Suspense, MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Model from "./model";

const CanvasWrapper = ({ mouse }: { mouse: MutableRefObject<number[]> }) => {
  return (
    <Wrapper>
      <Canvas
        orthographic
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 10],
        }}
      >
        <Suspense fallback={null}>
          <Stage intensity={0.7} castShadow={false} shadows={false}>
            false
            <Model mouse={mouse} />
            false
          </Stage>
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

const wrapperCss = css`
  width: 80vw;
  height: 80vh;
`;

const Wrapper = styled.div`
  ${wrapperCss}
`;

export default CanvasWrapper;
