import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import session from "./session/sessionReducer";
import siteData from "./siteData/siteDataReducer";

export default combineReducers({
  router: routerReducer,
  session,
  siteData
});
