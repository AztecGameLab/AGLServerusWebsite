import {
  LOAD_USERS_PROGRESS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_GAMES_PROGRESS,
  LOAD_GAMES_SUCCESS,
  LOAD_GAMES_FAILURE,
  CLEAR_SITE_DATA
} from "./siteDataConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" or "failed")
const initialSiteDataState = {
  loadUserDirectoryStatus: "idle",
  userDirectory: {},
  loadGameDirectoryStatus: "idle",
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
    case LOAD_GAMES_PROGRESS:
      return Object.assign({}, state, { loadGameDirectoryStatus: "loading" });
    case LOAD_GAMES_SUCCESS:
      return Object.assign({}, state, { loadGameDirectoryStatus: "succeeded", gameDirectory: action.payload });
    case LOAD_GAMES_FAILURE:
      return Object.assign({}, state, { loadGameDirectoryStatus: "failed", error: action.payload });
    case CLEAR_SITE_DATA:
      return { ...initialSiteDataState };
    default:
      return state;
  }
};
