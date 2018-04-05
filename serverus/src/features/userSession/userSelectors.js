import { createSelector } from "reselect";

//Input Selectors
const getUserData = state => state.userSession.userData;

//Memoized Selectors
export const selectUserData = createSelector([getUserData], userData => {
  return userData;
});
