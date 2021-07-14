import ordersActionsTypes from "./orders.types";

export const setOrders = (orders) => ({
  type: ordersActionsTypes.SET_ORDERS,
  payload: orders,
});

export const setOrderToCancel = (orderId) => ({
  type: ordersActionsTypes.SET_ORDER_TO_CANCEL,
  payload: orderId,
});

export const toggleCancelOrderDialog = () => ({
  type: ordersActionsTypes.TOGGLE_CANCEL_ORDER_DIALOG,
});

export const cancelOrder = (orderId, reasonToCancel, isMoneyRefunded) => ({
  type: ordersActionsTypes.CANCEL_ORDER,
  payload: { orderId, reasonToCancel, isMoneyRefunded },
});

export const addOrder = (order) => ({
  type: ordersActionsTypes.ADD_ORDER,
  payload: order,
});

export const updateOrderInfo = (orderId, dataToUpdate) => ({
  type: ordersActionsTypes.UPDATE_ORDER_INFO,
  payload: { orderId, dataToUpdate },
});

export const addOrders = (orders) => ({
  type: ordersActionsTypes.ADD_ORDERS,
  payload: orders,
});

export const setUnSubscribeUserOrdersMethod = (method) => ({
  type: ordersActionsTypes.SET_UNSUBSCRIBE_USER_ORDERS_METHOD,
  payload: method,
});
