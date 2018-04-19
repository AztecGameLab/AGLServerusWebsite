import {
  LOG_IN_LOADING,
  LOGGING_IN,
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
import { persistor } from "../../features/configStore";

//Selectors
import { selectNeedLoginHelp } from "./authSelectors";

//Create Account Wait
const SUCCESS_WAIT = 2000;

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
                .then(fireData => {
                  dispatch(loginSuccess(fireData));
                })
                .catch(error => {
                  dispatch(loginFail(error));
                });
            });
          } else {
            AGLRencryption(email, password).then(res => {
              if (res.data === "Wrong Password") {
                dispatch(loginFail({ message: "Wrong email or password" }));
              } else {
                AGLEncryption(password).then(encryptedPass => {
                  AGL_Login(email, encryptedPass)
                    .then(fireData => {
                      dispatch(loginSuccess(fireData));
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
      persistor.purge();
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
      return validateExistingAccount(username, email, password).then(preExistCheck => {
        const { emailTaken, usernameTaken, containsProfanity } = preExistCheck;
        if (emailTaken || usernameTaken) {
          dispatch({ type: CREATE_ACCOUNT_FAILURE, payload: { message: "The username or email has already been used." } });
        } else if (containsProfanity) {
          dispatch({ type: CREATE_ACCOUNT_FAILURE, payload: { message: "The username is inappropriate." } });
        } else {
          return populateDefaultAccount(username, email, password).then(newAccObj => {
            const encryptedPass = newAccObj.password;
            AGL_CreateAccount(username, email, encryptedPass, newAccObj)
              .then(status => {
                if (status.data === "Successful account creation!") {
                  dispatch({ type: CREATE_ACCOUNT_SUCCESS });
                  dispatch(loginAccount(email, password, true));
                } else {
                  dispatch({ type: CHANGE_PASS_FAILURE, payload: { message: "Account creation failed. Please contact aztecgamelab@gmail.com" } });
                }
              })
              .catch(error => {
                dispatch({ type: CHANGE_PASS_FAILURE, payload: { message: error.message } });
              });
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
    return UsernameTakenCheck(username).then(res => {
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

const loginSuccess = fireData => {
  return dispatch => {
    dispatch({ type: LOGGING_IN });
    const userData = filterFireLogin(fireData);
    setTimeout(() => {
      dispatch({ type: LOG_IN_SUCCESS, payload: userData });
    }, SUCCESS_WAIT);
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

const populateDefaultAccount = (username, email, password) => {
  return AGLEncryption(password).then(encryptedPass => {
    newAccObj.username = username;
    newAccObj.email = email;
    newAccObj.password = encryptedPass;
    let now = new Date();
    now = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    newAccObj.dateJoined = now;
    return newAccObj;
  });
};

const filterFireLogin = res => {
  delete res.apiKey;
  delete res.authDomain;
  delete res.stsTokenManager;
  delete res.appNamel;
  return res;
};
