import brandsActionsTypes from "./brands.types";

const INTITAL_STATE = {
  brands: {},
  BRANDS_PER_PAGE: 5,
  currentPage: 0,
  isBrandsLoading: false,
  lastBrandDoc: undefined,
  isOperationRunning: false,
  brandForOperation: null,
  addBrandDialog: false,
  updateBrandDialog: false,
  deleteBrandDialog: false,
};

const brandsReducer = (state = INTITAL_STATE, action) => {
  switch (action.type) {
    case brandsActionsTypes.SET_ADMIN_BRANDS:
      return { ...state, brands: action.payload };

    case brandsActionsTypes.ADD_ADMIN_BRANDS:
      return {
        ...state,
        brands: { ...state.brands, ...action.payload },
      };

    case brandsActionsTypes.TOGGLE_IS_BRANDS_OPERATION_RUNNING:
      return {
        ...state,
        isOperationRunning: !state.isOperationRunning,
      };

    case brandsActionsTypes.TOGGLE_ADD_BRAND_DIALOG:
      return { ...state, addBrandDialog: !state.addBrandDialog };

    case brandsActionsTypes.ADD_BRAND:
      return {
        ...state,
        brands: { ...action.payload, ...state.brands },
      };

    case brandsActionsTypes.SET_BRAND_FOR_OPERATION:
      return {
        ...state,
        brandForOperation: action.payload,
      };

    case brandsActionsTypes.TOGGLE_UPDATE_BRAND_DIALOG:
      return {
        ...state,
        updateBrandDialog: !state.updateBrandDialog,
      };

    case brandsActionsTypes.UPDATE_BRAND:
      return {
        ...state,
        brands: {
          ...state.brands,
          [action.payload.brandId]: {
            ...state.brands[action.payload.brandId],
            ...action.payload.dataToUpdate,
          },
        },
      };

    case brandsActionsTypes.TOGGLE_DELETE_BRAND_DIALOG:
      return {
        ...state,
        deleteBrandDialog: !state.deleteBrandDialog,
      };

    case brandsActionsTypes.DELETE_BRAND:
      const brands = state.brands;
      delete brands[action.payload];

      return {
        ...state,
        brands: { ...brands },
      };

    case brandsActionsTypes.SET_LAST_ADMIN_BRAND_DOC:
      return {
        ...state,
        lastBrandDoc: action.payload,
      };
    case brandsActionsTypes.TOGGLE_IS_BRANDS_LOADING:
      return {
        ...state,
        isBrandsLoading: !state.isBrandsLoading,
      };

    case brandsActionsTypes.SET_BRANDS_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default brandsReducer;
