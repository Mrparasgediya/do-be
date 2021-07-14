import React from "react";
// styles
import * as S from "./LoadingSpinner.styles";

const LoadingSpinner = ({
  placeCenter,
  className,
  displayText,
  hasLoadingText,
}) => (
  <S.LoadingSpinnerContainer
    placeCenter={placeCenter}
    className={className}
    displayText={displayText}
    hasLoadingText={hasLoadingText}
  >
    <S.LoadingSpinner />
  </S.LoadingSpinnerContainer>
);

export default LoadingSpinner;
