import useModalStore from "@/stores/modal";
import { ReactNode } from "react";
import Dimd from "./dimd";
import ModalPortal from "./portal";
import ModalWrapper from "./wrapper";

interface modalProps {
  children: ReactNode;
}

const Modal = ({ children }: modalProps) => {
  const { info } = useModalStore();
  return (
    <>
      {info.isOpen && (
        <ModalPortal>
          <Dimd />
          <ModalWrapper>{children}</ModalWrapper>
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;
