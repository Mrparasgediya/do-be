import { createSelector } from "reselect";
import { calculateItemPriceByQty } from "utils/redux.utils";
import { selectCurrentUser } from "../user.selectors";
import { getItemPriceInfo } from "./bag.utils";

const selectBagState = (state) => state.user.bag;
export const selectBagItems = createSelector(
  [selectBagState],
  (bag) => bag.items
);

export const selectBagItemsIds = createSelector([selectBagItems], (bagItems) =>
  bagItems ? Object.keys(bagItems) : []
);

export const selectBagItemsToDisplay = createSelector(
  [selectBagItems, selectBagItemsIds],
  (bagItems, bagItemsIds) =>
    bagItemsIds.reduce((allItems, itemId) => {
      const item = bagItems[itemId];
      if (!item) return { ...allItems };
      const { newPrice, totalDiscountRate } = getItemPriceInfo(item);
      const { price, ...otherProps } = item;
      const firstImageId = item.images
        ? Object.keys(item.images)[0]
        : undefined;
      return {
        ...allItems,
        [itemId]: {
          ...otherProps,
          oldPrice: price,
          newPrice,
          totalDiscountRate,
          firstImageId,
        },
      };
    }, {})
);

export const selectTotalPriceDetails = createSelector(
  [selectBagItemsToDisplay],
  (bagItems) => {
    const selectedBagItems = Object.keys(bagItems)
      .filter(
        (bagItemId) =>
          bagItems[bagItemId]["selectedSize"] &&
          bagItems[bagItemId]["selectedQty"]
      )
      .reduce(
        (items, itemId) => ({ ...items, [itemId]: { ...bagItems[itemId] } }),
        {}
      );

    return calculateItemPriceByQty(selectedBagItems);
  }
);

export const selectIsValidOrder = createSelector(
  [selectBagItemsToDisplay, selectTotalPriceDetails, selectCurrentUser],
  (items, priceDetails, currentUser) => {
    let isValidOrder = true;
    const bagItemsIds = Object.keys(items);

    if (bagItemsIds.length === 0) return false;
    if (!currentUser.emailVerified || !currentUser.phoneNumber) return false;

    for (let bagItemId of bagItemsIds) {
      if (
        !items[bagItemId]["selectedSize"] &&
        !items[bagItemId]["selectedQty"]
      ) {
        isValidOrder = false;
        break;
      }
    }

    return isValidOrder && !isNaN(priceDetails.finalMRP);
  }
);
