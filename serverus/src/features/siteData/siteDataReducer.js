import { LOAD_USERS_PROGRESS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from "./siteDataConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" or "failed")
const initialSiteDataState = {
  loadUserDirectoryStatus: "idle",
  userDirectory: {},
  gameDirectory: {},
  error: {}
};

//Site Data Reducer
export default (state = initialSiteDataState, action) => {
  switch (action.type) {
    case LOAD_USERS_PROGRESS:
      return Object.assign({}, state, { loadUserDirectoryStatus: "loading" });
    case LOAD_USERS_SUCCESS:
      return Object.assign({}, state, { loadUserDirectoryStatus: "succeeded", userDirectory: action.payload });
    case LOAD_USERS_FAILURE:
      return Object.assign({}, state, { loadUserDirectoryStatus: "failed", error: action.payload });
    default:
      return state;
  }
};
