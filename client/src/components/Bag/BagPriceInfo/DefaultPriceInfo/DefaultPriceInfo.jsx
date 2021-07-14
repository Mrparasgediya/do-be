import React from "react";
// styles
import * as S from "./DefaultPriceInfo.styles";

function DefaultPriceInfo({
  noOfItems,
  totalMRP,
  totalDiscount,
  finalPrice,
  ...otherProps
}) {
  return (
    <S.DefaultPriceInfoContainer {...otherProps}>
      <S.DefaultPriceHeading>
        <span>price details</span>
        <S.DefaultPriceHeadingQty>
          ( {noOfItems} item )
        </S.DefaultPriceHeadingQty>
      </S.DefaultPriceHeading>
      <S.DefaultPriceInfo>
        <span>Total MRP</span>
        <span>₹{totalMRP}</span>
      </S.DefaultPriceInfo>
      <S.DefaultPriceInfoDiscount>
        <span>Discount on MRP</span>
        <span>₹{totalDiscount}</span>
      </S.DefaultPriceInfoDiscount>
      <S.DefaultPriceInfoLine />
      <S.DefaultPriceInfo hasBoldFont>
        <span>Total amount</span>
        <span>₹{finalPrice}</span>
      </S.DefaultPriceInfo>
      {isNaN(finalPrice) && (
        <S.DefaultPriceNaNPriceMessage>
          Please Refresh the page.
        </S.DefaultPriceNaNPriceMessage>
      )}
    </S.DefaultPriceInfoContainer>
  );
}

export default DefaultPriceInfo;
