import { createSelector } from "reselect";
import { getCurrentItemsForPagination } from "utils/redux.utils";

const selectItemsState = (state) => state.admin.items;

export const selectItems = createSelector(
  [selectItemsState],
  (item) => item.items
);

export const selectIsOperationRunning = createSelector(
  [selectItemsState],
  (items) => items.isOperationRunning
);

export const selectAddItemDialog = createSelector(
  [selectItemsState],
  (item) => item.addItemDialog
);

export const selectShowItemDialog = createSelector(
  [selectItemsState],
  (item) => item.showItemDialog
);

export const selectItemForOperation = createSelector(
  [selectItemsState, selectItems],
  (item, items) => {
    let seletedItem = null;
    if (item && item.itemForOperation) {
      const itemdId = item.itemForOperation;
      const itemData = items[itemdId];
      if (itemData) seletedItem = { id: itemdId, ...itemData };
    }
    return seletedItem;
  }
);

export const selectBrandsOptionsForItem = createSelector(
  [selectItemsState],
  (item) => item.brandsOptions
);

export const selectCollectionsOptionsForItem = createSelector(
  [selectItemsState],
  (item) => item.collectionsOptions
);

export const selectDeleteItemDialog = createSelector(
  [selectItemsState],
  (item) => item.deleteItemDialog
);

export const selectUpdateItemDialog = createSelector(
  [selectItemsState],
  (item) => item.updateItemDialog
);

export const selectDeleteItemImageDialog = createSelector(
  [selectItemsState],
  (item) => item.deleteItemImageDialog
);

export const selectItemImageForOperation = createSelector(
  [selectItemsState],
  (item) => item.itemImageForOperation
);

export const selectUpdateItemPanel = createSelector(
  [selectItemsState],
  (item) => item.updateItemPanel
);

export const selectIsItemsLoading = createSelector(
  [selectItemsState],
  (items) => items.isItemsLoading
);

export const selectFirstItemDoc = createSelector(
  [selectItemsState],
  (items) => items.firstItemDoc
);

export const selectLastItemDoc = createSelector(
  [selectItemsState],
  (items) => items.lastItemDoc
);

export const selectCurrentItemsPage = createSelector(
  [selectItemsState],
  (items) => items.currentPage
);

export const selectItemsIds = createSelector([selectItems], (items) =>
  items ? Object.keys(items) : []
);

export const selectItemsPerPage = createSelector(
  [selectItemsState],
  (items) => items.ITEMS_PER_PAEG
);

export const selectNoOfItemsPages = createSelector(
  [selectItemsIds, selectItemsPerPage],
  (itemsIds, noOfItemsPerPage) => Math.ceil(itemsIds.length / noOfItemsPerPage)
);

export const selectCurrentItemsIds = createSelector(
  [selectCurrentItemsPage, selectItemsPerPage, selectItemsIds],
  (currentPage, itemsPerPage, itemsIds) =>
    getCurrentItemsForPagination(currentPage, itemsPerPage, itemsIds)
);

export const selectCurrentItems = createSelector(
  [selectCurrentItemsIds, selectItems],
  (itemsIds, items) =>
    itemsIds.reduce(
      (currentItems, itemId) => ({ ...currentItems, [itemId]: items[itemId] }),
      {}
    )
);
