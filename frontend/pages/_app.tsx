import type { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import ToastProvider from "@/components/common/toast/context";
config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {globalStyles}
      <Script
        src="https://kit.fontawesome.com/f970c48591.js"
        crossOrigin="anonymous"
      ></Script>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </>
  );
};

export default App;
