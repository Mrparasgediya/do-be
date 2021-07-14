import checkoutActionsTypes from "./checkout.types";
import { addStepToCheckoutSteps, removeCartItem } from "./checkout.utils";

const INITIAL_STATE = {
  checkedSteps: [],
  cartItems: {},
  currentStep: null,
  shippingAddress: {},
  contactDetails: {},
  CHECKOUT_STEPS: ["items", "address", "payment", "orderStatus"],
  paymentDetails: {},
  currentPaymentOption: "cod",
  isPaymentLoading: false,
  isOrderPlacedSuccessfully: false,
  isPaymentSuccessfull: false,
  isOrderPlacing: false,
};

const checkoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case checkoutActionsTypes.SET_CHECKOUT_TO_DEFAULT:
      return { ...INITIAL_STATE, checkedSteps: [] };

    case checkoutActionsTypes.SET_CHECKOUT_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };

    case checkoutActionsTypes.REMOVE_CHECKOUT_CART_ITEM: {
      return {
        ...state,
        cartItems: {
          ...removeCartItem(state.cartItems, action.payload),
        },
      };
    }

    case checkoutActionsTypes.CHECK_CHECKOUT_STEP:
      return {
        ...state,
        checkedSteps: [
          ...addStepToCheckoutSteps(state.checkedSteps, action.payload),
        ],
      };

    case checkoutActionsTypes.SET_CURRENT_CHECKOUT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };

    case checkoutActionsTypes.SET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case checkoutActionsTypes.SET_CONTACT_DETAILS:
      return {
        ...state,
        contactDetails: action.payload,
      };

    case checkoutActionsTypes.SET_CHECKOUT_PAYMENT_DETAILS:
      return {
        ...state,
        paymentDetails: { ...action.payload },
      };

    case checkoutActionsTypes.SET_CURRENT_PAYMENT_OPTION:
      return {
        ...state,
        currentPaymentOption: action.payload,
      };

    case checkoutActionsTypes.TOGGLE_IS_PAYMENT_LOADING:
      return {
        ...state,
        isPaymentLoading: !state.isPaymentLoading,
      };

    case checkoutActionsTypes.IS_ORDER_PLACED_SUCCESSFULLY:
      return {
        ...state,
        isOrderPlacedSuccessfully: action.payload,
      };

    case checkoutActionsTypes.IS_PAYMENT_SUCCESSFULL:
      return {
        ...state,
        isPaymentSuccessfull: action.payload,
      };

    case checkoutActionsTypes.TOGGLE_IS_ORDER_PLACING:
      return { ...state, isOrderPlacing: !state.isOrderPlacing };

    default:
      return state;
  }
};

export default checkoutReducer;
