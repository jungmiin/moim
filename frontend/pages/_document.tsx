import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <div id="__modal"></div>
        <div id="__toast"></div>
        <NextScript />
      </body>
    </Html>
  );
}
