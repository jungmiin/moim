import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { common } from "@/styles/common";

interface buttonPropsInterface {
  svg: IconDefinition;
  color: string;
  handler: MouseEventHandler;
  width: string;
}

const SvgButton = ({ svg, color, handler, width }: buttonPropsInterface) => {
  const WrapperCss = css`
    padding: 0.1rem 0.8rem;
    background: white;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
    border: 1px solid ${common.colors.tenaryGrey};
    border-radius: 0.1rem;
    transition: all 0.2s linear 0s;
    &:hover {
      background: ${common.colors.tenaryColor};
      cursor: pointer;
    }
  `;
  const Wrapper = styled.div`
    ${WrapperCss}
  `;
  return (
    <Wrapper>
      <FontAwesomeIcon
        className="fa"
        icon={svg}
        onClick={handler}
        width={width}
        color={color}
      />
    </Wrapper>
  );
};

export default SvgButton;
