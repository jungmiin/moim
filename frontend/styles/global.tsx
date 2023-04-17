import { css, Global } from "@emotion/react";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 24px;
        width: 100vw;
        height: 100vh;
      }
      a {
        text-decoration: none;
        outline: none;
      }
      button {
        all: unset;
        cursor: pointer;
      }
      input {
        all: unset;
      }
    `}
  />
);
