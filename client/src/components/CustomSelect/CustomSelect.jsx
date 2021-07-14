import React from "react";
import * as S from "./CustomSelect.styles";

function CustomSelect({ options, color, label, ...props }) {
  return (
    <S.StyledCustomSelectFormControl selectcolor={color}>
      {label && (
        <S.StyledCustomSelectInputLabel>{label}</S.StyledCustomSelectInputLabel>
      )}
      <S.StyledCustomSelect {...props}>
        {options &&
          options.map((option, idx) => (
            <S.StyledCustomSelectMenuItem key={idx} value={option}>
              {option}
            </S.StyledCustomSelectMenuItem>
          ))}
      </S.StyledCustomSelect>
    </S.StyledCustomSelectFormControl>
  );
}

export default CustomSelect;
