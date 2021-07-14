import { combineReducers } from "redux";
import bagReducer from "./bag/bag.reducer";
import ordersReducer from "./orders/orders.reducer";
import userActionTypes from "./user.types";
import wishlistReducer from "./wishlist/wishlist.reducer";

const initialState = {
  user: null,
  isOperationRunning: false,
  updateEmailDialog: false,
  isEmailVerificationLinkSent: false,
  isPasswordChangeLinkSent: false,
  deleteUserDialog: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case userActionTypes.UPDATE_CURRENT_USER_NAME:
      return {
        ...state,
        user: { ...state.user, name: action.payload },
      };
    case userActionTypes.IS_OPERATION_RUNNING:
      return {
        ...state,
        isOperationRunning: !state.isOperationRunning,
      };
    case userActionTypes.UDPATE_EMAIL_DIALOG:
      return {
        ...state,
        updateEmailDialog: !state.updateEmailDialog,
      };

    case userActionTypes.SET_IS_EMAIL_VERIFICATION_LINK_SENT:
      return {
        ...state,
        isEmailVerificationLinkSent: action.payload,
      };
    case userActionTypes.IS_PASSWORD_CHANGE_LINK_SENT:
      return {
        ...state,
        isPasswordChangeLinkSent: !state.isPasswordChangeLinkSent,
      };
    case userActionTypes.DELETE_USER_DIALOG:
      return {
        ...state,
        deleteUserDialog: !state.deleteUserDialog,
      };
    case userActionTypes.DELETE_CURRENT_USER:
      return {
        ...state,
        user: null,
      };

    case userActionTypes.ADD_ITEM_TO_WISHLIST:
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: state.user.wishlist
            ? [...state.user.wishlist, action.payload]
            : [action.payload],
        },
      };

    case userActionTypes.REMOVE_ITEM_FROM_WISHLIST:
      const userWishlit = state.user.wishlist;
      userWishlit.splice(userWishlit.indexOf(action.payload), 1);
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: [...userWishlit],
        },
      };

    case userActionTypes.ADD_ITEM_TO_BAG:
      return {
        ...state,
        user: {
          ...state.user,
          bag: state.user.bag
            ? [...state.user.bag, action.payload]
            : [action.payload],
        },
      };

    case userActionTypes.REMOVE_ITEM_FROM_BAG:
      const newBag = state.user.bag;
      newBag.splice(newBag.indexOf(action.payload), 1);

      return {
        ...state,
        user: {
          ...state.user,
          bag: [...newBag],
        },
      };

    case userActionTypes.ADD_ORDER_TO_USER:
      return {
        ...state,
        user: {
          ...state.user,
          orders: state.user.orders
            ? [...state.user.orders, action.payload]
            : [action.payload],
        },
      };
    case userActionTypes.SET_CURRENT_USER_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          address: action.payload,
        },
      };
    case userActionTypes.SET_CURRENT_USER_PHONE_NO:
      return {
        ...state,
        user: {
          ...state.user,
          phoneNumber: action.payload,
        },
      };
    default:
      return state;
  }
};

const userReducers = combineReducers({
  user: userReducer,
  wishlist: wishlistReducer,
  bag: bagReducer,
  orders: ordersReducer,
});
export default userReducers;
