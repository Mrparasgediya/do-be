export const toggleItemFromArr = (items, itemForOperation) => {
  const newItems = items;
  const hasItem = items.indexOf(itemForOperation) !== -1;

  if (hasItem) {
    newItems.splice(newItems.indexOf(itemForOperation), 1);
  } else {
    newItems.push(itemForOperation);
  }

  return newItems;
};

export const getSortedArrByName = (arr) =>
  arr.sort((a, b) => {
    const name1 = a.name;
    const name2 = b.name;

    return name1 > name2 ? 1 : -1 || 0;
  });

export const getSelectedItemsFromArrayByIds = (arr, ids) => {
  return arr.filter((item) => ids.includes(item.id));
};

export const getSortedDeselectedItemsFromArrayBySelectedIds = (
  arr,
  selectedIds
) => {
  return getSortedArrByName(
    arr.filter((item) => !selectedIds.includes(item.id))
  );
};
