/* eslint-disable react/jsx-key */
import { useState, useEffect, useCallback, ReactNode } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import { common } from "@/styles/common";
import Header from "./header";

// TODO : 인터페이스 꼭 공통으로 빼내기

interface WeekInterface {
  dates: Array<DayInterface>;
}

interface DayInterface {
  date: ReactNode;
  month: Number;
  year: Number;
  isCurrentMonth: Boolean;
  isCurrentDay: Boolean;
  selectedPeople: Array<string>;
}

interface peopleInterface {
  name: string;
  color: string;
  isSelected: boolean;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [arrayOfDays, setArrayOfDays] = useState<Array<WeekInterface>>([]);
  const [people, setPeople] = useState<Array<peopleInterface>>([
    { name: "테스트", color: common.colors.primaryColor, isSelected: false },
    { name: "테스트", color: common.colors.primaryColor, isSelected: false },
    { name: "테스트", color: common.colors.primaryColor, isSelected: false },
    { name: "테스트", color: common.colors.primaryColor, isSelected: false },
    { name: "테스트", color: common.colors.primaryColor, isSelected: false },
    { name: "테스트", color: common.colors.primaryColor, isSelected: false },
  ]);
  const [isopenPeople, setOpenPeople] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(-1);

  useEffect(() => {
    const newPeople = people.map((person, i) => {
      if (selectedPeople === i) return { ...person, isSelected: true };
      return { ...person, isSelected: false };
    });
    setPeople(newPeople);
  }, [selectedPeople]);

  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);

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

  return (
    <>
      <Header
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        people={people}
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />
      {renderDates()}
    </>
  );
};

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
