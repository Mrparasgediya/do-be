import React, { useEffect, useState } from "react";
// styles
import * as S from "./SearchSideBar.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectSelectedGroupForFilter,
  selectBrandsToDisplay,
  selectCollectionsToDisplay,
  selectCurrentfilter,
} from "redux/filter/filter.selectors";
import { setSelectedGroupForFilter } from "redux/filter/filter.action";
// components
import SearchSideBarList from "./SearchSideBarList/SearchSideBarList";
import CustomButton from "components/CustomButton/CustomButton";
// utils
import {
  toggleItemFromArr,
  getSelectedItemsFromArrayByIds,
  getSortedDeselectedItemsFromArrayBySelectedIds,
} from "utils/filter.utils";

function SearchSideBar({
  selectedGroupForFilter,
  brandsToDisplay,
  collectionsToDisplay,
  setSelectedGroupForFilter,
  onApplyFilter,
  currentFilter,
}) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const toggleSelectedCollection = (collectionId) =>
    setSelectedCollections([
      ...toggleItemFromArr(selectedCollections, collectionId),
    ]);

  useEffect(() => {
    const { brands, collections } = currentFilter;
    if (brands) {
      setSelectedBrands(brands);
    }
    if (collections) {
      setSelectedCollections(collections);
    }
  }, [currentFilter]);

  const toggleSelectedBrand = (brandId) =>
    setSelectedBrands([...toggleItemFromArr(selectedBrands, brandId)]);

  return (
    <S.SearchSideBarContainer>
      <SearchSideBarList
        heading="group"
        list={["all", "mens", "womens", "boys", "girls"]}
        selectedRadioValue={selectedGroupForFilter}
        handleSelectedRadioValueChange={(_, selectedGroup) =>
          setSelectedGroupForFilter(selectedGroup)
        }
        isRadioGroup
        radioGroupName="gender"
      />
      <SearchSideBarList
        heading="brands"
        list={[
          ...getSelectedItemsFromArrayByIds(brandsToDisplay, selectedBrands),
          ...getSortedDeselectedItemsFromArrayBySelectedIds(
            brandsToDisplay,
            selectedBrands
          ),
        ]}
        listToCheck={selectedBrands}
        toggleListOption={toggleSelectedBrand}
      />
      <SearchSideBarList
        heading="collections"
        list={[
          ...getSelectedItemsFromArrayByIds(
            collectionsToDisplay,
            selectedCollections
          ),
          ...getSortedDeselectedItemsFromArrayBySelectedIds(
            collectionsToDisplay,
            selectedCollections
          ),
        ]}
        listToCheck={selectedCollections}
        toggleListOption={toggleSelectedCollection}
      />
      <CustomButton
        color="skyblue"
        size="small"
        onClick={() =>
          onApplyFilter(
            selectedGroupForFilter,
            selectedBrands,
            selectedCollections
          )
        }
      >
        Apply filter
      </CustomButton>
    </S.SearchSideBarContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  selectedGroupForFilter: selectSelectedGroupForFilter,
  brandsToDisplay: selectBrandsToDisplay,
  collectionsToDisplay: selectCollectionsToDisplay,
  currentFilter: selectCurrentfilter,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedGroupForFilter: (groupName) =>
    dispatch(setSelectedGroupForFilter(groupName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSideBar);
