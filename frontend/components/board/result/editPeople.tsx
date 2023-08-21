import { useState, useEffect, MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { common } from "@/styles/common";
import { Form } from "../../common/form";
import { List } from "../../common/list";
import { getRandomPastelColor } from "@/lib/randomColor";
interface addPeoplePropsInterface {
  toggleAddPeople: MouseEventHandler;
  boardData: any;
  setBoardData: any;
}

interface personInterface {
  _id: string;
  userName: string;
  userColor: string;
  isNew: boolean;
}

const EditPeople = ({
  toggleAddPeople,
  boardData,
  setBoardData,
}: addPeoplePropsInterface) => {
  const [people, setPeople] = useState<Array<personInterface>>([]);

  useEffect(() => {
    const newPeople = boardData.users.map((user: any) => {
      return {
        _id: user._id,
        userName: user.userName,
        userColor: user.userColor,
        isNew: false,
      };
    });
    setPeople(newPeople);
  }, [boardData]);

  const removePerson = async (id: string) => {
    const response = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: boardData._id,
        userId: id,
      }),
    });
    if (response.status === 200) {
      const result = await response.json();
      setBoardData(result);
    } else {
      throw new Error("DELETE /user");
    }
  };

  const addPerson = async (name: string) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: boardData._id,
        user: {
          userName: name,
          userColor: getRandomPastelColor(),
        },
      }),
    });
    if (response.status === 200) {
      const result = await response.json();
      setBoardData(result);
    } else {
      throw new Error("POST /user");
    }
  };

  const getBadgeStyle = (person: personInterface) => {
    return css`
      display: flex;
      align-items: center;
      background-color: ${person.userColor};
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
      <button css={buttonCss} onClick={toggleAddPeople}>
        {"돌아가기"}
      </button>
      <Form>
        <Form.Label style={labelCss}>현재 추가된 인원이에요</Form.Label>
        <List
          css={listCss}
          style={{
            display: "flex",
            alignItems: "center",
            flexFlow: "wrap",
            marginBottom: "1rem",
          }}
        >
          {people.map((person) => {
            return (
              <List.RemovableItem
                key={person._id}
                index={person._id}
                css={getBadgeStyle(person)}
                onRemove={removePerson}
              >
                {person.userName}
              </List.RemovableItem>
            );
          })}
        </List>
        <Form.Label style={labelCss}>
          추가할 사람의 이름을 입력해주세요
        </Form.Label>
        <Form.Input style={inputCss} placeholder="이름" />
        <Form.Submit style={submitCss} onSubmit={addPerson}>
          추가하기
        </Form.Submit>
      </Form>
    </>
  );
};

const labelCss = css`
  font-size: 0.67rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const inputCss = css`
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

const submitCss = css`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  border: 1px solid ${common.colors.primaryColor};
  border-radius: 3rem;
  padding: 1rem 0;
  width: 17rem;
  color: ${common.colors.primaryColor};
  font-weight: 700;
  font-size: 0.75rem;
  margin: 1rem 0;
  &::before {
    opacity: 0;
    margin-left: -0.5em;
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    content: "+";
    transition: all 0.2s;
  }
  &:hover {
    &::before {
      margin-left: 0.5rem;
      opacity: 1;
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

const listCss = css`
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-bottom: 1rem;
`;

const buttonCss = css`
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  position: relative;
  display: flex;
  color: ${common.colors.primaryColor};
  font-weight: 700;
  font-size: 0.75rem;
  margin: 1rem 0;
  &::before {
    opacity: 0;
    margin-left: -0.5em;
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    content: "";
    transition: all 0.2s;
  }
  &:hover {
    &::before {
      margin-left: 0.5rem;
      opacity: 1;
    }
  }
`;

export default EditPeople;
