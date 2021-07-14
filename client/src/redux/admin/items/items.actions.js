import itemsActionsTypes from "./items.types";

export const setItems = (items) => ({
  type: itemsActionsTypes.SET_ITEMS,
  payload: items,
});

export const toggleIsOperationRunning = () => ({
  type: itemsActionsTypes.TOGGLE_IS_ITEMS_OPERATION_RUNNING,
});

export const toggleAddItemDialog = () => ({
  type: itemsActionsTypes.TOGGLE_ADD_ITEM_DIALOG,
});
export const addItem = (item) => ({
  type: itemsActionsTypes.ADD_ITEM,
  payload: item,
});

export const toggleShowItemDialog = () => ({
  type: itemsActionsTypes.TOGGLE_SHOW_ITEM_DIALOG,
});

export const setItemForOperation = (item) => ({
  type: itemsActionsTypes.SET_ITEM_FOR_OPERATION,
  payload: item,
});

export const setBrandsOptions = (brandsOptions) => ({
  type: itemsActionsTypes.SET_BRANDS_OPTIONS,
  payload: brandsOptions,
});
export const setCollectionsOptions = (collectionsOptions) => ({
  type: itemsActionsTypes.SET_COLLECTION_OPTIONS,
  payload: collectionsOptions,
});

export const toggleDeleteItemDialog = () => ({
  type: itemsActionsTypes.TOGGLE_DELETE_ITEM_DIALOG,
});

export const toggleUpdateItemDialog = () => ({
  type: itemsActionsTypes.TOGGLE_UPDATE_ITEM_DIALOG,
});

export const toggleDeleteItemImageDialog = () => ({
  type: itemsActionsTypes.TOGGLE_DELETE_ITEM_IMAGE_DIALOG,
});

export const setItemImageForOperation = (image) => ({
  type: itemsActionsTypes.SET_ITEM_IMAGE_FOR_OPERATION,
  payload: image,
});

export const setUpdateItemPanel = (panelName) => ({
  type: itemsActionsTypes.SET_UPDATE_ITEM_PANEL,
  payload: panelName,
});

export const deleteItem = (itemId) => ({
  type: itemsActionsTypes.DELETE_ITEM,
  payload: itemId,
});

export const updateItem = (itemId, dataToUpdate) => ({
  type: itemsActionsTypes.UPDATE_ITEM,
  payload: { itemId, dataToUpdate },
});

export const addItemImage = (itemId, imageId, imageData) => ({
  type: itemsActionsTypes.ADD_ITEM_IMAGE,
  payload: { itemId, imageId, imageData },
});

export const deleteItemImage = (itemId, imageId) => ({
  type: itemsActionsTypes.DELETE_ITEM_IMAGE,
  payload: { itemId, imageId },
});

export const updateItemsCollection = (collectionId, dataToUpdate) => ({
  type: itemsActionsTypes.UPDATE_ITEMS_COLLECTION,
  payload: { searchId: collectionId, dataToUpdate },
});

export const updateItemsBrand = (brandId, dataToUpdate) => ({
  type: itemsActionsTypes.UPDATE_ITEMS_BRAND,
  payload: { searchId: brandId, dataToUpdate },
});

export const deleteCollectionItems = (collectionId) => ({
  type: itemsActionsTypes.DELETE_COLLECTION_ITEMS,
  payload: collectionId,
});

export const deleteBrandItems = (brandId) => ({
  type: itemsActionsTypes.DELETE_BRAND_ITEMS,
  payload: brandId,
});

export const toggleIsItemsLoading = () => ({
  type: itemsActionsTypes.TOGGLE_IS_ITEMS_LOADING,
});

export const setFirstItemDoc = (firstItemDoc) => ({
  type: itemsActionsTypes.SET_FIRST_ITEM_DOC,
  payload: firstItemDoc,
});

export const setLastItemDoc = (lastItemDoc) => ({
  type: itemsActionsTypes.SET_LAST_ITEM_DOC,
  payload: lastItemDoc,
});

export const addItems = (items) => ({
  type: itemsActionsTypes.ADD_ITEMS,
  payload: items,
});

export const setCurrentItemsPage = (currentPage) => ({
  type: itemsActionsTypes.SET_CURRENT_ITEMS_PAGE,
  payload: currentPage,
});
