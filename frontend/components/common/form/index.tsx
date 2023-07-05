/** @jsxImportSource @emotion/react */
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  ChangeEvent,
  useReducer,
} from "react";
import { css } from "@emotion/react";

interface formContextInterface {
  input: string;
  changeInput: (e?: ChangeEvent<HTMLInputElement> | undefined) => void;
  open: boolean;
  toggleForm: () => void;
}

interface formStateInterface {
  input: string;
  open: boolean;
}

interface formActionInterface {
  type: string;
  value?: string;
}

const formContext = createContext<formContextInterface | null>(null);

const formReducer = (
  state: formStateInterface,
  action: formActionInterface
) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, open: !open };
    case "INPUT":
      if (action.value !== undefined) {
        return { ...state, input: action.value };
      }
      return state;
    default:
      return state;
  }
};

const useFormContext = (component: string) => {
  let context = useContext(formContext);
  if (context === null) {
    let err = new Error(
      `<${component} />의 부모 컴포넌트 <Form />이 존재하지 않음.`
    );
    if (Error.captureStackTrace) Error.captureStackTrace(err, useFormContext);
    throw err;
  }
  return context;
};

interface formMainProps {
  children?: ReactNode;
  style?: string;
}

const FormMain = ({ children, style }: formMainProps) => {
  const [state, dispatch] = useReducer(formReducer, { input: "", open: true });
  const changeInput = (e?: ChangeEvent<HTMLInputElement> | undefined) => {
    e
      ? dispatch({
          type: "INPUT",
          value: e.target.value,
        })
      : dispatch({
          type: "INPUT",
          value: "",
        });
  };

  const toggleForm = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  return (
    <formContext.Provider value={{ ...state, changeInput, toggleForm }}>
      {state.open && <div css={css(style)}>{children}</div>}
    </formContext.Provider>
  );
};

interface formLabelProps {
  children?: ReactNode;
  style?: string;
}

const FormLabel = ({ children, style }: formLabelProps) => {
  return <div css={css(style)}>{children}</div>;
};

interface formToggleProps {
  children?: ReactNode;
  style?: string;
}

const FormToggle = ({ children, style }: formToggleProps) => {
  const { toggleForm } = useFormContext("Form.Toggle");

  return (
    <button css={css(style)} onClick={toggleForm}>
      {children}
    </button>
  );
};

interface formSubmitProps {
  children?: ReactNode;
  style?: string;
  onSubmit?: Function;
}

const FormSubmit = ({ children, style, onSubmit }: formSubmitProps) => {
  const { input, changeInput } = useFormContext("Form.Submit");

  // TODO: diabled 여부를 판단하는 것을 props로 재사용 가능하게
  return (
    <button
      css={css(style)}
      onClick={() => {
        if (onSubmit !== undefined) onSubmit(input);
        changeInput();
      }}
      disabled={input === ""}
    >
      {children}
    </button>
  );
};

interface formInputProps {
  placeholder?: string;
  style?: string;
}

const FormInput = ({ placeholder, style }: formInputProps) => {
  const { input, changeInput } = useFormContext("Form.Input");

  return (
    <input
      css={css(style)}
      placeholder={placeholder}
      onChange={changeInput}
      value={input}
    />
  );
};

export const Form = Object.assign(FormMain, {
  Label: FormLabel,
  Submit: FormSubmit,
  Toggle: FormToggle,
  Input: FormInput,
});
