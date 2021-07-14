import ordersActionsTypes from "./orders.types";
import { cancelOrderFromOrders } from "./orders.utils";

const INITIAL_STATE = {
  orders: {},
  orderToCancel: undefined,
  cancelOrderDialog: false,
  unSubscribeUserOrdersMethod: undefined,
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ordersActionsTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case ordersActionsTypes.SET_ORDER_TO_CANCEL:
      return {
        ...state,
        orderToCancel: action.payload,
      };
    case ordersActionsTypes.TOGGLE_CANCEL_ORDER_DIALOG:
      return {
        ...state,
        cancelOrderDialog: !state.cancelOrderDialog,
      };
    case ordersActionsTypes.CANCEL_ORDER:
      return {
        ...state,
        orders: { ...cancelOrderFromOrders(state.orders, action.payload) },
      };
    case ordersActionsTypes.ADD_ORDER:
      return {
        ...state,
        orders: { ...action.payload, ...state.orders },
      };
    case ordersActionsTypes.UPDATE_ORDER_INFO:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.payload.orderId]: {
            ...state.orders[action.payload.orderId],
            ...action.payload.dataToUpdate,
          },
        },
      };
    case ordersActionsTypes.ADD_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          ...action.payload,
        },
      };
    case ordersActionsTypes.SET_UNSUBSCRIBE_USER_ORDERS_METHOD:
      return {
        ...state,
        unSubscribeUserOrdersMethod: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
