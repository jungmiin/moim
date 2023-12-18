import ToastList from "./list";
import ToastPortal from "./portal";

const Toast = () => {
  return (
    <ToastPortal>
      <ToastList />
    </ToastPortal>
  );
};

export default Toast;
