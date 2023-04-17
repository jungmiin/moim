import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Calendar from "./calendar";

const CalendarWrapper = () => {
  return (
    <Wrapper>
      <Calendar />
    </Wrapper>
  );
};

const wrapperCss = css`
  padding: 2rem;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
`;

const Wrapper = styled.div`
  ${wrapperCss}
`;

export default CalendarWrapper;
