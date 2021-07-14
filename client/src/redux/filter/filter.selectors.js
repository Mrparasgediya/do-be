import { createSelector } from "reselect";

const selectFilterState = (state) => state.filter;

export const selectFilterItems = createSelector(
  [selectFilterState],
  (filter) => filter.items
);

export const selectFirstFilterItemDoc = createSelector(
  [selectFilterState],
  (filter) => filter.firstFilterItemDoc
);

export const selectLastFilterItemDoc = createSelector(
  [selectFilterState],
  (filter) => filter.lastFilterItemDoc
);

export const selectIsFilterItemsLoading = createSelector(
  [selectFilterState],
  (filter) => filter.isFilterItemsLoading
);

export const selectAllFilterBrands = createSelector(
  [selectFilterState],
  (filter) => filter.allBrands
);

export const selectAllFilterCollections = createSelector(
  [selectFilterState],
  (filter) => filter.allCollections
);

export const selectSelectedGroupForFilter = createSelector(
  [selectFilterState],
  (filter) => filter.selectedGroup
);

export const selectBrandsToDisplay = createSelector(
  [selectAllFilterBrands, selectSelectedGroupForFilter],
  (allBrands, selectedGroup) =>
    selectedGroup === "all"
      ? allBrands
      : allBrands.filter((brand) => brand.groups.includes(selectedGroup))
);

export const selectCollectionsToDisplay = createSelector(
  [selectAllFilterCollections, selectSelectedGroupForFilter],
  (allCollections, selectedGroup) =>
    selectedGroup === "all"
      ? allCollections
      : allCollections.filter((collections) =>
          collections.groups.includes(selectedGroup)
        )
);

export const selectFilterItemsDocs = createSelector(
  [selectFilterState],
  (filter) => filter.itemsDocs
);

export const selectItemsPerPages = createSelector(
  [selectFilterState],
  (filter) => filter.ITEMS_PER_PAGES
);

export const selectNoOfPages = createSelector(
  [selectFilterItemsDocs, selectItemsPerPages],
  (docs, itemsPerPage) => Math.ceil(docs.length / itemsPerPage)
);

export const selectCurrentFilterPage = createSelector(
  [selectFilterState],
  (filter) => filter.currentPage
);

export const selectCurrentfilter = createSelector(
  [selectFilterState],
  (filter) => filter.currentFilter
);

export const selectCurrentFilterItems = createSelector(
  [selectFilterState],
  (filter) => filter.currentItems
);

export const selectFilterPanel = createSelector(
  [selectFilterState],
  (filter) => filter.filterPanel
);
