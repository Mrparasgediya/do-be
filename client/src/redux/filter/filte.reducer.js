import filterActionTypes from "./filter.types";
import { getSearchItemsPerPageCount } from "utils/app.utils";
import { applyFilterWithValidation } from "./filter.utils";

const INITIAL_STATE = {
  ITEMS_PER_PAGES: getSearchItemsPerPageCount(),
  items: {},
  currentItems: [],
  isFilterItemsLoading: false,
  allBrands: [],
  allCollections: [],
  selectedGroup: "all",
  itemsDocs: [],
  currentPage: undefined,
  filterPanel: false,
  currentFilter: {
    group: "all",
    brands: [],
    collections: [],
  },
};
const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case filterActionTypes.SET_FILTER_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case filterActionTypes.SET_FIRST_FILTER_ITEM_DOC:
      return {
        ...state,
        firstFilterItemDoc: action.payload,
      };

    case filterActionTypes.SET_LAST_FILTER_ITEM_DOC:
      return {
        ...state,
        lastFilterItemDoc: action.payload,
      };
    case filterActionTypes.TOGGLE_IS_FILTER_ITEMS_LOADING:
      return {
        ...state,
        isFilterItemsLoading: !state.isFilterItemsLoading,
      };

    case filterActionTypes.SET_ALL_BRANDS_FOR_FILTER:
      return {
        ...state,
        allBrands: action.payload,
      };

    case filterActionTypes.SET_ALL_COLLECTIONS_FOR_FILTER:
      return {
        ...state,
        allCollections: action.payload,
      };

    case filterActionTypes.SET_SELECTED_GROUP_FOR_FILTER:
      return {
        ...state,
        selectedGroup: action.payload,
      };

    case filterActionTypes.SET_FILTER_ITEMS_DOCS:
      return {
        ...state,
        itemsDocs: action.payload,
      };

    case filterActionTypes.ADD_FILTER_ITEMS_DOCS:
      return {
        ...state,
        itemsDocs: [...state.itemsDocs, ...action.payload],
      };

    case filterActionTypes.SET_CURRENT_FILTER_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case filterActionTypes.SELECT_BRAND_FOR_FILTER:
      return {
        ...state,
        currentFilter: {
          ...state.currentFilter,
          brands: [action.payload],
        },
      };

    case filterActionTypes.SELECT_GROUP_FOR_FILTER:
      return {
        ...state,
        currentFilter: {
          ...state.currentFilter,
          group: action.payload,
          collections: [],
          brands: [],
        },
      };

    case filterActionTypes.SELECT_COLLECTION_FOR_FILTER:
      return {
        ...state,
        currentFilter: {
          ...state.currentFilter,
          collections: [action.payload],
        },
      };
    case filterActionTypes.SET_SELECTED_BRANDS_FOR_FILTER:
      return {
        ...state,
        selectedBrands: action.payload,
      };

    case filterActionTypes.SET_SELECTED_COLLECTIONS_FOR_FILTER:
      return {
        ...state,
        selectedCollections: action.payload,
      };

    case filterActionTypes.SET_CURRENT_FILTER:
      return {
        ...state,
        currentFilter: {
          ...applyFilterWithValidation(
            action.payload,
            state.allBrands,
            state.allCollections
          ),
        },
      };

    case filterActionTypes.ADD_FILTER_ITEMS:
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
        },
      };

    case filterActionTypes.SET_CURRENT_FILTER_ITEMS:
      return {
        ...state,
        currentItems: action.payload,
      };

    case filterActionTypes.TOGGLE_FILTER_PANEL:
      return {
        ...state,
        filterPanel: !state.filterPanel,
      };

    default:
      return state;
  }
};

export default filterReducer;
