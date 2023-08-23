import { css } from "@emotion/react";
import Calendar from "./calendar";
import { common } from "@/styles/common";
import { Alata } from "@next/font/google";

const alata = Alata({ weight: ["400"], preload: false });

const CalendarWrapper = ({
  boardData,
  setBoardData,
}: {
  boardData: any;
  setBoardData: any;
}) => {
  return (
    <div>
      <span css={boardNameWrapperStyle}>
        <span css={moimStyle}>moim</span>
        <span>
          <span css={boardNameStyle}>{`${boardData.boardName} `}</span>
          모임의 달력이에요
        </span>
      </span>
      <div css={wrapperStyle}>
        <Calendar boardData={boardData} setBoardData={setBoardData} />
      </div>
    </div>
  );
};

const boardNameStyle = css`
  font-weight: 700;
`;

const moimStyle = css`
  font-family: ${alata.style.fontFamily};
  color: ${common.colors.primaryColor};
  margin-right: 0.5rem;
`;

const boardNameWrapperStyle = css`
  font-size: 0.8rem;
  padding: 0.8rem 1.2rem;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 2rem;
  margin: 0.8rem;
  transition: all 0.2s linear 0s;
  &:hover {
    background: ${common.colors.tenaryColor};
  }
`;

const wrapperStyle = css`
  padding: 2rem;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.5rem;
`;

export default CalendarWrapper;
