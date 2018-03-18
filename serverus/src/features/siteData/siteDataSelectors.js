import { createSelector } from "reselect";

//Lodash Utility
import { isEmpty } from "lodash";

//Input Selectors
const getUserDirectory = state => state.siteData.userDirectory;
const getUserDirectoryStatus = state => state.siteData.loadUserDirectoryStatus;
const getGameDirectory = state => state.siteData.gameDirectory;
const getGameDirectoryStatus = state => state.siteData.loadGameDirectoryStatus;

//Memoized Selectors
export const selectUserDirectory = createSelector([getUserDirectory], users => {
  return users;
});

export const selectIsUserDirectoryCached = createSelector([getUserDirectory], users => {
  return !isEmpty(users);
});

export const selectLoadUserDirectoryStatus = createSelector([getUserDirectoryStatus], status => {
  return status;
});

export const selectGameDirectory = createSelector([getGameDirectory], games => {
  return games;
});

export const selectIsGameDirectoryCached = createSelector([getGameDirectory], games => {
  return !isEmpty(games);
});

export const selectLoadGameDirectoryStatus = createSelector([getGameDirectoryStatus], status => {
  return status;
});
