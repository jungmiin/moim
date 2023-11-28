import { v4 } from "uuid";
import { create } from "zustand";
import { toastsStoreInterface } from "@/interfaces";

const useToastStore = create<toastsStoreInterface>((set) => ({
  toasts: [],
  addToast: (message: string) =>
    set((prev: toastsStoreInterface) => {
      if (prev.toasts.length < 5) {
        const newToast = {
          id: v4(),
          message,
        };
        return {
          toasts: [...prev.toasts, newToast],
        };
      } else {
        return { toasts: prev.toasts };
      }
    }),
  deleteToast: (targetId: string) =>
    set((prev: toastsStoreInterface) => {
      const newToasts = prev.toasts.filter(({ id }) => id !== targetId);
      console.log(prev.toasts, newToasts);
      return {
        toasts: newToasts,
      };
    }),
}));

export default useToastStore;
