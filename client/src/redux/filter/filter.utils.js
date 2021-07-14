export const getSortedArrByName = (arr) =>
  arr.sort((a, b) => {
    const name1 = a.name;
    const name2 = b.name;

    return name1 > name2 ? 1 : -1 || 0;
  });

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

export const applyFilterWithValidation = (
  filter,
  allBrands,
  allCollections
) => {
  let { brands, collections, group } = filter;
  if (group === "all") return filter;

  brands = brands.filter((brandId) => {
    const foundBrand = allBrands.find((brand) => brand.id === brandId);
    return foundBrand.groups.includes(group);
  });
  collections = collections.filter((collectionId) => {
    const foundCollection = allCollections.find(
      (collection) => collection.id === collectionId
    );
    return foundCollection.groups.includes(group);
  });
  return { group, collections, brands };
};
