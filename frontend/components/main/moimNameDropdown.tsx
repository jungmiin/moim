import { Form } from "../common/form";
import { Dropdown } from "../common/dropdown";
import { common } from "@/styles/common";
import Router from "next/router";
import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";

export const MoimNameDropdown = ({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const generateNewBoard = async (input: string) => {
    setLoading(true);
    const response = await fetch("/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardName: input,
      }),
    });
    if (response.status === 200) {
      const { boardUrl } = await response.json();
      Router.push(`/board/${boardUrl}`);
    } else {
      throw new Error("POST /board");
    }
    setLoading(false);
  };

  return (
    <Dropdown>
      <Dropdown.TriggerAndHide style={buttonStyle}>
        <button>모임 만들기</button>
      </Dropdown.TriggerAndHide>
      <Dropdown.Menu>
        <Form style={formStyle}>
          <Form.Input
            style={formInputStyle}
            placeholder="모임 명을 입력해주세요."
          />
          <Form.Submit style={formRightButtonStyle} onSubmit={generateNewBoard}>
            만들기
          </Form.Submit>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const formStyle = css`
  opacity: 100;
  background-color: white;
  font-size: 0.75rem;
  width: 16rem;
  height: 3.6rem;
  border-radius: 0.9rem;
  border: 1px solid ${common.colors.primaryColor};
  box-shadow: 0 0 12px rgba(142, 168, 241, 0.1);
  display: flex;
  justify-content: space-between;
  z-index: 5;
`;

const formRightButtonStyle = css`
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-right: 1rem;
  white-space: nowrap;
  z-index: 4;
  transition: all 0.2s linear 0s;
  &:disabled {
    color: ${common.colors.secondaryGrey};
    cursor: default;
  }
`;

const formInputStyle = css`
  width: 100%;
  margin: 0 1rem;
  &::placeholder {
    color: ${common.colors.primaryGrey};
  }
`;

const buttonStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${common.gradient.secondaryGradient};
  color: white;
  width: 10rem;
  height: 3.6rem;
  border-radius: 1.8rem;
  font-size: 0.75rem;
  font-weight: 700;

  &:after {
    content: "+";
    position: absolute;
    opacity: 0;
    font-size: 1rem;
    right: 2.75rem;
  }

  &:hover {
    transition: all 0.2s linear 0s;
    text-indent: -0.5rem;

    &:after {
      opacity: 1;
      text-indent: 0px;
    }
  }
`;
