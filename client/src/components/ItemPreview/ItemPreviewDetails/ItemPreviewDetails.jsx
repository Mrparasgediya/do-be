import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
// styles
import * as S from "./ItemPreviewDetails.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";

// components
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import CustomButton from "components/CustomButton/CustomButton";
import ItemDetail from "../ItemDetail/ItemDetail";
// utils
import {
  handleAddItemToWishlistClick,
  handleAddItemToBagClick,
} from "utils/items.utils";
import { selectItemForPreview } from "redux/itemPreview/itemPreview.selectors";
import { useState } from "react";

function ItemPreviewDetails({ currentUser, dispatch, itemForPreview }) {
  const isSmallScreen = window.screen.width < 769 ? true : false;
  const history = useHistory();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isBagLoading, setIsBagLoading] = useState(false);
  const { brand, name, price, discountRate, sizesArr, id, description } =
    itemForPreview;

  return (
    <Fragment>
      <div>
        <S.ItemPreviewItemBrand>{brand.name}</S.ItemPreviewItemBrand>
        <S.ItemPreviewItemName>{name}</S.ItemPreviewItemName>
      </div>
      <S.ItemPreviewPriceContainer>
        <S.ItemPreviewPrice>
          Rs. {price - Math.floor((price / 100) * discountRate)}
        </S.ItemPreviewPrice>
        <S.ItemPreviewMRP>Rs. {price}</S.ItemPreviewMRP>
        <S.ItemPreviewDiscount>({discountRate}% off)</S.ItemPreviewDiscount>
      </S.ItemPreviewPriceContainer>
      <S.ItemPreviewTaxInfo>Inclusive of all taxes</S.ItemPreviewTaxInfo>
      <S.ItemPreviewSizes>
        <S.ItemPreviewSizesHeading>Available Sizes</S.ItemPreviewSizesHeading>
        <S.ItemPreviewSizesContainer>
          {sizesArr.map((size, idx) => (
            <S.ItemPreviewSize key={idx}>
              <S.ItemPreviewSizeText>{size}</S.ItemPreviewSizeText>
            </S.ItemPreviewSize>
          ))}
        </S.ItemPreviewSizesContainer>
      </S.ItemPreviewSizes>
      {!isSmallScreen && (
        <S.ItemPreviewWishlistAndBagButtonsContainer>
          <CustomButton
            size="small"
            color="pink"
            hasLoading
            isLoading={isWishlistLoading}
            disabled={isWishlistLoading || isBagLoading}
            onClick={
              itemForPreview
                ? () =>
                    handleAddItemToWishlistClick(
                      itemForPreview,
                      currentUser,
                      dispatch,
                      history,
                      setIsWishlistLoading
                    )
                : null
            }
            isActive={
              currentUser &&
              currentUser.wishlist &&
              currentUser.wishlist.includes(id)
            }
          >
            <FavoriteBorderOutlinedIcon />
            {currentUser &&
            currentUser.wishlist &&
            currentUser.wishlist.includes(id)
              ? "Wishlisted"
              : "Wishlist"}
          </CustomButton>
          <CustomButton
            size="small"
            color="skyblue"
            hasLoading
            isLoading={isBagLoading}
            disabled={isWishlistLoading || isBagLoading}
            onClick={
              itemForPreview
                ? () => {
                    handleAddItemToBagClick(
                      itemForPreview,
                      currentUser,
                      dispatch,
                      history,
                      setIsBagLoading
                    );
                  }
                : null
            }
            isActive={
              currentUser && currentUser.bag && currentUser.bag.includes(id)
            }
          >
            <LocalMallOutlinedIcon />
            {currentUser && currentUser.bag && currentUser.bag.includes(id)
              ? "added to bag"
              : "add to bag"}
          </CustomButton>
        </S.ItemPreviewWishlistAndBagButtonsContainer>
      )}
      <ItemDetail heading="product details" text={description} isMainHeading />

      <S.StyledItemPreviewGoBackButton
        color="pink"
        onClick={() => history.push("/search")}
        size="xs"
        isActive
      >
        go back
      </S.StyledItemPreviewGoBackButton>
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  itemForPreview: selectItemForPreview,
});
export default connect(mapStateToProps)(ItemPreviewDetails);
