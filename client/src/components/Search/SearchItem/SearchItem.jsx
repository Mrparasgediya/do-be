import React, { useState } from "react";
import { withRouter } from "react-router-dom";
// styles
import * as S from "./SearchItem.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
// components
import CustomImage from "components/CustomImage/CustomImage";
// hocs
import withButtonBase from "components/withButtonBase/withButtonBase";
// utils
import { handleAddItemToWishlistClick } from "utils/items.utils";

function SearchItem({ item, history, dispatch, currentUser }) {
  const { images, quantity, name, brand, collection, id, price, discountRate } =
    item;

  const isSmallScreen = window.screen.width < 769 ? true : false;
  const maxItemNameLength = isSmallScreen ? 25 : 40;
  const [isHovered, setIsHovered] = useState(false);

  const userhasItemAsWishlist =
    currentUser &&
    currentUser.wishlist &&
    currentUser.wishlist.includes(item.id);

  const handleWishlistClick = () => {
    if (item) {
      return handleAddItemToWishlistClick(item, currentUser, dispatch, history);
    }
    return null;
  };

  return (
    <S.SearchItemContainer
      className="search-item"
      onMouseEnter={!isSmallScreen ? () => setIsHovered(true) : null}
      onMouseLeave={!isSmallScreen ? () => setIsHovered(false) : null}
    >
      <S.SearchItemImageContainer
        onClick={() => history.push(`/items/${id}/preview`)}
      >
        <CustomImage
          isObservedImage={window.innerWidth < 768} // observed image for tablets and phones
          src={images[Object.keys(images)[0]].org.url}
          srcSet={images[Object.keys(images)[0]].small.url}
          placeholderSrc={images[Object.keys(images)[0]].small.blur}
        />
      </S.SearchItemImageContainer>
      <S.SearchItemInfo className="search-item-info">
        {isHovered && (
          <S.StyledSearchItemIconButton
            className="icon-button"
            onClick={handleWishlistClick}
          >
            {userhasItemAsWishlist ? (
              <S.StyledSearchItemFavouriteIcon className="icon-button__icon" />
            ) : (
              <S.StyledSearchItemFavouriteBorderOutlinedIcon className="icon-button__icon" />
            )}
          </S.StyledSearchItemIconButton>
        )}

        <S.SearchItemInfoContainer
          className=" search-item-info__container"
          onClick={() => history.push(`/items/${id}/preview`)}
        >
          {isHovered ? (
            <S.SearchItemHoverInfo className="search-item-info--hover">
              <S.SearchItemHoverSizesContainer className="sizes">
                sizes:
                <S.SearchItemHoverSize className="sizes__size">
                  {Object.keys(quantity).join(", ")}
                </S.SearchItemHoverSize>
              </S.SearchItemHoverSizesContainer>
            </S.SearchItemHoverInfo>
          ) : (
            <React.Fragment>
              <S.SearchItemBrand className="search-item-info__brand">
                {brand.name}
              </S.SearchItemBrand>
              <S.SearchItemName className="search-item-info__name">
                {name.length > maxItemNameLength
                  ? `${name.substring(0, isSmallScreen ? 25 : 35)}...`
                  : name}
              </S.SearchItemName>
            </React.Fragment>
          )}
          <S.SearchItemPriceContainer className="search-item-price">
            <S.SearchItemPrice className="search-item-price__new">
              Rs.
              {Math.floor(
                price -
                  (price / 100) *
                    (discountRate +
                      brand.discountRate +
                      collection.discountRate)
              )}
            </S.SearchItemPrice>
            <S.SearchItemMRP className="search-item-price__mrp">
              Rs.{price}
            </S.SearchItemMRP>
            <S.SearchItemDiscount className="search-item-price__discount">
              ({discountRate + brand.discountRate + collection.discountRate}%
              off)
            </S.SearchItemDiscount>
          </S.SearchItemPriceContainer>
        </S.SearchItemInfoContainer>
        {isSmallScreen &&
          (userhasItemAsWishlist ? (
            <S.SearchItemInfoButtonWithFavoriteIcon
              onClick={handleWishlistClick}
            />
          ) : (
            <S.SearchItemInfoButtonWithFavouriteBorderOutlinedIcon
              onClick={handleWishlistClick}
            />
          ))}
      </S.SearchItemInfo>
    </S.SearchItemContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withButtonBase(withRouter(SearchItem)));
