import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import auth from "./login/loginReducer";

export default combineReducers({
  router: routerReducer,
  auth
});
