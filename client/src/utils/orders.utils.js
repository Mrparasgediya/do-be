export const getOrderDetailsForUpdate = (order) => {
  delete order.items;
  delete order.contactDetails;
  delete order.shippingAddress;
  delete order.createdAt;
  delete order.purchasedBy;
  return order;
};
