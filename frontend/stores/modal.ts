import { create } from "zustand";
import { modalStoreInterface, userInterface } from "@/interfaces";

const useModalStore = create<modalStoreInterface>((set) => ({
  info: {
    isOpen: false,
    top: null,
    left: null,
    bottom: null,
    right: null,
  },
  boardResult: {
    date: null,
    possible: [],
    impossible: [],
  },
  open: (top = null, left = null, bottom = null, right = null) =>
    set(() => ({
      info: {
        isOpen: true,
        top,
        left,
        bottom,
        right,
      },
    })),
  close: () =>
    set(() => ({
      info: {
        isOpen: false,
        top: null,
        left: null,
        bottom: null,
        right: null,
      },
    })),
  boardResultOpen: (
    top: string,
    left: string,
    bottom: string,
    right: string,
    date: string,
    possible: userInterface[],
    impossible: userInterface[]
  ) =>
    set(() => ({
      info: {
        isOpen: true,
        top,
        left,
        bottom,
        right,
      },
      boardResult: {
        date,
        possible,
        impossible,
      },
    })),
  boardResultClose: () =>
    set(() => ({
      info: {
        isOpen: false,
        top: null,
        left: null,
        bottom: null,
        right: null,
      },
      boardResult: {
        date: null,
        possible: [],
        impossible: [],
      },
    })),
}));

export default useModalStore;
