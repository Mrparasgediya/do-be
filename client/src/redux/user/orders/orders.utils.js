export const cancelOrderFromOrders = (
  orders,
  { orderId, reasonToCancel, isMoneyRefunded }
) => {
  const foundOrder = orders[orderId];
  orders[orderId] = {
    ...foundOrder,
    reasonToCancel,
    status: "cancelled",
  };
  if (foundOrder.paymentDetails.mode === "card") {
    orders[orderId]["paymentDetails"]["isMoneyRefunded"] = isMoneyRefunded;
  }
  return orders;
};

export const sortOrdersByStatus = (orders, status) => {
  const filteredOrdersIds = Object.keys(orders).filter(
    (orderId) => orders[orderId].status === status
  );
  const sortedOrderIds = filteredOrdersIds.sort(
    (firstOrderId, secondOrderId) => {
      if (orders[firstOrderId].createdAt < orders[secondOrderId].createdAt)
        return 1;

      if (orders[firstOrderId].createdAt > orders[secondOrderId].createdAt)
        return -1;
      return 0;
    }
  );
  return sortedOrderIds.reduce(
    (allOrders, currentOrderId) => ({
      ...allOrders,
      [currentOrderId]: orders[currentOrderId],
    }),
    {}
  );
};
