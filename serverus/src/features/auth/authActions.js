import { LOG_IN_LOADING, LOG_IN_SUCCESS, LOG_IN_FAILURE } from "./authConstants";

//API
import { Login } from "../API/AGL_API/loginFunctions";

export const loginAccount = data => {
  return dispatch => {
    dispatch({ type: LOG_IN_LOADING });
    Login(data)
      .then(result => {
        debugger;
        // dispatch();
      })
      .catch(error => {
        // dispatch();
      });
  };
};
