/* eslint-disable react/jsx-key */
/** @jsxImportSource @emotion/react */
import { memo, MouseEvent, useRef, useState } from "react";
import { css } from "@emotion/react";
import { common } from "@/styles/common";
import { Modal } from "@/components/common/modal";
import { useToast } from "@/components/common/toast/context";
import {
  dateMapInterface,
  dayInterface,
  hoverInterface,
  userInterface,
} from "@/interfaces";

interface gridProps {
  month: dayInterface[][];
  isEditMode: boolean;
  selectedUser: userInterface | null;
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
  const [hover, setHover] = useState<hoverInterface | null>(null);
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
      } else if (day.isCurrentMonth) {
        toast && toast.message("사람을 선택해야 날짜를 선택할 수 있어요.");
      } else {
        toast && toast.message("상단의 화살표를 통해 달을 변경해주세요.");
      }
    }
  };
  const handleDayEnter = (e: MouseEvent<HTMLDivElement>, day: dayInterface) => {
    if (!isEditMode && day.possibleUsers.length > 0) {
      const target = e.currentTarget as HTMLDivElement;
      const date = target.id;
      const rect = target.getBoundingClientRect();
      setHover({ date, rect });
    } else {
      setHover(null);
    }
  };
  const handleDayLeave = (e: MouseEvent<HTMLDivElement>) => {
    setHover(null);
  };

  const Day = ({ day, dayIndex, weekIndex }: dayProps) => {
    return (
      <div
        id={day.key}
        key={weekIndex * 7 + dayIndex}
        onClick={(e) => handleDayClick(e, day)}
        onMouseEnter={(e) => handleDayEnter(e, day)}
        onMouseLeave={(e) => handleDayLeave(e)}
        css={dayCss(day, isEditMode)}
        className={`day ${weekIndex * 7 + dayIndex} ${
          day.isCurrentMonth ? "current" : "not-current"
        } ${isEditMode && (day.isSelected ? "selected" : "not-selected")}`}
      >
        {day.date}
        <div className="users">
          {day.possibleUsers.map((user, index) => (
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
          <Day key={dayIndex} {...{ day, dayIndex, weekIndex }} />
        ))}
      </>
    );
  };

  const Month = () => {
    return (
      <>
        {month.map((week: dayInterface[], weekIndex: number) => (
          <Week key={weekIndex} {...{ week, weekIndex }} />
        ))}
      </>
    );
  };

  return (
    <div css={monthCss}>
      <Month />
      <Modal hover={hover} dateMap={dateMap} />
    </div>
  );
};

const selectedUserCss = (user: userInterface) => css`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.3rem;
  background-color: ${user.userColor};
`;

const monthCss = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: solid 1px ${common.colors.tenaryGrey};
  border-left: solid 1px ${common.colors.tenaryGrey};
`;

const dayCss = (day: dayInterface, isEditMode: boolean) => css`
  width: 3.6rem;
  height: 3.6rem;
  font-size: 0.5rem;
  font-weight: 700;
  padding: 0.75rem;
  border-bottom: solid 1px ${common.colors.tenaryGrey};
  border-right: solid 1px ${common.colors.tenaryGrey};
  cursor: ${day.possibleUsers.length > 0 || (day.isCurrentMonth && isEditMode)
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
  &:hover {
    background-color: ${common.colors.tenaryColor};
  }
  .test {
    background-color: red;
  }
  .users {
    display: flex;
    flex-wrap: wrap;
    gap: 0.1rem;
    margin-top: 0.1rem;
  }
`;

export default memo(Grid);
