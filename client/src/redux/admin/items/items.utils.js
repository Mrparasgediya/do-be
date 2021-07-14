export const updateItemsByKey = (
  allItems,
  updateKeyName,
  { searchId, dataToUpdate }
) => {
  return Object.keys(allItems).reduce((updatedItems, currentItemId) => {
    const item = allItems[currentItemId];
    if (item[updateKeyName].id === searchId) {
      return {
        ...updatedItems,
        [currentItemId]: {
          ...item,
          [updateKeyName]: {
            ...item[updateKeyName],
            ...dataToUpdate,
          },
        },
      };
    }
    return { ...updatedItems, [currentItemId]: item };
  }, {});
};

export const deleteItemsByKey = (items, searchId, deleteKeyName) => {
  let restItems;

  if (items) {
    restItems = Object.keys(items).reduce((allItems, currentItemId) => {
      const item = items[currentItemId];
      if (item[deleteKeyName].id !== searchId) {
        return {
          ...allItems,
          [currentItemId]: { ...item },
        };
      }
      return allItems;
    }, {});
  }

  return restItems;
};
