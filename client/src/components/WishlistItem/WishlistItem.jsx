import React, { Fragment } from "react";
// styles
import * as S from "./WishlistItem.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
import { removeUserWishlistItem } from "redux/user/wishlist/wishlist.actions";
import { removeItemFromWishlist, addItemToBag } from "redux/user/user.actions";
import { addItemToUserBag as addItemToUserBagRedux } from "redux/user/bag/bag.actions";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "components/CustomImage/CustomImage";
// utils
import {
  removeItemFromUserWishlist,
  addItemToUserBag,
} from "firebase/users.utils";
import { useState } from "react";
import { LoadingSpinner } from "components/LoadingSpinner/LoadingSpinner.styles";

function WishlistItem({
  item,
  currentUser,
  removeItemFromWishlist,
  addItemToBag,
  removeUserWishlistItem,
  addItemToUserBagRedux,
  showNotification,
}) {
  const {
    brand: { name: brandName, discountRate: brandDiscount },
    collection: { discountRate: collectionDiscount },
    name: itemName,
    price: itemPrice,
    discountRate,
    images,
    id: itemId,
    firstImageId,
  } = item;

  console.log(images, firstImageId);

  const itemNameLength = window.innerWidth > 768 ? 50 : 30;
  const [isMovingToBag, setIsMovingToBag] = useState(false);
  const [isRemovingItem, setIsRemovingItem] = useState(false);

  const removeWishlisItemAsync = async () => {
    try {
      const [, error] = await removeItemFromUserWishlist(
        currentUser.id,
        itemId
      );
      if (error) throw new Error(error);
      // remove from user redux
      removeItemFromWishlist(itemId);
      // remove from user wishlist reducx
      removeUserWishlistItem(itemId);
      return [true, null];
    } catch (error) {
      return [null, error];
    }
  };

  const handleRemoveItemClick = async () => {
    try {
      setIsRemovingItem(true);
      const [, error] = await removeWishlisItemAsync();
      if (error) throw new Error(error);
      showNotification("item is removed from wishilst.", "info");
      setIsRemovingItem(false);
    } catch (error) {
      setIsRemovingItem(false);
      showNotification(error.message, "error");
    }
  };

  const handleAddToBagClick = async () => {
    try {
      let error;
      setIsMovingToBag(true);
      [, error] = await removeWishlisItemAsync();
      if (error) throw new Error(error);
      // add add item to bag db
      [, error] = await addItemToUserBag(currentUser.id, itemId);
      if (error) throw new Error(error);
      // update redux user
      addItemToBag(itemId);
      // update redux bag item
      const { id, ...otherItemData } = item;
      addItemToUserBagRedux({ [id]: otherItemData });
      showNotification("item is moved to bag.", "info");
      setIsMovingToBag(false);
    } catch (error) {
      showNotification(error.message, "error");
      setIsMovingToBag(false);
    }
  };

  return (
    <S.WishlistItemContainer>
      <S.WishlistItemRemoveContainer
        onClick={
          !isRemovingItem && !isMovingToBag ? handleRemoveItemClick : null
        }
      >
        {isRemovingItem ? (
          <LoadingSpinner />
        ) : (
          <S.StyledWishlistItemCloseIcon />
        )}
      </S.WishlistItemRemoveContainer>
      <S.StyledWishlistItemLink to={`/items/${itemId}/preview`}>
        <S.WishlistItemImageContainer>
          <CustomImage
            src={(firstImageId && images[firstImageId].small.url) || ""}
            placeholderSrc={
              (firstImageId && images[firstImageId].small.blur) || ""
            }
            alt={`item-${itemId}-img`}
          />
        </S.WishlistItemImageContainer>

        <S.WishlistItemContentContainer>
          <S.WishlistItemNameAndBrandContainer>
            <S.WishlistItemBrand>{brandName}</S.WishlistItemBrand>
            <span>
              {itemName.length > itemNameLength
                ? `${itemName.substring(0, itemNameLength)}...`
                : itemName}
            </span>
          </S.WishlistItemNameAndBrandContainer>
          <S.WishlistItemPriceContainer>
            <b>
              Rs
              {itemPrice -
                Math.floor(
                  (itemPrice *
                    (discountRate + brandDiscount + collectionDiscount)) /
                    100
                )}
            </b>
            <S.WishlistItemMRP>Rs.{itemPrice}</S.WishlistItemMRP>
            <S.WishlistItemDiscount>
              ( {discountRate + brandDiscount + collectionDiscount}% OFF )
            </S.WishlistItemDiscount>
          </S.WishlistItemPriceContainer>
        </S.WishlistItemContentContainer>
      </S.StyledWishlistItemLink>

      <CustomButton
        hasLoading
        isLoading={isMovingToBag}
        disabled={isMovingToBag}
        buttonType="wishlist"
        onClick={!isRemovingItem && !isMovingToBag ? handleAddToBagClick : null}
        loadingText={
          <Fragment>
            <S.StyledWishlistBagItemShoppingBagIcon />
            moving to bag
          </Fragment>
        }
      >
        <S.StyledWishlistBagItemShoppingBagIcon />
        move to bag
      </CustomButton>
    </S.WishlistItemContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  removeItemFromWishlist: (itemId) => dispatch(removeItemFromWishlist(itemId)),
  addItemToBag: (itemId) => dispatch(addItemToBag(itemId)),
  removeUserWishlistItem: (wishlistItemId) =>
    dispatch(removeUserWishlistItem(wishlistItemId)),
  addItemToUserBagRedux: (item) => dispatch(addItemToUserBagRedux(item)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishlistItem);
