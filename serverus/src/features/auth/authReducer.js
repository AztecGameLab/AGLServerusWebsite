import { LOG_IN_LOADING, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT } from "./authConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" || "failed")
const initialAuthState = {
  loggedIn: false,
  lastLogin: "",
  status: {
    login: "idle",
    registration: "idle",
    passwordReset: "idle"
  },
  error: {}
};

//User Reducer
export default (state = initialAuthState, action) => {
  switch (action.type) {
    case LOG_IN_LOADING:
      return { ...state, status: { ...state.status, login: "loading" } };
    case LOG_IN_FAILURE:
      return { ...state, status: { ...state.status, login: "failed" }, error: action.payload };
    case LOG_IN_SUCCESS:
      return { ...state, status: { ...state.status, login: "succeeded" } };
    case LOG_OUT:
      return initialAuthState;
    default:
      return state;
  }
};
