import dayjs from "dayjs";

export interface userInterface {
  selectedDays: string[];
  userColor: string;
  userName: string;
  _id: string;
  isSelected?: boolean;
}
export interface addedUserInterface {
  selectedDays: string[];
  userColor: string;
  userName: string;
}
export interface boardDataInterface {
  _id: string;
  boardName: string;
  createdDate: string;
  users: userInterface[];
}
export interface deletedUserInterface {
  boardId: string;
  userId: string;
}
export interface addedUserRequestInterface {
  boardId: string;
  user: addedUserInterface;
}
export interface updatedDayRequestInterface {
  boardId: string;
  userId: string;
  days: string[];
}
export interface dayInterface {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
  possibleUsers: userInterface[];
  isSelected: boolean;
  key: string;
}
export interface modalInterface {
  left: number;
  right: number;
  top: number;
  bottom: number;
  date: string;
  possible: userInterface[];
  impossible: userInterface[];
}
export interface dateInterface {
  possible: userInterface[];
  impossible: userInterface[];
}
export interface dateMapInterface {
  [key: string]: dateInterface;
}
export interface resultInterface extends dateInterface {
  date: dayjs.Dayjs;
}
