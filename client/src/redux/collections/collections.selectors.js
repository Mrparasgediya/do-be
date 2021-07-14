import { createSelector } from "reselect";

const selectCollectionsState = (state) => state.collections;

export const selectCollections = createSelector(
  [selectCollectionsState],
  (collection) => collection.collections
);

export const selectLastCollectionDoc = createSelector(
  [selectCollectionsState],
  (collections) => collections.lastCollectionDoc
);

export const selectCollectionsIds = createSelector(
  [selectCollections],
  (collections) => (collections && Object.keys(collections)) || []
);

export const selectIsHomeCollectionLoading = createSelector(
  [selectCollectionsState],
  (collections) => collections.isLoading
);
