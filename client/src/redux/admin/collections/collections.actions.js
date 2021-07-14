import collectionsActionTypes from "./collections.types";

export const setCollections = (collections) => ({
  type: collectionsActionTypes.SET_ADMIN_COLLECTIONS,
  payload: collections,
});

export const toggleAddCollectionDialog = () => ({
  type: collectionsActionTypes.TOGGLE_ADD_COLLECTION_DIALOG,
});

export const addCollection = (collection) => ({
  type: collectionsActionTypes.ADD_COLLECTION,
  payload: collection,
});

export const setCollectionForOperation = (collectionId) => ({
  type: collectionsActionTypes.SET_COLLECTION_FOR_OPERATION,
  payload: collectionId,
});

export const toggleUpdateCollectionDialog = () => ({
  type: collectionsActionTypes.TOGGLE_UPDATE_COLLECTION_DIALOG,
});

export const updateCollection = (collectionId, dataToUpdate) => ({
  type: collectionsActionTypes.UPDATE_COLLECTION,
  payload: { collectionId, dataToUpdate },
});

export const toggleDeleteCollectionDialog = () => ({
  type: collectionsActionTypes.TOGGLE_DELETE_COLLECTION_DIALOG,
});

export const deleteCollection = (collectionId) => ({
  type: collectionsActionTypes.DELETE_COLLECTION,
  payload: collectionId,
});

export const toggleIsOperationRunning = () => ({
  type: collectionsActionTypes.TOGGLE_IS_COLLECTIONS_OPERATION_RUNNING,
});

export const setLastCollectionDoc = (lastCollectionDoc) => ({
  type: collectionsActionTypes.SET_LAST_ADMIN_COLLECTION_DOC,
  payload: lastCollectionDoc,
});

export const toggleIsCollectionLoading = () => ({
  type: collectionsActionTypes.TOGGLE_IS_COLLECTIONS_LOADING,
});

export const setCurrentCollectionsPage = (currentPage) => ({
  type: collectionsActionTypes.SET_COLLECTIONS_CURRENT_PAGE,
  payload: currentPage,
});

export const addAdminCollections = (collections) => ({
  type: collectionsActionTypes.ADD_ADMIN_COLLECTIONS,
  payload: collections,
});
