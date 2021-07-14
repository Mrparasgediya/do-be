import { createSelector } from "reselect";

const selectUser = (state) => state.user.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.user
);

export const selectCurrentUserName = createSelector(
  [selectCurrentUser],
  (user) => user && user.name
);

export const selectIsOperationRunning = createSelector(
  [selectUser],
  (user) => user.isOperationRunning
);

export const selectUpdateEmailDialog = createSelector(
  [selectUser],
  (user) => user.updateEmailDialog
);

export const selectIsEmailVerificationLinkSent = createSelector(
  [selectUser],
  (user) => user.isEmailVerificationLinkSent
);

export const selectIsPasswordChangelinkSent = createSelector(
  [selectUser],
  (user) => user.isPasswordChangeLinkSent
);

export const selectDeleteUserDialog = createSelector(
  [selectUser],
  (user) => user.deleteUserDialog
);

export const selectUserWishlistIds = createSelector(
  [selectCurrentUser],
  (user) => (user && user.wishlist) || []
);

export const selectUserBagIds = createSelector(
  [selectCurrentUser],
  (user) => (user && user.bag) || []
);

export const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  (user) => user && user.email
);

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (user) => user && user.id
);

export const selectCurrentUserShippingAddressDetails = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    (currentUser.addressDetails &&
      currentUser.addressDetails.shippingAddress) ||
    undefined
);

export const selectCurrentUserAddress = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.address
);
export const selectCurrentUserPhoneNumber = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.phoneNumber
);

export const selectCurrentUserIsEmailVerified = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.emailVerified
);
