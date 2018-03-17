import { LOAD_USERS_PROGRESS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from "./siteDataConstants";

// Progress States -> "idle" -> "loading" -> ("succeeded" || "failed")
const initialSiteDataState = {
  signedIn: false,
  signInProgress: "idle"
};

//Site Data Reducer
export default (state = initialSiteDataState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
