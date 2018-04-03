import { LOG_IN_LOADING, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT, DISPLAY_PASSWORD_HELP } from "./authConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" || "failed")
const initialAuthState = {
  loggedIn: false,
  status: {
    login: "idle",
    registration: "idle",
    passwordReset: "idle"
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
    case LOG_IN_FAILURE:
      return { ...state, status: { ...state.status, login: "failed" }, error: action.payload, ...(state.failedLogins += 1) };
    case LOG_IN_SUCCESS:
      return { ...state, status: { ...state.status, login: "succeeded" }, loggedIn: true, displayHelp: false };
    case DISPLAY_PASSWORD_HELP:
      return { ...state, displayHelp: true };
    case LOG_OUT:
      return initialAuthState;
    default:
      return state;
  }
};