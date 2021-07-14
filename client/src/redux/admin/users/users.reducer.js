import userActionTypes from "./users.types";
import { deleteUserAndGetRestUsers } from "./users.utils";

const INITIAL_STATE = {
  users: {},
  lastUserDoc: undefined,
  firstUserDoc: undefined,
  isUsersLoading: false,
  isOperationRunning: false,
  addUserDialog: false,
  deleteUserDialog: false,
  userToDelete: undefined,
  userForOperation: undefined,
  editUserDialog: false,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case userActionTypes.UPDATE_USER_ROLE:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: {
            ...state.users[action.payload.userId],
            role: action.payload.newRole,
          },
        },
      };
    case userActionTypes.TOGGLE_IS_OPERATION_RUNNING:
      return {
        ...state,
        isOperationRunning: !state.isOperationRunning,
      };

    case userActionTypes.TOGGLE_IS_USERS_LOADING:
      return {
        ...state,
        isUsersLoading: !state.isUsersLoading,
      };

    case userActionTypes.SET_FIRST_USER_DOC:
      return { ...state, firstUserDoc: action.payload };

    case userActionTypes.SET_LAST_USER_DOC:
      return { ...state, lastUserDoc: action.payload };

    case userActionTypes.TOGGLE_ADD_USER_DIALOG:
      return { ...state, addUserDialog: !state.addUserDialog };

    case userActionTypes.ADD_NEW_USER:
      return {
        ...state,
        users: {
          ...action.payload,
          ...state.users,
        },
      };

    case userActionTypes.DISABLE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload]: {
            ...state.users[action.payload],
            disabled: true,
          },
        },
      };
    case userActionTypes.ENABLE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload]: {
            ...state.users[action.payload],
            disabled: false,
          },
        },
      };

    case userActionTypes.TOGGLE_DELETE_USER_DIALOG:
      return {
        ...state,
        deleteUserDialog: !state.deleteUserDialog,
      };

    case userActionTypes.SET_USER_TO_DELETE:
      return {
        ...state,
        userToDelete: action.payload,
      };

    case userActionTypes.DELETE_USER:
      return {
        ...state,
        users: { ...deleteUserAndGetRestUsers(state.users, action.payload) },
      };

    case userActionTypes.SET_USER_FOR_OPERATION:
      return { ...state, userForOperation: action.payload };

    case userActionTypes.EDIT_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: {
            ...state.users[action.payload.userId],
            ...action.payload.dataToUpdate,
          },
        },
      };

    case userActionTypes.TOGGLE_EDIT_USER_DIALOG:
      return {
        ...state,
        editUserDialog: !state.editUserDialog,
      };

    default:
      return state;
  }
};

export default usersReducer;
