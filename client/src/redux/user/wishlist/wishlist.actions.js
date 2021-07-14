import wishlistActionTypes from "./wishlist.types";

export const setUserWishlistItems = (items) => {
  return {
    type: wishlistActionTypes.SET_USER_WISHLIST_ITEMS,
    payload: items,
  };
};

export const addItemToUserWishlist = (itemObj) => ({
  type: wishlistActionTypes.ADD_USER_WISHLIST_ITEM,
  payload: itemObj,
});
export const removeUserWishlistItem = (itemId) => ({
  type: wishlistActionTypes.REMOVE_USER_WISHLIST_ITEM,
  payload: itemId,
});

export const toggleIsWishlistItemsLoading = () => ({
  type: wishlistActionTypes.TOGGLE_IS_WISHLIST_ITEMS_LOADING,
});
