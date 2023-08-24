/** @jsxImportSource @emotion/react */
import { createContext, useContext, ReactNode, useReducer } from "react";
import { css, SerializedStyles } from "@emotion/react";

interface dropdownContextInterfcae {
  open: boolean;
  toggle: () => void;
}

interface dropdownStateInterface {
  open: boolean;
}
interface dropdownActionInterface {
  type: string;
}

const dropdownReducer = (
  state: dropdownStateInterface,
  action: dropdownActionInterface
) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, open: !state.open };
    default:
      return state;
  }
};

const DropdownContext = createContext<dropdownContextInterfcae | null>(null);

const useDropdownContext = (component: string) => {
  let context = useContext(DropdownContext);
  if (context === null) {
    let err = new Error(
      `<${component} />의 부모 컴포넌트 <Dropdown />이 존재하지 않음.`
    );
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useDropdownContext);
    throw err;
  }
  return context;
};

interface dropdownMainProps {
  className?: string;
  css?: SerializedStyles;
  children?: ReactNode;
  style?: object;
}

const DropdownMain = ({
  children,
  css,
  style,
  className,
}: dropdownMainProps) => {
  const [state, dispatch] = useReducer(dropdownReducer, { open: false });

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <DropdownContext.Provider value={{ ...state, toggle }}>
      <div className={className} css={css} style={style}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface dropdownTriggerProps {
  children?: ReactNode;
  style?: SerializedStyles;
}

const DropdownTrigger = ({ children, style }: dropdownTriggerProps) => {
  const { toggle } = useDropdownContext("Dropdown.Trigger");
  return (
    <div css={style} onClick={toggle}>
      {children}
    </div>
  );
};

interface dropdownTriggerAndHideProps {
  children?: ReactNode;
  style?: SerializedStyles;
}

const DropdownTriggerAndHide = ({
  children,
  style,
}: dropdownTriggerAndHideProps) => {
  const { open, toggle } = useDropdownContext("Dropdown.TriggerAndHide");
  return (
    <>
      {!open && (
        <div css={style} onClick={toggle}>
          {children}
        </div>
      )}
    </>
  );
};

interface DropdownMenuProps {
  children?: ReactNode;
  style?: SerializedStyles;
}

const DropdownMenu = ({ children, style }: DropdownMenuProps) => {
  const { open } = useDropdownContext("Dropdown.Menu");
  return <>{open && <div css={style}>{children}</div>}</>;
};

interface DropdownItemProps {
  children?: ReactNode;
  style?: SerializedStyles;
}

const DropdownItem = ({ children, style }: DropdownItemProps) => {
  return <div css={style}>{children}</div>;
};

export const Dropdown = Object.assign(DropdownMain, {
  Trigger: DropdownTrigger,
  TriggerAndHide: DropdownTriggerAndHide,
  Menu: DropdownMenu,
  Item: DropdownItem,
});
