import { createSelector } from "reselect";

const selectUsersState = (state) => state.admin.users;

export const selectUsers = createSelector(
  [selectUsersState],
  (users) => users.users
);

export const selectIsOperationRunning = createSelector(
  [selectUsersState],
  (users) => users.isOperationRunning
);

export const selectIsUsersLoading = createSelector(
  [selectUsersState],
  (users) => users.isUsersLoading
);

export const selectFirstUserDoc = createSelector(
  [selectUsersState],
  (users) => users.firstUserDoc
);

export const selectLastUserDoc = createSelector(
  [selectUsersState],
  (users) => users.lastUserDoc
);

export const selectAddUserDialog = createSelector(
  [selectUsersState],
  (users) => users.addUserDialog
);

export const selectDeleteUserDialog = createSelector(
  [selectUsersState],
  (users) => users.deleteUserDialog
);

export const selectUserForOperation = createSelector(
  [selectUsersState],
  (users) =>
    users.userForOperation
      ? {
          id: users.userForOperation,
          ...users.users[users.userForOperation],
        }
      : undefined
);

export const selectEditUserDialog = createSelector(
  [selectUsersState],
  (users) => users.editUserDialog
);
