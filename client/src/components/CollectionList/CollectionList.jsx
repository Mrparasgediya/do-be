import React from "react";
import { withRouter } from "react-router-dom";
// styles
import * as S from "./CollectionList.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectBrands,
  selectIsBrandsLoading,
  selectIsHomeBrandsLoading,
} from "redux/brands/brands.selectors";
import {
  selectCollections,
  selectIsCollectionLoading,
  selectIsHomeCollectionLoading,
} from "redux/collections/collections.selectors";
// components
import CollectionItem from "./CollectionItem/CollectionItem";
import CustomButton from "../CustomButton/CustomButton";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import NotFoundText from "components/NotFoundText/NotFoundText";

function CollectionList({
  heading,
  isBrandList,
  isCollectionList,
  brands,
  collections,
  history,
  itemsLimit,
  isHomePageList,
  isBrandsLoading,
  isCollectionsLoading,
}) {
  let items = [];
  const collectionName = isBrandList
    ? "Brands"
    : isCollectionList
    ? "Collections"
    : "";

  const getItems = (collection, itemType, itemsLimit) => {
    let items = Object.keys(collection);

    if (itemsLimit) {
      items = items.filter((_, idx) => idx < itemsLimit);
    }
    return items.map((collectionId, idx) => (
      <S.CollectionListItemContainer item lg={2} md={3} sm={4} xs={6} key={idx}>
        <CollectionItem
          key={collectionId}
          item={{ id: collectionId, ...collection[collectionId] }}
          type={itemType}
        />
      </S.CollectionListItemContainer>
    ));
  };

  if (isBrandList || isCollectionList) {
    const collection = isBrandList
      ? brands
      : isCollectionList
      ? collections
      : null;

    const itemType = isCollectionList
      ? "isCollectionItem"
      : isBrandList
      ? "isBrandItem"
      : null;

    items = collections && getItems(collection, itemType, itemsLimit);
  }

  return (
    <S.CollectionListContainer
      maxWidth="xl"
      listfor={(isHomePageList && "homepage") || ""}
    >
      {heading && <S.CollectionListHeading>{heading}</S.CollectionListHeading>}
      <S.CollectionListGridContainer
        container
        justify={"center"}
        alignContent={"flex-start"}
      >
        {isBrandsLoading || isCollectionsLoading ? (
          <LoadingSpinner
            hasLoadingText
            displayText={`Loading ${collectionName}`}
            placeCenter
          />
        ) : items.length === 0 ? (
          <NotFoundText placeCenter>{collectionName} not found :(</NotFoundText>
        ) : (
          items
        )}
      </S.CollectionListGridContainer>
      {isHomePageList && (
        <CustomButton
          color="black"
          onClick={() => {
            let listName;
            if (isBrandList) listName = "brands";
            if (isCollectionList) listName = "collections";
            history.push(`/${listName}/all`);
          }}
          align="center"
        >
          view more
        </CustomButton>
      )}
    </S.CollectionListContainer>
  );
}
const mapStateTopProps = createStructuredSelector({
  brands: selectBrands,
  collections: selectCollections,
  isBrandsLoading: selectIsHomeBrandsLoading,
  isCollectionsLoading: selectIsHomeCollectionLoading,
});

export default connect(mapStateTopProps, null)(withRouter(CollectionList));
