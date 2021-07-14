import brandsActionTypes from "./brands.types";

export const setBrands = (brands) => ({
  type: brandsActionTypes.SET_BRANDS,
  payload: brands,
});

export const addBrands = (brands) => ({
  type: brandsActionTypes.ADD_BRANDS,
  payload: brands,
});

export const setLastBrandDoc = (lastBrandDoc) => ({
  type: brandsActionTypes.SET_LAST_BRAND_DOC,
  payload: lastBrandDoc,
});

export const toggleIsHomeBrandsLoading = () => ({
  type: brandsActionTypes.TOGGLE_IS_HOME_BRANDS_LOADING,
});
