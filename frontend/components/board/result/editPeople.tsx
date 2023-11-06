import { useState, MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { common } from "@/styles/common";
import { Form } from "../../common/form";
import { List } from "../../common/list";
import { getRandomPastelColor } from "@/lib/color";
import { useAddUser, useDeleteUser } from "@/hooks/useUser";
import { boardDataInterface, userInterface } from "@/interfaces";
interface editPeopleProps {
  toggleAddPeople: MouseEventHandler;
  boardData: boardDataInterface;
}

const EditPeople = ({ toggleAddPeople, boardData }: editPeopleProps) => {
  const users = boardData.users;
  const [userName, setUserName] = useState<string>("");
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: addUser } = useAddUser();

  const handleDeleteUser = (id: string) => {
    deleteUser({ boardId: boardData._id, userId: id });
  };

  const handleAddUser = () => {
    addUser({
      boardId: boardData._id,
      user: {
        userName,
        userColor: getRandomPastelColor(),
      },
    });
  };

  return (
    <>
      <button css={buttonCss} onClick={toggleAddPeople}>
        돌아가기
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
          {users.map((user) => {
            return (
              <List.RemovableItem
                key={user._id}
                index={user._id}
                css={getBadgeStyle(user)}
                onRemove={handleDeleteUser}
              >
                {user.userName}
              </List.RemovableItem>
            );
          })}
        </List>
        <Form.Label style={labelCss}>
          추가할 사람의 이름을 입력해주세요
        </Form.Label>
        <Form.Input
          style={inputCss}
          placeholder="이름"
          onSubmit={handleAddUser}
          input={userName}
          onChange={setUserName}
        />
        <Form.Submit
          style={submitCss}
          onSubmit={handleAddUser}
          input={userName}
          onChange={setUserName}
        >
          추가하기
        </Form.Submit>
      </Form>
    </>
  );
};

const getBadgeStyle = (user: userInterface) => {
  return css`
    display: flex;
    align-items: center;
    background-color: ${user.userColor};
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
    margin-left: -1.2em;
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    content: "";
    transition: all 0.2s;
  }
  &:hover {
    &::before {
      margin-left: 0rem;
      opacity: 1;
    }
  }
`;

export default EditPeople;
