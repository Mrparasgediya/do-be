import { createSelector } from "reselect";

const selectStatic = (state) => state.static;

export const selectNewsletter = createSelector(
  [selectStatic],
  (staticData) => staticData.newsletter
);

export const selectBrandVideo = createSelector(
  [selectStatic],
  (staticData) => staticData.brandVideo
);

export const selectIsHomeBrandVideoLoading = createSelector(
  [selectStatic],
  (staticData) => staticData.isBrandVideoLoading
);
