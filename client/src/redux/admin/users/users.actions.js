import userActionTypes from "./users.types";

export const setUsers = (users) => ({
  type: userActionTypes.SET_USERS,
  payload: users,
});

export const updateUserRole = (userId, newRole) => ({
  type: userActionTypes.UPDATE_USER_ROLE,
  payload: { userId, newRole },
});

export const toggleIsOperationRunning = () => ({
  type: userActionTypes.TOGGLE_IS_OPERATION_RUNNING,
});

export const toggleIsUsersLoading = () => ({
  type: userActionTypes.TOGGLE_IS_USERS_LOADING,
});

export const setFirstUserDoc = (firstUserDoc) => ({
  type: userActionTypes.SET_FIRST_USER_DOC,
  payload: firstUserDoc,
});

export const setLastUserDoc = (lastUserDoc) => ({
  type: userActionTypes.SET_LAST_USER_DOC,
  payload: lastUserDoc,
});

export const toggleAddUserDialog = () => ({
  type: userActionTypes.TOGGLE_ADD_USER_DIALOG,
});

export const addNewUser = (userId, userData) => ({
  type: userActionTypes.ADD_NEW_USER,
  payload: { [userId]: userData },
});

export const disableUser = (userId) => ({
  type: userActionTypes.DISABLE_USER,
  payload: userId,
});

export const enableUser = (userId) => ({
  type: userActionTypes.ENABLE_USER,
  payload: userId,
});

export const toggleDeleteUserDialog = () => ({
  type: userActionTypes.TOGGLE_DELETE_USER_DIALOG,
});

export const deleteUser = (userId) => ({
  type: userActionTypes.DELETE_USER,
  payload: userId,
});

export const setUserForOperation = (userId) => ({
  type: userActionTypes.SET_USER_FOR_OPERATION,
  payload: userId,
});

export const toggleEditUserDialog = () => ({
  type: userActionTypes.TOGGLE_EDIT_USER_DIALOG,
});

export const editUser = (userId, dataToUpdate) => ({
  type: userActionTypes.EDIT_USER,
  payload: { userId, dataToUpdate },
});
