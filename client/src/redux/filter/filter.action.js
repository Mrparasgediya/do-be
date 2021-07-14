import filterActionTypes from "./filter.types";

export const setFilterItems = (items) => ({
  type: filterActionTypes.SET_FILTER_ITEMS,
  payload: items,
});

export const setLastFilterItemDoc = (lastItemDoc) => ({
  type: filterActionTypes.SET_LAST_FILTER_ITEM_DOC,
  payload: lastItemDoc,
});

export const setFirstFilterItemDoc = (firstItemDoc) => ({
  type: filterActionTypes.SET_FIRST_FILTER_ITEM_DOC,
  payload: firstItemDoc,
});

export const toggleIsFilterItemsLoading = () => ({
  type: filterActionTypes.TOGGLE_IS_FILTER_ITEMS_LOADING,
});

export const setAllBrandsForFilter = (brandsMap) => ({
  type: filterActionTypes.SET_ALL_BRANDS_FOR_FILTER,
  payload: brandsMap,
});

export const setAllCollectionsForFilter = (collectionsMap) => ({
  type: filterActionTypes.SET_ALL_COLLECTIONS_FOR_FILTER,
  payload: collectionsMap,
});

export const setSelectedGroupForFilter = (groupName) => ({
  type: filterActionTypes.SET_SELECTED_GROUP_FOR_FILTER,
  payload: groupName,
});

export const setFilterItemsDocs = (itemsDocsMap) => ({
  type: filterActionTypes.SET_FILTER_ITEMS_DOCS,
  payload: itemsDocsMap,
});

export const setCurrentFilterPage = (pageNo) => ({
  type: filterActionTypes.SET_CURRENT_FILTER_PAGE,
  payload: pageNo,
});

export const selectBrandForFilter = (brandId) => ({
  type: filterActionTypes.SELECT_BRAND_FOR_FILTER,
  payload: brandId,
});

export const selectCollectionForFilter = (collectionId) => ({
  type: filterActionTypes.SELECT_COLLECTION_FOR_FILTER,
  payload: collectionId,
});

export const setSelectedBrandsForFilter = (selectedBrandsMap) => ({
  type: filterActionTypes.SET_SELECTED_BRANDS_FOR_FILTER,
  payload: selectedBrandsMap,
});

export const setSelectedCollectionsFilter = (selectedCollectionsMap) => ({
  type: filterActionTypes.SET_SELECTED_COLLECTIONS_FOR_FILTER,
  payload: selectedCollectionsMap,
});

export const setCurrentFilter = ({ group, brands, collections }) => ({
  type: filterActionTypes.SET_CURRENT_FILTER,
  payload: { group, brands, collections },
});

export const addFilterItems = (itemsObj) => ({
  type: filterActionTypes.ADD_FILTER_ITEMS,
  payload: itemsObj,
});

export const setCurrentFilterItems = (itemsObj) => ({
  type: filterActionTypes.SET_CURRENT_FILTER_ITEMS,
  payload: itemsObj,
});

export const addFilterItemsDocs = (docsMap) => ({
  type: filterActionTypes.ADD_FILTER_ITEMS_DOCS,
  payload: docsMap,
});

export const toggleFilterPanel = () => ({
  type: filterActionTypes.TOGGLE_FILTER_PANEL,
});

export const selectGroupForFilter = (group) => ({
  type: filterActionTypes.SELECT_GROUP_FOR_FILTER,
  payload: group,
});
