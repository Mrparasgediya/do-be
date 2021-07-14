import { createSelector } from "reselect";

const selectBrandState = (state) => state.brands;

export const selectBrands = createSelector(
  [selectBrandState],
  (brands) => brands.brands
);

export const selectLastBrandDoc = createSelector(
  [selectBrandState],
  (brands) => brands.lastBrandDoc
);

export const selectBrandsIds = createSelector(
  [selectBrands],
  (brands) => (brands && Object.keys(brands)) || []
);

export const selectIsHomeBrandsLoading = createSelector(
  [selectBrandState],
  (brands) => brands.isLoadinv
);
