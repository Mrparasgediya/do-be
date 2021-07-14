export const updateContactUsItems = (
  allItems,
  { contactUsId, dataToUpdate }
) => {
  const newItems = allItems;
  const itemToUpdate = newItems[contactUsId];
  newItems[contactUsId] = {
    ...itemToUpdate,
    ...dataToUpdate,
  };
  return newItems;
};
