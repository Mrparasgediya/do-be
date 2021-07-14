import React from "react";
// styles
import * as S from "./BottomAppBar.styles";

function BottomAppBar({ children, withFlex }) {
  return (
    <S.StyledBottomAppBar position="fixed">
      <S.StyledBottomAppBarToolbar display={withFlex && "flex"}>
        {children}
      </S.StyledBottomAppBarToolbar>
    </S.StyledBottomAppBar>
  );
}

export default BottomAppBar;
