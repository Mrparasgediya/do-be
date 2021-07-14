import { createSelector } from "reselect";
import { getFirstWishlistItemImage } from "./wishlist.utils";

const selectWishlistState = (state) => state.user.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlistState],
  (wishlist) => wishlist.items
);

export const selectWishlistItemsIds = createSelector(
  [selectWishlistItems],
  (wishlistItems) => (wishlistItems ? Object.keys(wishlistItems) : [])
);

export const selectIsWishlistItemsLoading = createSelector(
  [selectWishlistState],
  (wishlist) => wishlist.isLoading
);

export const selectWishlistItemsToDisplay = createSelector(
  [selectWishlistItems, selectWishlistItemsIds],
  (items, itemsIds) =>
    itemsIds.reduce(
      (allItems, currItemId) => ({
        ...allItems,
        [currItemId]: {
          ...items[currItemId],
          firstImageId: getFirstWishlistItemImage(items[currItemId].images),
        },
      }),
      {}
    )
);
