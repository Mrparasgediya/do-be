import ordersActionsTypes from "./order.types";
import { updateOrderInfo } from "./orders.utils";

const INITIAL_STATE = {
  ORDERS_PER_PAGE: 5,
  orders: {},
  currentPage: 0,
  lastOrderDoc: undefined,
  isRefreshingOrdes: false,
  isLoading: false,
  showOrderDialog: false,
  orderForOperation: undefined,
};
const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ordersActionsTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case ordersActionsTypes.ADD_ORDERS:
      return {
        ...state,
        orders: { ...state.orders, ...action.payload },
      };
    case ordersActionsTypes.SET_LAST_ORDER_DOC:
      return {
        ...state,
        lastOrderDoc: action.payload,
      };

    case ordersActionsTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case ordersActionsTypes.SET_REFRESH_ORDERS:
      const otherDataToUpdate = {};
      if (action.payload) {
        otherDataToUpdate.orders = {};
        otherDataToUpdate.currentPage = 0;
        otherDataToUpdate.lastOrderDoc = undefined;
      }
      return {
        ...state,
        isRefreshingOrdes: action.payload,
        ...otherDataToUpdate,
      };

    case ordersActionsTypes.CANCEL_ORDER:
      return {
        ...state,
        orders: { ...updateOrderInfo(state.orders, action.payload) },
      };

    case ordersActionsTypes.FULFILL_ORDER:
      return {
        ...state,
        orders: { ...updateOrderInfo(state.orders, action.payload) },
      };

    case ordersActionsTypes.UPDATE_ORDER_INFO:
      return {
        ...state,
        orders: { ...updateOrderInfo(state.orders, action.payload) },
      };

    case ordersActionsTypes.TOGGLE_IS_ORDERS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case ordersActionsTypes.TOGGLE_SHOW_ORDER_DIALOG:
      return {
        ...state,
        showOrderDialog: !state.showOrderDialog,
      };
    case ordersActionsTypes.SET_ORDER_FOR_OPERATION:
      return {
        ...state,
        orderForOperation: action.payload,
      };

    case ordersActionsTypes.REPLACE_ORDER:
      return {
        ...state,
        orders: { ...updateOrderInfo(state.orders, action.payload) },
      };

    default:
      return state;
  }
};

export default ordersReducer;
