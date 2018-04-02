import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import siteData from "./siteData/siteDataReducer";
import auth from "./auth/authReducer";

export default combineReducers({
  router: routerReducer,
  auth,
  siteData
});
