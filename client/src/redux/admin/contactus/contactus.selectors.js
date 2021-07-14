import { createSelector } from "reselect";

const selectContactUsState = (state) => state.admin.contactUs;

export const selectContactUsItems = createSelector(
  [selectContactUsState],
  (contactUs) => contactUs.items
);

export const selectContactUsForOperation = createSelector(
  [selectContactUsState, selectContactUsItems],
  (contacUs, contactUsItems) =>
    contacUs.contactUsForOperation && {
      id: contacUs.contactUsForOperation,
      ...contactUsItems[contacUs.contactUsForOperation],
    }
);

export const selectReplayConactUsDialog = createSelector(
  [selectContactUsState],
  (contactUs) => contactUs.replayContactUsDialog
);

export const selectCurrentContactUsPage = createSelector(
  [selectContactUsState],
  (contactUs) => contactUs.currentPage
);
export const selectContactUsItemsIdsArr = createSelector(
  [selectContactUsItems],
  (contactUsItems) => Object.keys(contactUsItems)
);

export const selectNoOfContactUsItemsPerPage = createSelector(
  [selectContactUsState],
  (contactUs) => contactUs.ITEMS_PER_PAGE
);

export const selectNoOfContactUsPages = createSelector(
  [selectContactUsItemsIdsArr, selectNoOfContactUsItemsPerPage],
  (itemsArr, itemsPerPage) => Math.ceil(itemsArr.length / itemsPerPage)
);

export const selectCurrentContactUsItemsIdsArr = createSelector(
  [
    selectContactUsItemsIdsArr,
    selectCurrentContactUsPage,
    selectNoOfContactUsItemsPerPage,
  ],
  (itemsIdsArr, currentPage, itemsPerPage) => {
    const firstIdx = (currentPage - 1) * itemsPerPage;
    const lastIdx = firstIdx + itemsPerPage;
    return itemsIdsArr.slice(firstIdx, lastIdx);
  }
);

export const selectCurrentContactUsItems = createSelector(
  [selectContactUsItems, selectCurrentContactUsItemsIdsArr],
  (allItems, currentItemsIds) => {
    return currentItemsIds.reduce(
      (allCurrentItems, currItemId) => ({
        ...allCurrentItems,
        [currItemId]: allItems[currItemId],
      }),
      {}
    );
  }
);

export const selectLastContactUsDoc = createSelector(
  [selectContactUsState],
  (contactUs) => contactUs.lastDoc
);

export const selectIsContactUsItemsLoading = createSelector(
  [selectContactUsState],
  (contactUs) => contactUs.isLoading
);
