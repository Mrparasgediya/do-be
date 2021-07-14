import React, { useEffect, useState } from "react";
// styles
import * as S from "./Search.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAllFilterBrands,
  selectAllFilterCollections,
  selectCurrentfilter,
  selectCurrentFilterItems,
  selectCurrentFilterPage,
  selectFilterItems,
  selectFilterItemsDocs,
  selectFilterPanel,
  selectIsFilterItemsLoading,
  selectItemsPerPages,
  selectNoOfPages,
} from "redux/filter/filter.selectors";

import {
  setFilterItems,
  setFilterItemsDocs,
  toggleIsFilterItemsLoading,
  setCurrentFilterPage,
  setAllBrandsForFilter,
  setAllCollectionsForFilter,
  setSelectedGroupForFilter,
  setCurrentFilter,
  setCurrentFilterItems,
  addFilterItems,
  addFilterItemsDocs,
  toggleFilterPanel,
} from "redux/filter/filter.action";
// components
import { Grid } from "@material-ui/core";
import SearchItem from "components/Search/SearchItem/SearchItem";
import SearchSideBar from "components/Search/SearchSideBar/SearchSideBar";
import BottomAppBar from "components/BottomAppBar/BottomAppBar";
import BottomAppBarItem from "components/BottomAppBarItem/BottomAppBarItem";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import FilterPanel from "components/Search/FilterPanel/FilterPanel";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import CustomPagination from "components/CustomPagination/CustomPagination";
// utils
import {
  getFullItemFromItemData,
  getItemsDocsWithDataForFilter,
  getItemsDocsWithFilterGroupAndCollection,
} from "firebase/items.utils";
import { getCollectionsForFilter } from "firebase/collections.utils";
import { getBrandsForFilter } from "firebase/brands.utils";
import { scrollWindowToTop } from "utils/app.utils";
import { showNotification } from "redux/notification/notification.actions";

function Search({
  filterItems,
  isFilterItemsLoading,
  noOfPages,
  filterItemsDocs,
  itemsPerPages,
  setFilterItems,
  toggleIsFilterItemsLoading,
  setFilterItemsDocs,
  allFilterCollections,
  allFilterBrands,
  setAllBrandsForFilter,
  setAllCollectionsForFilter,
  setSelectedGroupForFilter,
  setCurrentFilter,
  currentFilter,
  currentFilterItems,
  setCurrentFilterItems,
  addFilterItems,
  addFilterItemsDocs,
  toggleFilterPanel,
  filterPanel,
  showNotification,
}) {
  const isSmallScreen = window.screen.width < 769 ? true : false;
  const [currentPage, setCurrentPage] = useState(0);

  const applyFilterHandler = async (group, brands, collections) => {
    setCurrentFilter(group, brands, collections);
    scrollWindowToTop();
  };

  const fetchItems = async () => {
    if (currentPage > 0) {
      const indexOfFirstItem = (currentPage - 1) * itemsPerPages;
      const indexOfLastItem = indexOfFirstItem + itemsPerPages;

      const itemsData = filterItemsDocs.slice(
        indexOfFirstItem,
        indexOfLastItem
      );

      toggleIsFilterItemsLoading();
      const items = {};
      const itemsToAdd = {};
      for (let item of itemsData) {
        const itemId = item.id;
        // get from items if it already exists
        if (filterItems[itemId]) {
          items[itemId] = filterItems[itemId];
        } else {
          items[itemId] = await getFullItemFromItemData(item);
          itemsToAdd[itemId] = items[itemId];
        }
      }
      if (Object.keys(itemsToAdd).length) {
        addFilterItems(itemsToAdd);
      }
      setCurrentFilterItems(items);
      toggleIsFilterItemsLoading();
    }
  };

  useEffect(() => {
    const fetchDocs = async () => {
      let itemsDocs;
      const { brands, collections } = currentFilter;
      toggleIsFilterItemsLoading();
      if (
        brands &&
        brands.length > 0 &&
        collections &&
        collections.length > 0
      ) {
        const items = await getItemsDocsWithFilterGroupAndCollection(
          currentFilter
        );
        itemsDocs = items;
      } else {
        itemsDocs = await getItemsDocsWithDataForFilter(
          currentFilter,
          itemsPerPages * 2
        );
      }
      setFilterItemsDocs(itemsDocs);
      // to cause rerender on filter
      if (currentPage) {
        setCurrentPage(0);
      }
      setCurrentPage(1);
      toggleIsFilterItemsLoading();
    };
    fetchDocs();
  }, [currentFilter]);

  useEffect(() => {
    scrollWindowToTop();
    //   if (isSmallScreen) {
    //     const fetchDocs = async () => {
    //       const itemsDocs = await getItemsDocsWithDataForFilter("womens", [], []);
    //       setFilterItemsDocs(itemsDocs);
    //     };
    //     fetchDocs();
    //   }

    if (allFilterCollections.length === 0 || allFilterBrands.length === 0) {
      const fetchData = async () => {
        try {
          let error, brands, collections;
          [brands, error] = await getBrandsForFilter();
          if (error) throw new Error(error);
          setAllBrandsForFilter(brands);

          [collections, error] = await getCollectionsForFilter();
          if (error) throw new Error(error);

          setAllCollectionsForFilter(collections);
        } catch (error) {
          showNotification(error.message, "error");
        }
      };
      fetchData();
    }
    return () => {
      setSelectedGroupForFilter("all");
      setFilterItems([]);
      setCurrentFilter("all", [], []);
    };
  }, []);

  useEffect(() => {
    if (currentPage > 0 && noOfPages === currentPage) {
      const fetchNewDocs = async () => {
        const lastDoc = filterItemsDocs[filterItemsDocs.length - 1];
        let newItemsDocs;
        const { brands, collections } = currentFilter;

        if (
          !(
            brands &&
            brands.length > 0 &&
            collections &&
            collections.length > 0
          )
        ) {
          newItemsDocs = await getItemsDocsWithDataForFilter(
            currentFilter,
            itemsPerPages * 2,
            lastDoc
          );
          addFilterItemsDocs(newItemsDocs);
        }
        await fetchItems();
      };
      fetchNewDocs();
    } else {
      fetchItems();
    }
  }, [currentPage]);

  return (
    <S.StyledSearchContainer disableGutters={true} maxWidth="lg">
      {!isSmallScreen && (
        <S.SearchInfoContainer>
          <S.SearchInfoName>Search Items</S.SearchInfoName>
        </S.SearchInfoContainer>
      )}
      <S.StyledSearchGridContainer container>
        {!isSmallScreen && (
          <Grid item xl={2} lg={3} md={3}>
            <SearchSideBar onApplyFilter={applyFilterHandler} />
          </Grid>
        )}

        <S.StyledSearchGridItemsContainer
          item
          xl={10}
          lg={9}
          md={9}
          sm={12}
          xs={12}
        >
          <S.StyledSearchGridItemsContainerWithLoadingSpinner container>
            {isFilterItemsLoading ? (
              <LoadingSpinner
                hasLoadingText
                displayText="searching items"
                placeCenter
              />
            ) : currentFilterItems &&
              Object.keys(currentFilterItems).length > 0 ? (
              Object.keys(currentFilterItems).map((searchItemId) => (
                <S.StyledSearchGridItem
                  item
                  xl={3}
                  lg={4}
                  md={4}
                  sm={4}
                  xs={6}
                  key={searchItemId}
                >
                  <SearchItem
                    item={{
                      id: searchItemId,
                      ...currentFilterItems[searchItemId],
                    }}
                  />
                </S.StyledSearchGridItem>
              ))
            ) : (
              <S.SearchItemsNotFoundText>
                items not found
              </S.SearchItemsNotFoundText>
            )}
          </S.StyledSearchGridItemsContainerWithLoadingSpinner>

          <CustomPagination
            noOfPages={noOfPages}
            currentPage={currentPage}
            onChange={(_, selectedPageNo) => {
              setCurrentPage(selectedPageNo);
              scrollWindowToTop();
            }}
          />
        </S.StyledSearchGridItemsContainer>
      </S.StyledSearchGridContainer>
      {filterPanel && <FilterPanel onApplyFilter={applyFilterHandler} />}
      {isSmallScreen && (
        <BottomAppBar>
          <BottomAppBarItem
            onClick={toggleFilterPanel}
            name={"filter"}
            Icon={SortRoundedIcon}
          />
        </BottomAppBar>
      )}
    </S.StyledSearchContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  filterItems: selectFilterItems,
  isFilterItemsLoading: selectIsFilterItemsLoading,
  itemsPerPages: selectItemsPerPages,
  currentFilterPage: selectCurrentFilterPage,
  noOfPages: selectNoOfPages,
  allFilterCollections: selectAllFilterCollections,
  allFilterBrands: selectAllFilterBrands,
  currentFilter: selectCurrentfilter,
  currentFilterItems: selectCurrentFilterItems,
  filterItemsDocs: selectFilterItemsDocs,
  filterPanel: selectFilterPanel,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterItemsDocs: (itemsDocs) => dispatch(setFilterItemsDocs(itemsDocs)),
  setFilterItems: (items) => dispatch(setFilterItems(items)),
  toggleIsFilterItemsLoading: () => dispatch(toggleIsFilterItemsLoading()),
  setCurrentFilterPage: (pageNo) => dispatch(setCurrentFilterPage(pageNo)),

  setAllBrandsForFilter: (allBrandsMap) =>
    dispatch(setAllBrandsForFilter(allBrandsMap)),
  setAllCollectionsForFilter: (allCollectionsMap) =>
    dispatch(setAllCollectionsForFilter(allCollectionsMap)),
  setSelectedGroupForFilter: (group) =>
    dispatch(setSelectedGroupForFilter(group)),
  setCurrentFilter: (group, brands, collections) =>
    dispatch(setCurrentFilter({ group, brands, collections })),

  setCurrentFilterItems: (items) => dispatch(setCurrentFilterItems(items)),
  addFilterItems: (items) => dispatch(addFilterItems(items)),
  addFilterItemsDocs: (docsMap) => dispatch(addFilterItemsDocs(docsMap)),

  toggleFilterPanel: () => dispatch(toggleFilterPanel()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
