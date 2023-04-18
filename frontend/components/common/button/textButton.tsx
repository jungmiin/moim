import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { MouseEventHandler } from "react";

interface buttonPropsInterface {
  text: string;
  color: string;
  handler: MouseEventHandler;
  svg?: IconDefinition;
  align: string; // right, left
}

const TextButton = ({
  text,
  color,
  handler,
  svg,
  align,
}: buttonPropsInterface) => {
  const buttonCss = css`
    position: relative;
    display: flex;
    color: ${color};
    font-weight: 700;
    font-size: 0.75rem;
    margin: 1rem 0;
    .tx {
      transition: all 0.2s linear 0s;
      position: absolute;
      width: 17rem;
    }
    .fa {
      transition: all 0.2s linear 0s;
      opacity: 0;
    }
    &:hover {
      .fa {
        opacity: 100;
      }
      .tx {
        ${align === "left" ? "padding-left: 1rem;" : "padding-right: 1rem;"}
      }
    }
  `;

  const Button = styled.button`
    ${buttonCss}
  `;

  const Text = styled.span``;

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
  return <Button onClick={handler}>{renderButton()}</Button>;
};

export default TextButton;
