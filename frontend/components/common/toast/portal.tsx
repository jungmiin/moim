import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface toastPortalProps {
  children: ReactNode;
}

const ToastPortal = ({ children }: toastPortalProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById("__toast"));
  }, []);

  if (!element) {
    return null;
  }

  const portal = createPortal(<>{children}</>, element);

  return portal;
};

export default ToastPortal;
