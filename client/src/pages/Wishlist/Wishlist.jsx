import React, { useEffect, useState } from "react";
// styles
import * as S from "./Wishlist.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUserWishlistIds,
} from "redux/user/user.selectors";
import {
  selectIsWishlistItemsLoading,
  selectWishlistItems,
  selectWishlistItemsIds,
  selectWishlistItemsToDisplay,
} from "redux/user/wishlist/wishlist.select";
import {
  setUserWishlistItems,
  toggleIsWishlistItemsLoading,
} from "redux/user/wishlist/wishlist.actions";
// components
import WishlistItem from "components/WishlistItem/WishlistItem";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
// utils
import { scrollWindowToTop } from "utils/app.utils";
import { getItemFromId } from "firebase/items.utils";
import { showNotification } from "redux/notification/notification.actions";
import NotFoundText from "components/NotFoundText/NotFoundText";

function Wishlist({
  wishlistItemsIds,
  wishlistItems,
  setUserWishlistItems,
  showNotification,
  userWishlistItemsIds,
  toggleIsWishlistItemsLoading,
  isWishlistItemsLoading,
  wishlistItemsToDisplay,
}) {
  useEffect(() => {
    scrollWindowToTop();
  }, []);

  const initWishlistItems = async () => {
    let items = {};
    let notFetchedItems = 0;
    toggleIsWishlistItemsLoading();
    for (let itemId of userWishlistItemsIds.reverse()) {
      let item = wishlistItems[itemId];
      if (!item) {
        // if item is not in wishlist items
        try {
          const [foundItem, error] = await getItemFromId(itemId);
          if (error) throw new Error(error);
          const { id, ...restItem } = foundItem;

          item = { [id]: restItem };
        } catch (error) {
          notFetchedItems++;
        }
      } else {
        // if item is already exists
        item = { [itemId]: item };
      }
      if (notFetchedItems) {
        showNotification(
          `can't load ${notFetchedItems} wishlist ${
            notFetchedItems > 1 ? "items" : "item"
          }`,
          "error"
        );
      }
      items = { ...items, ...item };
    }

    setUserWishlistItems(items);
    toggleIsWishlistItemsLoading();
  };

  useEffect(() => {
    if (userWishlistItemsIds.length !== wishlistItemsIds.length) {
      initWishlistItems();
    }
  }, []);

  const items =
    (wishlistItemsIds.length > 0 &&
      wishlistItemsIds.map((itemId, idx) => (
        <S.StyledWishlistGridItem item lg={3} md={4} sm={4} xs={6} key={idx}>
          <WishlistItem
            key={itemId}
            item={{ id: itemId, ...wishlistItemsToDisplay[itemId] }}
          />
        </S.StyledWishlistGridItem>
      ))) ||
    [];

  return (
    <S.StyledWishlistContainer fixed>
      <S.WishlistHeading>
        My Wishlist
        {wishlistItemsIds.length > 0 && (
          <S.WishlistItemsCountText>
            {`( ${wishlistItemsIds.length} ${
              wishlistItemsIds.length > 1 ? "items" : "item"
            } )`}
          </S.WishlistItemsCountText>
        )}
      </S.WishlistHeading>
      <S.StyledWishlistGridContainer
        container
        justify={"flex-start"}
        alignContent={"flex-start"}
      >
        {isWishlistItemsLoading ? (
          <LoadingSpinner
            placeCenter
            hasLoadingText
            displayText="Getting wishlist items"
          />
        ) : wishlistItemsIds.length === 0 ? (
          <NotFoundText placeCenter>
            You Do not have wishlist items.
          </NotFoundText>
        ) : (
          items
        )}
      </S.StyledWishlistGridContainer>
    </S.StyledWishlistContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userWishlistItemsIds: selectUserWishlistIds,
  wishlistItems: selectWishlistItems,
  wishlistItemsIds: selectWishlistItemsIds,
  isWishlistItemsLoading: selectIsWishlistItemsLoading,
  wishlistItemsToDisplay: selectWishlistItemsToDisplay,
});

const mapDispatchToProps = (dispatch) => ({
  setUserWishlistItems: (wishlistItems) =>
    dispatch(setUserWishlistItems(wishlistItems)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  toggleIsWishlistItemsLoading: () => dispatch(toggleIsWishlistItemsLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
