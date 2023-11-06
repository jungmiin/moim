export interface userInterface {
  selectedDays: string[];
  userColor: string;
  userName: string;
  _id: string;
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
export interface userInCalendarInterface extends userInterface {
  isSelected: boolean;
}
export interface boardDataInCalendarInterface extends boardDataInterface {
  users: userInCalendarInterface[];
}
export interface dayInterface {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
  selectedUsers: userInCalendarInterface[];
  isSelected: boolean;
  key: string;
}
export interface dateMapInterface {
  [key: string]: {
    possible: userInCalendarInterface[];
    impossible: userInCalendarInterface[];
  };
}
export interface modalInterface {
  left: number;
  right: number;
  top: number;
  bottom: number;
  date: string;
  possible: userInCalendarInterface[];
  impossible: userInCalendarInterface[];
}
