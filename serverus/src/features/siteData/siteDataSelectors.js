import { createSelector } from "reselect";

//Input Selectors
const getUserDirectory = state => state.siteData.userDirectory;
const getUserDirectoryStatus = state => state.siteData.loadUserDirectoryStatus;

//Memoized Selectors
export const selectUserDirectory = createSelector([getUserDirectory], users => {
  return users;
});

export const selectIsUserDirectoryCached = createSelector([getUserDirectory], users => {
  return users !== {};
});

export const selectLoadUserDirectoryStatus = createSelector([getUserDirectoryStatus], status => {
  return status;
});
