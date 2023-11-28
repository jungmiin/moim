import { css } from "@emotion/react";
import { toastInterface } from "@/interfaces";
import useToastStore from "@/stores/toasts";
import ToastItem from "./item";

const ToastList = () => {
  const { toasts, deleteToast } = useToastStore();

  const onClose = (targetId: string) => {
    deleteToast(targetId);
  };

  return (
    <div css={messagesCss}>
      {toasts.map((toast: toastInterface) => {
        return (
          <ToastItem
            key={toast.id}
            id={toast.id}
            onClose={onClose}
            message={toast.message}
          />
        );
      })}
    </div>
  );
};

const messagesCss = css`
  z-index: 1;
  position: fixed;
  left: 50%;
  bottom: 5.5rem;
  transform: translate(-50%, 0);
  font-size: 0.7rem;
`;

export default ToastList;
