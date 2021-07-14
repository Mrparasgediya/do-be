import statiActionTypes from "./static.types";

export const setNewsletter = (newsletter) => ({
  type: statiActionTypes.SET_NEWSLETTER,
  payload: newsletter,
});
export const setBrandVideo = (brandVideo) => ({
  type: statiActionTypes.SET_BRAND_VIDEO,
  payload: brandVideo,
});

export const toggleIsHomeBrandVideoLoading = () => ({
  type: statiActionTypes.TOGGLE_IS_HOME_BRAND_VIDEO_LOADING,
});
