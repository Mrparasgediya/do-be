import checkoutActionsTypes from "./checkout.types";

export const setCheckoutCartItems = (cartItems) => ({
  type: checkoutActionsTypes.SET_CHECKOUT_CART_ITEMS,
  payload: cartItems,
});

export const checkCheckoutStep = (checkoutStep) => ({
  type: checkoutActionsTypes.CHECK_CHECKOUT_STEP,
  payload: checkoutStep,
});

export const setCurrentCheckoutStep = (currentCheckoutStep) => ({
  type: checkoutActionsTypes.SET_CURRENT_CHECKOUT_STEP,
  payload: currentCheckoutStep,
});

export const removeCheckoutCartItem = (itemId) => ({
  type: checkoutActionsTypes.REMOVE_CHECKOUT_CART_ITEM,
  payload: itemId,
});

export const setShippingAddress = (AddressInfo) => ({
  type: checkoutActionsTypes.SET_SHIPPING_ADDRESS,
  payload: AddressInfo,
});

export const setContactDetails = (contactDetails) => ({
  type: checkoutActionsTypes.SET_CONTACT_DETAILS,
  payload: contactDetails,
});

export const setCheckoutToDefault = () => ({
  type: checkoutActionsTypes.SET_CHECKOUT_TO_DEFAULT,
});

export const setCheckoutPaymentDetails = (paymentDetails) => ({
  type: checkoutActionsTypes.SET_CHECKOUT_PAYMENT_DETAILS,
  payload: paymentDetails,
});

export const setCurrentPaymentOption = (paymentOption) => ({
  type: checkoutActionsTypes.SET_CURRENT_PAYMENT_OPTION,
  payload: paymentOption,
});

export const toggleIsPaymentLoading = () => ({
  type: checkoutActionsTypes.TOGGLE_IS_PAYMENT_LOADING,
});

export const setIsOrderPlacedSuccessfully = (isPlacedSuccessfully) => ({
  type: checkoutActionsTypes.IS_ORDER_PLACED_SUCCESSFULLY,
  payload: isPlacedSuccessfully,
});

export const setIsPaymentSuccessfull = (isPaymentSuccessfull) => ({
  type: checkoutActionsTypes.IS_PAYMENT_SUCCESSFULL,
  payload: isPaymentSuccessfull,
});

export const toggleIsOrderPlacing = () => ({
  type: checkoutActionsTypes.TOGGLE_IS_ORDER_PLACING,
});
