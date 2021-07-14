import { createSelector } from "reselect";

const selectBrandVideoState = (state) => state.admin.static.brandVideo;

export const selectBrandVideo = createSelector(
  [selectBrandVideoState],
  (brandVideo) => brandVideo.brandVideo
);

export const selectAddBrandVideoDialog = createSelector(
  [selectBrandVideoState],
  (brandVideo) => brandVideo.addBrandVideoDialog
);

export const selectUpdateBrandVideoDialog = createSelector(
  [selectBrandVideoState],
  (brandVideo) => brandVideo.updateBrandVideoDialog
);

export const selectDeleteBrandVideoDialog = createSelector(
  [selectBrandVideoState],
  (brandVideo) => brandVideo.deleteBrandVideoDialog
);

export const selectIsOperationRunning = createSelector(
  [selectBrandVideoState],
  (brandVideo) => brandVideo.isOperationRunning
);

export const selectBrandsOptions = createSelector(
  [selectBrandVideoState],
  (brandVideo) => brandVideo.brandsOptions
);
