import React from "react";
import { Fragment } from "react";
// styles
import * as S from "./ItemDetail.styles";

function ItemDetail({ heading, text, isMainHeading }) {
  return (
    <Fragment>
      <S.StyledDetailHeading isMainHeading={isMainHeading}>
        {heading}
      </S.StyledDetailHeading>
      <S.StyledDetailText>{text}</S.StyledDetailText>
    </Fragment>
  );
}

export default ItemDetail;
