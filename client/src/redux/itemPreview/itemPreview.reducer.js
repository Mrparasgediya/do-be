import itemPreviewActionsTypes from "./itemPreview.types";

const INITIAL_STATE = {
  item: undefined,
  isLoading: false,
  imagePreviewDialog: false,
  currentImageForIamgePreviewDialog: 0,
};

const itemPreviewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case itemPreviewActionsTypes.SET_ITEM_FOR_PREVIEW:
      return {
        ...state,
        item: action.payload,
      };
    case itemPreviewActionsTypes.TOGGLE_IS_ITEM_LOADING_FOR_PREVIEW:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case itemPreviewActionsTypes.TOGGLE_ITEM_IMAGE_PREVIEW_DIALOG:
      return {
        ...state,
        imagePreviewDialog: !state.imagePreviewDialog,
      };
    case itemPreviewActionsTypes.SET_CURRENT_IMAGE_FOR_IMAGE_PREVIEW_DIALOG:
      return {
        ...state,
        currentImageForIamgePreviewDialog: action.payload,
      };
    default:
      return state;
  }
};

export default itemPreviewReducer;
