import React from "react";
import { forwardRef } from "react";
import * as S from "./CustomTextArea.styles";

const CustomTextArea = ({ children, ...otherProps }, forwardedRef) => {
  return (
    <S.StyledCustomTextArea ref={forwardedRef} {...otherProps}>
      {children}
    </S.StyledCustomTextArea>
  );
};

export default forwardRef(CustomTextArea);
