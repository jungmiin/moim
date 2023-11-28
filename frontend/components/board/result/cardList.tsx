import { useEffect, useState, MouseEvent } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { List } from "../../common/list";
import { common } from "@/styles/common";
import { css } from "@emotion/react";
import { BoardResultModal } from "@/components/common/modal/boardResult";
import {
  dateMapInterface,
  clickInterface,
  resultInterface,
} from "@/interfaces";
import ResultSkeleton from "@/components/skeleton/result";
import OtherCardsSkeleton from "@/components/skeleton/otherCards";
import OptimalCardSkeleton from "@/components/skeleton/optimalCard";
interface cardListProps {
  dateMap: dateMapInterface;
  result: resultInterface[] | null;
}

const CardList = ({ dateMap, result }: cardListProps) => {
  const [optimalResult, setOptimalResult] = useState<resultInterface | null>(
    null
  );
  const [otherResult, setOtherResult] = useState<resultInterface[] | null>(
    null
  );
  const [click, setClick] = useState<clickInterface | null>(null);

  useEffect(() => {
    if (result && result.length > 0) {
      setOptimalResult(result[0]);
      setOtherResult(result.slice(1, 5));
    }
  }, [result]);

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    result: resultInterface
  ) => {
    const target = e.currentTarget as HTMLButtonElement;
    const date = result.date.toString();
    const rect = target.getBoundingClientRect();
    setClick({ date, rect });
  };

  const OptimalCard = () => {
    return (
      <>
        {optimalResult && (
          <List.Item css={listCss} index={optimalResult.date.toString()}>
            <span css={dateLabelCss}>제일 좋은 날짜는</span>
            <span css={optimalResultWrapperCss}>
              <span css={optimalResultCss}>
                {optimalResult.date
                  .locale("ko")
                  .format("YYYY년 MM월 DD일 ddd요일")}
              </span>
              이에요!
            </span>
            <span css={statusCss}>
              가능한 사람
              <span css={peopleCountCss}>
                {optimalResult.possible.length}명
              </span>
              <div css={lineCss} />
              불가능한 사람
              <span css={peopleCountCss}>
                {optimalResult.impossible.length}명
              </span>
              <button
                id={optimalResult.date.toString()}
                css={detailButtonCss}
                onClick={(e) => handleClick(e, optimalResult)}
              >
                자세히 보기
              </button>
            </span>
          </List.Item>
        )}
      </>
    );
  };

  const OtherCards = () => {
    return (
      <>
        <div css={otherResultLabelCss}>이 날짜는 어떤가요?</div>
        {otherResult &&
          otherResult.map((date, index) => (
            <List.Item css={listCss} key={index} index={date.date.toString()}>
              <span css={otherResultCss}>
                {date.date.locale("ko").format("YYYY년 MM월 DD일 ddd요일")}
              </span>
              <span css={statusCss}>
                가능한 사람{" "}
                <span css={peopleCountCss}>{date.possible.length}명</span>{" "}
                <div css={lineCss}></div> 불가능한 사람{" "}
                <span css={peopleCountCss}>{date.impossible.length}명</span>
                <button
                  id={date.date.toString()}
                  css={detailButtonCss}
                  onClick={(e) => handleClick(e, date)}
                >
                  자세히 보기
                </button>
              </span>
            </List.Item>
          ))}
      </>
    );
  };

  const CardList = () => {
    return (
      <List>
        {optimalResult ? <OptimalCard /> : <OptimalCardSkeleton />}
        {otherResult ? <OtherCards /> : <OtherCardsSkeleton />}
        <BoardResultModal click={click} dateMap={dateMap} />
      </List>
    );
  };

  const Result = () => {
    return (
      <>
        {result && result.length > 0 ? (
          <CardList />
        ) : (
          <div css={noResultCss}>
            <div css={titleCss}>아직 선택한 날짜가 없어요.</div>
            <div css={descCss}>인원을 추가한 뒤 날짜를 선택해주세요.</div>
          </div>
        )}
      </>
    );
  };

  return <>{result ? <Result /> : <ResultSkeleton />}</>;
};

const detailButtonCss = css`
  margin-left: auto;
  padding: 0.2rem 0.6rem;
  border: 1px solid ${common.colors.primaryColor};
  color: ${common.colors.primaryColor};
  border-radius: 1rem;
  font-size: 0.48rem;
  cursor: pointer;
  &:hover {
    color: ${common.colors.primaryWhite};
    background-color: ${common.colors.primaryColor};
  }
`;

const dateLabelCss = css`
  font-size: 0.58rem;
  margin-bottom: 0.4rem;
`;

const optimalResultWrapperCss = css`
  display: flex;
  font-size: 0.83rem;
`;

const optimalResultCss = css`
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

const statusCss = css`
  display: flex;
  font-size: 0.58rem;
  align-items: center;
`;

const lineCss = css`
  width: 0.05rem;
  height: 0.64rem;
  background-color: ${common.colors.tenaryGrey};
  margin: 0 0.2rem;
`;

const peopleCountCss = css`
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-left: 0.2rem;
`;

const otherResultLabelCss = css`
  font-size: 0.67rem;
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-bottom: 0.8rem;
`;

const otherResultCss = css`
  display: flex;
  font-size: 0.67rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
`;

const listCss = css`
  padding: 1rem;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 15rem;
  transition: all 0.2s linear 0s;
  cursor: default;
`;

const noResultCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 12rem;
`;

const titleCss = css`
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
`;

const descCss = css`
  font-size: 0.67rem;
  color: ${common.colors.primaryGrey};
`;

export default CardList;
