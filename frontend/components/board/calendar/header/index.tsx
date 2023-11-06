/** @jsxImportSource @emotion/react */
import { SetStateAction, Dispatch, memo } from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { common } from "@/styles/common";
import { Dropdown } from "@/components/common/dropdown";
import { List } from "@/components/common/list";
import {
  boardDataInCalendarInterface,
  userInCalendarInterface,
  userInterface,
} from "@/interfaces";
import { useUpdateDay } from "@/hooks/useDay";

interface headerProps {
  boardData: boardDataInCalendarInterface;
  currentMonth: dayjs.Dayjs;
  setCurrentMonth: Dispatch<SetStateAction<dayjs.Dayjs>>;
  users: Array<userInCalendarInterface>;
  setSelectedUser: Dispatch<SetStateAction<userInCalendarInterface | null>>;
  selectedUser: userInCalendarInterface | null;
  toggleEditMode: () => void;
  isEditMode: boolean;
  selectedDays: Array<string>;
  setSelectedDays: Dispatch<SetStateAction<Array<string>>>;
}

const Header = ({
  boardData,
  currentMonth,
  setCurrentMonth,
  users,
  setSelectedUser,
  selectedUser,
  toggleEditMode,
  isEditMode,
  selectedDays,
  setSelectedDays,
}: headerProps) => {
  const nextMonthHandler = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonthHandler = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const { mutate: updateDays } = useUpdateDay();

  const handleUpdateDays = () => {
    updateDays({
      boardId: boardData._id,
      userId: selectedUser?._id,
      days: selectedDays,
    });
  };

  const clickEditButton = () => {
    if (isEditMode) {
      if (selectedUser !== null) {
        handleUpdateDays();
      }
    }
    toggleEditMode();
  };

  const renderDayHeader = () => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const dayHeader: Array<JSX.Element> = days.map((day, index) => {
      return (
        <div css={dayCss} key={index}>
          <span>{day}</span>
        </div>
      );
    });
    return dayHeader;
  };

  const renderYearMonth = () => {
    return `${currentMonth.year()}년 ${currentMonth.month() + 1}월`;
  };

  const selectBadge = (clickedUser: userInCalendarInterface) => {
    setSelectedUser(clickedUser);
    const user = boardData.users.find(
      (user: userInterface) => user._id === clickedUser._id
    );
    if (user) setSelectedDays(user.selectedDays);
  };
  return (
    <>
      <div css={titleHeaderCss}>
        <div css={MonthControlCss}>
          <button css={PrevMonthButtonCss} onClick={() => prevMonthHandler()}>
            <FontAwesomeIcon className="fa" icon={faChevronLeft} />
          </button>
          <div>{renderYearMonth()}</div>
          <button css={NextMonthButtonCss} onClick={() => nextMonthHandler()}>
            {" "}
            <FontAwesomeIcon className="fa" icon={faChevronRight} />
          </button>
        </div>
        <div css={badgeWrapperCss}>
          {
            <Dropdown className={"dropdown"} css={dropdownCss}>
              <Dropdown.Menu>
                <List className={"list"} css={listCss}>
                  {users.map((user) => {
                    return (
                      <List.Item
                        key={user._id}
                        index={user._id}
                        className={`${
                          selectedUser === null
                            ? ""
                            : selectedUser._id === user._id
                            ? "selected"
                            : "not-selected"
                        }`}
                        css={badgeCss(user)}
                        onClick={() => selectBadge(user)}
                      >
                        {user.userName}
                      </List.Item>
                    );
                  })}
                </List>
              </Dropdown.Menu>
              <Dropdown.Trigger>
                <button css={buttonCss} onClick={clickEditButton}>
                  {isEditMode ? (
                    <FontAwesomeIcon
                      className="fa"
                      icon={faCheck}
                      width={12}
                      color={common.colors.primaryColor}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="fa"
                      icon={faPlus}
                      width={12}
                      color={common.colors.primaryColor}
                    />
                  )}
                </button>
              </Dropdown.Trigger>
            </Dropdown>
          }
        </div>
      </div>
      <div css={dayHeaderCss}>{renderDayHeader()}</div>
    </>
  );
};

const dropdownCss = css`
  display: flex;
`;

const badgeCss = (use: userInCalendarInterface) => css`
  display: flex;
  align-items: center;
  font-size: 0.67rem;
  padding: 0.25rem 0.67rem;
  border-radius: 1rem;
  margin: 0.2rem 0.05rem;
  cursor: pointer;
  .fa {
    margin-right: 0.4rem;
    cursor: pointer;
  }
  background-color: white;
  color: ${use.userColor};
  box-shadow: 0 0 0 1px ${use.userColor} inset;
  &.not-selected {
    background-color: white;
    color: ${use.userColor};
    box-shadow: 0 0 0 1px ${use.userColor} inset;
  }
  &.selected {
    background-color: ${use.userColor};
    color: white;
  }
`;

const listCss = css`
  width: 26rem;
  display: flex;
  margin-right: 0.4rem;
  white-space: nowrap;
  overflow: auto;
  &::-webkit-scrollbar {
    height: 5px;
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

const buttonCss = css`
  padding: 0.1rem 0.8rem;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.1rem;
  transition: all 0.2s linear 0s;
  &:hover {
    background: ${common.colors.tenaryColor};
    cursor: pointer;
  }
`;

const badgeWrapperCss = css`
  display: flex;
  justify-content: normal;
  align-items: center;
`;

const MonthControlCss = css`
  display: flex;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem;
`;

const PrevMonthButtonCss = css`
  padding: 0 0.2rem;
  color: ${common.colors.secondaryGrey};
`;

const NextMonthButtonCss = css`
  padding: 0 0.2rem;
  color: ${common.colors.secondaryGrey};
`;

const titleHeaderCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const dayHeaderCss = css`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const dayCss = css`
  width: 3.6rem;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.5rem;
  font-weight: 700;
  color: ${common.colors.primaryColor};
`;

export default memo(Header);
