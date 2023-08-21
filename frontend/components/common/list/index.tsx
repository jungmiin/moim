/** @jsxImportSource @emotion/react */
import { createContext, useContext, ReactNode, useReducer } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface listMainProps {
  children?: ReactNode;
  style?: object;
  css?: SerializedStyles;
}

const ListMain = ({ children, style, css }: listMainProps) => {
  return (
    <div css={css} style={style}>
      {children}
    </div>
  );
};

interface ListItemProps {
  children?: ReactNode;
  style?: object;
  css?: SerializedStyles;
  className?: string;
  onClick?: Function;
  onMouseOver?: Function;
  onMouseOut?: Function;
  index: string | number;
}

const ListItem = ({
  className,
  children,
  style,
  css,
  onClick,
  index,
  onMouseOut,
  onMouseOver,
}: ListItemProps) => {
  return (
    <div
      id={index.toString()}
      className={className}
      css={css}
      style={style}
      onClick={onClick ? (e) => onClick(e) : (e) => {}}
      onMouseOver={onMouseOver ? (e) => onMouseOver(e) : (e) => {}}
      onMouseOut={onMouseOut ? (e) => onMouseOut(e) : (e) => {}}
    >
      {children}
    </div>
  );
};

interface ListRemovableItemProps {
  children?: ReactNode;
  index: string | number;
  style?: object;
  css?: SerializedStyles;
  className?: string;
  onRemove: Function;
}

const ListRemovableItem = ({
  children,
  index,
  style,
  css,
  className,
  onRemove,
}: ListRemovableItemProps) => {
  return (
    <div
      id={index.toString()}
      className={className}
      css={css}
      style={style}
      key={index}
    >
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

interface ListSelectableItemProps {
  children?: ReactNode;
  index: number;
  style?: object;
  css?: SerializedStyles;
  className?: string;
  onSelect: Function;
}

const ListSelectableItem = ({
  children,
  index,
  style,
  css,
  className,
  onSelect,
}: ListSelectableItemProps) => {
  return (
    <div
      className={className}
      css={css}
      style={style}
      key={index}
      onClick={(e) => onSelect(e)}
    >
      {children}
    </div>
  );
};

export const List = Object.assign(ListMain, {
  Item: ListItem,
  RemovableItem: ListRemovableItem,
  SelectableItem: ListSelectableItem,
});
