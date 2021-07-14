import brandsActionsTypes from "./brands.types";

export const setBrands = (brands) => ({
  type: brandsActionsTypes.SET_ADMIN_BRANDS,
  payload: brands,
});

export const toggleIsOperationRunning = () => ({
  type: brandsActionsTypes.TOGGLE_IS_BRANDS_OPERATION_RUNNING,
});

export const toggleAddBrandDialog = () => ({
  type: brandsActionsTypes.TOGGLE_ADD_BRAND_DIALOG,
});

export const addBrand = (brand) => ({
  type: brandsActionsTypes.ADD_BRAND,
  payload: brand,
});

export const setBrandForOperation = (brandId) => ({
  type: brandsActionsTypes.SET_BRAND_FOR_OPERATION,
  payload: brandId,
});

export const toggleUpdateBrandDialog = () => ({
  type: brandsActionsTypes.TOGGLE_UPDATE_BRAND_DIALOG,
});

export const updateBrand = (brandId, dataToUpdate) => ({
  type: brandsActionsTypes.UPDATE_BRAND,
  payload: { brandId, dataToUpdate },
});

export const toggleDeleteBrandDialog = () => ({
  type: brandsActionsTypes.TOGGLE_DELETE_BRAND_DIALOG,
});

export const deleteBrand = (brandId) => ({
  type: brandsActionsTypes.DELETE_BRAND,
  payload: brandId,
});

export const setLastBrandDoc = (lastBrandDoc) => ({
  type: brandsActionsTypes.SET_LAST_ADMIN_BRAND_DOC,
  payload: lastBrandDoc,
});

export const toggleIsBrandsLoading = () => ({
  type: brandsActionsTypes.TOGGLE_IS_BRANDS_LOADING,
});

export const setBrandsCurrentPage = (currentPageNo) => ({
  type: brandsActionsTypes.SET_BRANDS_CURRENT_PAGE,
  payload: currentPageNo,
});
export const addBrands = (brands) => ({
  type: brandsActionsTypes.ADD_BRANDS,
  payload: brands,
});
