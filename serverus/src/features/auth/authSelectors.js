import { createSelector } from "reselect";

//Input Selectors
const getAuthStatus = state => state.auth.status;
const getLoggedIn = state => state.auth.loggedIn;

//Memoized Selectors
export const selectAuthStatus = createSelector([getAuthStatus], status => {
  return status;
});

export const selectLoggedIn = createSelector([getLoggedIn], loggedIn => {
  return loggedIn;
});
