import {
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  CREATE_ACCOUNT_LOADING,
  DISPLAY_PASSWORD_HELP,
  REQUEST_PASS_RESET,
  REQUEST_PASS_SUCCESS,
  REQUEST_PASS_FAILURE,
  CHANGE_PASS_LOADING,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_FAILURE,
  REMEMBER_ME,
  CLEAR_STATUS
} from "./authConstants";

//API
import { AGL_Login, AGL_LogOut, EmailTakenCheck, UsernameTakenCheck } from "../API/AGL_API/registrationFunctions";
import { IsUserRencrypted, AGLEncryption, AGLRencryption } from "../API/AGL_API/encryptionFunctions";
import { SendPasswordReset, AGL_ResetPassword } from "../API/AGL_API/passwordResetFunctions";
import * as EmailValidator from "email-validator";

//Selectors
import { selectNeedLoginHelp } from "./authSelectors";

export const loginAccount = (email, password, rememberMe) => {
  return dispatch => {
    dispatch(clearStatus());
    dispatch({ type: LOG_IN_LOADING });
    if (rememberMe) {
      dispatch(cacheLoginInput(email));
    }
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
    dispatch(clearStatus());
    dispatch({ type: REQUEST_PASS_RESET });
    return loginFormValidation(email, "password").then(valid => {
      if (valid) {
        SendPasswordReset(email)
          .then(res => {
            dispatch({ type: REQUEST_PASS_SUCCESS, payload: res });
          })
          .catch(error => {
            dispatch({ type: REQUEST_PASS_FAILURE, payload: { message: error.message } });
          });
      } else {
        dispatch({ type: REQUEST_PASS_FAILURE, payload: { message: "No account exists for that email, try again. " } });
      }
    });
  };
};

export const changePassword = (resetID, securityCode, newPassword, confirmPassword) => {
  return dispatch => {
    dispatch(clearStatus());
    dispatch({ type: CHANGE_PASS_LOADING });
    const { valid, errorMsg } = changePassFormValidation(securityCode, newPassword, confirmPassword);
    if (valid) {
      return AGL_ResetPassword(securityCode, resetID, newPassword)
        .then(status => {
          if (status === "Wrong Security Code!") {
            dispatch({ type: CHANGE_PASS_FAILURE, payload: { message: status } });
          } else {
            dispatch({ type: CHANGE_PASS_SUCCESS });
          }
        })
        .catch(error => {
          dispatch({ type: CHANGE_PASS_FAILURE, payload: { message: error.message } });
        });
    } else {
      dispatch({ type: CHANGE_PASS_FAILURE, payload: { message: errorMsg } });
    }
  };
};

export const createAccount = (username, email, password) => {
  return dispatch => {
    dispatch(clearStatus());
    dispatch({ type: CREATE_ACCOUNT_LOADING });
    return createAccountFormValidation(username, email, password).then(valid => {
      debugger;
    });
  };
};

//Helper Internal Functions
const loginFormValidation = (email, password) => {
  return EmailTakenCheck(email).then(res => {
    return res.emailTaken && EmailValidator.validate(email) && password.length > 0 && email.length > 0;
  });
};

const createAccountFormValidation = (username, email, password) => {
  return loginFormValidation().then(valid => {
    debugger;
    return UsernameTakenCheck(username).then(res => {
      debugger;
      return valid && res.usernameTaken && !res.profanity;
      // '{usernameTaken: true/false, profanity: true/false}'
    });
  });
};

const loginFail = error => {
  return (dispatch, getState) => {
    dispatch({ type: LOG_IN_FAILURE, payload: { message: error.message } });
    if (selectNeedLoginHelp(getState())) {
      dispatch({ type: DISPLAY_PASSWORD_HELP });
    }
  };
};

const cacheLoginInput = email => {
  return dispatch => {
    dispatch({ type: REMEMBER_ME, payload: { email } });
  };
};

const changePassFormValidation = (securityCode, newPassword, confirmPassword) => {
  let valid = false;
  let errorMsg = "";
  if (newPassword.length < 8 && confirmPassword.length < 8) {
    errorMsg = "Your password must be at least 8 characters.";
  } else if (securityCode.length !== 6) {
    errorMsg = "Please check the security code again.";
  } else if (newPassword !== confirmPassword) {
    errorMsg = "Your passwords did not match. Please try again.";
  } else {
    valid = true;
  }
  return { valid, errorMsg };
};

const clearStatus = () => {
  return dispatch => {
    dispatch({ type: CLEAR_STATUS });
  };
};
