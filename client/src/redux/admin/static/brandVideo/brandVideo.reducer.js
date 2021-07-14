import brandVideoActionTypes from "./brandVideo.types";

const INITIAL_STATE = {
  brandVideo: null,
  addBrandVideoDialog: false,
  updateBrandVideoDialog: false,
  deleteBrandVideoDialog: false,
  isOperationRunning: false,
  brandsOptions: [],
};

const brandVideoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case brandVideoActionTypes.SET_BRAND_VIDEO:
      return {
        ...state,
        brandVideo: action.payload,
      };

    case brandVideoActionTypes.TOGGLE_ADD_BRAND_VIDEO_DIALOG:
      return {
        ...state,
        addBrandVideoDialog: !state.addBrandVideoDialog,
      };

    case brandVideoActionTypes.ADD_BRAND_VIDEO:
      return {
        ...state,
        brandVideo: action.payload,
      };

    case brandVideoActionTypes.TOGGLE_UPDATE_BRAND_VIDEO_DIALOG:
      return {
        ...state,
        updateBrandVideoDialog: !state.updateBrandVideoDialog,
      };

    case brandVideoActionTypes.UPDATE_BRAND_VIDEO:
      return {
        ...state,
        brandVideo: { ...state.brandVideo, ...action.payload },
      };

    case brandVideoActionTypes.TOGGLE_DELETE_BRAND_VIDEO_DIALOG:
      return {
        ...state,
        deleteBrandVideoDialog: !state.deleteBrandVideoDialog,
      };

    case brandVideoActionTypes.TOGGLE_IS_OPERATION_RUNNING:
      return {
        ...state,
        isOperationRunning: !state.isOperationRunning,
      };

    case brandVideoActionTypes.SET_BRANDS_OPTIONS_FOR_BRAND_VIDEO:
      return {
        ...state,
        brandsOptions: action.payload,
      };

    case brandVideoActionTypes.DELETE_BRAND_VIDEO:
      return {
        ...state,
        brandVideo: null,
      };

    default:
      return state;
  }
};

export default brandVideoReducer;
