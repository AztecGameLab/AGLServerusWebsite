import { SIGN_IN_LOADING, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT } from "./authConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" || "failed")
const initialAuthState = {
  signedIn: false,
  status: {
    login: "idle",
    registration: "idle"
  },
  error: {}
};

//User Reducer
export default (state = initialAuthState, action) => {
  switch (action.type) {
    case SIGN_IN_LOADING:
      return { ...state, status: { ...state.status, login: "progress" } };
    case SIGN_IN_FAILURE:
      return { ...state, status: { ...state.status, login: "failed" }, error: action.payload };
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, action.payload.user, { signInProgress: "loaded" });
    case SIGN_OUT:
      return initialAuthState;
    default:
      return state;
  }
};
