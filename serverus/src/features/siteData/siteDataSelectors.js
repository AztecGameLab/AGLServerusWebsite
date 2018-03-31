import { createSelector } from "reselect";

//Lodash Utility
import { isEmpty } from "lodash";

//Input Selectors
const getUserDirectory = state => state.siteData.userDirectory;
const getGameDirectory = state => state.siteData.gameDirectory;
const getSiteDataStatus = state => state.siteData.status;
const getPreloadedUser = (state, props) => state.siteData.preloadedUserProfiles[props.match.params.username];

//Memoized Selectors
export const selectUserDirectory = createSelector([getUserDirectory], users => {
  return users;
});

export const selectIsUserDirectoryCached = createSelector([getUserDirectory], users => {
  return !isEmpty(users);
});

export const selectSiteDataStatus = createSelector([getSiteDataStatus], status => {
  return status;
});

export const selectGameDirectory = createSelector([getGameDirectory], games => {
  return games;
});

export const selectIsGameDirectoryCached = createSelector([getGameDirectory], games => {
  return !isEmpty(games);
});

export const makeSelectUser = () => {
  return createSelector([getPreloadedUser], user => {
    return user;
  });
};
