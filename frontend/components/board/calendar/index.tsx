/* eslint-disable react/jsx-key */
import { useState, useEffect, memo } from "react";
import dayjs from "dayjs";
import Header from "./header";
import { convertUserToDay, getMonth } from "@/lib/day";
import {
  boardDataInterface,
  dateMapInterface,
  dayInterface,
  userInterface,
} from "@/interfaces";
import Grid from "./grid";

interface calendarProps {
  boardData: boardDataInterface;
}

const Calendar = ({ boardData }: calendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [month, setMonth] = useState<dayInterface[][]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [users, setUsers] = useState<userInterface[]>([]);
  const [selectedUser, setSelectedUser] = useState<userInterface | null>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [dateMap, setDateMap] = useState<dateMapInterface>({});

  useEffect(() => {
    setUsers(boardData.users);
    const newDateMap = convertUserToDay(boardData);
    setDateMap(newDateMap);
  }, [boardData]);

  useEffect(() => {
    const newMonth = getMonth(currentMonth, dateMap, selectedDays);
    setMonth(newMonth);
  }, [currentMonth, selectedDays, dateMap]);

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
    setSelectedUser(null);
    setSelectedDays([]);
  };

  return (
    <>
      <Header
        {...{
          boardData,
          currentMonth,
          setCurrentMonth,
          users,
          isEditMode,
          toggleEditMode,
          selectedUser,
          setSelectedUser,
          selectedDays,
          setSelectedDays,
        }}
      />
      <Grid
        {...{
          month,
          isEditMode,
          selectedDays,
          setSelectedDays,
          selectedUser,
          dateMap,
        }}
      />
    </>
  );
};

export default memo(Calendar);
