import collectionsActionTypes from "./collections.types";

const INITIAL_STATE = {
  COLLECTIONS_PER_PAGE: 5,
  collections: {},
  addCollectionDialog: false,
  updateCollectionDialog: false,
  deleteCollectionDialog: false,
  isOperationRunning: false,
  collectionForOperation: null,
  isCollectionLoading: false,
  lastCollectionDoc: undefined,
  currentPage: 0,
};

const collectionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case collectionsActionTypes.SET_ADMIN_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };

    case collectionsActionTypes.ADD_ADMIN_COLLECTIONS:
      return {
        ...state,
        collections: { ...state.collections, ...action.payload },
      };

    case collectionsActionTypes.TOGGLE_IS_COLLECTIONS_OPERATION_RUNNING:
      return { ...state, isOperationRunning: !state.isOperationRunning };

    case collectionsActionTypes.TOGGLE_ADD_COLLECTION_DIALOG:
      return {
        ...state,
        addCollectionDialog: !state.addCollectionDialog,
      };

    case collectionsActionTypes.ADD_COLLECTION:
      return {
        ...state,
        collections: { ...action.payload, ...state.collections },
      };

    case collectionsActionTypes.SET_COLLECTION_FOR_OPERATION:
      return {
        ...state,
        collectionForOperation: action.payload,
      };

    case collectionsActionTypes.TOGGLE_UPDATE_COLLECTION_DIALOG:
      return {
        ...state,
        updateCollectionDialog: !state.updateCollectionDialog,
      };

    case collectionsActionTypes.UPDATE_COLLECTION:
      const { collectionId, dataToUpdate } = action.payload;

      return {
        ...state,
        collections: {
          ...state.collections,
          [collectionId]: {
            ...state.collections[collectionId],
            ...dataToUpdate,
          },
        },
      };
    case collectionsActionTypes.TOGGLE_DELETE_COLLECTION_DIALOG:
      return {
        ...state,
        deleteCollectionDialog: !state.deleteCollectionDialog,
      };

    case collectionsActionTypes.DELETE_COLLECTION:
      const newCollections = state.collections;
      delete newCollections[action.payload];

      return {
        ...state,
        collections: {
          ...newCollections,
        },
      };

    case collectionsActionTypes.TOGGLE_IS_COLLECTIONS_LOADING:
      return {
        ...state,
        isCollectionLoading: !state.isCollectionLoading,
      };

    case collectionsActionTypes.SET_LAST_ADMIN_COLLECTION_DOC:
      return {
        ...state,
        lastCollectionDoc: action.payload,
      };

    case collectionsActionTypes.SET_COLLECTIONS_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default collectionsReducer;
