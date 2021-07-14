export const addItem = (allItems, newItem) => {
  const newItems = { ...newItem, ...allItems };
  return newItems;
};

export const removeItem = (allItems, itemId) => {
  const items = allItems;
  delete items[itemId];
  return items;
};

export const getFirstWishlistItemImage = (images) =>
  images ? Object.keys(images)[0] : undefined;
