import React from "react";
// styles
import * as S from "./CustomContainer.styles";

function CustomContainer({
  children,
  size = "large",
  isforcheckout,
  ...otherProps
}) {
  return (
    <S.CustomContainer
      size={size}
      isforcheckout={isforcheckout}
      {...otherProps}
    >
      {children}
    </S.CustomContainer>
  );
}

export default CustomContainer;
