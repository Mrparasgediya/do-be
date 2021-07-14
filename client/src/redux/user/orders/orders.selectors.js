import { createSelector } from "reselect";
import { sortOrdersByStatus } from "./orders.utils";

const selectOrdersState = (state) => state.user.orders;

export const selectOrders = createSelector([selectOrdersState], (orders) => ({
  ...sortOrdersByStatus(orders.orders, "pending"),
  ...sortOrdersByStatus(orders.orders, "fulfilled"),
  ...sortOrdersByStatus(orders.orders, "cancelled"),
}));

export const selectOrderToCancel = createSelector(
  [selectOrdersState],
  ({ orders, orderToCancel }) =>
    (orderToCancel && {
      id: orderToCancel,
      ...orders[orderToCancel],
    }) ||
    {}
);

export const selectCancelOrderDialog = createSelector(
  [selectOrdersState],
  ({ cancelOrderDialog }) => cancelOrderDialog
);

export const selectUnSubscribeUserOrdersMethod = createSelector(
  [selectOrdersState],
  (orders) => orders.unSubscribeUserOrdersMethod
);
