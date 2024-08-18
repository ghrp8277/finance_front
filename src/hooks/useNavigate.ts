import { useRouter } from "next/router";
import constants from "@/constants";

interface CreatePostRouteParams {
  market: string;
  code: string;
  name: string;
}

interface StockDetailRouteParams {
  market: string;
  code: string;
  name: string;
  reload?: boolean;
}

export const useNavigate = () => {
  const router = useRouter();

  const getQueryParams = () => {
    const query = router.query;
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value != null)
    );
    return filteredQuery as Record<string, string>;
  };

  const navigateToMainPage = () => {
    router.push(constants.ROUTES.MAIN_PAGE);
  };

  const navigateToSignUp = () => {
    router.push(constants.ROUTES.SIGN_UP);
  };

  const navigateToLogin = () => {
    router.push(constants.ROUTES.LOGIN);
  };

  const navigateToMy = () => {
    router.push(constants.ROUTES.MY);
  };

  const navigateToCreatePost = ({
    market,
    code,
    name,
  }: CreatePostRouteParams) => {
    router.push({
      pathname: constants.ROUTES.CREATE_POST,
      query: { market, code, name },
    });
  };

  const navigateToStockDetail = ({
    market,
    code,
    name,
  }: StockDetailRouteParams) => {
    router.push({
      pathname: constants.ROUTES.STOCK_DETAIL.replace(
        "[market]",
        market
      ).replace("[code]", code),
      query: { name },
    });
  };

  const navigateToPostDetail = (postId: number) => {
    router.push(
      constants.ROUTES.POST_DETAIL.replace("[id]", postId.toString())
    );
  };

  const navigateBack = () => {
    router.back();
  };

  return {
    getQueryParams,
    navigateToMainPage,
    navigateToSignUp,
    navigateToLogin,
    navigateToCreatePost,
    navigateToStockDetail,
    navigateToPostDetail,
    navigateBack,
    navigateToMy,
  };
};
