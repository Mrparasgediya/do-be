import collectionsActionTypes from "./collections.types";

const INITIAL_STATE = {
  collections: {},
  lastCollectionDoc: undefined,
  isLoading: false,
};

const collectionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case collectionsActionTypes.SET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };

    case collectionsActionTypes.ADD_COLLECTIONS:
      return {
        ...state,
        collections: { ...state.collections, ...action.payload },
      };

    case collectionsActionTypes.SET_LAST_COLLECTION_DOC:
      return {
        ...state,
        lastCollectionDoc: action.payload,
      };

    case collectionsActionTypes.TOGGLE_IS_HOME_COLLECTIONS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};

export default collectionsReducer;
