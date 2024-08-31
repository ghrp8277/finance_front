import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ToastProvider } from "../contexts/ToastContext";
import Layout from "@/components/layouts/Layout";
import "../app/globals.css";
import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { fetchAuthStatus } from "@/services/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const router = useRouter();

  const pagesWithoutHeader = ["/login", "/signup"];
  const hideHeader = pagesWithoutHeader.includes(router.pathname);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { isAuthenticated, username, id } = await fetchAuthStatus();

      if (isAuthenticated) {
        setAuthState({
          isLoggedIn: true,
          user: {
            username,
            id,
          },
        });
      } else {
        setAuthState({
          isLoggedIn: false,
          user: null,
        });
      }
    };

    checkAuthStatus();
  }, [setAuthState]);

  return (
    <ToastProvider>
      <Layout hideHeader={hideHeader}>
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  );
}

export default MyApp;
