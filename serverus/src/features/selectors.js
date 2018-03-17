import { createSelector } from "reselect";

//Input Selectors
const getSignIn = state => state.user.signedIn;

//Memoized Selectors
const selectSignIn = createSelector([getSignIn], signedIn => {
  return signedIn;
});