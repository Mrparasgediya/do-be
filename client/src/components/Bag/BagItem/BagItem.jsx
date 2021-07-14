import React, { useState, useEffect } from "react";
// styles
import * as S from "./BagItem.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
import { updateSelectedSizeAndQtyOfBagItem } from "redux/user/bag/bag.actions";
// components
import { Link } from "react-router-dom";
import CustomButton from "components/CustomButton/CustomButton";
import RemoveDialog from "./RemoveDialog/RemoveDialog";
import CustomSelect from "components/CustomSelect/CustomSelect";
import CustomImage from "components/CustomImage/CustomImage";
// utils
import { handleMoveToWishlistClick } from "utils/bag.utils";

function BagItem({ item, currentUser, dispatch }) {
  // set img url to styled component
  const {
    id,
    brand,
    name,
    images,
    quantity,
    newPrice,
    oldPrice,
    totalDiscountRate,
    firstImageId,
  } = item;
  const [selectedSize, setSelectedSize] = useState("");
  const [message, setMessage] = useState("");
  const [selectedQty, setSelectedQty] = useState("");
  const [toggleRemoveDialogue, setToggleRemoveDialogue] = useState(false);
  const [isMovingToWishlist, setIsMovingToWishlist] = useState(false);

  const updateSizeAndQtyToRedux = (itemId, size, qty) => {
    dispatch(updateSelectedSizeAndQtyOfBagItem(itemId, size, qty));
  };

  useEffect(() => {
    const { selectedSize, selectedQty } = item;
    if (selectedSize && selectedQty) {
      setSelectedSize(selectedSize);
      setSelectedQty(selectedQty);
    }
  }, [item]);

  useEffect(() => {
    if (message) {
      setMessage("");
    }
    if (selectedSize && selectedQty) {
      updateSizeAndQtyToRedux(item.id, selectedSize, selectedQty);
    } else {
      if (!selectedSize) {
        setMessage("selecte size");
      } else {
        if (quantity[selectedSize] === 0) {
          setMessage("Item is out of stock.");
        } else {
          setMessage("selecte quantity");
        }
      }
    }
  }, [selectedSize, selectedQty, quantity]);

  return (
    <React.Fragment>
      <S.BagItemContainer>
        <S.BagItemImageContainer to={`/items/${item.id}/preview`}>
          <CustomImage
            src={(firstImageId && images[firstImageId].org.url) || ""}
            srcSet={(firstImageId && images[firstImageId].small.url) || ""}
            placeholderSrc={
              (firstImageId && images[firstImageId].small.blur) || ""
            }
            alt={`item-${id}-img`}
          />
        </S.BagItemImageContainer>
        <S.BagItemInfoContainer>
          <Link to={`/items/${item.id}/preview`}>
            <S.BagItemNameAndPriceContainer>
              <S.BagItemNameAndBrandContainer>
                <S.BagItemBrandName>{brand.name}</S.BagItemBrandName>
                <S.BagItemName>
                  {window.innerWidth < 768 && name.length > 30
                    ? `${name.substring(
                        0,
                        window.innerWidth < 425 ? 30 : 50
                      )}...`
                    : name}
                </S.BagItemName>
              </S.BagItemNameAndBrandContainer>
              <S.BagItemPriceContainer>
                <S.BagItemNewPrice>Rs. {newPrice}</S.BagItemNewPrice>
                <S.BagItemMRPandDiscountContainer>
                  <S.BagItemMRP>Rs.{oldPrice}</S.BagItemMRP>
                  <S.BagItemDiscount>
                    ({totalDiscountRate}% OFF)
                  </S.BagItemDiscount>
                </S.BagItemMRPandDiscountContainer>
              </S.BagItemPriceContainer>
            </S.BagItemNameAndPriceContainer>
          </Link>
          <S.BagItemSizeAndQtyContainer>
            <S.BagItemSelectMenu>
              <S.BagItemSelectMenuHeading>Size</S.BagItemSelectMenuHeading>
              <CustomSelect
                color="pink"
                options={Object.keys(quantity)}
                value={selectedSize}
                disabled={isMovingToWishlist}
                onChange={(e) => {
                  const selectedSize = e.target.value;
                  if (quantity[selectedSize] < selectedQty)
                    setSelectedQty(quantity[selectedSize]);
                  setSelectedSize(selectedSize);
                }}
              />
            </S.BagItemSelectMenu>
            <S.BagItemSelectMenu>
              <S.BagItemSelectMenuHeading>Quantity</S.BagItemSelectMenuHeading>

              <CustomSelect
                color="pink"
                disabled={
                  !!!selectedSize ||
                  quantity[selectedSize] === 0 ||
                  isMovingToWishlist
                }
                options={Array(
                  quantity[selectedSize] <= 0
                    ? 0
                    : quantity[selectedSize] > 4
                    ? 5
                    : quantity[selectedSize]
                )
                  .fill(undefined)
                  .map((_, idx) => idx + 1)}
                value={selectedQty}
                onChange={(e) => setSelectedQty(parseInt(e.target.value))}
              />
            </S.BagItemSelectMenu>

            <S.BagItemErrorMessage>{message}</S.BagItemErrorMessage>
          </S.BagItemSizeAndQtyContainer>
          <S.BagItemButtonsContainer>
            <CustomButton
              color="pink"
              size="small"
              hasLoading
              loadingText="moving to wishlist"
              isLoading={isMovingToWishlist}
              disabled={isMovingToWishlist}
              onClick={
                !isMovingToWishlist
                  ? async () => {
                      setIsMovingToWishlist(true);
                      updateSizeAndQtyToRedux(item.id, undefined, undefined);
                      await handleMoveToWishlistClick(
                        currentUser.id,
                        item,
                        dispatch
                      );
                      setIsMovingToWishlist(false);
                    }
                  : null
              }
            >
              Move To Wishlist
            </CustomButton>
            <CustomButton
              color="red"
              size="small"
              onClick={() => setToggleRemoveDialogue(!toggleRemoveDialogue)}
              disabled={isMovingToWishlist}
            >
              Remove
            </CustomButton>
          </S.BagItemButtonsContainer>
        </S.BagItemInfoContainer>
      </S.BagItemContainer>
      <RemoveDialog
        item={item}
        handleClose={() => setToggleRemoveDialogue(!toggleRemoveDialogue)}
        open={toggleRemoveDialogue}
      />
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(BagItem);
