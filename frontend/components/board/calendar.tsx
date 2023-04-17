/* eslint-disable react/jsx-key */
import { useState, useEffect, useCallback, ReactNode } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import { common } from "@/styles/common";

interface WeekInterface {
  dates: Array<DayInterface>;
}

interface DayInterface {
  date: ReactNode;
  month: Number;
  year: Number;
  isCurrentMonth: Boolean;
  isCurrentDay: Boolean;
  selectedPeople: Array<String>;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [arrayOfDays, setArrayOfDays] = useState<Array<WeekInterface>>([]);

  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);
  const nextMonthHandler = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonthHandler = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));

  const formatedDateObject = useCallback(
    (date: dayjs.Dayjs) => {
      const clonedObject = { ...date.toObject() };

      const formatedObject = {
        date: clonedObject.date,
        month: clonedObject.months,
        year: clonedObject.years,
        isCurrentMonth: clonedObject.months === currentMonth.month(),
        isCurrentDay: date.isToday(),
        selectedPeople: [],
      };

      return formatedObject;
    },
    [currentMonth]
  );

  const getAllDays = useCallback(() => {
    let currentDate = currentMonth.startOf("month").weekday(1);
    const nextMonth = currentMonth.add(1, "month").month();

    let allDates = [];
    let weekDates = [];

    let weekCounter = 1;

    while (currentDate.weekday(-6).toObject().months !== nextMonth) {
      console.log(currentDate.weekday(0).toObject());
      const formated = formatedDateObject(currentDate);
      weekDates.push(formated);

      if (weekCounter === 7) {
        allDates.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      currentDate = currentDate.add(1, "day");
    }

    setArrayOfDays(allDates);
  }, [currentMonth, formatedDateObject]);

  useEffect(() => {
    getAllDays();
  }, [getAllDays, currentMonth]);

  const renderDates = () => {
    const rows: Array<JSX.Element> = [];
    let dates: Array<JSX.Element> = [];
    arrayOfDays.forEach((week: WeekInterface) => {
      console.log(week);
      week["dates"].forEach((d: DayInterface) => {
        dates.push(
          <Date className={d.isCurrentMonth ? "" : "previous"}>
            <span>{d.date}</span>
          </Date>
        );
      });
      rows.push(<Week>{dates}</Week>);
      dates = [];
    });
    return <Dates>{rows}</Dates>;
  };

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
              width="4"
              color={common.colors.primaryGrey}
            />
          </PrevMonthButton>
          <YearMonthHeader>{renderYearMonth()}</YearMonthHeader>
          <NextMonthButton onClick={() => nextMonthHandler()}>
            <FontAwesomeIcon
              icon={faChevronRight}
              width="4"
              color={common.colors.primaryGrey}
            />
          </NextMonthButton>
        </MonthControl>
      </TitleHeader>
      <DayHeader>{renderDayHeader()}</DayHeader>
      {renderDates()}
    </>
  );
};

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

const titleHeaderCss = css``;
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
const datesCss = css`
  width: 100%;
`;
const Dates = styled.div`
  ${datesCss}
`;

const dateCss = css`
  width: 3.6rem;
  height: 3.6rem;
  border: ${common.colors.tenaryGrey} 1px solid;
  font-size: 0.5rem;
  font-weight: 700;
  padding: 0.75rem;
  &.previous {
    color: ${common.colors.secondaryGrey};
  }
`;
const Date = styled.div`
  ${dateCss}
`;

const weekCss = css`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
const Week = styled.div`
  ${weekCss}
`;

export default Calendar;
