import { createSelector } from "reselect";

const selectOrdersState = (state) => state.admin.orders;

export const selectOrders = createSelector(
  [selectOrdersState],
  (orders) => orders.orders
);

export const selectOrderPerPage = createSelector(
  [selectOrdersState],
  (orders) => orders.ORDERS_PER_PAGE
);

export const selectOrdersIdsArr = createSelector([selectOrders], (orders) =>
  Object.keys(orders)
);

export const selectNoOfPages = createSelector(
  [selectOrdersIdsArr, selectOrderPerPage],
  (ordersIdsArr, ordersPerPage) =>
    Math.ceil(ordersIdsArr.length / ordersPerPage)
);

export const selectCurrentPage = createSelector(
  [selectOrdersState],
  (orders) => orders.currentPage
);

export const selectLastOrderDoc = createSelector(
  [selectOrdersState],
  (orders) => orders.lastOrderDoc
);

export const selectCurrentOrdersIds = createSelector(
  [selectCurrentPage, selectOrderPerPage, selectOrdersIdsArr],
  (currentPage, ordersPerPage, orderIds) => {
    const firstDocIdx = (currentPage - 1) * ordersPerPage;
    const lastDocIdx = firstDocIdx + ordersPerPage;
    return orderIds.slice(firstDocIdx, lastDocIdx);
  }
);

export const selectCurrentOrders = createSelector(
  [selectOrders, selectCurrentOrdersIds],
  (orders, currentIds) => {
    return currentIds.reduce(
      (currentOrders, orderId) => ({
        ...currentOrders,
        [orderId]: orders[orderId],
      }),
      {}
    );
  }
);

export const selectIsRefreshingOrders = createSelector(
  [selectOrdersState],
  (orders) => orders.isRefreshingOrdes
);

export const selectIsOrdersLoading = createSelector(
  [selectOrdersState],
  (orders) => orders.isLoading
);

export const selectOrderForOperation = createSelector(
  [selectOrdersState],
  (orders) =>
    (orders.orderForOperation && {
      id: orders.orderForOperation,
      ...orders.orders[orders.orderForOperation],
    }) ||
    undefined
);

export const selectShowOrderDialog = createSelector(
  [selectOrdersState],
  (orders) => orders.showOrderDialog
);
