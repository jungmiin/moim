import { useState } from "react";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddPeople from "@/components/board/addPeople";
import MainCard from "@/components/common/card/mainCard";
import SubCard from "@/components/common/card/subCard";
import StrokeButton from "@/components/common/button/strokeButton";
import { common } from "@/styles/common";

const ResultWrapper = () => {
  const [isAddPeople, setAddPeople] = useState(false);

  const toggleAddPeople = () => {
    setAddPeople(!isAddPeople);
  };

  return (
    <>
      {isAddPeople ? (
        <Wrapper>
          <AddPeople toggleAddPeople={toggleAddPeople} />
        </Wrapper>
      ) : (
        <Wrapper>
          <StrokeButton
            text="인원 추가하기"
            color={common.colors.primaryColor}
            width={17}
            handler={toggleAddPeople}
            svg={faPlus}
            align={"left"}
          />
          <MainCard date={dayjs()} available={6} unavailable={1} />
          <Proposal>이 날짜는 어떤가요?</Proposal>
          <SubCard date={dayjs()} available={6} unavailable={1} />
          <SubCard date={dayjs()} available={6} unavailable={1} />
          <SubCard date={dayjs()} available={6} unavailable={1} />
          <SubCard date={dayjs()} available={6} unavailable={1} />
          <SubCard date={dayjs()} available={6} unavailable={1} />
          <SubCard date={dayjs()} available={6} unavailable={1} />
          <SubCard date={dayjs()} available={6} unavailable={1} />
          <SubCard date={dayjs()} available={6} unavailable={1} />
        </Wrapper>
      )}
    </>
  );
};

const proposalCss = css`
  font-size: 0.67rem;
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-bottom: 0.8rem;
`;
const Proposal = styled.div`
  ${proposalCss}
`;

const WrapperCss = css`
  flex-direction: column;
  padding: 0 2rem;
  max-width: 17rem;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${common.colors.tenaryGrey};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 3px;
  }
`;
const Wrapper = styled.div`
  ${WrapperCss}
`;

export default ResultWrapper;
