import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Suspense, MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, ContactShadows } from "@react-three/drei";
import Model from "./canvasModel";

const CanvasWrapper = ({ mouse }: { mouse: MutableRefObject<number[]> }) => {
  return (
    <Wrapper>
      <Canvas orthographic>
        <Stage adjustCamera={1.5}>
          <Model mouse={mouse} />
        </Stage>
      </Canvas>
    </Wrapper>
  );
};

const wrapperCss = css`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  ${wrapperCss}
`;

export default CanvasWrapper;
