import React from "react";
// styled
import * as S from "./CartItem.styles";
// redux
import { connect } from "react-redux";
import { removeCheckoutCartItem } from "redux/checkout/checkout.actions";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomButton from "components/CustomButton/CustomButton";
import CustomImage from "components/CustomImage/CustomImage";
// utils
import { getItemTotalPriceWithQty } from "utils/redux.utils";

function CartItem({ item, removeCheckoutCartItem, showNotification }) {
  const {
    id,
    name,
    images,
    brand,
    selectedQty,
    selectedSize,
    oldPrice,
    newPrice,
    totalDiscountRate,
  } = item;

  const { totalPrice, totalDiscount: totalDiscountPrice } =
    getItemTotalPriceWithQty(item);

  return (
    <S.CartItemContainer>
      <S.CartItemImageContainer>
        <CustomImage
          type="cartItemImage"
          src={images[Object.keys(images)[0]].org.url}
          srcSet={images[Object.keys(images)[0]].small.url}
          placeholderSrc={images[Object.keys(images)[0]].small.blur}
        />
      </S.CartItemImageContainer>
      <S.CartItemInfoContainer>
        <div>
          <S.CartItemBrandAndNameContainer>
            <S.CartItemBrand>{brand.name}</S.CartItemBrand>
            <S.CartItemName>
              {name.length > 30 ? `${name.substring(0, 30)}...` : name}
            </S.CartItemName>
          </S.CartItemBrandAndNameContainer>
          <S.CartItemPriceContainer>
            <h4>Rs. {newPrice}</h4>
            <S.CartItemMRPAndDiscountContainer>
              <S.CartItemMRP>Rs.{oldPrice}</S.CartItemMRP>
              <S.CartItemDiscount>
                ({totalDiscountRate}% OFF)
              </S.CartItemDiscount>
            </S.CartItemMRPAndDiscountContainer>
          </S.CartItemPriceContainer>
        </div>
        <S.CartItemSizeAndQtyContainer>
          <h4>Size : {selectedSize}</h4>
          <h4>Quantity : {selectedQty}</h4>
        </S.CartItemSizeAndQtyContainer>
        <S.CartItemTotalContainer>
          <div>
            Rs. {totalPrice}
            {` ( ${oldPrice} X ${selectedQty})`}
          </div>
          <S.CartItemTotalDiscountInfo>
            Rs. {totalDiscountPrice}
            {` ( ${totalDiscountRate} X ${selectedQty})`}
          </S.CartItemTotalDiscountInfo>
          <S.StyledCartItemHr />
          <div>Rs. {totalPrice - totalDiscountPrice}</div>
        </S.CartItemTotalContainer>

        <CustomButton
          onClick={() => {
            try {
              removeCheckoutCartItem(id);
              showNotification("item is removed from checkout items.", "info");
            } catch (error) {
              showNotification(error.message, "error");
            }
          }}
          size="xs"
          color="red"
        >
          Remove Item
        </CustomButton>
      </S.CartItemInfoContainer>
    </S.CartItemContainer>
  );
}
const mapDispatchToProps = (dispatch) => ({
  removeCheckoutCartItem: (itemId) => dispatch(removeCheckoutCartItem(itemId)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});
export default connect(null, mapDispatchToProps)(CartItem);
