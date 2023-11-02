import {
  createContext,
  useContext,
  ReactNode,
  ChangeEvent,
  KeyboardEvent,
  useReducer,
} from "react";
import { SerializedStyles } from "@emotion/react";

interface formMainProps {
  children?: ReactNode;
  style?: SerializedStyles;
}

const FormMain = ({ children, style }: formMainProps) => {
  return <div css={style}>{children}</div>;
};

interface formLabelProps {
  children?: ReactNode;
  style?: SerializedStyles;
}

const FormLabel = ({ children, style }: formLabelProps) => {
  return <div css={style}>{children}</div>;
};

interface formToggleProps {
  children?: ReactNode;
  style?: string;
}

interface formSubmitProps {
  children?: ReactNode;
  style?: SerializedStyles;
  input?: string;
  onSubmit?: Function;
  disabled?: boolean;
}

const FormSubmit = ({
  children,
  style,
  onSubmit,
  disabled,
  input,
}: formSubmitProps) => {
  // TODO: diabled 여부를 판단하는 것을 props로 재사용 가능하게
  return (
    <button
      css={style}
      onClick={() => {
        if (onSubmit !== undefined) onSubmit(input);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface formInputProps {
  placeholder?: string;
  style?: SerializedStyles;
  onChange?: Function;
  onSubmit?: Function;
  input?: string;
}

const FormInput = ({
  placeholder,
  style,
  onSubmit,
  onChange,
  input,
}: formInputProps) => {
  // 엔터 처리
  const handkleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onSubmit && e && e.key === "Enter" ? onSubmit(input) : null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && e ? onChange(e.target.value) : null;
  };

  return (
    <input
      css={style}
      placeholder={placeholder}
      onChange={handleChange}
      value={input}
      onKeyDown={handkleKeyDown}
    />
  );
};

export const Form = Object.assign(FormMain, {
  Label: FormLabel,
  Submit: FormSubmit,
  Input: FormInput,
});
