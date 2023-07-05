import dayjs from "dayjs";
import "dayjs/locale/ko";
import { List } from "../common/list";
import { common } from "@/styles/common";
import { css } from "@emotion/react";

interface dateInterface {
  date: dayjs.Dayjs;
  available?: number;
  unavailable?: number;
}

interface datesPropsInterface {
  dates: Array<dateInterface>;
}

const CardList = ({ dates }: datesPropsInterface) => {
  const optimalDate = dates[0];
  const otherDate = dates.slice(1);

  return (
    <List>
      <List.Item style={listStyle}>
        <span css={css(dateLabelStyle)}>제일 좋은 날짜는</span>
        <span css={css(optimalDateWrapperStyle)}>
          <span css={css(optimalDateStyle)}>
            {optimalDate.date.locale("ko").format("YYYY년 MM월 DD일 ddd요일")}
          </span>
          이에요!
        </span>
        <span css={css(statusStyle)}>
          가능한 사람
          <span css={css(peopleCountStyle)}>{optimalDate.available}명</span>
          <div css={css(lineStyle)}></div>
          불가능한 사람
          <span css={css(peopleCountStyle)}>{optimalDate.unavailable}명</span>
        </span>
      </List.Item>
      <div css={css(otherDateLabelStyle)}>이 날짜는 어떤가요?</div>
      {otherDate.map((date, index) => (
        <List.Item style={listStyle} key={index}>
          <span css={css(otherDateStyle)}>
            {date.date.locale("ko").format("YYYY년 MM월 DD일 ddd요일")}
          </span>
          <span css={css(statusStyle)}>
            가능한 사람{" "}
            <span css={css(peopleCountStyle)}>{date.available}명</span>{" "}
            <div css={css(lineStyle)}></div> 불가능한 사람{" "}
            <span css={css(peopleCountStyle)}>{date.unavailable}명</span>
          </span>
        </List.Item>
      ))}
    </List>
  );
};

const dateLabelStyle = `
    font-size: 0.58rem;
    margin-bottom: 0.4rem;
`;

const optimalDateWrapperStyle = `
    display: flex;
    font-size: 0.83rem;
`;

const optimalDateStyle = `
    font-weight: 700;
    background: ${common.gradient.secondaryGradient};
    background-size: 300% 300%;
    color: transparent;
    -webkit-background-clip: text;
    margin-bottom: 0.6rem;
    animation: date 4s ease infinite;
    @keyframes date {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
    }
`;

const statusStyle = `
    display: flex;
    font-size: 0.58rem;
`;

const lineStyle = `
    width: 0.1rem;
    background-color: ${common.colors.tenaryGrey};
    margin: 0 0.2rem;
`;

const peopleCountStyle = `
    font-weight: 700;
    color: ${common.colors.primaryColor};
    margin-left: 0.2rem;
`;

const otherDateLabelStyle = `
    font-size: 0.67rem;
    font-weight: 700;
    color: ${common.colors.primaryColor};
    margin-bottom: 0.8rem;
`;

const otherDateStyle = `
    display: flex;
    font-size: 0.67rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
`;

const listStyle = `
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

export default CardList;
