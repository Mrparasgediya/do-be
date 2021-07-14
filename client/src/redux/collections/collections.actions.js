import collectionsActionTypes from "./collections.types";

export const setCollections = (collections) => ({
  type: collectionsActionTypes.SET_COLLECTIONS,
  payload: collections,
});

export const addCollections = (collections) => ({
  type: collectionsActionTypes.ADD_COLLECTIONS,
  payload: collections,
});

export const setLastCollectionDoc = (lastCollectionDoc) => ({
  type: collectionsActionTypes.SET_LAST_COLLECTION_DOC,
  payload: lastCollectionDoc,
});

export const toggleIsHomeCollectionsLoading = () => ({
  type: collectionsActionTypes.TOGGLE_IS_HOME_COLLECTIONS_LOADING,
});
