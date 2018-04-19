import {
  LOG_IN_LOADING,
  LOGGING_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  CREATE_ACCOUNT_LOADING,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  DISPLAY_PASSWORD_HELP,
  REQUEST_PASS_RESET,
  REQUEST_PASS_SUCCESS,
  REQUEST_PASS_FAILURE,
  REMEMBER_ME,
  CHANGE_PASS_LOADING,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_FAILURE,
  CLEAR_STATUS
} from "./authConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" || "failed")
const initialAuthState = {
  loggedIn: false,
  status: {
    login: "idle",
    loggingIn: false,
    createAccount: "idle",
    passwordReset: "idle",
    changePassword: "idle"
  },
  rememberMe: {
    email: ""
  },
  failedLogins: 0,
  displayHelp: false,
  error: {}
};

//User Reducer
export default (state = initialAuthState, action) => {
  switch (action.type) {
    case LOG_IN_LOADING:
      return { ...state, status: { ...state.status, login: "loading" } };
    case LOGGING_IN:
      return { ...state, status: { ...state.status, loggingIn: true } };
    case LOG_IN_FAILURE:
      return { ...state, status: { ...state.status, login: "failed", loggingIn: false }, error: action.payload, ...(state.failedLogins += 1) };
    case LOG_IN_SUCCESS:
      return { ...state, status: { ...state.status, login: "succeeded", loggingIn: false }, loggedIn: true, displayHelp: false };
    case CREATE_ACCOUNT_LOADING:
      return { ...state, status: { ...state.status, createAccount: "loading" } };
    case CREATE_ACCOUNT_SUCCESS:
      return { ...state, status: { ...state.status, createAccount: "succeeded" } };
    case CREATE_ACCOUNT_FAILURE:
      return { ...state, status: { ...state.status, createAccount: "failed" }, error: action.payload };
    case DISPLAY_PASSWORD_HELP:
      return { ...state, displayHelp: true };
    case REQUEST_PASS_RESET:
      return { ...state, status: { ...state.status, passwordReset: "loading" } };
    case REQUEST_PASS_SUCCESS:
      return { ...state, status: { ...state.status, passwordReset: "succeeded" } };
    case REQUEST_PASS_FAILURE:
      return { ...state, status: { ...state.status, passwordReset: "failed" }, error: action.payload };
    case CHANGE_PASS_LOADING:
      return { ...state, status: { ...state.status, changePassword: "loading" } };
    case CHANGE_PASS_SUCCESS:
      return { ...state, status: { ...state.status, changePassword: "succeeded" } };
    case CHANGE_PASS_FAILURE:
      return { ...state, status: { ...state.status, changePassword: "failed" }, error: action.payload };
    case CLEAR_STATUS:
      return { ...state, status: { ...initialAuthState.status } };
    case REMEMBER_ME:
      return { ...state, rememberMe: Object.assign({}, state.rememberMe, action.payload) };
    case LOG_OUT:
      const clearStoreWithRememberMe = initialAuthState;
      delete clearStoreWithRememberMe.rememberMe;
      return Object.assign({}, state, clearStoreWithRememberMe);
    default:
      return state;
  }
};
