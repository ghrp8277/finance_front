import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ToastProvider } from "../contexts/ToastContext";
import Layout from "@/components/layouts/Layout";
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pagesWithoutHeader = ["/login", "/signup"];
  const hideHeader = pagesWithoutHeader.includes(router.pathname);

  return (
    <ToastProvider>
      <Layout hideHeader={hideHeader}>
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  );
}

export default MyApp;
