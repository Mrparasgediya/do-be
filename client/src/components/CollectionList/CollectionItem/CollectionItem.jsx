import React from "react";
import { withRouter } from "react-router";
// styles
import * as S from "./CollectionItem.style";
// redux
import { connect } from "react-redux";
import {
  selectBrandForFilter,
  selectCollectionForFilter,
} from "redux/filter/filter.action";
// components
import CustomImage from "../../CustomImage/CustomImage";
// utils
import { getResourceSize } from "utils/app.utils";

function collectionItem({
  item,
  type,
  history,
  selectBrandForFilter,
  selectCollectionForFilter,
}) {
  let collectionItem = undefined;

  if (type === "isBrandItem") {
    const { id, name, image, logo, discountRate } = item;
    const { src: logoSrc } = logo || {};
    const { src: imageSrc } = image || {};

    collectionItem = (
      <S.CollectionListItem
        itemType="brandItem"
        onClick={() => {
          selectBrandForFilter(id);
          history.push("/search");
        }}
      >
        <CustomImage
          srcSet={(imageSrc && imageSrc[getResourceSize()].url) || ""}
          isObservedImage
          src={(imageSrc && imageSrc.org.url) || ""}
          placeholderSrc={(imageSrc && imageSrc.xs.url) || ""}
          type="brandImage"
          alt={`brand-${name}-image`}
        />
        <S.CollectionListItemBrandInfoContainer>
          <CustomImage
            srcSet={(logoSrc && logoSrc[getResourceSize()].url) || ""}
            isObservedImage
            src={(logoSrc && logoSrc.org.url) || ""}
            placeholderSrc={(logoSrc && logoSrc.xs.url) || ""}
            type="brandLogo"
            alt={`brand-${name}-logo`}
          />
          <S.CollectionListItemBrandDicountHeading>
            up to {discountRate}% off
          </S.CollectionListItemBrandDicountHeading>
        </S.CollectionListItemBrandInfoContainer>
      </S.CollectionListItem>
    );
  }

  if (type === "isCollectionItem") {
    const { name, discountRate, image } = item;
    const { src: imageSrc } = image || {};

    collectionItem = (
      <S.CollectionListItem
        itemType="collectionItem"
        onClick={() => {
          selectCollectionForFilter(item.id);
          history.push("/search");
        }}
      >
        <CustomImage
          src={(imageSrc && imageSrc.org.url) || ""}
          srcSet={(imageSrc && imageSrc[getResourceSize()].url) || ""}
          isObservedImage
          placeholderSrc={(imageSrc && imageSrc.xs.url) || ""}
          type="collectionImage"
          alt={`collection-${name}-img`}
        />
        <S.CollectionListItemContentContainer>
          <S.CollectionListItemHading>
            {discountRate}% off on
            <br />
            {name}
          </S.CollectionListItemHading>
        </S.CollectionListItemContentContainer>
      </S.CollectionListItem>
    );
  }

  return collectionItem;
}

const mapDispatchToProps = (dispatch) => ({
  selectBrandForFilter: (brandId) => dispatch(selectBrandForFilter(brandId)),
  selectCollectionForFilter: (collectionId) =>
    dispatch(selectCollectionForFilter(collectionId)),
});

export default connect(null, mapDispatchToProps)(withRouter(collectionItem));
