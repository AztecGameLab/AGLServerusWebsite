//Constants
import { LOAD_USERS_PROGRESS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE, FILTER_USERS } from "./siteDataConstants";

//API
import { LoadAllUsers } from "../API/AGL_API/siteDataFunctions";

//User Directory Actions
export const loadUsers = () => {
  return dispatch => {
    dispatch({ type: LOAD_USERS_PROGRESS });
    LoadAllUsers()
      .then(users => {
        dispatch({
          type: LOAD_USERS_SUCCESS,
          payload: users
        });
      })
      .catch(error => {
        dispatch({
          type: LOAD_USERS_FAILURE,
          payload: error
        });
      });
  };
};

export const filterUserDirectory = () => {
  return dispatch => {
    dispatch({ type: FILTER_USERS });
  };
};
