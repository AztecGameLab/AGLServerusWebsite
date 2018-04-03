import {
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  DISPLAY_PASSWORD_HELP,
  REQUEST_PASS_RESET,
  REQUEST_PASS_SUCCESS,
  REQUEST_PASS_FAILURE,
  REMEMBER_ME
} from "./authConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" || "failed")
const initialAuthState = {
  loggedIn: false,
  status: {
    login: "idle",
    registration: "idle",
    passwordReset: "idle"
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
      return { ...state, status: { ...state.status, login: "loading", passwordReset: "idle" } };
    case LOG_IN_FAILURE:
      return { ...state, status: { ...state.status, login: "failed", passwordReset: "idle" }, error: action.payload, ...(state.failedLogins += 1) };
    case LOG_IN_SUCCESS:
      return { ...state, status: { ...state.status, login: "succeeded", passwordReset: "idle" }, loggedIn: true, displayHelp: false };
    case DISPLAY_PASSWORD_HELP:
      return { ...state, displayHelp: true };
    case REQUEST_PASS_RESET:
      return { ...state, status: { ...state.status, login: "idle", passwordReset: "loading" } };
    case REQUEST_PASS_SUCCESS:
      return { ...state, status: { ...state.status, login: "idle", passwordReset: "succeeded" } };
    case REQUEST_PASS_FAILURE:
      return { ...state, status: { ...state.status, login: "idle", passwordReset: "failed" }, error: action.payload };
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
