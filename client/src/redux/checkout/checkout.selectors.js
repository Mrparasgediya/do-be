import { createSelector } from "reselect";
import { calculateItemPriceByQty } from "utils/redux.utils";

const selectCheckoutState = (state) => state.checkout;

export const selectCheckoutCartItems = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.cartItems
);

export const selectCheckedCheckoutSteps = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.checkedSteps || []
);

export const selectCheckoutSteps = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.CHECKOUT_STEPS
);

export const selectCurrentCheckoutStep = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.currentStep
);
export const selectNextCheckoutStep = createSelector(
  [selectCheckoutSteps, selectCurrentCheckoutStep],
  (steps, currentStep) => {
    const nextStepIdx = steps.indexOf(currentStep) + 1;
    return steps[nextStepIdx];
  }
);

export const selectContactDetails = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.contactDetails
);

export const selectShippingAddress = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.shippingAddress
);

export const selectCurrentPaymentOption = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.currentPaymentOption
);

export const selectIsPaymentLoading = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.isPaymentLoading
);

export const selectPaymentDetails = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.paymentDetails
);

export const selectOrderInfo = createSelector(
  [
    selectCheckoutCartItems,
    selectContactDetails,
    selectShippingAddress,
    selectPaymentDetails,
  ],
  (cartItems, contactDetails, shippingAddress, paymentDetails) => ({
    items: cartItems,
    status: "pending",
    contactDetails,
    shippingAddress,
    paymentDetails,
  })
);

export const selectTotalOrderAmount = createSelector(
  [selectCheckoutCartItems],
  (cartItems) => calculateItemPriceByQty(cartItems).finalMRP
);

export const selectCheckoutInfoForOrder = createSelector(
  [
    selectCheckoutCartItems,
    selectContactDetails,
    selectShippingAddress,
    selectPaymentDetails,
  ],
  (cartItems, contactDetails, shippingAddress, paymentDetails) => {
    const items = Object.keys(cartItems).reduce((items, currItemId) => {
      const {
        brand,
        collection,
        discountRate,
        selectedQty,
        selectedSize,
        name,
        oldPrice,
        totalDiscountRate,
      } = cartItems[currItemId];
      return {
        ...items,
        [currItemId]: {
          brand,
          collection,
          price: oldPrice,
          discountRate,
          quantity: selectedQty,
          size: selectedSize,
          name,
          totalDiscountRate,
        },
      };
    }, {});
    return {
      status: "pending",
      items,
      contactDetails,
      shippingAddress,
      paymentDetails,
    };
  }
);

export const selectIsOrderPlacedSuccessfully = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.isOrderPlacedSuccessfully
);

export const selectIsPaymentSuccefull = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.isPaymentSuccessfull
);

export const selectIsOrderPlacing = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.isOrderPlacing
);
