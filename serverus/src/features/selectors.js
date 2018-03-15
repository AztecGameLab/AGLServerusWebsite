import { createSelector } from "reselect";

//Input Selectors
const getSignIn = state => state.session.signedIn;

//Memoized Selectors
const selectSignIn = createSelector([getSignIn], signedIn => {
  return signedIn;
});
