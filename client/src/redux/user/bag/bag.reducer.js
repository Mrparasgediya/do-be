import {
  addItemToBag,
  removeItemFromBag,
  updateItemSizeAndQty,
} from "./bag.utils";
import bagActionTypes from "./bag.types";

const INITIAL_STATE = {
  items: {},
};

const bagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bagActionTypes.SET_USER_BAG_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case bagActionTypes.REMOVE_ITEM_FROM_USER_BAG:
      return {
        ...state,
        items: { ...removeItemFromBag(state.items, action.payload) },
      };

    case bagActionTypes.ADD_ITEM_TO_USER_BAG:
      return {
        ...state,
        items: { ...addItemToBag(state.items, action.payload) },
      };

    case bagActionTypes.UPDATE_SELECTED_SIZE_AND_QTY_OF_BAG_ITEM:
      return {
        ...state,
        items: { ...updateItemSizeAndQty(state.items, action.payload) },
      };

    default:
      return state;
  }
};

export default bagReducer;
