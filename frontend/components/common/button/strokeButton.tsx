import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { common } from "@/styles/common";

interface buttonPropsInterface {
  text: string;
  color: string;
  width: number;
  handler: MouseEventHandler;
  svg?: IconDefinition;
  align: string;
  disabled?: boolean;
}

const StrokeButton = ({
  text,
  color,
  width,
  handler,
  svg,
  align,
  disabled,
}: buttonPropsInterface) => {
  const buttonCss = css`
    display: flex;
    justify-content: center;
    border: 1px solid ${color};
    border-radius: 3rem;
    padding: 1rem 0;
    width: ${width}rem;
    color: ${color};
    font-weight: 700;
    font-size: 0.75rem;
    margin: 1rem 0;
    .tx {
      transition: 0.2s linear 0s;
      ${align === "left" ? "margin-right: 0.8rem;" : "margin-left: 0.8rem;"}
    }
    .fa {
      transition: 0.2s linear 0s;
      opacity: 0;
    }
    &:hover {
      .fa {
        opacity: 100;
      }
      .tx {
        ${align === "left" ? "margin-right: 0rem;" : "margin-left: 0rem;"}
      }
    }
    &.disabled {
      cursor: not-allowed;
      border: 1px solid ${common.colors.secondaryGrey};
      color: ${common.colors.secondaryGrey};
      &:hover {
        .fa {
          opacity: 0;
        }
        .tx {
          ${align === "left" ? "margin-right: 0.8rem;" : "margin-left: 0.8rem;"}
        }
      }
    }
  `;

  const Button = styled.button`
    ${buttonCss}
  `;

  const Text = styled.div``;

  const renderButton = () => {
    switch (align) {
      case "right":
        return (
          <>
            <Text className="tx">{text}</Text>
            {svg ? (
              <FontAwesomeIcon
                className="fa"
                icon={svg}
                color={color}
                style={{ marginLeft: "0.2rem" }}
              />
            ) : null}
          </>
        );
      case "left":
        return (
          <>
            {svg ? (
              <FontAwesomeIcon
                className="fa"
                icon={svg}
                color={color}
                style={{ marginRight: "0.2rem" }}
              />
            ) : null}
            <Text className="tx">{text}</Text>
          </>
        );
    }
  };
  return (
    <Button className={disabled ? "disabled" : ""} onClick={handler}>
      {renderButton()}
    </Button>
  );
};

export default StrokeButton;
