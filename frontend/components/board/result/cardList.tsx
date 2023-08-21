import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { List } from "../../common/list";
import { common } from "@/styles/common";
import { css } from "@emotion/react";
import { Modal } from "@/components/common/modal";

interface personInterface {
  _id: string;
  userName: string;
  userColor: string;
  isSelected: boolean;
  selectedDays?: Array<string>;
}

interface dateInterface {
  date: dayjs.Dayjs;
  possible: personInterface[];
  impossible: personInterface[];
}

interface MapInterface {
  [key: string]: userInterface;
}

interface userInterface {
  possible: personInterface[];
  impossible: personInterface[];
}

interface cardListPropsInterface {
  dateMap: MapInterface;
  result: dateInterface[];
}

const CardList = ({ dateMap, result }: cardListPropsInterface) => {
  const [optimalDate, setOptimalDate] = useState<dateInterface | null>(null);
  const [otherDate, setOtherDate] = useState<dateInterface[] | null>(null);
  const [modalInfo, setModalInfo] = useState<{
    left: number;
    right: number;
    top: number;
    bottom: number;
    date: string;
    possible: personInterface[];
    impossible: personInterface[];
  } | null>(null);

  useEffect(() => {
    setOptimalDate(result[0]);
    setOtherDate(result.slice(1));
  }, [result]);

  const renderOptimalCard = () => {
    return (
      <>
        {optimalDate !== null && (
          <List.Item
            css={listStyle}
            index={optimalDate.date.toString()}
            onMouseOver={(e: any) => Modal.handle({ e, setModalInfo, dateMap })}
            onMouseOut={(e: any) => setModalInfo(null)}
          >
            <span css={dateLabelStyle}>제일 좋은 날짜는</span>
            <span css={optimalDateWrapperStyle}>
              <span css={optimalDateStyle}>
                {optimalDate.date
                  .locale("ko")
                  .format("YYYY년 MM월 DD일 ddd요일")}
              </span>
              이에요!
            </span>
            <span css={statusStyle}>
              가능한 사람
              <span css={peopleCountStyle}>
                {optimalDate.possible.length}명
              </span>
              <div css={lineStyle}></div>
              불가능한 사람
              <span css={peopleCountStyle}>
                {optimalDate.impossible.length}명
              </span>
            </span>
          </List.Item>
        )}
      </>
    );
  };

  const renderOtherCards = () => {
    return (
      <>
        <div css={otherDateLabelStyle}>이 날짜는 어떤가요?</div>
        {otherDate !== null &&
          otherDate.map((date, index) => (
            <List.Item
              css={listStyle}
              key={index}
              index={date.date.toString()}
              onMouseOver={(e: any) =>
                Modal.handle({ e, setModalInfo, dateMap })
              }
              onMouseOut={(e: any) => setModalInfo(null)}
            >
              <span css={otherDateStyle}>
                {date.date.locale("ko").format("YYYY년 MM월 DD일 ddd요일")}
              </span>
              <span css={statusStyle}>
                가능한 사람{" "}
                <span css={peopleCountStyle}>{date.possible.length}명</span>{" "}
                <div css={lineStyle}></div> 불가능한 사람{" "}
                <span css={peopleCountStyle}>{date.impossible.length}명</span>
              </span>
            </List.Item>
          ))}
      </>
    );
  };

  const renderCardList = () => {
    return (
      <List>
        {optimalDate && renderOptimalCard()}
        {otherDate && renderOtherCards()}
        {modalInfo && <Modal modalInfo={modalInfo} />}
      </List>
    );
  };
  return (
    <>
      {result.length > 0 ? (
        renderCardList()
      ) : (
        <div css={noDateStyle}>
          <div css={titleStyle}>아직 선택한 날짜가 없어요.</div>
          <div css={descStyle}>인원을 추가한 뒤 날짜를 선택해주세요.</div>
        </div>
      )}
    </>
  );
};

const dateLabelStyle = css`
  font-size: 0.58rem;
  margin-bottom: 0.4rem;
`;

const optimalDateWrapperStyle = css`
  display: flex;
  font-size: 0.83rem;
`;

const optimalDateStyle = css`
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

const statusStyle = css`
  display: flex;
  font-size: 0.58rem;
`;

const lineStyle = css`
  width: 0.1rem;
  background-color: ${common.colors.tenaryGrey};
  margin: 0 0.2rem;
`;

const peopleCountStyle = css`
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-left: 0.2rem;
`;

const otherDateLabelStyle = css`
  font-size: 0.67rem;
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-bottom: 0.8rem;
`;

const otherDateStyle = css`
  display: flex;
  font-size: 0.67rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
`;

const listStyle = css`
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

const noDateStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 12rem;
`;

const titleStyle = css`
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
`;

const descStyle = css`
  font-size: 0.67rem;
  color: ${common.colors.primaryGrey};
`;

export default CardList;
