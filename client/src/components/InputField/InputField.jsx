import React, { forwardRef } from "react";
// styles
import * as S from "./InputField.styles";

const InputField = (props, forwardRef) => {
  return (
    <S.StyledInputField color={props.color} inputRef={forwardRef} {...props} />
  );
};

export default forwardRef(InputField);
