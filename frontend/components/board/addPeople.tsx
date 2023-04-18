import {
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
  useMemo,
} from "react";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import TextButton from "@/components/common/button/textButton";
import StrokeButton from "@/components/common/button/strokeButton";
import Badge from "@/components/common/badge";
import Input from "@/components/common/input";
import { common } from "@/styles/common";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface addPeoplePropsInterface {
  toggleAddPeople: MouseEventHandler;
}

interface peopleInterface {
  name: string;
  color: string;
  isNew: boolean;
}

const AddPeople = ({ toggleAddPeople }: addPeoplePropsInterface) => {
  const [badgeValue, setBadgeValue] = useState("");
  const [people, setPeople] = useState<Array<peopleInterface>>([]);
  const [badgeColor, setBadgeColor] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (badgeValue === "") {
      setDisabled(true);
    } else setDisabled(false);
  }, [badgeValue]);

  useEffect(() => {
    setPeople([
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
      { name: "테스트", color: getRandomColor(), isNew: false },
    ]);
    setBadgeColor(getRandomColor);
  }, []);

  // 파스텔 톤의 색상 생성
  const getRandomColor = () => {
    return (
      "hsl(" +
      160 +
      160 * Math.random() +
      "," +
      (25 + 30 * Math.random()) +
      "%," +
      (70 + 10 * Math.random()) +
      "%)"
    );
  };

  const removePerson = useCallback(
    (key: number) => {
      const deleted = people.filter((person, i) => key !== i);
      setPeople(deleted);
    },
    [people]
  );

  const addPerson = useCallback(() => {
    const newPeople = [...people];
    newPeople.forEach((person) => (person.isNew = false));
    setPeople(newPeople);
    setPeople([
      ...people,
      { name: badgeValue, color: badgeColor, isNew: true },
    ]);
    setBadgeColor(getRandomColor());
    setBadgeValue("");
  }, [people, badgeColor, badgeValue]);

  const renderBadges = useMemo(() => {
    return people.map((person, i) => (
      <Badge
        key={i}
        id={i}
        name={person.name}
        color={person.color}
        removable={true}
        onRemove={removePerson}
        isNew={person.isNew}
      />
    ));
  }, [people, removePerson]);

  return (
    <>
      <TextButton
        text="돌아가기"
        color={common.colors.primaryColor}
        handler={toggleAddPeople}
        svg={faArrowLeft}
        align={"left"}
      />
      <PeopleStatusLabel>현재 추가된 인원이에요</PeopleStatusLabel>
      <Status>{renderBadges}</Status>
      <InputLabel>추가할 사람의 이름을 입력해주세요</InputLabel>
      <Input
        placeholder="이름"
        setInputValue={setBadgeValue}
        inputValue={badgeValue}
      />
      <Status>
        <Badge
          name={badgeValue ? badgeValue : "미리보기"}
          color={badgeColor}
          id={1}
          isNew={false}
        />
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          size="xs"
          color={common.colors.secondaryGrey}
          onClick={() => setBadgeColor(getRandomColor)}
          style={{ marginLeft: "0.2rem", cursor: "pointer" }}
        />
      </Status>
      <StrokeButton
        text="추가하기"
        color={common.colors.primaryColor}
        width={17}
        handler={addPerson}
        svg={faPlus}
        align={"left"}
        disabled={disabled}
      />
    </>
  );
};

const peopleStatusLabelCss = css`
  font-size: 0.67rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
const PeopleStatusLabel = styled.div`
  ${peopleStatusLabelCss}
`;

const statusCss = css`
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-bottom: 1rem;
`;
const Status = styled.div`
  ${statusCss}
`;

const inputLabelCss = css`
  font-size: 0.67rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
const InputLabel = styled.div`
  ${inputLabelCss}
`;

export default AddPeople;
