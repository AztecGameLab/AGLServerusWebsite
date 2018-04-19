import { createSelector } from "reselect";

//Input Selectors
const getAuthStatus = state => state.auth.status;
const getLoggedIn = state => state.auth.loggedIn;
const getErrorObj = state => state.auth.error;
const getFailedLogins = state => state.auth.failedLogins;
const getRememberMe = state => state.auth.rememberMe;

//Constants
const FAILED_LOGIN_LIMIT = 10;

//Memoized Selectors
export const selectAuthStatus = createSelector([getAuthStatus], status => {
  return status;
});

export const selectLoggedIn = createSelector([getLoggedIn], loggedIn => {
  return loggedIn;
});

export const selectErrorMessage = createSelector([getErrorObj], error => {
  return error.message;
});

export const selectNeedLoginHelp = createSelector([getFailedLogins], fails => {
  return fails > FAILED_LOGIN_LIMIT;
});

export const selectRememberMe = createSelector([getRememberMe], rememberMeObj => {
  return rememberMeObj;
});
