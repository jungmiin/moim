import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface badgePropsInterface {
  name: string;
  color: string;
  removable?: boolean;
  onRemove?: Function;
  id: number;
  isNew?: boolean;
  isSelected?: boolean;
  onSelect?: Function;
}

const Badge = React.memo(function Badge({
  name,
  color,
  removable,
  onRemove,
  id,
  isNew,
  isSelected,
  onSelect,
}: badgePropsInterface) {
  const wrapperCss = css`
    display: flex;
    align-items: center;
    background-color: ${color};
    font-size: 0.67rem;
    color: white;
    padding: 0.25rem 0.67rem;
    border-radius: 1rem;
    margin: 0.2rem 0.05rem;
    cursor: pointer;
    &.not_selected {
      background-color: white;
      color: ${color};
      box-shadow: 0 0 0 1px ${color} inset;
    }
    &.new {
      animation: smoothAppear 1s;
      @keyframes smoothAppear {
        0% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10%);
        }
        50% {
          transform: translateY(0);
        }
        90% {
          transform: translateY(-5%);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
    .fa {
      margin-right: 0.4rem;
      cursor: pointer;
    }
  `;
  const Wrapper = styled.div`
    ${wrapperCss}
  `;

  return (
    <Wrapper
      className={
        isNew
          ? "new"
          : isNew !== undefined
          ? ""
          : isSelected
          ? ""
          : "not_selected"
      }
      onClick={() => {
        if (onSelect) onSelect(id);
      }}
    >
      {removable ? (
        <button
          onClick={() => {
            if (onRemove) onRemove(id);
          }}
        >
          <FontAwesomeIcon className="fa" icon={faXmark} />{" "}
        </button>
      ) : null}
      {name}
    </Wrapper>
  );
});

export default Badge;
