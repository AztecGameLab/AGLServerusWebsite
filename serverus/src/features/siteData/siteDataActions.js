//Constants
import {
  LOAD_USERS_PROGRESS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  FILTER_USERS,
  LOAD_GAMES_PROGRESS,
  LOAD_GAMES_SUCCESS,
  LOAD_GAMES_FAILURE,
  FILTER_GAMES,
  CLEAR_SITE_DATA
} from "./siteDataConstants";

//API
import { LoadAllUsers, LoadAllGames } from "../API/AGL_API/siteDataFunctions";

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

export const loadGames = () => {
  return dispatch => {
    dispatch({ type: LOAD_GAMES_PROGRESS });
    LoadAllGames()
      .then(games => {
        dispatch({
          type: LOAD_GAMES_SUCCESS,
          payload: games
        });
      })
      .catch(error => {
        dispatch({
          type: LOAD_GAMES_FAILURE,
          payload: error
        });
      });
  };
};

export const filterGameDirectory = () => {
  return dispatch => {
    dispatch({ type: FILTER_GAMES });
  };
};

export const clearSiteData = () => {
  return dispatch => {
    dispatch({ type: CLEAR_SITE_DATA });
  };
};
