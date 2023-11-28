import useModalStore from "@/stores/modal";
import { ReactNode } from "react";
import Dimd from "./dimd";
import ModalPortal from "./portal";
import ModalWrapper from "./wrapper";

interface modalProps {
  onClose?: Function;
  children: ReactNode;
}

const Modal = ({ onClose, children }: modalProps) => {
  const { info } = useModalStore();
  return (
    <>
      {info.isOpen && (
        <ModalPortal>
          <Dimd onClose={onClose} />
          <ModalWrapper>{children}</ModalWrapper>
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;
