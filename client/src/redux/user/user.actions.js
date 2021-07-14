import userActionTypes from "./user.types";

export const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const toggleIsOperationRunning = () => ({
  type: userActionTypes.IS_OPERATION_RUNNING,
});

export const updateCurrentUserName = (newName) => ({
  type: userActionTypes.UPDATE_CURRENT_USER_NAME,
  payload: newName,
});

export const toggleUpdateEmailDialog = () => ({
  type: userActionTypes.UDPATE_EMAIL_DIALOG,
});

export const setIsEmailVerificationLinkSent = (
  isEmailVerificationLinkSent
) => ({
  type: userActionTypes.SET_IS_EMAIL_VERIFICATION_LINK_SENT,
  payload: isEmailVerificationLinkSent,
});

export const togglePasswordChangeLinkSent = () => ({
  type: userActionTypes.IS_PASSWORD_CHANGE_LINK_SENT,
});

export const toggleDeleteUserDialog = () => ({
  type: userActionTypes.DELETE_USER_DIALOG,
});

export const deleteCurrentUser = () => ({
  type: userActionTypes.DELETE_CURRENT_USER,
});

export const addItemToWishlist = (itemId) => ({
  type: userActionTypes.ADD_ITEM_TO_WISHLIST,
  payload: itemId,
});

export const removeItemFromWishlist = (itemId) => ({
  type: userActionTypes.REMOVE_ITEM_FROM_WISHLIST,
  payload: itemId,
});

export const addItemToBag = (itemId) => ({
  type: userActionTypes.ADD_ITEM_TO_BAG,
  payload: itemId,
});

export const removeItemFromBag = (itemId) => ({
  type: userActionTypes.REMOVE_ITEM_FROM_BAG,
  payload: itemId,
});

export const convertWishlistIdsToItems = (items) => ({
  type: userActionTypes.CONVERT_WISHLIST_ARR_TO_ITEMS,
  payload: items,
});

export const addOrderToUser = (orderId) => ({
  type: userActionTypes.ADD_ORDER_TO_USER,
  payload: orderId,
});

export const setCurrentUserAddress = (address) => ({
  type: userActionTypes.SET_CURRENT_USER_ADDRESS,
  payload: address,
});

export const setCurrentUserPhoneNo = (phoneNo) => ({
  type: userActionTypes.SET_CURRENT_USER_PHONE_NO,
  payload: phoneNo,
});
