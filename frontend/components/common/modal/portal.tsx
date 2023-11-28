import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface toastPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: toastPortalProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById("__modal"));
  }, []);

  if (!element) {
    return null;
  }

  const portal = createPortal(<>{children}</>, element);

  return portal;
};

export default ModalPortal;
