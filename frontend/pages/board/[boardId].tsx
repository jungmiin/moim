import { css } from "@emotion/react";
import CalendarWrapper from "@/components/board/calendarWrapper";
import ResultWrapper from "@/components/board/resultWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Board = () => {
  const router = useRouter();
  const [boardData, setBoardData] = useState();

  // 초기 board 데이터 받아옴
  useEffect(() => {
    if (!router.isReady) return;
    const getBoardData = async () => {
      const result = await fetch(`/api/board/${router.query.boardId}`);
      if (result.status === 200) {
        const boardData = await result.json();
        console.log(boardData, boardData.boardName);
        setBoardData(boardData);
      } else {
        throw new Error(`GET /board/${router.query.boardId}`);
      }
    };
    getBoardData();
  }, [router.isReady]);

  return (
    // TODO : 로딩
    boardData && (
      <div css={wrapperStyle}>
        <CalendarWrapper boardData={boardData} setBoardData={setBoardData} />
        <ResultWrapper boardData={boardData} setBoardData={setBoardData} />
      </div>
    )
  );
};

const wrapperStyle = css`
  display: flex;
  margin-top: 3.6rem;
  justify-content: center;
  width: 100vw;
`;

export default Board;
