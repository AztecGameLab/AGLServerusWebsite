import { LOG_IN_SUCCESS, LOG_OUT } from "../auth/authConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" || "failed")
const initialUserState = {
  userData: {},
  error: {}
};

//User Reducer
export default (state = initialUserState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return { ...state, userData: action.payload };
    case LOG_OUT:
      return initialUserState;
    default:
      return state;
  }
};
