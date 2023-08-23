/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import { common } from "@/styles/common";
import Header from "./header";
import { convertUserToDay } from "@/lib/dayConvert";
import { Modal } from "@/components/common/modal";
import Toast from "@/components/common/toast";
import { useToast } from "@/components/common/toast/context";

// TODO : 인터페이스 꼭 공통으로 빼내기
interface DayInterface {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
  selectedPeople: Array<personInterface>;
  isSelected: boolean;
  key: string;
}
interface personInterface {
  _id: string;
  userName: string;
  userColor: string;
  isSelected: boolean;
  selectedDays?: Array<string>;
}

const Calendar = ({
  boardData,
  setBoardData,
}: {
  boardData: any;
  setBoardData: any;
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [arrayOfDays, setArrayOfDays] = useState<Array<DayInterface[]>>([]);
  const [selectedDays, setSelectedDays] = useState<Array<string>>([]);
  const [people, setPeople] = useState<Array<personInterface>>([]);
  const [selectedPerson, setSelectedPerson] = useState<personInterface | null>(
    null
  );
  const [isEditMode, setEditMode] = useState(false);
  const [dateMap, setDateMap] = useState<{
    [key: string]: {
      possible: personInterface[];
      impossible: personInterface[];
    };
  }>({});
  const [modalInfo, setModalInfo] = useState<{
    left: number;
    right: number;
    top: number;
    bottom: number;
    date: string;
    possible: personInterface[];
    impossible: personInterface[];
  } | null>(null);

  const toast = useToast();

  useEffect(() => {
    setPeople(boardData.users);
    const newDateMap = convertUserToDay(boardData);
    setDateMap(newDateMap);
  }, [boardData, setBoardData]);

  useEffect(() => {
    const newArrayOfDays = getAllDays();
    setArrayOfDays(newArrayOfDays);
  }, [currentMonth, selectedDays, dateMap]);

  useEffect(() => {
    renderDates();
  }, [arrayOfDays]);

  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
    setSelectedPerson(null);
    setSelectedDays([]);
  };

  const formatedDateObject = (date: dayjs.Dayjs) => {
    const clonedObject = { ...date.toObject() };
    const formatedObject = {
      date: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isCurrentDay: date.isToday(),
      selectedPeople: dateMap.hasOwnProperty(date.toString())
        ? dateMap[date.toString()].possible
        : [],
      isSelected: selectedDays.includes(date.toString()) ? true : false,
      key: date.toString(),
    };

    return formatedObject;
  };

  const getAllDays = () => {
    // 달의 시작 요일이 일요일이라면, 그 주 월요일(저번달) 부터 받아옴.
    let currentDate =
      currentMonth.startOf("month").weekday() === 0
        ? currentMonth.startOf("month").weekday(-6)
        : currentMonth.startOf("month").weekday(1);
    // 다음 달
    const nextMonth = currentMonth.add(1, "month").month();

    let allDays = [];
    let weekDates = [];
    let weekCounter = 0;

    // 해당 주 월요일이 다음 달이 아닐 때까지
    while (currentDate.weekday(-6).toObject().months !== nextMonth) {
      const formated = formatedDateObject(currentDate);
      weekDates.push(formated);
      weekCounter++;
      if (weekCounter === 7) {
        allDays.push(weekDates);
        weekDates = [];
        weekCounter = 0;
      }
      currentDate = currentDate.add(1, "day");
    }

    return allDays;
  };

  const selectDay = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const date = target.id;
    if (selectedDays.includes(date)) {
      const newSelectedDays = selectedDays.filter((d) => d !== date);
      setSelectedDays(newSelectedDays);
    } else {
      const newSelectedDays = [...selectedDays, date];
      setSelectedDays(newSelectedDays);
    }
  };

  const renderDates = () => {
    let dates: Array<JSX.Element> = [];
    arrayOfDays.forEach((week: DayInterface[], weekIndex: number) => {
      week.forEach((d: DayInterface, dateIndex: number) => {
        dates.push(
          <div
            id={d.key}
            key={weekIndex * 7 + dateIndex}
            css={dateStyle}
            style={
              d.selectedPeople.length > 0 || (d.isCurrentMonth && isEditMode)
                ? { cursor: "pointer" }
                : { cursor: "default" }
            }
            className={`${d.isCurrentMonth ? "current" : "not-current"} ${
              isEditMode && (d.isSelected ? "selected" : "not-selected")
            }`}
            onClick={(e) => {
              if (isEditMode) {
                if (d.isCurrentMonth && selectedPerson) {
                  selectDay(e);
                } else {
                  toast &&
                    toast.message("사람을 선택해야 날짜를 선택할 수 있어요.");
                }
              }
            }}
            onMouseOver={(e) => {
              !isEditMode &&
                d.selectedPeople.length > 0 &&
                Modal.handle({ e, setModalInfo, dateMap });
            }}
            onMouseLeave={(e) => {
              !isEditMode && d.selectedPeople.length > 0 && setModalInfo(null);
            }}
          >
            {d.date}
            <div
              css={css`
                display: flex;
                margin-top: 0.2rem;
                gap: 0.1rem;
                flex-flow: wrap;
              `}
            >
              {d.selectedPeople.map((person, index) => (
                <div
                  key={index}
                  css={selectPeopleCss}
                  style={{ backgroundColor: person.userColor }}
                ></div>
              ))}
            </div>
          </div>
        );
      });
    });
    return (
      <div css={datesStyle}>
        {dates}
        {modalInfo && <Modal modalInfo={modalInfo} />}
      </div>
    );
  };

  return (
    <>
      <Header
        boardData={boardData}
        setBoardData={setBoardData}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        people={people}
        isEditMode={isEditMode}
        toggleEditMode={toggleEditMode}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      {renderDates()}
    </>
  );
};

const selectPeopleCss = css`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.3rem;
`;

const datesStyle = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
`;

const dateStyle = css`
  width: 3.6rem;
  height: 3.6rem;
  font-size: 0.5rem;
  font-weight: 700;
  padding: 0.75rem;
  box-shadow: 0 0 0 1px ${common.colors.tenaryGrey};
  &.not-current {
    color: ${common.colors.secondaryGrey};
  }
  &.not-selected {
    color: ${common.colors.secondaryGrey};
    &.not-current {
      color: ${common.colors.tenaryGrey};
    }
  }
  &.selected {
    color: ${common.colors.primaryColor};
    background-color: ${common.colors.tenaryColor};
  }
  &:before {
    border: ${common.colors.tenaryGrey} 1px solid;
  }
  &:after {
    border: ${common.colors.tenaryGrey} 1px solid;
  }
`;

export default Calendar;
