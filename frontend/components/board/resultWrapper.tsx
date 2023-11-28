import { memo, useEffect, useState } from "react";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import EditPeople from "@/components/board/result/editPeople";
import { common } from "@/styles/common";
import CardList from "./result/cardList";
import { convertUserToDay } from "@/lib/day";
import {
  dateMapInterface,
  boardDataInterface,
  resultInterface,
} from "@/interfaces";

interface resultWrapperProps {
  boardData: boardDataInterface;
}

const ResultWrapper = ({ boardData }: resultWrapperProps) => {
  const [isAddPeople, setAddPeople] = useState(false);
  const [result, setResult] = useState<resultInterface[] | null>(null);
  const [dateMap, setDateMap] = useState<dateMapInterface>({});

  // possible 인원 기준으로 dateMap sort
  useEffect(() => {
    const newDateMap = convertUserToDay(boardData) as dateMapInterface;
    const sortedDateMap = Object.entries(newDateMap).sort(
      (a, b) => b[1].possible.length - a[1].possible.length
    );
    const newResult = sortedDateMap.map((date) => {
      return {
        date: dayjs(date[0]),
        possible: date[1].possible,
        impossible: date[1].impossible,
      };
    });
    setDateMap(newDateMap);
    setResult(newResult);
  }, [boardData]);

  const toggleAddPeople = () => {
    setAddPeople(!isAddPeople);
  };

  return (
    <>
      {isAddPeople ? (
        <div css={wrapperCss}>
          <EditPeople toggleAddPeople={toggleAddPeople} boardData={boardData} />
        </div>
      ) : (
        <div css={wrapperCss}>
          <button css={buttonCss} onClick={toggleAddPeople}>
            인원 추가하기
          </button>
          <CardList result={result} dateMap={dateMap} />
        </div>
      )}
    </>
  );
};

const buttonCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  border: 1px solid ${common.colors.primaryColor};
  border-radius: 3rem;
  padding: 1rem 0;
  width: 17rem;
  color: ${common.colors.primaryColor};
  font-weight: 700;
  font-size: 0.75rem;
  margin: 1rem 0;
  &::before {
    min-width: 0.8rem;
    opacity: 0;
    margin-left: -1.3em;
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    content: "+";
    transition: all 0.2s;
  }
  &:hover {
    &::before {
      margin-left: 0.2rem;
      opacity: 1;
    }
  }
`;

const wrapperCss = css`
  flex-direction: column;
  padding: 0 2rem;
  max-width: 17rem;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${common.colors.tenaryGrey};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 3px;
  }
`;

export default memo(ResultWrapper);
