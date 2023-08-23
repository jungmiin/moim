import { css } from "@emotion/react";
import CalendarWrapper from "@/components/board/calendarWrapper";
import ResultWrapper from "@/components/board/resultWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { common } from "@/styles/common";
import { useToast } from "@/components/common/toast/context";

const Board = () => {
  const router = useRouter();
  const [boardData, setBoardData] = useState();
  const toast = useToast();
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
  }, [router.isReady, router.query.boardId]);

  return (
    // TODO : 로딩
    boardData && (
      <div css={wrapperCss}>
        <CalendarWrapper boardData={boardData} setBoardData={setBoardData} />
        <ResultWrapper boardData={boardData} setBoardData={setBoardData} />
        <button
          css={shareButtonCss}
          onClick={() => {
            navigator.clipboard.writeText(location.href);
            toast && toast.message("링크가 복사되었어요!");
          }}
        >
          모임 링크 공유하기
        </button>
      </div>
    )
  );
};

const shareButtonCss = css`
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${common.gradient.secondaryGradient};
  color: ${common.colors.tenaryColor};
  transition: all 0.2s linear;
  z-index: 2;
  position: fixed;
  bottom: 2rem;
  &::before {
    opacity: 0;
    margin-left: -1.4em;
    margin-right: 0.2rem;
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    transition: all 0.2s;
    content: "";
  }
  &:hover {
    &::before {
      margin-left: 0.2rem;
      opacity: 1;
    }
    background-size: 200% 200%;
    animation: date 4s ease infinite;
    border: 1px solid ${common.colors.tenaryColor};
    box-shadow: 0 0 1rem rgba(0, 100, 250, 0.2);
    @keyframes date {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
`;

const wrapperCss = css`
  display: flex;
  margin-top: 3.6rem;
  justify-content: center;
  width: 100vw;
`;

export default Board;
