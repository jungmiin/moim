import { css, Global } from "@emotion/react";

export const globalStyles = (
  <Global
    styles={css`
      @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css");

      /* Smartphones (landscape) ----------- */
      @media only screen and (min-width: 321px) {
        :root {
          font-size: 8px;
        }
      }

      /* Smartphones (portrait) ----------- */
      @media only screen and (max-width: 320px) {
        :root {
          font-size: 8px;
        }
      }

      /* iPads (landscape) ----------- */
      @media only screen and (min-width: 1025px) {
        :root {
          font-size: 16px;
        }
      }

      /* iPads (portrait) ----------- */
      @media only screen and (min-width: 768px) and (max-width: 1024px) {
        :root {
          font-size: 12px;
        }
      }

      /* Desktops and laptops ----------- */
      @media only screen and (min-width: 1224px) and (max-width: 1920px) {
        :root {
          font-size: 20px;
        }
      }

      /* Large screens ----------- */
      @media only screen and (min-width: 1921px) {
        :root {
          font-size: 24px;
        }
      }

      html,
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Pretendard";
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
