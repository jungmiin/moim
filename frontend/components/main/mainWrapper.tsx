import { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Alata } from "@next/font/google";
import { common } from "@/styles/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const alata = Alata({ weight: ["400"], preload: false });

const MainWrapper = () => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [roomName, setRoomName] = useState("");
  const showInput = () => {
    setIsShowInput(!isShowInput);
  };

  return (
    <Wrapper>
      <DescWrapper>#오늘부턴_약속도_간편하게_🤩</DescWrapper>
      <Title>moim</Title>
      <GenerateButton className={isShowInput ? "hide" : ""} onClick={showInput}>
        모임 만들기
      </GenerateButton>
      <RoomNameInputArea className={isShowInput ? "" : "hide"}>
        <BackButton onClick={showInput}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: `${common.colors.primaryColor}` }}
          />
        </BackButton>
        <RoomNameInput
          placeholder="모임 명을 입력해주세요."
          onChange={(event) => {
            setRoomName(event.target.value);
          }}
          value={roomName}
        ></RoomNameInput>
        <RoomNameButton className={roomName ? "" : "hide"}>
          만들기
        </RoomNameButton>
      </RoomNameInputArea>
    </Wrapper>
  );
};
const descWrapperCss = css`
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: -2rem;
  font-size: 0.8rem;
  font-weight: 500;
`;
const DescWrapper = styled.div`
  ${descWrapperCss}
`;
const backButtonCss = css`
  all: unset;
  cursor: pointer;
  margin-left: 1rem;
`;
const BackButton = styled.button`
  ${backButtonCss}
`;
const roomNameInputAreaCss = css`
  opacity: 100;
  margin-top: -3.6rem;
  transition: all 0.2s linear 0s;
  background-color: white;
  font-size: 0.75rem;
  width: 16rem;
  height: 3.6rem;
  border-radius: 0.9rem;
  border: 1px solid ${common.colors.primaryColor};
  box-shadow: 0 0 12px rgba(142, 168, 241, 0.1);
  display: flex;
  justify-content: space-between;
  z-index: 5;
  &.hide {
    opacity: 0;
    visibility: hidden;
  }
`;
const RoomNameInputArea = styled.div`
  ${roomNameInputAreaCss}
`;

const roomNameInputCss = css`
  all: unset;
  width: 100%;
  margin: 0 1rem 0 0.5rem;
  &::placeholder {
    color: ${common.colors.primaryGrey};
  }
`;
const RoomNameInput = styled.input`
  ${roomNameInputCss}
`;

const roomNameButtonCss = css`
  all: unset;
  cursor: pointer;
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-right: 1rem;
  white-space: nowrap;
  z-index: 4;
  transition: all 0.2s linear 0s;
  &.hide {
    color: ${common.colors.secondaryGrey};
  }
`;
const RoomNameButton = styled.button`
  ${roomNameButtonCss}
`;

const wrapperCss = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
  margin-top: -5rem;
`;

const Wrapper = styled.div`
  ${wrapperCss}
`;

// TODO : 버튼 공용 컴포넌트로 만들기

const generateButtonCss = css`
  all: unset;
  transition: all 0.2s linear 0s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${common.gradient.secondaryGradient};
  color: white;
  width: 10rem;
  height: 3.6rem;
  border-radius: 1.8rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;

  &:after {
    content: "+";
    position: absolute;
    opacity: 0;
    font-size: 1rem;
    right: 2.75rem;
    transition: all 0.2s linear 0s;
  }

  &:hover {
    text-indent: -0.5rem;

    &:after {
      opacity: 1;
      text-indent: 0px;
    }
  }
  &.hide {
    opacity: 0;
  }
`;

const GenerateButton = styled.button`
  ${generateButtonCss}
`;

const titleCss = css`
  color: white;
  font-family: ${alata.style.fontFamily};
  font-size: 10rem;
  padding-bottom: 1rem;
`;

const Title = styled.div`
  ${titleCss}
`;

export default MainWrapper;
