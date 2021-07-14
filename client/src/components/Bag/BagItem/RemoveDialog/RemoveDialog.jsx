import React from "react";
// styles
import * as S from "./RemoveDialog.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
// components
import CustomDialog from "components/CustomDialog/CustomDialog";
// utils
import {
  handleMoveToWishlistClick,
  handleRemoveBagItemClick,
} from "utils/bag.utils";
import { useState } from "react";

function RemoveDialog({ currentUser, handleClose, open, item, dispatch }) {
  const [isMovingToWishlist, setIsMovingToWishlist] = useState(false);
  const [isRemovingItem, setRemovingItem] = useState(false);

  const removeFunctionCondition = !isRemovingItem && !isMovingToWishlist;
  const disabledButtonsCondition = isRemovingItem || isMovingToWishlist;

  return (
    <CustomDialog
      heading="remove bag item"
      open={open}
      handleClose={removeFunctionCondition ? handleClose : null}
    >
      <S.RemoveBagItemDialogItemsContainer>
        <S.RemoveBagItemDialogImage
          src={
            (item.images &&
              item.firstImageId &&
              item.images[item.firstImageId].small.url) ||
            ""
          }
          alt="bag-item-img"
        />
        <S.RemoveBagItemDialogDescription>
          Are you sure you want to remove item {item.name}?
        </S.RemoveBagItemDialogDescription>
      </S.RemoveBagItemDialogItemsContainer>
      <S.RemoveBagItemDialogItemsContainer>
        <S.RemoveBagItemDialogButton
          size="small"
          disabled={disabledButtonsCondition}
          hasLoading
          isLoading={isMovingToWishlist}
          loadingText="moving to wishlist"
          onClick={
            removeFunctionCondition
              ? async () => {
                  setIsMovingToWishlist(true);
                  await handleMoveToWishlistClick(
                    currentUser.id,
                    item,
                    dispatch
                  );
                  setIsMovingToWishlist(true);
                  handleClose();
                }
              : null
          }
          isActive
          color="pink"
        >
          Move To Wishlist
        </S.RemoveBagItemDialogButton>
        <S.RemoveBagItemDialogButton
          color="red"
          isActive
          disabled={disabledButtonsCondition}
          hasLoading
          isLoading={isRemovingItem}
          loadingText="removing from bag"
          size="small"
          onClick={
            removeFunctionCondition
              ? async () => {
                  setRemovingItem(true);
                  await handleRemoveBagItemClick(
                    currentUser.id,
                    item.id,
                    dispatch
                  );
                  setRemovingItem(true);
                  handleClose();
                }
              : null
          }
        >
          Remove
        </S.RemoveBagItemDialogButton>
      </S.RemoveBagItemDialogItemsContainer>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(RemoveDialog);
