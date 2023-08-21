import { css } from "@emotion/react";
import dayjs from "dayjs";
import { common } from "@/styles/common";
import { List } from "@/components/common/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { CSSProperties } from "react";

interface personInterface {
  _id: string;
  userName: string;
  userColor: string;
  isSelected: boolean;
  selectedDays?: Array<string>;
}

interface ModalInfoInterface {
  left: number;
  right: number;
  top: number;
  bottom: number;
  date: string;
  possible: personInterface[];
  impossible: personInterface[];
}

interface ModalPropsInterface {
  modalInfo: ModalInfoInterface;
}

interface ModalHandlePropsInterface {
  e: React.MouseEvent<HTMLDivElement>;
  setModalInfo: any;
  dateMap: any;
}

const modalHandle = ({
  e,
  setModalInfo,
  dateMap,
}: ModalHandlePropsInterface) => {
  const target = e.currentTarget as HTMLDivElement;
  const date = target.id;
  const rect = target.getBoundingClientRect();
  const height = window.innerHeight;
  const width = window.innerWidth;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  setModalInfo({
    left: width / 2 > rect.x + rect.width / 2 ? rect.left + 10 : 0,
    right: width / 2 <= rect.x + rect.width / 2 ? width - rect.right + 10 : 0,
    top:
      height / 2 > rect.y + rect.height / 2
        ? rect.top + scrollY + rect.height + 10
        : 0,
    bottom:
      height / 2 <= rect.y + rect.height / 2
        ? height - rect.bottom - scrollY + rect.height + 10
        : 0,
    date: date,
    possible: dateMap[date].possible,
    impossible: dateMap[date].impossible,
  });
};

const ModalMain = ({ modalInfo }: ModalPropsInterface) => {
  const date =
    modalInfo &&
    dayjs(modalInfo.date).locale("ko").format("YYYY년 MM월 DD일 ddd요일");

  const possible =
    modalInfo &&
    modalInfo.possible.map((person, index) => (
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
    modalInfo &&
    modalInfo.impossible.map((person, index) => (
      <List.Item key={index} index={index} css={modalBadgeCss}>
        {person.userName}
      </List.Item>
    ));

  const modalPosition = (): CSSProperties => {
    if (modalInfo && modalInfo.top !== 0 && modalInfo.left !== 0) {
      return {
        position: "absolute",
        left: modalInfo.left,
        top: modalInfo.top,
      };
    } else if (modalInfo && modalInfo.bottom !== 0 && modalInfo.left !== 0) {
      return {
        position: "absolute",
        left: modalInfo.left,
        bottom: modalInfo.bottom,
      };
    } else if (modalInfo && modalInfo.top !== 0 && modalInfo.right !== 0) {
      return {
        position: "absolute",
        right: modalInfo.right,
        top: modalInfo.top,
      };
    } else if (modalInfo && modalInfo.bottom !== 0 && modalInfo.right !== 0) {
      return {
        position: "absolute",
        right: modalInfo.right,
        bottom: modalInfo.bottom,
      };
    }
    return {
      display: "none",
    };
  };

  return (
    <>
      {modalInfo && (
        <div style={modalPosition()} css={modalCss}>
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
        </div>
      )}
    </>
  );
};

const modalCss = css`
  background-color: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s;
`;
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

export const Modal = Object.assign(ModalMain, {
  handle: modalHandle,
});
