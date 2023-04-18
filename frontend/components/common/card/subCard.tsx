import dayjs from "dayjs";
import "dayjs/locale/ko";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { common } from "@/styles/common";

interface cardPropsInterface {
  date: dayjs.Dayjs;
  available?: number;
  unavailable?: number;
}

const SubCard = ({ date, available, unavailable }: cardPropsInterface) => {
  return (
    <Wrapper>
      <DateWrapper>
        {date.locale("ko").format("YYYY년 MM월 DD일 ddd요일")}
      </DateWrapper>
      <Available>
        가능한 사람 <Number>{available}명</Number> <Line /> 불가능한 사람
        <Number>{unavailable}명</Number>
      </Available>
    </Wrapper>
  );
};

const lineCss = css`
  width: 0.1rem;
  background-color: ${common.colors.tenaryGrey};
  margin: 0 0.2rem;
`;

const Line = styled.div`
  ${lineCss}
`;

const dateWrapperCss = css`
  display: flex;
  font-size: 0.67rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
`;
const DateWrapper = styled.span`
  ${dateWrapperCss}
`;

const availableCss = css`
  display: flex;
  font-size: 0.58rem;
`;
const Available = styled.span`
  ${availableCss}
`;

const numberCss = css`
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-left: 0.2rem;
`;
const Number = styled.span`
  ${numberCss}
`;

const WrapperCss = css`
  padding: 1rem;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 15rem;
  transition: all 0.2s linear 0s;
  &:hover {
    background: ${common.colors.tenaryColor};
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  ${WrapperCss}
`;

export default SubCard;
