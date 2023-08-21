/* eslint-disable react/jsx-key */
import { SetStateAction, Dispatch } from "react";
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

interface personInterface {
  _id: string;
  userName: string;
  userColor: string;
  isSelected: boolean;
  selectedDays?: Array<string>;
}

interface headerPropsInterface {
  boardData: any;
  setBoardData: any;
  currentMonth: dayjs.Dayjs;
  setCurrentMonth: Dispatch<SetStateAction<dayjs.Dayjs>>;
  people: Array<personInterface>;
  setSelectedPerson: Dispatch<SetStateAction<personInterface | null>>;
  selectedPerson: personInterface | null;
  toggleEditMode: () => void;
  isEditMode: boolean;
  selectedDays: Array<string>;
  setSelectedDays: Dispatch<SetStateAction<Array<string>>>;
}

const Header = ({
  boardData,
  setBoardData,
  currentMonth,
  setCurrentMonth,
  people,
  setSelectedPerson,
  selectedPerson,
  toggleEditMode,
  isEditMode,
  selectedDays,
  setSelectedDays,
}: headerPropsInterface) => {
  const nextMonthHandler = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonthHandler = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const addNewDays = async () => {
    const response = await fetch("/api/day", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: boardData._id,
        userId: selectedPerson?._id,
        days: selectedDays,
      }),
    });
    if (response.status === 200) {
      const result = await response.json();
      setBoardData(result);
    } else {
      throw new Error("POST /day");
    }
  };

  const clickEditButton = () => {
    if (isEditMode) {
      if (selectedPerson !== null) {
        addNewDays();
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

  const getBadgeStyle = (person: personInterface) => {
    return css`
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
      color: ${person.userColor};
      box-shadow: 0 0 0 1px ${person.userColor} inset;
      &.not-selected {
        background-color: white;
        color: ${person.userColor};
        box-shadow: 0 0 0 1px ${person.userColor} inset;
      }
      &.selected {
        background-color: ${person.userColor};
        color: white;
      }
    `;
  };

  const selectBadge = (person: personInterface) => {
    setSelectedPerson(person);
    const user = boardData.users.find((user: any) => user._id === person._id);
    setSelectedDays(user.selectedDays);
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
            <Dropdown
              style={css`
                display: flex;
              `}
            >
              <Dropdown.Menu>
                <List
                  style={{
                    display: "flex",
                    marginRight: "0.4rem",
                  }}
                >
                  {people.map((person) => {
                    return (
                      <List.Item
                        key={person._id}
                        index={person._id}
                        className={`${
                          selectedPerson === null
                            ? ""
                            : selectedPerson._id === person._id
                            ? "selected"
                            : "not-selected"
                        }`}
                        css={getBadgeStyle(person)}
                        onClick={(e: EventTarget) => selectBadge(person)}
                      >
                        {person.userName}
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

export default Header;
