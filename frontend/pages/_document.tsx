import { Html, Head, Main, NextScript } from "next/document";
import { Toast } from "./_toast";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <Toast />
        <NextScript />
      </body>
    </Html>
  );
}
