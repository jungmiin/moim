import { common } from "@/styles/common";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Alata } from "@next/font/google";

const alata = Alata({ weight: ["400"], preload: false });

export default function Home() {
  return (
    <Background>
      <Title>moim</Title>
      <Link
        href={{
          pathname: "/board/[boardNumber]",
          query: { boardNumber: "1" },
        }}
      >
        <GenerateButton>모임 만들기</GenerateButton>
      </Link>
    </Background>
  );
}

const generateButtonCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${common.gradient.secondaryGradient};
  color: white;
  width: 250px;
  height: 78px;
  border-radius: 100px;
  font-size: 18px;
  cursor: pointer;
`;

const GenerateButton = styled.div`
  ${generateButtonCss}
`;

const titleCss = css`
  color: white;
  font-family: ${alata.style.fontFamily};
  font-size: 10rem;
`;

const Title = styled.div`
  ${titleCss}
`;

const backgroundCss = css`
  background: ${common.gradient.primaryGradient};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  ${backgroundCss}
`;
