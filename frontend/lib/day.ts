import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import {
  boardDataInterface,
  dateMapInterface,
  userInterface,
} from "@/interfaces";

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

export const convertUserToDay = (boardData: boardDataInterface) => {
  const dateMap = {} as any;
  boardData.users.forEach((user: userInterface) => {
    if (user.selectedDays) {
      user.selectedDays.forEach((selectedDay: string) => {
        if (dateMap.hasOwnProperty(selectedDay)) {
          dateMap[selectedDay].possible.push({
            userId: user._id,
            userName: user.userName,
            userColor: user.userColor,
          });
        } else {
          dateMap[selectedDay] = {
            possible: [
              {
                userId: user._id,
                userName: user.userName,
                userColor: user.userColor,
              },
            ],
            impossible: [],
          };
        }
      });
    }
  });
  boardData.users.forEach((user: any) => {
    Object.keys(dateMap).forEach((date) => {
      if (
        dateMap[date].possible.findIndex((u: any) => u.userId === user._id) ===
        -1
      ) {
        dateMap[date].impossible.push({
          userId: user._id,
          userName: user.userName,
          userColor: user.userColor,
        });
      }
    });
  });
  return dateMap;
};

const formatedDateObject = (
  date: dayjs.Dayjs,
  currentMonth: dayjs.Dayjs,
  dateMap: dateMapInterface,
  selectedDays: string[]
) => {
  const clonedObject = { ...date.toObject() };
  const formatedObject = {
    date: clonedObject.date,
    month: clonedObject.months,
    year: clonedObject.years,
    isCurrentMonth: clonedObject.months === currentMonth.month(),
    isCurrentDay: date.isToday(),
    possibleUsers: dateMap.hasOwnProperty(date.toString())
      ? dateMap[date.toString()].possible
      : [],
    isSelected: selectedDays.includes(date.toString()) ? true : false,
    key: date.toString(),
  };

  return formatedObject;
};

export const getMonth = (
  currentMonth: dayjs.Dayjs,
  dateMap: dateMapInterface,
  selectedDays: string[]
) => {
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
    const formated = formatedDateObject(
      currentDate,
      currentMonth,
      dateMap,
      selectedDays
    );
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
