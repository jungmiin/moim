import useModalStore from "@/stores/modal";
import { common } from "@/styles/common";
import { css } from "@emotion/react";
import { ReactNode } from "react";

interface modalWrapperProps {
  children: ReactNode;
}

const ModalWrapper = ({ children }: modalWrapperProps) => {
  const { info } = useModalStore();
  return (
    <div css={wrapperCss(info.top, info.left, info.bottom, info.right)}>
      {children}
    </div>
  );
};

const wrapperCss = (
  top: string | null,
  left: string | null,
  bottom: string | null,
  right: string | null
) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${!top && !left && !bottom && !right
    ? "translate(-50%, -50%)"
    : null};
  top: ${top ? top : null};
  left: ${left ? left : null};
  bottom: ${bottom ? bottom : null};
  right: ${right ? right : null};
  background-color: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.5rem;
  padding: 1rem;
  z-index: 1000;
`;

export default ModalWrapper;
