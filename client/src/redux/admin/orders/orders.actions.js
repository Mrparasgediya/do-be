import ordersActionsTypes from "./order.types";

export const addOrders = (newOrders) => ({
  type: ordersActionsTypes.ADD_ORDERS,
  payload: newOrders,
});

export const setCurrentPage = (currentPage) => ({
  type: ordersActionsTypes.SET_CURRENT_PAGE,
  payload: currentPage,
});

export const setLastOrderDoc = (lastOrderDoc) => ({
  type: ordersActionsTypes.SET_LAST_ORDER_DOC,
  payload: lastOrderDoc,
});

export const setOrders = (docs) => ({
  type: ordersActionsTypes.SET_ORDERS,
  payload: docs,
});

export const fulfillOrder = (orderId, dataToUpdate) => ({
  type: ordersActionsTypes.FULFILL_ORDER,
  payload: { orderId, dataToUpdate },
});

export const cancelOrder = (orderId, dataToUpdate) => ({
  type: ordersActionsTypes.CANCEL_ORDER,
  payload: { orderId, dataToUpdate },
});

export const setRefreshOrders = (isRefreshing) => ({
  type: ordersActionsTypes.SET_REFRESH_ORDERS,
  payload: isRefreshing,
});

export const updateOrderInfo = (orderId, dataToUpdate) => ({
  type: ordersActionsTypes.UPDATE_ORDER_INFO,
  payload: { orderId, dataToUpdate },
});

export const toggleIsOrdersLoading = () => ({
  type: ordersActionsTypes.TOGGLE_IS_ORDERS_LOADING,
});

export const toggleShowOrderDialog = () => ({
  type: ordersActionsTypes.TOGGLE_SHOW_ORDER_DIALOG,
});

export const setOrderForOperation = (orderId) => ({
  type: ordersActionsTypes.SET_ORDER_FOR_OPERATION,
  payload: orderId,
});

export const replaceOrder = (orderId, dataToUpdate) => ({
  type: ordersActionsTypes.REPLACE_ORDER,
  payload: { orderId, dataToUpdate },
});
