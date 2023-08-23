import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from ".";

const ToastContext = createContext<Toast | null>(null);

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);
  useEffect(() => {
    const newToast = new Toast();
    setToast(newToast);
  }, []);

  return (
    <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};

export default ToastProvider;
