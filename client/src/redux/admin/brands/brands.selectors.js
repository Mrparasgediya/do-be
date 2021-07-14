import { createSelector } from "reselect";
import { getCurrentItemsForPagination } from "utils/redux.utils";

const selectBrandsState = (state) => state.admin.brands;

export const selectBrands = createSelector(
  [selectBrandsState],
  (brands) => brands.brands
);

export const selectIsOperationRunning = createSelector(
  [selectBrandsState],
  (brand) => brand.isOperationRunning
);

export const selectAddBrandDialog = createSelector(
  [selectBrandsState],
  (brands) => brands.addBrandDialog
);

export const selectBrandForOperation = createSelector(
  [selectBrandsState],
  (brands) => {
    const brandId = brands.brandForOperation;
    const brandData = brands.brands[brandId];
    return brandData
      ? {
          id: brandId,
          ...brands.brands[brandId],
        }
      : null;
  }
);

export const selectUpdateBrandDialog = createSelector(
  [selectBrandsState],
  (brands) => brands.updateBrandDialog
);

export const selectDeleteBrandDialog = createSelector(
  [selectBrandsState],
  (brand) => brand.deleteBrandDialog
);

export const selectLastBrandDoc = createSelector(
  [selectBrandsState],
  (brands) => brands.lastBrandDoc
);

export const selectIsBrandsLoading = createSelector(
  [selectBrandsState],
  (brands) => brands.isBrandsLoading
);

export const selectBrandsCurrentPage = createSelector(
  [selectBrandsState],
  (brands) => brands.currentPage
);

export const selectBrandsPerPage = createSelector(
  [selectBrandsState],
  (brands) => brands.BRANDS_PER_PAGE
);

export const selectBrandsIds = createSelector(
  [selectBrands],
  (brands) => (brands && Object.keys(brands)) || []
);

export const selectCurrentBrandsIds = createSelector(
  [selectBrandsCurrentPage, selectBrandsPerPage, selectBrandsIds],
  (currentPage, brandsPerPage, brandsIds) =>
    getCurrentItemsForPagination(currentPage, brandsPerPage, brandsIds)
);

export const selectCurrentBrands = createSelector(
  [selectBrands, selectCurrentBrandsIds],
  (brands, brandsIds) => {
    return brandsIds.reduce(
      (currentBrands, brandId) => ({
        ...currentBrands,
        [brandId]: brands[brandId],
      }),
      {}
    );
  }
);

export const selectNoOfBrandsPages = createSelector(
  [selectBrandsIds, selectBrandsPerPage],
  (brandsIds, brandsPerPage) => Math.ceil(brandsIds.length / brandsPerPage)
);
