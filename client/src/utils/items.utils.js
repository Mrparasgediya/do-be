import {
  addItemToWishlist,
  removeItemFromWishlist,
  addItemToBag,
} from "redux/user/user.actions";
import {
  removeItemFromUserWishlist,
  addItemToUserWishlist,
  addItemToUserBag,
} from "firebase/users.utils";

import {
  addItemToUserWishlist as addItemUserWishlistRedux,
  removeUserWishlistItem as removeUserWishlistItemRedux,
} from "redux/user/wishlist/wishlist.actions";

import { showNotification } from "redux/notification/notification.actions";

import { addItemToUserBag as addItemToUserBagRedux } from "redux/user/bag/bag.actions";

export const handleAddItemToWishlistClick = async (
  item,
  currentUser,
  dispatch,
  history,
  setIsLoading
) => {
  const { id: itemId, ...otherItemData } = item;

  if (currentUser) {
    // return if user has that item in bag
    if (currentUser.bag && currentUser.bag.includes(itemId)) {
      dispatch(showNotification("you already have item in bag", "info"));
      return;
    }
    // check user has item or not
    if (setIsLoading) setIsLoading(true);
    try {
      if (currentUser.wishlist && currentUser.wishlist.includes(itemId)) {
        const [, error] = await removeItemFromUserWishlist(
          currentUser.id,
          itemId
        );
        if (error) throw new Error(error);
        dispatch(removeItemFromWishlist(itemId));
        removeUserWishlistItemRedux(itemId);
        dispatch(
          showNotification("item is removed from your wishilst.", "info")
        );
      } else {
        // [isAdded(boolean), error]
        const [, error] = await addItemToUserWishlist(currentUser.id, itemId);
        if (error) throw new Error(error);
        dispatch(addItemToWishlist(itemId));
        dispatch(addItemUserWishlistRedux({ [itemId]: otherItemData }));
        dispatch(showNotification("item is added to your wishilst.", "info"));
      }
      if (setIsLoading) setIsLoading(false);
    } catch (error) {
      dispatch(showNotification(error.message, "error"));
      if (setIsLoading) setIsLoading(false);
    }
  } else {
    history && history.push("/users/signin");
  }
};

export const handleAddItemToBagClick = async (
  item,
  currentUser,
  dispatch,
  history,
  setIsLoading
) => {
  const { id: itemId, ...otherItemData } = item;

  if (currentUser) {
    try {
      if (setIsLoading) setIsLoading(true);
      //   if user has wishlist item then remove it from wishlist and add it to bag
      if (currentUser.wishlist && currentUser.wishlist.includes(itemId)) {
        const [, error] = await removeItemFromUserWishlist(
          currentUser.id,
          itemId
        );
        if (error) throw new Error(error);
        dispatch(removeItemFromWishlist(itemId));
        dispatch(removeUserWishlistItemRedux(itemId));
      }
      if (
        (currentUser.bag && !currentUser.bag.includes(itemId)) ||
        !currentUser.bag
      ) {
        // check user has item or not
        // [isAdded(boolean),error]
        const [, error] = await addItemToUserBag(currentUser.id, itemId);
        if (error) throw new Error(error);
        dispatch(addItemToBag(itemId));
        dispatch(addItemToUserBagRedux({ [itemId]: otherItemData }));
        dispatch(showNotification("item is added to your bag.", "info"));
      }

      if (setIsLoading) setIsLoading(false);
    } catch (error) {
      dispatch(showNotification(error.message, "error"));
      if (setIsLoading) setIsLoading(false);
    }
  } else {
    history && history.push("/users/signin");
  }
};
