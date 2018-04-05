import {
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  CREATE_ACCOUNT_LOADING,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
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
import { AGL_Login, AGL_LogOut, AGL_CreateAccount, EmailTakenCheck, UsernameTakenCheck } from "../API/AGL_API/registrationFunctions";
import { IsUserRencrypted, AGLEncryption, AGLRencryption } from "../API/AGL_API/encryptionFunctions";
import { SendPasswordReset, AGL_ResetPassword } from "../API/AGL_API/passwordResetFunctions";
import * as EmailValidator from "email-validator";
import newAccObj from "./defaultNewAccount";

//Selectors
import { selectNeedLoginHelp } from "./authSelectors";

export const loginAccount = (email, password, rememberMe) => {
  return dispatch => {
    dispatch(clearStatus());
    dispatch({ type: LOG_IN_LOADING });
    if (rememberMe) {
      dispatch(cacheLoginInput(email));
    }
    return validateExistingEmail(email, password).then(valid => {
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
    return validateExistingEmail(email, "password").then(valid => {
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
    const { valid, errorMsg } = createAccountFormValidation(username, email, password);
    if (valid) {
      return validateExistingAccount(username, email, password).then((emailTaken, usernameTaken, containsProfanity) => {
        if (emailTaken || usernameTaken) {
          dispatch({ type: CREATE_ACCOUNT_FAILURE, error: { message: "The username or email has already been used." } });
        } else if (containsProfanity) {
          dispatch({ type: CREATE_ACCOUNT_FAILURE, error: { message: "The username is inappropriate." } });
        } else {
          newAccObj.username = username;
          newAccObj.email = email;
          newAccObj.password = password;
          debugger;
          AGL_CreateAccount(username, email, password, newAccObj)
            .then(status => {
              debugger;
            })
            .catch(error => {
              dispatch({ type: CHANGE_PASS_FAILURE, payload: { message: error.message } });
            });
        }
      });
    } else {
      dispatch({ type: CREATE_ACCOUNT_FAILURE, payload: { message: errorMsg } });
    }
  };
};

//Helper Internal Functions
const validateExistingEmail = (email, password) => {
  return EmailTakenCheck(email).then(res => {
    return res.emailTaken && EmailValidator.validate(email) && password.length > 0 && email.length > 0;
  });
};

const validateExistingAccount = (username, email, password) => {
  return validateExistingEmail(email, password).then(emailTaken => {
    debugger;
    return UsernameTakenCheck(username).then(res => {
      debugger;
      return {
        emailTaken,
        usernameTaken: res.usernameTaken,
        containsProfanity: res.profanity
      };
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

const createAccountFormValidation = (username, email, password) => {
  let valid = false;
  let errorMsg = "";
  if (password.length < 8) {
    errorMsg = "Your password must be at least 8 characters.";
  } else if (!EmailValidator.validate(email)) {
    errorMsg = "Invalid email.";
  } else if (username.length < 2) {
    errorMsg = "Your username must be at least 2 characters.";
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
