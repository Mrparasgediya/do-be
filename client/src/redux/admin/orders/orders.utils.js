export const updateOrderInfo = (orders, { orderId, dataToUpdate }) => {
  const newOrders = orders;
  newOrders[orderId] = {
    ...orders[orderId],
    ...dataToUpdate,
  };
  return newOrders;
};
