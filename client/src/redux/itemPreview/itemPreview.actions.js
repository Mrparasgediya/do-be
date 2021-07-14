import itemPreviewActionsTypes from "./itemPreview.types";

export const setItemforPreview = (item) => ({
  type: itemPreviewActionsTypes.SET_ITEM_FOR_PREVIEW,
  payload: item,
});

export const toggleIsItemLoadingForPreview = () => ({
  type: itemPreviewActionsTypes.TOGGLE_IS_ITEM_LOADING_FOR_PREVIEW,
});

export const toggleItemImagePreviewDialog = () => ({
  type: itemPreviewActionsTypes.TOGGLE_ITEM_IMAGE_PREVIEW_DIALOG,
});

export const setCurrentImageForImagePreviewDialog = (imageNo) => ({
  type: itemPreviewActionsTypes.SET_CURRENT_IMAGE_FOR_IMAGE_PREVIEW_DIALOG,
  payload: imageNo,
});
