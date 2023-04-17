import { css } from "@emotion/react";
import styled from "@emotion/styled";
import CalendarWrapper from "@/components/board/calendarWrapper";
import ResultWrapper from "@/components/board/resultWrapper";

const board = () => {
  return (
    <>
      <Wrapper>
        <CalendarWrapper />
        <ResultWrapper />
      </Wrapper>
    </>
  );
};

const wrapperCss = css`
  display: flex;
  margin-top: 3.6rem;
  justify-content: center;
  width: 100vw;
`;

const Wrapper = styled.div`
  ${wrapperCss}
`;

export default board;
