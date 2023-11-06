import { css } from "@emotion/react";
import CalendarWrapper from "@/components/board/calendarWrapper";
import ResultWrapper from "@/components/board/resultWrapper";
import { common } from "@/styles/common";
import { useToast } from "@/components/common/toast/context";
import Head from "next/head";
import { boardDataInterface } from "@/interfaces";
import Loading from "../common/loading";
import { useGetBoard } from "@/hooks/useBoard";

const BoardWrapper = () => {
  const toast = useToast();
  const { data: boardData } = useGetBoard();

  return (
    <>
      {boardData ? (
        <div css={wrapperCss}>
          <Head>
            <title>{`${
              (boardData as boardDataInterface).boardName
            } 모임`}</title>
          </Head>
          <CalendarWrapper boardData={boardData} />
          <ResultWrapper boardData={boardData} />
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
      ) : (
        <Loading />
      )}
    </>
  );
};

const shareButtonCss = css`
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${common.colors.primaryWhite};
  color: ${common.colors.primaryColor};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
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
    color: ${common.colors.primaryWhite};
    content: "";
  }
  &:hover {
    background: ${common.gradient.secondaryGradient};
    color: ${common.colors.primaryWhite};
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
  margin: 3.6rem 0;
  justify-content: center;
  width: 100vw;
`;

export default BoardWrapper;
