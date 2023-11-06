import { common } from "@/styles/common";
import { css } from "@emotion/react";

const Loading = () => {
  return (
    <div css={spinnerCss}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const spinnerCss = css`
  display: inline-block;
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  div {
    transform-origin: 0.8rem 0.8rem;
    animation: spinner 1.2s linear infinite;
  }
  div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 0.4rem;
    left: 0.8rem;
    width: 0.08rem;
    height: 0.24rem;
    border-radius: 50%;
    background: ${common.colors.primaryColor};
  }
  div:nth-of-type(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  div:nth-of-type(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  div:nth-of-type(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  div:nth-of-type(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  div:nth-of-type(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  div:nth-of-type(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  div:nth-of-type(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  div:nth-of-type(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  div:nth-of-type(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  div:nth-of-type(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  div:nth-of-type(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  div:nth-of-type(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default Loading;
