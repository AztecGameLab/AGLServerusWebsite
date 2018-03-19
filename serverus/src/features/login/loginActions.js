import { SIGN_IN_LOADING, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT } from "./loginConstants";
import { Login } from "../API/AGL_API/loginFunctions";

export const loginAccount = data => {
  return dispatch => {
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
export const signUpAccount = data => {
  return dispatch => {
    Login(data);
    dispatch();
  };
};
