export const addItemToBag = (allItems, newItem) => {
  const items = allItems;
  return { ...newItem, ...items };
};

export const removeItemFromBag = (allItems, itemId) => {
  const newItems = allItems;
  delete newItems[itemId];
  return newItems;
};

export const updateItemSizeAndQty = (allItems, { itemId, size, qty }) => {
  allItems[itemId]["selectedSize"] = size;
  allItems[itemId]["selectedQty"] = qty;
  return allItems;
};
export const getItemPriceInfo = (item) => {
  const { price, brand, collection, discountRate } = item;

  const oldPrice = price;
  const totalDiscountRate =
    discountRate + brand.discountRate + collection.discountRate;
  const totalDiscountPrice = Math.ceil((price * totalDiscountRate) / 100);
  return {
    newPrice: oldPrice - totalDiscountPrice,
    totalDiscountRate,
  };
};
