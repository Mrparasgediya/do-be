import itemsActionsTypes from "./items.types";
import { updateItemsByKey, deleteItemsByKey } from "./items.utils";

const INITIAL_STATE = {
  ITEMS_PER_PAEG: 5,
  items: {},
  isItemsLoading: false,
  firstItemDoc: undefined,
  lastItemDoc: undefined,
  itemForOperation: null,
  itemImageForOperation: undefined,
  addItemDialog: false,
  showItemDialog: false,
  deleteItemDialog: false,
  updateItemDialog: false,
  deleteItemImageDialog: false,
  collectionsOptions: [],
  brandsOptions: [],
  updateItemPanel: null,
  isOperationRunning: false,
  currentPage: 0,
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case itemsActionsTypes.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case itemsActionsTypes.ADD_ITEMS:
      return { ...state, items: { ...state.items, ...action.payload } };

    case itemsActionsTypes.TOGGLE_IS_ITEMS_OPERATION_RUNNING:
      return {
        ...state,
        isOperationRunning: !state.isOperationRunning,
      };

    case itemsActionsTypes.SET_BRANDS_OPTIONS:
      return {
        ...state,
        brandsOptions: action.payload,
      };

    case itemsActionsTypes.SET_COLLECTION_OPTIONS:
      return {
        ...state,
        collectionsOptions: action.payload,
      };

    case itemsActionsTypes.TOGGLE_ADD_ITEM_DIALOG:
      return {
        ...state,
        addItemDialog: !state.addItemDialog,
      };

    case itemsActionsTypes.ADD_ITEM:
      return {
        ...state,
        items: { ...action.payload, ...state.items },
      };

    case itemsActionsTypes.UPDATE_ITEMS_COLLECTION:
      return {
        ...state,
        items: {
          ...updateItemsByKey(state.items, "collection", action.payload),
        },
      };

    case itemsActionsTypes.UPDATE_ITEMS_BRAND:
      return {
        ...state,
        items: { ...updateItemsByKey(state.items, "brand", action.payload) },
      };

    case itemsActionsTypes.SET_ITEM_FOR_OPERATION:
      return {
        ...state,
        itemForOperation: action.payload,
      };

    case itemsActionsTypes.TOGGLE_SHOW_ITEM_DIALOG:
      return {
        ...state,
        showItemDialog: !state.showItemDialog,
      };

    case itemsActionsTypes.TOGGLE_UPDATE_ITEM_DIALOG:
      return {
        ...state,
        updateItemDialog: !state.updateItemDialog,
      };

    case itemsActionsTypes.SET_UPDATE_ITEM_PANEL:
      return {
        ...state,
        updateItemPanel: action.payload,
      };

    case itemsActionsTypes.UPDATE_ITEM:
      const { itemId, dataToUpdate } = action.payload;

      return {
        ...state,
        items: {
          ...state.items,
          [itemId]: { ...state.items[itemId], ...dataToUpdate },
        },
      };
    case itemsActionsTypes.TOGGLE_DELETE_ITEM_DIALOG:
      return {
        ...state,
        deleteItemDialog: !state.deleteItemDialog,
      };
    case itemsActionsTypes.DELETE_ITEM:
      const newItems = state.items;
      delete newItems[action.payload];
      return {
        ...state,
        items: { ...newItems },
      };

    case itemsActionsTypes.ADD_ITEM_IMAGE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.itemId]: {
            ...state.items[action.payload.itemId],
            images: {
              ...state.items[action.payload.itemId].images,
              [action.payload.imageId]: { ...action.payload.imageData },
            },
          },
        },
      };
    case itemsActionsTypes.SET_ITEM_IMAGE_FOR_OPERATION:
      return { ...state, itemImageForOperation: action.payload };

    case itemsActionsTypes.TOGGLE_DELETE_ITEM_IMAGE_DIALOG:
      return { ...state, deleteItemImageDialog: !state.deleteItemImageDialog };

    case itemsActionsTypes.DELETE_ITEM_IMAGE:
      const itemImages = state.items[action.payload.itemId].images;
      delete itemImages[action.payload.imageId];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.itemId]: {
            ...state.items[action.payload.itemId],
            images: { ...itemImages },
          },
        },
      };

    case itemsActionsTypes.DELETE_COLLECTION_ITEMS:
      return {
        ...state,
        items: {
          ...deleteItemsByKey(state.items, action.payload, "collection"),
        },
      };

    case itemsActionsTypes.DELETE_BRAND_ITEMS:
      return {
        ...state,
        items: {
          ...deleteItemsByKey(state.items, action.payload, "brand"),
        },
      };

    case itemsActionsTypes.TOGGLE_IS_ITEMS_LOADING:
      return {
        ...state,
        isItemsLoading: !state.isItemsLoading,
      };

    case itemsActionsTypes.SET_FIRST_ITEM_DOC:
      return {
        ...state,
        firstItemDoc: action.payload,
      };

    case itemsActionsTypes.SET_LAST_ITEM_DOC:
      return {
        ...state,
        lastItemDoc: action.payload,
      };

    case itemsActionsTypes.SET_CURRENT_ITEMS_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default itemsReducer;
