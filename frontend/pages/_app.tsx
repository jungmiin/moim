import type { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import ToastProvider from "@/components/common/toast/context";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

config.autoAddCss = false;
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  // Create a client

  return (
    <>
      <Head>
        <title>moim : 오늘부턴 약속도 간편하게</title>
      </Head>
      {globalStyles}
      <Script
        src="https://kit.fontawesome.com/f970c48591.js"
        crossOrigin="anonymous"
      ></Script>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ToastProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
