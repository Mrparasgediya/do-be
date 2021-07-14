import React, { useState } from "react";
// styles
import * as S from "./SearchSideBarList.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSelectedGroupForFilter } from "redux/filter/filter.selectors";
// components
import {
  Checkbox,
  FormGroup,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const useStyles = makeStyles({
  labelStyle: {
    fontSize: "1.4rem",
    fontFamily: "var(--font-family-body)",
  },
});

function Item({
  heading,
  list,
  listToCheck,
  isRadioGroup,
  selectedRadioValue,
  handleSelectedRadioValueChange,
  radioGroupName,
  toggleListOption,
}) {
  const [toggleAllBrands, setToggleAllBrands] = useState(false);
  const classes = useStyles();
  const LIST_ITEMS_LIMIT = 5;

  let listItemsMap = null;

  const getItems = (limit) => {
    let listToSend = list;

    if (list && limit) {
      listToSend = list.filter((_, idx) => idx < LIST_ITEMS_LIMIT);
    }

    return listToSend.map(({ id, name }, idx) => (
      <S.StyledSearchSideBarListFormControlLabel
        classes={{
          label: classes.labelStyle,
        }}
        key={idx}
        control={
          <Checkbox
            checked={listToCheck.includes(id)}
            onChange={() => toggleListOption(id)}
            name={name}
          />
        }
        label={name}
      />
    ));
  };

  if (isRadioGroup) {
    listItemsMap = (
      <RadioGroup
        aria-label={radioGroupName}
        name={radioGroupName}
        value={selectedRadioValue}
        onChange={handleSelectedRadioValueChange}
      >
        {list.map((listItem, idx) => (
          <S.StyledSearchSideBarListFormControlLabel
            classes={{
              label: classes.labelStyle,
            }}
            key={idx}
            value={listItem}
            control={<Radio />}
            label={listItem}
          />
        ))}
      </RadioGroup>
    );
  } else {
    listItemsMap = getItems(LIST_ITEMS_LIMIT);
  }

  return (
    <S.SearchSideBarListContainer>
      {toggleAllBrands && (
        <S.SearchSideBarListOpenFilter>
          <S.SearchSideBarListOpenFilterHeadingAndCloseContainer>
            <h4>{heading}</h4>
            <S.StyledSearchSideBarListOpenCloseIconButton
              onClick={() => setToggleAllBrands(!toggleAllBrands)}
            >
              <S.StyledSearchSideBarListOpenCloseIcon />
            </S.StyledSearchSideBarListOpenCloseIconButton>
          </S.SearchSideBarListOpenFilterHeadingAndCloseContainer>
          <S.SearchSideBarListOpenFilterCategoriesContainer>
            <FormGroup> {getItems()}</FormGroup>
          </S.SearchSideBarListOpenFilterCategoriesContainer>
        </S.SearchSideBarListOpenFilter>
      )}

      <S.SearchSideBarList>
        <S.SearchSideBarListItemsContainer>
          <S.SearchSideBarListItemHeadingContainer>
            <h4>{heading}</h4>
          </S.SearchSideBarListItemHeadingContainer>
          {list && <FormGroup> {listItemsMap}</FormGroup>}

          {!isRadioGroup && list.length - LIST_ITEMS_LIMIT > 0 && (
            <S.SearchSideBarListItemShowMoreText
              onClick={() => setToggleAllBrands(!toggleAllBrands)}
            >
              + {list.length - LIST_ITEMS_LIMIT} more
            </S.SearchSideBarListItemShowMoreText>
          )}
        </S.SearchSideBarListItemsContainer>
      </S.SearchSideBarList>
    </S.SearchSideBarListContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  selectedGroupForFilter: selectSelectedGroupForFilter,
});

export default connect(mapStateToProps)(Item);
