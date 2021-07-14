import React from "react";
// styles
import * as S from "./OrderItem.styles";
// components
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function OrderItem({ item, isForAdmin }) {
  const { brand, name, price, size, quantity, image, totalDiscountRate, id } =
    item;

  const itemContent = (
    <S.OrderItemContainer>
      <S.OrderItemImage src={(image && image.small.url) || ""} alt="" />
      <S.OrderItemContentContainer>
        {isForAdmin && <S.OrderIdContainer>id : {id}</S.OrderIdContainer>}
        <S.OrderItemContentHeading>
          <S.OrderItemBrandAndNameContainer>
            <S.OrderItemBrand>{brand.name}</S.OrderItemBrand>
            <S.OrderItemName>
              {name.length > 50 ? `${name.substring(0, 50)}...` : name}
            </S.OrderItemName>
          </S.OrderItemBrandAndNameContainer>
        </S.OrderItemContentHeading>
        <S.OrderItemPriceContainer>
          <b>
            Rs.
            {Math.floor(price - (price / 100) * totalDiscountRate)}
          </b>
          <div>
            <S.OrderItemMRP>Rs.{price}</S.OrderItemMRP>
            <S.OrderItemDiscount>
              ({totalDiscountRate}% off)
            </S.OrderItemDiscount>
          </div>
        </S.OrderItemPriceContainer>
        <S.OrderItemSizeAndQtyContainer>
          <span>Size: {size}</span>
          <span>Quantity: {quantity}</span>
        </S.OrderItemSizeAndQtyContainer>
      </S.OrderItemContentContainer>
    </S.OrderItemContainer>
  );

  return (
    <Grid item lg={isForAdmin ? 4 : 6} md={isForAdmin ? 6 : 12} xs={12}>
      {isForAdmin ? (
        itemContent
      ) : (
        <Link to={`/items/${id}/preview`}>{itemContent}</Link>
      )}
    </Grid>
  );
}

export default OrderItem;
