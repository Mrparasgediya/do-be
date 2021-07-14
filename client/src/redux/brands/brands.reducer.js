import brandsActionTypes from "./brands.types";

const INITIAL_STATE = {
  brands: {},
  lastBrandDoc: undefined,
  isLoading: false,
};

const brandsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case brandsActionTypes.SET_BRANDS:
      return { ...state, brands: action.payload };

    case brandsActionTypes.TOGGLE_IS_HOME_BRANDS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case brandsActionTypes.ADD_BRANDS:
      return {
        ...state,
        brands: { ...state.brands, ...action.payload },
      };

    case brandsActionTypes.SET_LAST_BRAND_DOC:
      return {
        ...state,
        lastBrandDoc: action.payload,
      };

    default:
      return state;
  }
};

export default brandsReducer;
