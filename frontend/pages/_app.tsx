import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
};

export default App;
