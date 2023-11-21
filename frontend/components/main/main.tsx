import { usePostBoard } from "@/hooks/useBoard";
import { common } from "@/styles/common";
import { css } from "@emotion/react";
import { Alata } from "@next/font/google";
import Spinner from "../common/loading";
import { MoimInput } from "./moimInput";

const alata = Alata({ weight: ["400"], preload: false });

const GenerateLoading = () => (
  <div css={loadingCss}>
    <Spinner /> 모임을 생성중이에요...
  </div>
);

const MainWrapper = () => {
  const { isPending: isGenerated, mutate: postBoard } = usePostBoard();
  const generateNewBoard = (input: string) => {
    if (input !== "") {
      postBoard({ boardName: input });
    }
  };
  return (
    <div css={wrapperCss}>
      <div css={descWrapperCss}>#오늘부턴_약속도_간편하게_🤩</div>
      <div css={titleCss}>moim</div>
      <MoimInput generateNewBoard={generateNewBoard} />
      {isGenerated && <GenerateLoading />}
    </div>
  );
};

const loadingCss = css`
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  color: ${common.colors.primaryColor};
  margin: 0.4rem 0;
`;
const descWrapperCss = css`
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: -2rem;
  font-size: 0.8rem;
  font-weight: 500;
`;
const wrapperCss = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
  margin-top: 33vh;
`;
const titleCss = css`
  color: white;
  font-family: ${alata.style.fontFamily};
  font-size: 10rem;
  padding-bottom: 1rem;
`;

export default MainWrapper;
