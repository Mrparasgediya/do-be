import React, { useEffect, useState } from "react";
// styles
import * as S from "./FilterPanel.styles";
// redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectBrandsToDisplay,
  selectCollectionsToDisplay,
  selectCurrentfilter,
  selectSelectedGroupForFilter,
} from "redux/filter/filter.selectors";
import {
  setSelectedGroupForFilter,
  toggleFilterPanel,
} from "redux/filter/filter.action";
// components
import {
  Checkbox,
  FormGroup,
  List,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
// utils
import {
  getSelectedItemsFromArrayByIds,
  getSortedDeselectedItemsFromArrayBySelectedIds,
  toggleItemFromArr,
} from "utils/filter.utils";

const useStyles = makeStyles({
  label: {
    fontSize: "1.8rem",
    textTransform: "capitalize",
    fontFamily: "var(--font-family-body)",
  },
});

function FilterPanel({
  brandsToDisplay,
  collectionsToDisplay,
  selectedGroupForFilter,
  setSelectedGroupForFilter,
  onApplyFilter,
  toggleFilterPanel,
  currentFilter,
}) {
  const [currentPanel, setCurrentPanel] = useState("group");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);

  useEffect(() => {
    const { brands, collections } = currentFilter;
    if (brands) {
      setSelectedBrands(brands);
    }
    if (collections) {
      setSelectedCollections(collections);
    }
  }, []);

  const toggleSelectedBrand = (brandId) =>
    setSelectedBrands([...toggleItemFromArr(selectedBrands, brandId)]);

  const toggleSelectedCollection = (collectionId) =>
    setSelectedCollections([
      ...toggleItemFromArr(selectedCollections, collectionId),
    ]);

  const classes = useStyles();

  return (
    <S.FilterPanelContainer>
      <S.FilterPanelListContainer>
        <List component="ul">
          {["group", "brands", "collections"].map((listItem, idx) => (
            <S.StyledListItem
              key={idx}
              selected={currentPanel === listItem}
              button
              component="li"
              onClick={() => setCurrentPanel(listItem)}
            >
              {listItem}
            </S.StyledListItem>
          ))}
        </List>
        <S.StyledFilterPanelApplyFilterCustomButton
          isActive
          color="skyblue"
          size="xs"
          align="center"
          onClick={() => {
            onApplyFilter(
              selectedGroupForFilter,
              selectedBrands,
              selectedCollections
            );
            toggleFilterPanel();
          }}
        >
          apply filter
        </S.StyledFilterPanelApplyFilterCustomButton>
      </S.FilterPanelListContainer>

      <S.FilterPanelListItemsContainer>
        <FormGroup>
          {currentPanel === "brands" &&
            [
              ...getSelectedItemsFromArrayByIds(
                brandsToDisplay,
                selectedBrands
              ),
              ...getSortedDeselectedItemsFromArrayBySelectedIds(
                brandsToDisplay,
                selectedBrands
              ),
            ].map((listItem, idx) => (
              <S.StyledFilterPanelFormControlLabel
                classes={{
                  label: classes.label,
                }}
                key={idx}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(listItem.id)}
                    onChange={() => toggleSelectedBrand(listItem.id)}
                  />
                }
                label={listItem.name}
              />
            ))}

          {currentPanel === "collections" &&
            [
              ...getSelectedItemsFromArrayByIds(
                collectionsToDisplay,
                selectedCollections
              ),
              ...getSortedDeselectedItemsFromArrayBySelectedIds(
                collectionsToDisplay,
                selectedCollections
              ),
            ].map((listItem, idx) => (
              <S.StyledFilterPanelFormControlLabel
                classes={{
                  label: classes.label,
                }}
                key={idx}
                control={
                  <Checkbox
                    checked={selectedCollections.includes(listItem.id)}
                    onChange={() => toggleSelectedCollection(listItem.id)}
                  />
                }
                label={listItem.name}
              />
            ))}

          {currentPanel === "group" && (
            <RadioGroup
              aria-label={"group"}
              name={"groups"}
              value={selectedGroupForFilter}
              onChange={(_, selectedGroup) =>
                setSelectedGroupForFilter(selectedGroup)
              }
            >
              {["all", "mens", "womens", "girls", "boys"].map(
                (listItem, idx) => (
                  <S.StyledFilterPanelFormControlLabel
                    classes={{
                      label: classes.label,
                    }}
                    key={idx}
                    value={listItem}
                    control={<Radio />}
                    label={listItem}
                  />
                )
              )}
            </RadioGroup>
          )}
        </FormGroup>
      </S.FilterPanelListItemsContainer>
    </S.FilterPanelContainer>
  );
}
const mapStateToProps = createStructuredSelector({
  collectionsToDisplay: selectCollectionsToDisplay,
  brandsToDisplay: selectBrandsToDisplay,
  selectedGroupForFilter: selectSelectedGroupForFilter,
  currentFilter: selectCurrentfilter,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedGroupForFilter: (group) =>
    dispatch(setSelectedGroupForFilter(group)),
  toggleFilterPanel: () => dispatch(toggleFilterPanel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
