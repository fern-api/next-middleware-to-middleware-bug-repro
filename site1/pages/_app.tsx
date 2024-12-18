import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useInterceptNextDataHref } from "../hooks/use-intercept-next-page-href";

export default function App({ Component, pageProps, router }: AppProps) {
  useInterceptNextDataHref({ router: router, basePath: "/testing" });
  return <Component {...pageProps} />;
}
