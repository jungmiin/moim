import { common } from "@/styles/common";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Alata } from "@next/font/google";

const alata = Alata({ weight: ["400"], preload: false });

export default function Home() {
  return (
    <Background>
      <MainWrapper>
        <Title>moim</Title>
        <Link
          href={{
            pathname: "/board/[boardNumber]",
            query: { boardNumber: "1" },
          }}
        >
          <GenerateButton>모임 만들기</GenerateButton>
        </Link>
      </MainWrapper>
    </Background>
  );
}

const mainWrapperCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  ${mainWrapperCss}
`;

const generateButtonCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${common.gradient.secondaryGradient};
  color: white;
  width: 10rem;
  height: 3.6rem;
  border-radius: 1.8rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
`;

const GenerateButton = styled.div`
  ${generateButtonCss}
`;

const titleCss = css`
  color: white;
  font-family: ${alata.style.fontFamily};
  font-size: 10rem;
  padding-bottom: 1rem;
`;

const Title = styled.div`
  ${titleCss}
`;

const backgroundCss = css`
  background: ${common.gradient.primaryGradient};
  width: 100vw;
  height: 100vh;
`;

const Background = styled.div`
  ${backgroundCss}
`;
