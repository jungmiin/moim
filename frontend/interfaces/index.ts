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
export interface clickInterface {
  date: string;
  rect: DOMRect;
}

export interface toastInterface {
  message: string;
  id: string;
}
export interface toastsStoreInterface {
  toasts: toastInterface[];
  addToast: (arg0: string) => void;
  deleteToast: (arg0: string) => void;
}

export interface modalInfoInterface {
  isOpen: boolean;
  left: string | null;
  right: string | null;
  top: string | null;
  bottom: string | null;
}

export interface boardResultInterface {
  date: string | null;
  possible: userInterface[];
  impossible: userInterface[];
}

export interface modalStoreInterface {
  info: modalInfoInterface;
  boardResult: boardResultInterface;
  open: (
    top?: string | null,
    left?: string | null,
    bottom?: string | null,
    right?: string | null
  ) => void;
  close: () => void;
  boardResultOpen: (
    top: string,
    left: string,
    bottom: string,
    right: string,
    date: string,
    possible: userInterface[],
    impossible: userInterface[]
  ) => void;
  boardResultClose: () => void;
}
