import {
  LOAD_USERS_PROGRESS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_GAMES_PROGRESS,
  LOAD_GAMES_SUCCESS,
  LOAD_GAMES_FAILURE,
  LOAD_USER_PROGRESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  CLEAR_SITE_DATA
} from "./siteDataConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" or "failed")
const initialSiteDataState = {
  userDirectory: {},
  gameDirectory: {},
  preloadedUserProfiles: {},
  status: {
    userDirectory: "idle",
    gameDirectory: "idle",
    userProfile: "idle"
  },
  error: {}
};

//Site Data Reducer
export default (state = initialSiteDataState, action) => {
  switch (action.type) {
    //User Directory
    case LOAD_USERS_PROGRESS:
      return { ...state, status: { ...state.status, userDirectory: "loading" } };
    case LOAD_USERS_SUCCESS:
      return { ...state, status: { ...state.status, userDirectory: "succeeded" }, userDirectory: action.payload };
    case LOAD_USERS_FAILURE:
      return { ...state, status: { ...state.status, userDirectory: "failed" }, error: action.payload };
    //Game Directory
    case LOAD_GAMES_PROGRESS:
      return { ...state, status: { ...state.status, gameDirectory: "loading" } };
    case LOAD_GAMES_SUCCESS:
      return { ...state, status: { ...state.status, gameDirectory: "succeeded" }, gameDirectory: action.payload };
    case LOAD_GAMES_FAILURE:
      return { ...state, status: { ...state.status, gameDirectory: "failed" }, error: action.payload };
    //User Profile
    case LOAD_USER_PROGRESS:
      return { ...state, status: { ...state.status, userProfile: "loading" } };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        status: { ...state.status, userProfile: "succeeded" },
        preloadedUserProfiles: Object.assign({}, state.preloadedUserProfiles, action.payload)
      };
    case CLEAR_SITE_DATA:
      return initialSiteDataState;
    default:
      return state;
  }
};
