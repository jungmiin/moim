import { css } from "@emotion/react";
import { common } from "@/styles/common";
import { Suspense } from "react";
import BoardWrapper from "@/components/board";

const Board = () => {
  const Loading = () => {
    return <div css={wrapperCss}>테스트</div>;
  };

  return (
    <Suspense fallback={<Loading />}>
      <BoardWrapper />
    </Suspense>
  );
};

const wrapperCss = css`
  display: flex;
  margin: 3.6rem 0;
  justify-content: center;
  width: 100vw;
  height: 40vh;
  background-color: red;
`;

export default Board;
