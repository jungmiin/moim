import { css } from "@emotion/react";
import dayjs from "dayjs";
import { common } from "@/styles/common";
import { List } from "@/components/common/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { clickInterface, dateMapInterface, modalInterface } from "@/interfaces";
import Modal from ".";
import useModalStore from "@/stores/modal";

interface ModalProps {
  click: clickInterface | null;
  dateMap: dateMapInterface;
}

const BoardResultModal = ({ click, dateMap }: ModalProps) => {
  const { open } = useModalStore();
  const [boardResult, setBoardResult] = useState<modalInterface | null>(null);

  useEffect(() => {
    if (click) {
      const { date, rect } = click;
      const height = window.innerHeight;
      const width = window.innerWidth;
      const scrollY = window.scrollY;
      const top =
        height / 2 > rect.y + rect.height / 2
          ? (rect.top + scrollY + rect.height + 10).toString() + "px"
          : "auto";
      const left =
        width / 2 > rect.x + rect.width / 2
          ? (rect.left + 10).toString() + "px"
          : "auto";
      const bottom =
        height / 2 <= rect.y + rect.height / 2
          ? (height - rect.bottom - scrollY + rect.height + 10).toString() +
            "px"
          : "auto";
      const right =
        width / 2 <= rect.x + rect.width / 2
          ? (width - rect.right + 10).toString() + "px"
          : "auto";
      open(top, left, bottom, right);
      setBoardResult({
        date: date,
        possible: dateMap[date].possible,
        impossible: dateMap[date].impossible,
      });
    }
  }, [click]);

  const date =
    boardResult &&
    dayjs(boardResult.date).locale("ko").format("YYYY년 MM월 DD일 ddd요일");

  const possible =
    boardResult &&
    boardResult.possible.map((person, index) => (
      <List.Item
        key={index}
        index={index}
        css={modalBadgeCss}
        style={{ backgroundColor: person.userColor, color: "white" }}
      >
        {person.userName}
      </List.Item>
    ));

  const impossible =
    boardResult &&
    boardResult.impossible.map((person, index) => (
      <List.Item key={index} index={index} css={modalBadgeCss}>
        {person.userName}
      </List.Item>
    ));

  return (
    <>
      {boardResult && (
        <Modal>
          <div css={modalDateCss}>{date}</div>
          <div css={modalLabelCss}>
            <FontAwesomeIcon className="fa" icon={faThumbsUp} />
            가능한 사람
          </div>
          <List style={{ display: "flex", gap: "0.1rem" }}>{possible}</List>
          <div css={modalLabelCss}>
            <FontAwesomeIcon className="fa" icon={faThumbsDown} />
            불가능한 사람
          </div>
          <List style={{ display: "flex", gap: "0.1rem" }}>{impossible}</List>
        </Modal>
      )}
    </>
  );
};

const modalDateCss = css`
  font-size: 0.67rem;
  font-weight: 700;
`;
const modalLabelCss = css`
  display: flex;
  gap: 0.2rem;
  font-size: 0.5rem;
  font-weight: 500;
  color: ${common.colors.primaryGrey};
  margin: 0.48rem 0 0.32rem 0;
`;
const modalBadgeCss = css`
  font-size: 0.5rem;
  font-weight: 500;
  padding: 0.25rem 0.67rem;
  border-radius: 1rem;
  color: ${common.colors.secondaryGrey};
  background-color: ${common.colors.tenaryGrey};
`;

export { BoardResultModal };
