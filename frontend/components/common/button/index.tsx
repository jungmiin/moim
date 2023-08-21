import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  MouseEventHandler,
} from "react";
import { css, SerializedStyles } from "@emotion/react";

interface buttonContextInterface {
  mouseOver: boolean;
  setMouseOver: () => void;
  setMouseOut: () => void;
}

interface buttonStateInterface {
  mouseOver: boolean;
}

interface buttonActionInterface {
  type: string;
}

const ButtonContext = createContext<buttonContextInterface | null>(null);

const useButtonContext = (component: string) => {
  const context = useContext(ButtonContext);
  if (context === null) {
    let err = new Error(
      `<${component} />의 부모 컴포넌트 <Button />이 존재하지 않음.`
    );
    if (Error.captureStackTrace) Error.captureStackTrace(err, useButtonContext);
    throw err;
  }
  return context;
};

const buttonReducer = (
  state: buttonStateInterface,
  action: buttonActionInterface
) => {
  switch (action.type) {
    case "MOUSE_OVER":
      return { ...state, mouseOver: true };
    case "MOUSE_OUT":
      return { ...state, mouseOver: false };
    default:
      return state;
  }
};

interface ButtonMainProps {
  children?: ReactNode;
  style?: SerializedStyles;
  onClick?: MouseEventHandler<Element>;
}

const ButtonMain = ({ children, style, onClick }: ButtonMainProps) => {
  const [state, dispatch] = useReducer(buttonReducer, { mouseOver: false });

  const setMouseOver = () => {
    dispatch({ type: "MOUSE_OVER" });
  };
  const setMouseOut = () => {
    dispatch({ type: "MOUSE_OUT" });
  };

  return (
    <ButtonContext.Provider value={{ ...state, setMouseOver, setMouseOut }}>
      <button
        css={style}
        onMouseOver={setMouseOver}
        onMouseOut={setMouseOut}
        onClick={onClick}
      >
        {children}
      </button>
    </ButtonContext.Provider>
  );
};

export const Button = Object.assign(ButtonMain, {});
