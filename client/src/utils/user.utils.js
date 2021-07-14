import { auth } from "firebase/firebase.utils";
import { setUnSubscribeUserOrdersMethod } from "redux/user/orders/orders.actions";
import { setUserWishlistItems } from "redux/user/wishlist/wishlist.actions";
import { setOrders } from "redux/user/orders/orders.actions";
import { setUserBagItems } from "redux/user/bag/bag.actions";

export const logoutUser = async (dispatch, unSubscribeUserOrdersMethod) => {
  try {
    if (unSubscribeUserOrdersMethod) {
      unSubscribeUserOrdersMethod();
      dispatch(setUnSubscribeUserOrdersMethod(undefined));
    }
    await auth.signOut();
    dispatch(setOrders({}));
    dispatch(setUserWishlistItems({}));
    dispatch(setUserBagItems({}));
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};
