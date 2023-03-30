import Link from "next/link";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Alata } from "@next/font/google";
import { common } from "@/styles/common";

const alata = Alata({ weight: ["400"], preload: false });

const MainWrapper = () => {
  return (
    <Wrapper>
      <Title>moim</Title>
      <Link
        href={{
          pathname: "/board/[boardNumber]",
          query: { boardNumber: "1" },
        }}
      >
        <GenerateButton>모임 만들기</GenerateButton>
      </Link>
    </Wrapper>
  );
};

const wrapperCss = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
  margin-top: -5rem;
`;

const Wrapper = styled.div`
  ${wrapperCss}
`;

// TODO : 버튼 공용 컴포넌트로 만들기

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

export default MainWrapper;
