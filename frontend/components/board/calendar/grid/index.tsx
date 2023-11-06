/* eslint-disable react/jsx-key */
/** @jsxImportSource @emotion/react */
import { memo, MouseEvent, useState } from "react";
import { css } from "@emotion/react";
import { common } from "@/styles/common";
import { Modal } from "@/components/common/modal";
import { useToast } from "@/components/common/toast/context";
import {
  dateMapInterface,
  dayInterface,
  modalInterface,
  userInCalendarInterface,
} from "@/interfaces";

interface gridProps {
  month: dayInterface[][];
  isEditMode: boolean;
  selectedUser: userInCalendarInterface | null;
  dateMap: dateMapInterface;
  selectedDays: string[];
  setSelectedDays: Function;
}
interface dayProps {
  day: dayInterface;
  dayIndex: number;
  weekIndex: number;
}
interface weekProps {
  week: dayInterface[];
  weekIndex: number;
}

const Grid = ({
  month,
  isEditMode,
  selectedUser,
  dateMap,
  selectedDays,
  setSelectedDays,
}: gridProps) => {
  const [modalInfo, setModalInfo] = useState<modalInterface | null>(null);
  const toast = useToast();

  const selectDay = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const date = target.id;
    if (selectedDays.includes(date)) {
      const newSelectedDays = selectedDays.filter((d) => d !== date);
      setSelectedDays(newSelectedDays);
    } else {
      const newSelectedDays = [...selectedDays, date];
      setSelectedDays(newSelectedDays);
    }
  };

  const handleDayClick = (e: MouseEvent<HTMLDivElement>, day: dayInterface) => {
    if (isEditMode) {
      if (day.isCurrentMonth && selectedUser) {
        selectDay(e);
      } else {
        toast && toast.message("사람을 선택해야 날짜를 선택할 수 있어요.");
      }
    }
  };
  const handleDayEnter = (e: MouseEvent<HTMLDivElement>, day: dayInterface) => {
    !isEditMode &&
      day.selectedUsers.length > 0 &&
      Modal.handle({ e, setModalInfo, dateMap });
  };

  const handleDayLeave = () => {
    !isEditMode && setModalInfo(null);
  };

  const Day = ({ day, dayIndex, weekIndex }: dayProps) => {
    return (
      <div
        id={day.key}
        key={weekIndex * 7 + dayIndex}
        css={dayCss(day, isEditMode)}
        className={`${day.isCurrentMonth ? "current" : "not-current"} ${
          isEditMode && (day.isSelected ? "selected" : "not-selected")
        }`}
        onClick={(e) => handleDayClick(e, day)}
        onMouseEnter={(e) => handleDayEnter(e, day)}
        onMouseLeave={handleDayLeave}
      >
        {day.date}
        <div className="users">
          {day.selectedUsers.map((user, index) => (
            <div className="user" key={index} css={selectedUserCss(user)}></div>
          ))}
        </div>
      </div>
    );
  };

  const Week = ({ week, weekIndex }: weekProps) => {
    return (
      <>
        {week.map((day: dayInterface, dayIndex: number) => (
          <Day {...{ day, dayIndex, weekIndex }} />
        ))}
      </>
    );
  };

  const Month = () => {
    return (
      <>
        {month.map((week: dayInterface[], weekIndex: number) => (
          <Week {...{ week, weekIndex }} />
        ))}
      </>
    );
  };

  return (
    <div css={monthCss}>
      <Month />
      {modalInfo && <Modal modalInfo={modalInfo} />}
    </div>
  );
};

const selectedUserCss = (user: userInCalendarInterface) => css`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.3rem;
  background-color: ${user.userColor};
`;

const monthCss = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
`;

const dayCss = (day: dayInterface, isEditMode: boolean) => css`
  width: 3.6rem;
  height: 3.6rem;
  font-size: 0.5rem;
  font-weight: 700;
  padding: 0.75rem;
  box-shadow: 0 0 0 1px ${common.colors.tenaryGrey};
  cursor: ${day.selectedUsers.length > 0 || (day.isCurrentMonth && isEditMode)
    ? "pointer"
    : "default"};
  &.not-current {
    color: ${common.colors.secondaryGrey};
  }
  &.not-selected {
    color: ${common.colors.secondaryGrey};
    &.not-current {
      color: ${common.colors.tenaryGrey};
    }
  }
  &.selected {
    color: ${common.colors.primaryColor};
    background-color: ${common.colors.tenaryColor};
  }
  &:before {
    border: ${common.colors.tenaryGrey} 1px solid;
  }
  &:after {
    border: ${common.colors.tenaryGrey} 1px solid;
  }
  .users {
    display: flex;
    flex-wrap: wrap;
    gap: 0.1rem;
    margin-top: 0.1rem;
  }
`;

export default memo(Grid);
