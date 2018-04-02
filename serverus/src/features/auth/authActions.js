import { SIGN_IN_LOADING, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT, SIGN_UP_LOADING, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "./authConstants";
import { Login } from "../API/AGL_API/loginFunctions";
import { UsernameTakenCheck, RedIDTakenCheck, EmailTakenCheck } from "../API/AGL_API/signUpFunctions";

//Login In Actions
export const loginAccount = data => {
  return dispatch => {
    dispatch({ type: SIGN_IN_LOADING });
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

//Sign Up Actions
export const signUpAccount = data => {
  return dispatch => {
    dispatch({ type: SIGN_UP_LOADING });
    UsernameTakenCheck()
      .then(res => {
        RedIDTakenCheck().then(res => {
          EmailTakenCheck().then(res => {});
        });
      })
      .catch(error => {
        dispatch({ type: SIGN_UP_LOADING, payload: error });
      });
  };
};
