import { css } from "@emotion/react";
import { toastInterface } from "@/interfaces";
import useToastStore from "@/stores/toasts";
import ToastItem from "./item";

const ToastList = () => {
  const { toasts, deleteToast } = useToastStore();

  const onClose = (targetId: string) => {
    console.log(targetId);
    deleteToast(targetId);
  };

  // client.js:1 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
  //   at ToastList (webpack-internal:///./components/common/toast/list.tsx:32:95)
  //   at ToastPortal (webpack-internal:///./components/common/toast/portal.tsx:12:11)
  //   at Toast
  //   at Suspense

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
