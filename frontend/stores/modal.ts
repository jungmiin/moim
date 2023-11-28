import { create } from "zustand";
import { modalStoreInterface } from "@/interfaces";

const useModalStore = create<modalStoreInterface>((set) => ({
  info: {
    isOpen: false,
    top: null,
    left: null,
    bottom: null,
    right: null,
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
}));

export default useModalStore;
