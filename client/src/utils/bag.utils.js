import { removeBagItem } from "redux/user/bag/bag.actions";
import { removeItemFromBag, addItemToWishlist } from "redux/user/user.actions";
import {
  deleteItemFromUserBag,
  addItemToUserWishlist,
} from "firebase/users.utils";
import { addItemToUserWishlist as addItemToUserWishlistRedux } from "redux/user/wishlist/wishlist.actions";
import { showNotification } from "redux/notification/notification.actions";

export const handleMoveToWishlistClick = async (
  currentUserId,
  item,
  dispatch
) => {
  const { id: itemId, ...otherItemData } = item;
  try {
    let error;
    // delete bag item from db
    [, error] = await deleteItemFromUserBag(currentUserId, itemId);
    if (error) throw new Error(error);
    // update redux
    dispatch(removeItemFromBag(itemId));
    // add wishlist item to db
    [, error] = await addItemToUserWishlist(currentUserId, itemId);
    if (error) throw new Error(error);
    dispatch(addItemToUserWishlistRedux({ [itemId]: otherItemData }));
    // update redux
    dispatch(addItemToWishlist(itemId));
    // remove item from redux
    dispatch(removeBagItem(itemId));
    dispatch(showNotification("item is moved to wishlist.", "info"));
  } catch (error) {
    dispatch(showNotification(error.message, "error"));
  }
};

export const handleRemoveBagItemClick = async (
  currentUserId,
  itemId,
  dispatch
) => {
  try {
    const [, error] = await deleteItemFromUserBag(currentUserId, itemId);
    if (error) throw new Error(error);
    dispatch(removeItemFromBag(itemId));
    dispatch(removeBagItem(itemId));
    dispatch(showNotification("item is removed from bag.", "info"));
  } catch (error) {
    dispatch(showNotification(error.message, "error"));
  }
};
