import contactUsActionsTypes from "./contactus.types";

export const setContactUsItems = (contactUsItems) => ({
  type: contactUsActionsTypes.SET_CONTACT_US_ITEMS,
  payload: contactUsItems,
});

export const setContactUsForOperation = (contactUsId) => ({
  type: contactUsActionsTypes.SET_CONTACT_US_FOR_OPERATION,
  payload: contactUsId,
});

export const toggleReplayContactUsDialog = () => ({
  type: contactUsActionsTypes.TOGGLE_REPLAY_CONTACT_US_DIALOG,
});

export const updateContactUsDetails = (contactUsId, dataToUpdate) => ({
  type: contactUsActionsTypes.UPDATE_CONTACT_US_DETAILS,
  payload: { contactUsId, dataToUpdate },
});

export const addContactUsItems = (contactUsItems) => ({
  type: contactUsActionsTypes.ADD_CONTACT_US_ITEMS,
  payload: contactUsItems,
});

export const setCurrentContactUsPage = (currentPageNo) => ({
  type: contactUsActionsTypes.SET_CURRENT_CONTACT_US_PAGE,
  payload: currentPageNo,
});

export const setLastContactUsDoc = (lastDoc) => ({
  type: contactUsActionsTypes.SET_LAST_CONTACT_US_DOC,
  payload: lastDoc,
});

export const toggleIsContactUsItemsLoading = () => ({
  type: contactUsActionsTypes.TOGGLE_IS_CONTACT_US_ITEMS_LOADING,
});
