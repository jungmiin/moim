import useModalStore from "@/stores/modal";
import { css } from "@emotion/react";

const Dimd = ({ onClose }: { onClose?: Function }) => {
  const { close } = useModalStore();
  return (
    <div css={dimdCss} onClick={() => (onClose ? onClose() : close())}></div>
  );
};

const dimdCss = css`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(15, 34, 50, 0.1);
  z-index: 999;
`;

export default Dimd;
