import statiActionTypes from "./static.types";

const INITIAL_STATE = {
  newsletter: null,
  brandVideo: null,
  isBrandVideoLoading: false,
};

const staticReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case statiActionTypes.SET_NEWSLETTER:
      return { ...state, newsletter: action.payload };
    case statiActionTypes.SET_BRAND_VIDEO:
      return { ...state, brandVideo: action.payload };
    case statiActionTypes.TOGGLE_IS_HOME_BRAND_VIDEO_LOADING:
      return { ...state, isBrandVideoLoading: !state.isBrandVideoLoading };
    default:
      return state;
  }
};
export default staticReducer;
