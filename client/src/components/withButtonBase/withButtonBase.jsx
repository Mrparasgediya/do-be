import React from "react";
// styles
import * as S from "./withButtonBase.styles";

function withButtonBase(WrappedComponent) {
  const isSmallScreen = window.screen.width < 769 ? true : false;

  return ({ hasSkyBlueTouchEffect, ...otherProps }) => {
    return isSmallScreen ? (
      <S.StyledButtonBase color={hasSkyBlueTouchEffect ? "#0bbcde" : "#de2172"}>
        <WrappedComponent {...otherProps} />
      </S.StyledButtonBase>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
}

export default withButtonBase;
