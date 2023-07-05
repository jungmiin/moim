/** @jsxImportSource @emotion/react */
import { createContext, useContext, ReactNode, useReducer } from "react";
import { css } from "@emotion/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface listMainProps {
  children?: ReactNode;
  style?: string;
}

const ListMain = ({ children, style }: listMainProps) => {
  return <div css={css(style)}>{children}</div>;
};

interface ListItemProps {
  children?: ReactNode;
  style?: string;
  className?: string;
}

const ListItem = ({ className, children, style }: ListItemProps) => {
  return (
    <div className={className} css={css(style)}>
      {children}
    </div>
  );
};

interface ListRemovableItemProps {
  children?: ReactNode;
  index: number;
  style?: string;
  className?: string;
  onRemove: Function;
}

const ListRemovableItem = ({
  children,
  index,
  style,
  className,
  onRemove,
}: ListRemovableItemProps) => {
  return (
    <div className={className} css={css(style)} key={index}>
      <button
        onClick={() => {
          if (onRemove) onRemove(index);
        }}
      >
        <FontAwesomeIcon className="fa" icon={faXmark} />{" "}
      </button>
      {children}
    </div>
  );
};

export const List = Object.assign(ListMain, {
  Item: ListItem,
  RemovableItem: ListRemovableItem,
});
