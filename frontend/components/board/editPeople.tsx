import { useState, useEffect, MouseEventHandler } from "react";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import TextButton from "@/components/common/button/textButton";
import { common } from "@/styles/common";
import { Form } from "../common/form";
import { List } from "../common/list";
import { Button } from "../common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface addPeoplePropsInterface {
  toggleAddPeople: MouseEventHandler;
}

interface peopleInterface {
  name: string;
  color: string;
  isNew: boolean;
}

const EditPeople = ({ toggleAddPeople }: addPeoplePropsInterface) => {
  const [people, setPeople] = useState<Array<peopleInterface>>([]);
  const [badgeColor, setBadgeColor] = useState("");

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

  const removePerson = (key: number) => {
    const deleted = people.filter((person, i) => key !== i);
    setPeople(deleted);
  };

  const addPerson = (name: string) => {
    const newPeople = [...people];
    newPeople.forEach((person) => (person.isNew = false));
    setPeople([
      ...newPeople,
      { name: name, color: getRandomColor(), isNew: true },
    ]);
    setBadgeColor(getRandomColor());
  };

  const getBadgeStyle = (person: peopleInterface) => {
    return `
      display: flex;
      align-items: center;
      background-color: ${person.color};
      font-size: 0.67rem;
      color: white;
      padding: 0.25rem 0.67rem;
      border-radius: 1rem;
      margin: 0.2rem 0.05rem;
      cursor: pointer;
      .fa {
        margin-right: 0.4rem;
        cursor: pointer;
      }
    `;
  };

  return (
    <>
      <Button style={buttonStyle} onClick={toggleAddPeople}>
        <Button.HoverIcon style={iconStyle}>
          <FontAwesomeIcon className="fa" icon={faArrowLeft} />
        </Button.HoverIcon>
        {"돌아가기"}
      </Button>
      <Form>
        <Form.Label style={labelStyle}>현재 추가된 인원이에요</Form.Label>
        <List style={listStyle}>
          {people.map((person, index) => {
            return (
              <List.RemovableItem
                key={index}
                index={index}
                style={getBadgeStyle(person)}
                onRemove={removePerson}
              >
                {person.name}
              </List.RemovableItem>
            );
          })}
        </List>
        <Form.Label style={labelStyle}>
          추가할 사람의 이름을 입력해주세요
        </Form.Label>
        <Form.Input style={inputStyle} placeholder="이름" />
        <Form.Submit style={submitStyle} onSubmit={addPerson}>
          추가하기
        </Form.Submit>
      </Form>
    </>
  );
};

const labelStyle = `
  font-size: 0.67rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
const inputStyle = `
width: 15rem;
padding: 1rem 1rem;
border-radius: 0.9rem;
box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
border: 1px solid ${common.colors.tenaryGrey};
display: flex;
justify-content: space-between;
margin-bottom: 1rem;
font-size: 0.67rem;
color: ${common.colors.primaryBlack};
&::placeholder {
  color: ${common.colors.secondaryGrey};
}
`;

const submitStyle = `
  display: flex;
  justify-content: center;
  border: 1px solid ${common.colors.primaryColor};
  border-radius: 3rem;
  padding: 1rem 0;
  width: 17rem;
  color: ${common.colors.primaryColor};
  font-weight: 700;
  font-size: 0.75rem;
  margin: 1rem 0;
  .tx {
    transition: 0.2s linear 0s;
    margin-right: 0.8rem;
  }
  .fa {
    transition: 0.2s linear 0s;
    opacity: 0;
  }
  &:hover {
    .fa {
      opacity: 100;
    }
    .tx {
      margin-right: 0rem;
    }
  }
  &:disabled {
    cursor: not-allowed;
    border: 1px solid ${common.colors.secondaryGrey};
    color: ${common.colors.secondaryGrey};
    &:hover {
      .fa {
        opacity: 0;
      }
      .tx {
        margin-right: 0.8rem;
      }
    }
  }
`;

const listStyle = `
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-bottom: 1rem;
`;

const buttonStyle = `
  position: relative;
  display: flex;
  color: ${common.colors.primaryColor};
  font-weight: 700;
  font-size: 0.75rem;
  margin: 1rem 0;
`;

const iconStyle = `
  margin-right: 0.3rem;

`;

export default EditPeople;
