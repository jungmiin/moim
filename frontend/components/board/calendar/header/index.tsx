/* eslint-disable react/jsx-key */
import { SetStateAction, Dispatch } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { common } from "@/styles/common";
import SvgButton from "@/components/common/button/svgButton";
import BadgeList from "./badgeList";

interface peopleInterface {
  name: string;
  color: string;
  isSelected: boolean;
}

interface headerPropsInterface {
  currentMonth: dayjs.Dayjs;
  setCurrentMonth: Dispatch<SetStateAction<dayjs.Dayjs>>;
  people: Array<peopleInterface>;
  setSelectedPeople: Dispatch<SetStateAction<number>>;
  selectedPeople: number;
}

const Header = ({
  currentMonth,
  setCurrentMonth,
  people,
  setSelectedPeople,
  selectedPeople,
}: headerPropsInterface) => {
  const nextMonthHandler = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonthHandler = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));

  const renderDayHeader = () => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const dayHeader: Array<JSX.Element> = days.map((day) => {
      return (
        <Day>
          <span>{day}</span>
        </Day>
      );
    });
    return dayHeader;
  };

  const renderYearMonth = () => {
    return `${currentMonth.year()}년 ${currentMonth.month() + 1}월`;
  };
  return (
    <>
      <TitleHeader>
        <MonthControl>
          <PrevMonthButton onClick={() => prevMonthHandler()}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              width="8"
              color={common.colors.primaryGrey}
            />
          </PrevMonthButton>
          <YearMonthHeader>{renderYearMonth()}</YearMonthHeader>
          <NextMonthButton onClick={() => nextMonthHandler()}>
            <FontAwesomeIcon
              icon={faChevronRight}
              width="8"
              color={common.colors.primaryGrey}
            />
          </NextMonthButton>
        </MonthControl>
        <BadgeWrapper>
          <BadgeList
            people={people}
            setSelectedPeople={setSelectedPeople}
            selectedPeople={selectedPeople}
          />
          <SvgButton
            color={common.colors.primaryColor}
            handler={() => {}}
            svg={faPlus}
            width="12"
          />
        </BadgeWrapper>
      </TitleHeader>
      <DayHeader>{renderDayHeader()}</DayHeader>
    </>
  );
};

const badgeWrapperCss = css`
  display: flex;
  justify-content: normal;
  align-items: center;
`;
const BadgeWrapper = styled.div`
  ${badgeWrapperCss}
`;

const MonthControlCss = css`
  display: flex;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem;
`;
const MonthControl = styled.div`
  ${MonthControlCss}
`;

const PrevMonthButtonCss = css`
  padding: 0 0.2rem;
`;
const PrevMonthButton = styled.button`
  ${PrevMonthButtonCss}
`;

const YearMonthHeaderCss = css``;
const YearMonthHeader = styled.div`
  ${YearMonthHeaderCss}
`;

const NextMonthButtonCss = css`
  padding: 0 0.2rem;
`;
const NextMonthButton = styled.button`
  ${NextMonthButtonCss}
`;

const titleHeaderCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleHeader = styled.div`
  ${titleHeaderCss}
`;
const dayHeaderCss = css`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
const DayHeader = styled.div`
  ${dayHeaderCss}
`;
const dayCss = css`
  width: 3.6rem;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.5rem;
  font-weight: 700;
  color: ${common.colors.primaryColor};
`;
const Day = styled.div`
  ${dayCss}
`;

export default Header;
