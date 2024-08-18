export default {
  NONE: "NONE",
  DEFAULT_STR: "",
  DEFAULT_OBJ: {},
  DEFAULT_ITEMS: [],
  DEFAULT_NUM: 0,
  DEFAULT_BOOL: false,
  DEFAULT_BOOL_TRUE: true,
  DEFAULT_PAGING: {
    PAGE: 0,
    PAGESIZE: 10,
  },
  STOCK_DATA_TIME: {
    "1MONTH": "1month",
    "1YEAR": "1year",
    "3YEARS": "3years",
    "5YEARS": "5years",
  },
  TOAST_TYPES: {
    SUCCESS: "success" as const,
    ERROR: "error" as const,
    INFO: "info" as const,
    WARNING: "warning" as const,
  },
  LOCAL_STORAGE: {
    LOGIN: "LOGIN",
    USER: "USER",
  },
  ROUTES: {
    MAIN_PAGE: "/",
    SIGN_UP: "/signup",
    LOGIN: "/login",
    MY: "/my",
    STOCK_DETAIL: "/[market]/[code]",
    CREATE_POST: "/posts/create",
    POST_DETAIL: "/posts/[id]",
  },
};
