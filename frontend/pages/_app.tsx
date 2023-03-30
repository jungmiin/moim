import type { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
};

export default App;
