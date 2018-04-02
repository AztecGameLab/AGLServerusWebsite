import { LOG_IN_LOADING, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT } from "./authConstants";

//API
import { AGL_Login, AGL_LogOut } from "../API/AGL_API/registrationFunctions";
import { IsUserRencrypted, AGLEncryption, AGLRencryption } from "../API/AGL_API/encryptionFunctions";

export const loginAccount = (email, password) => {
  return dispatch => {
    dispatch({ type: LOG_IN_LOADING });
    IsUserRencrypted(email).then(recrypted => {
      debugger;
      if (recrypted) {
        AGLEncryption(password).then(encryptedPass => {
          debugger;
          AGL_Login(email, encryptedPass)
            .then(res => {
              debugger;
              dispatch({ type: LOG_IN_SUCCESS, payload: res });
            })
            .catch(error => {
              debugger;
              dispatch({ type: LOG_IN_FAILURE, payload: error });
            });
        });
      } else {
        //Must Rencrypt
        AGLRencryption(email, password).then(res => {
          debugger;
          if (res.data === "Wrong Password") {
            dispatch({ type: LOG_IN_FAILURE, payload: { message: "Wrong Password" } });
          } else {
            AGLEncryption(password).then(encryptedPass => {
              debugger;
              AGL_Login(email, encryptedPass)
                .then(res => {
                  debugger;
                  dispatch({ type: LOG_IN_SUCCESS, payload: res });
                })
                .catch(error => {
                  debugger;
                  dispatch({ type: LOG_IN_FAILURE, payload: error });
                });
            });
          }
        });
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
