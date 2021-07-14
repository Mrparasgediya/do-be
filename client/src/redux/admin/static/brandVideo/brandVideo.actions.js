import brandVideoActionTypes from "./brandVideo.types";

export const setBrandVideo = (brandVideo) => ({
  type: brandVideoActionTypes.SET_BRAND_VIDEO,
  payload: brandVideo,
});

export const toggleAddBrandVideoDialog = () => ({
  type: brandVideoActionTypes.TOGGLE_ADD_BRAND_VIDEO_DIALOG,
});

export const addBrandVideo = (brandVideo) => ({
  type: brandVideoActionTypes.ADD_BRAND_VIDEO,
  payload: brandVideo,
});

export const toggleUpdateBrandVideoDialog = () => ({
  type: brandVideoActionTypes.TOGGLE_UPDATE_BRAND_VIDEO_DIALOG,
});

export const updateBrandVideo = (dataToUpdate) => ({
  type: brandVideoActionTypes.UPDATE_BRAND_VIDEO,
  payload: dataToUpdate,
});

export const toggleDeleteBrandVideoDialog = () => ({
  type: brandVideoActionTypes.TOGGLE_DELETE_BRAND_VIDEO_DIALOG,
});

export const deleteBrandVideo = () => ({
  type: brandVideoActionTypes.DELETE_BRAND_VIDEO,
});

export const toggleIsOperationRunning = () => ({
  type: brandVideoActionTypes.TOGGLE_IS_OPERATION_RUNNING,
});

export const setBrandsOptions = (brandsOptionsMap) => ({
  type: brandVideoActionTypes.SET_BRANDS_OPTIONS_FOR_BRAND_VIDEO,
  payload: brandsOptionsMap,
});
