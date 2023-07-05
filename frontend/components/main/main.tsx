import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Alata } from "@next/font/google";
import { MoimNameDropdown } from "./moimNameDropdown";

const alata = Alata({ weight: ["400"], preload: false });

const MainWrapper = () => {
  return (
    <Wrapper>
      <DescWrapper>#오늘부턴_약속도_간편하게_🤩</DescWrapper>
      <Title>moim</Title>
      <MoimNameDropdown />
    </Wrapper>
  );
};
const descWrapperCss = css`
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: -2rem;
  font-size: 0.8rem;
  font-weight: 500;
`;
const DescWrapper = styled.div`
  ${descWrapperCss}
`;

const wrapperCss = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
`;

const Wrapper = styled.div`
  ${wrapperCss}
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
