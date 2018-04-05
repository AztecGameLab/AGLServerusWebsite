import createHistory from "history/createBrowserHistory";
import { replace } from "react-router-redux";

const history = createHistory();
export { history };

//History Redirect Actions
export const RedirectToHome = () => {
  return dispatch => {
    dispatch(replace("/"));
  };
};

export const RedirectToForgot = () => {
  return dispatch => {
    dispatch(replace("/forgot"));
  };
};

export const RedirectToExternal = (site) => {
  return dispatch => {
    dispatch(replace(site));
  };
}
