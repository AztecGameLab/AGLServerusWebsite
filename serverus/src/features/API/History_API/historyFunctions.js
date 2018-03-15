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
