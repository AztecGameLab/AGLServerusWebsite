import {
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  DISPLAY_PASSWORD_HELP,
  REQUEST_PASS_RESET,
  REQUEST_PASS_SUCCESS,
  REQUEST_PASS_FAILURE
} from "./authConstants";

//API
import { AGL_Login, AGL_LogOut, EmailTakenCheck } from "../API/AGL_API/registrationFunctions";
import { IsUserRencrypted, AGLEncryption, AGLRencryption } from "../API/AGL_API/encryptionFunctions";
import { SendPasswordReset } from "../API/AGL_API/passwordResetFunctions";
import * as EmailValidator from "email-validator";

//Selectors
import { selectNeedLoginHelp } from "./authSelectors";

export const loginAccount = (email, password) => {
  return dispatch => {
    dispatch({ type: LOG_IN_LOADING });
    return loginFormValidation(email, password).then(valid => {
      if (valid) {
        IsUserRencrypted(email).then(recrypted => {
          if (recrypted) {
            AGLEncryption(password).then(encryptedPass => {
              AGL_Login(email, encryptedPass)
                .then(res => {
                  dispatch({ type: LOG_IN_SUCCESS, payload: res });
                })
                .catch(error => {
                  dispatch(loginFail(error));
                });
            });
          } else {
            //Must Rencrypt
            AGLRencryption(email, password).then(res => {
              if (res.data === "Wrong Password") {
                dispatch(loginFail({ message: "Wrong email or password" }));
              } else {
                AGLEncryption(password).then(encryptedPass => {
                  AGL_Login(email, encryptedPass)
                    .then(res => {
                      dispatch({ type: LOG_IN_SUCCESS, payload: res });
                    })
                    .catch(error => {
                      dispatch(loginFail(error));
                    });
                });
              }
            });
          }
        });
      } else {
        dispatch(loginFail({ message: "Wrong email or password" }));
      }
    });
  };
};

export const logOutAccount = () => {
  return dispatch => {
    AGL_LogOut().then(res => {
      dispatch({ type: LOG_OUT });
    });
  };
};

export const requestPasswordReset = email => {
  return dispatch => {
    dispatch({ type: REQUEST_PASS_RESET });
    return SendPasswordReset(email)
      .then(res => {
        debugger;
      })
      .catch(error => {
        debugger;
        dispatch({ type: REQUEST_PASS_FAILURE, payload: error });
      });
  };
};

//Helper Internal Functions
const loginFormValidation = (email, password) => {
  return EmailTakenCheck(email).then(res => {
    return res.emailTaken && EmailValidator.validate(email) && password.length > 0;
  });
};

const loginFail = error => {
  return (dispatch, getState) => {
    dispatch({ type: LOG_IN_FAILURE, payload: error });
    if (selectNeedLoginHelp(getState())) {
      dispatch({ type: DISPLAY_PASSWORD_HELP });
    }
  };
};
