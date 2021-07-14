import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
// styles
import * as S from "./ItemPreview.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
import { selectFilterItems } from "redux/filter/filter.selectors";
// components
import { Grid } from "@material-ui/core";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ItemPreviewImage from "components/ItemPreview//ItemPreviewImage/ItemPreviewImage";
import ItemPreviewDetails from "components/ItemPreview/ItemPreviewDetails/ItemPreviewDetails";
import BottomAppBar from "components/BottomAppBar/BottomAppBar";
import ButtomAppBarItem from "components/BottomAppBarItem/BottomAppBarItem";
// utils
import { getItemFromId } from "firebase/items.utils";
import {
  handleAddItemToBagClick,
  handleAddItemToWishlistClick,
} from "utils/items.utils";
import { scrollWindowToTop } from "utils/app.utils";
import {
  setItemforPreview,
  toggleIsItemLoadingForPreview,
} from "redux/itemPreview/itemPreview.actions";
import {
  selectItemForPreview,
  selectItemIsLoadingForPreview,
} from "redux/itemPreview/itemPreview.selectors";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import NotFoundText from "components/NotFoundText/NotFoundText";
import { showNotification } from "redux/notification/notification.actions";

function ItemPreview({
  filterItems,
  match,
  history,
  currentUser,
  dispatch,
  itemForPreview,
  isItemLoadingForPreview,
}) {
  const isSmallScreen = window.screen.width < 769 ? true : false;
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isBagLoading, setIsBagLoading] = useState(false);

  const fetchItem = async () => {
    // get item from filter items
    let item = filterItems[match.params.itemId];
    if (!item) {
      let error;
      try {
        dispatch(toggleIsItemLoadingForPreview());
        setIsBagLoading(true);
        [item, error] = await getItemFromId(match.params.itemId);
        if (error) throw new Error(error);
        dispatch(toggleIsItemLoadingForPreview());
        setIsBagLoading(false);
      } catch (error) {
        dispatch(showNotification(error.message, "error"));
        dispatch(toggleIsItemLoadingForPreview());
        setIsBagLoading(false);
      }
    }
    // fetch item from redux if not found then fetch it from firebase
    dispatch(setItemforPreview(item));
  };

  useEffect(() => {
    fetchItem();
    scrollWindowToTop();
    return () => {
      setItemforPreview(undefined);
    };
  }, []);

  return (
    <Fragment>
      <S.ItemPreviewContainer maxWidth="xl" disableGutters={true}>
        {isItemLoadingForPreview ? (
          <LoadingSpinner
            placeCenter
            hasLoadingText={true}
            displayText="Getting Item"
          />
        ) : itemForPreview ? (
          <Grid container spacing={1}>
            <ItemPreviewImage />
            <S.ItemPreviewDetailsGrid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <ItemPreviewDetails />
            </S.ItemPreviewDetailsGrid>
          </Grid>
        ) : (
          <NotFoundText placeCenter goBackUrl="/search">
            item not found : (
          </NotFoundText>
        )}
      </S.ItemPreviewContainer>

      {isSmallScreen && itemForPreview && !isItemLoadingForPreview && (
        <BottomAppBar>
          <ButtomAppBarItem
            hasLoading
            isLoading={isWishlistLoading}
            disabled={isWishlistLoading || isBagLoading}
            name={
              currentUser &&
              currentUser.wishlist &&
              currentUser.wishlist.includes(itemForPreview.id)
                ? "Wishlisted"
                : "Wishlist"
            }
            Icon={FavoriteBorderOutlinedIcon}
            color="pink"
            iconSize="large"
            hasRightBorder
            onClick={
              !isWishlistLoading
                ? () => {
                    handleAddItemToWishlistClick(
                      itemForPreview,
                      currentUser,
                      dispatch,
                      history,
                      setIsWishlistLoading
                    );
                  }
                : console.log("you can't do that")
            }
            isActive={
              currentUser &&
              currentUser.wishlist &&
              currentUser.wishlist.includes(itemForPreview.id)
            }
          />
          <ButtomAppBarItem
            hasLoading
            isLoading={isBagLoading}
            disabled={isWishlistLoading || isBagLoading}
            name={
              currentUser &&
              currentUser.bag &&
              currentUser.bag.includes(itemForPreview.id)
                ? "added to bag"
                : "add to bag"
            }
            isActive={
              currentUser &&
              currentUser.bag &&
              currentUser.bag.includes(itemForPreview.id)
            }
            Icon={LocalMallOutlinedIcon}
            color="skyblue"
            hasSkyBlueTouchEffect
            iconSize="large"
            onClick={
              !isBagLoading
                ? () => {
                    handleAddItemToBagClick(
                      itemForPreview,
                      currentUser,
                      dispatch,
                      history
                    );
                  }
                : console.log("you cant do that bag is loading")
            }
          />
        </BottomAppBar>
      )}
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  filterItems: selectFilterItems,
  itemForPreview: selectItemForPreview,
  isItemLoadingForPreview: selectItemIsLoadingForPreview,
});

export default connect(mapStateToProps)(withRouter(ItemPreview));
