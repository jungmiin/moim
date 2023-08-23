import { common } from "@/styles/common";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface Message {
  id: string;
  message: string;
}

interface Props {
  messages: Message[];
  close: Function;
}

export const Message = ({ messages, close }: Props) => {
  return (
    <div css={messagesCss}>
      {messages.map(({ id, message }) => {
        return (
          <div key={id} css={messageCss}>
            <div css={containerCss}>
              <div>{message}</div>
              <button onClick={() => close(id)}>
                <FontAwesomeIcon
                  icon={faClose}
                  color={common.colors.primaryGrey}
                />
              </button>
            </div>
            <div css={progressCss}></div>
          </div>
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

const messageCss = css`
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.4rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
  animation: slide 0.4s;
  @keyframes slide {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 100;
      transform: translateX(0%);
    }
  }
`;

const containerCss = css`
  margin: 0.8rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const progressCss = css`
  width: 100%;
  height: 0.2rem;
  background-color: ${common.colors.primaryColor};
  animation: progressBar 3s linear;
  @keyframes progressBar {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
`;
