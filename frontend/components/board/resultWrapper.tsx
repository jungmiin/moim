import { useState } from "react";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditPeople from "@/components/board/editPeople";
import { common } from "@/styles/common";
import { Button } from "../common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardList from "./cardList";

const ResultWrapper = () => {
  const [isAddPeople, setAddPeople] = useState(false);

  const toggleAddPeople = () => {
    setAddPeople(!isAddPeople);
  };

  const dates = [
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
    { date: dayjs(), available: 6, unavailable: 1 },
  ];

  return (
    <>
      {isAddPeople ? (
        <div css={css(wrapperStyle)}>
          <EditPeople toggleAddPeople={toggleAddPeople} />
        </div>
      ) : (
        <div css={css(wrapperStyle)}>
          <Button style={buttonStyle} onClick={toggleAddPeople}>
            <Button.HoverIcon style={iconStyle}>
              <FontAwesomeIcon className="fa" icon={faPlus} />
            </Button.HoverIcon>
            {"인원 추가하기"}
          </Button>
          <CardList dates={dates} />
        </div>
      )}
    </>
  );
};

const buttonStyle = `
  display: flex;
  justify-content: center;
  border: 1px solid ${common.colors.primaryColor};
  border-radius: 3rem;
  padding: 1rem 0;
  width: 17rem;
  color: ${common.colors.primaryColor};
  font-weight: 700;
  font-size: 0.75rem;
  margin: 1rem 0;
`;

const iconStyle = `
  margin-right: 0.3rem;
`;

const wrapperStyle = `
  flex-direction: column;
  padding: 0 2rem;
  max-width: 17rem;
  max-height: 80vh;
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

export default ResultWrapper;
