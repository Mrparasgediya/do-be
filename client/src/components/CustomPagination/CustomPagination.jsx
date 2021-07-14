import React from "react";
// styles
import * as S from "./CustomPagination.styles";

function CustomPagination({ noOfPages, currentPage, ...otherProps }) {
  return (
    <S.StyledPagination count={noOfPages} page={currentPage} {...otherProps} />
  );
}

export default CustomPagination;
