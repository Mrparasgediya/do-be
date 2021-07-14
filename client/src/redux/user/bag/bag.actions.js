import bagActionTypes from "./bag.types";

export const setUserBagItems = (items) => ({
  type: bagActionTypes.SET_USER_BAG_ITEMS,
  payload: items,
});

export const removeBagItem = (itemId) => ({
  type: bagActionTypes.REMOVE_ITEM_FROM_USER_BAG,
  payload: itemId,
});

export const addItemToUserBag = (item) => ({
  type: bagActionTypes.ADD_ITEM_TO_USER_BAG,
  payload: item,
});

export const updateSelectedSizeAndQtyOfBagItem = (itemId, size, qty) => ({
  type: bagActionTypes.UPDATE_SELECTED_SIZE_AND_QTY_OF_BAG_ITEM,
  payload: { itemId, size, qty },
});
