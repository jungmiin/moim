import { Dispatch, SetStateAction, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { common } from "@/styles/common";

interface inputPropsInterface {
  placeholder: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const Input = ({
  placeholder,
  inputValue,
  setInputValue,
}: inputPropsInterface) => {
  return (
    <Wrapper>
      <In
        placeholder={placeholder}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        value={inputValue}
      />
    </Wrapper>
  );
};

const inCss = css`
  font-size: 0.67rem;
  color: ${common.colors.primaryBlack};
  width: 100%;
  &::placeholder {
    color: ${common.colors.secondaryGrey};
  }
`;

const In = styled.input`
  ${inCss}
`;

const wrapperCss = css`
  width: 15rem;
  padding: 1rem 1rem;
  border-radius: 0.9rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  display: flex;
  justify-content: space-between;
  z-index: 5;
  margin-bottom: 1rem;
  &.hide {
    opacity: 0;
    visibility: hidden;
  }
`;
const Wrapper = styled.div`
  ${wrapperCss}
`;

export default Input;
