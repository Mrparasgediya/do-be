import wishlistActionTypes from "./wishlist.types";
import { addItem, removeItem } from "./wishlist.utils";

const INITIAL_STATE = {
  items: {},
  isLoading: false,
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case wishlistActionTypes.SET_USER_WISHLIST_ITEMS:
      return { ...state, items: action.payload };

    case wishlistActionTypes.TOGGLE_IS_WISHLIST_ITEMS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case wishlistActionTypes.ADD_USER_WISHLIST_ITEM:
      return {
        ...state,
        items: { ...addItem(state.items, action.payload) },
      };

    case wishlistActionTypes.REMOVE_USER_WISHLIST_ITEM:
      return {
        items: { ...removeItem(state.items, action.payload) },
      };

    default:
      return state;
  }
};

export default wishlistReducer;
