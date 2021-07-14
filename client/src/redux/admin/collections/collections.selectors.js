import { createSelector } from "reselect";
import { getCurrentItemsForPagination } from "utils/redux.utils";

export const selectCollectionsState = (state) => state.admin.collections;

export const selectCollections = createSelector(
  [selectCollectionsState],
  (collection) => collection.collections
);

export const selectIsOperationRunning = createSelector(
  [selectCollectionsState],
  (collection) => collection.isOperationRunning
);

export const selectAddCollectionDialog = createSelector(
  [selectCollectionsState],
  (collection) => collection.addCollectionDialog
);

export const selectCollectionForOperation = createSelector(
  [selectCollectionsState, selectCollections],
  (collection, collections) => {
    const collectionId = collection ? collection.collectionForOperation : null;
    const selectedCollection = collectionId && collections[collectionId];
    return selectedCollection
      ? { id: collectionId, ...selectedCollection }
      : null;
  }
);

export const selectUpdateCollectionDialog = createSelector(
  [selectCollectionsState],
  (collection) => collection.updateCollectionDialog
);

export const selectDeleteCollectionDialog = createSelector(
  [selectCollectionsState],
  (collection) => collection.deleteCollectionDialog
);

export const selectIsCollectionLoading = createSelector(
  [selectCollectionsState],
  (collection) => collection.isCollectionLoading
);

export const selectLastCollectionDoc = createSelector(
  [selectCollectionsState],
  (collection) => collection.lastCollectionDoc
);

export const selectCurrentCollectionPage = createSelector(
  [selectCollectionsState],
  (collection) => collection.currentPage
);

export const selectCollectionsPerPage = createSelector(
  [selectCollectionsState],
  (collection) => collection.COLLECTIONS_PER_PAGE
);

export const selectCollectionsIds = createSelector(
  [selectCollections],
  (collections) => (collections ? Object.keys(collections) : [])
);

export const selectCollectionsNoOfPages = createSelector(
  [selectCollectionsIds, selectCollectionsPerPage],
  (collectionsIds, collectionsPerPage) =>
    Math.ceil(collectionsIds.length / collectionsPerPage)
);

export const selectCurrentCollectionsIds = createSelector(
  [selectCurrentCollectionPage, selectCollectionsPerPage, selectCollectionsIds],
  (currentPage, collectionsPerPage, collectionIds) =>
    getCurrentItemsForPagination(currentPage, collectionsPerPage, collectionIds)
);

export const selectCurrentCollections = createSelector(
  [selectCollections, selectCurrentCollectionsIds],
  (collections, collectionsIds) =>
    collectionsIds.reduce(
      (currentColletions, collectionId) => ({
        ...currentColletions,
        [collectionId]: collections[collectionId],
      }),
      {}
    )
);
