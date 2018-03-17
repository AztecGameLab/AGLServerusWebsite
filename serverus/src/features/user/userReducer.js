import { SIGN_IN_LOADING, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT } from "./userConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" || "failed")
const initialUserState = {
  signedIn: false,
  signInProgress: "idle"
};

//User Reducer
export default (state = initialUserState, action) => {
  switch (action.type) {
    case SIGN_IN_LOADING:
      return Object.assign({}, state, { signInProgress: "loading" });
    case SIGN_IN_FAILURE:
      return Object.assign({}, state, { signInProgress: "failed" });
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, action.payload.user, { signInProgress: "loaded" });
    case SIGN_OUT:
      return initialUserState;
    default:
      return state;
  }
};
