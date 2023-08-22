import { useRef, PointerEvent } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { common } from "@/styles/common";
import MainWrapper from "@/components/main/main";
import CanvasWrapper from "@/components/main/canvas";
import Script from "next/script";

const Home = () => {
  const mouse = useRef<number[]>([0, 0]);
  const handleMouseMove = (event: PointerEvent<HTMLDivElement>) => {
    mouse.current = [event.clientX, event.clientY];
  };

  return (
    <>
      <Index onPointerMove={handleMouseMove}>
        <Script
          src="https://kit.fontawesome.com/f970c48591.js"
          crossOrigin="anonymous"
        ></Script>
        <MainWrapper />
        <CanvasWrapper mouse={mouse} />
      </Index>
    </>
  );
};

const indexCss = css`
  position: absolute;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${common.gradient.primaryGradient};
`;

const Index = styled.div`
  ${indexCss}
`;

export default Home;
