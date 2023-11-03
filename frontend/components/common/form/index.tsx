import { ReactNode, ChangeEvent, KeyboardEvent } from "react";
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
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onSubmit && e && e.nativeEvent.isComposing && e.key === "Enter"
      ? onSubmit(input)
      : null;
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
      onKeyDown={handleKeyDown}
    />
  );
};

export const Form = Object.assign(FormMain, {
  Label: FormLabel,
  Submit: FormSubmit,
  Input: FormInput,
});
