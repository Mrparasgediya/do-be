import React from "react";
// styles
import * as S from "./NavigationButtons.styles";
// components
import CustomButton from "components/CustomButton/CustomButton";

function NavigationButtons({
  onGoBackClick,
  onNextClick,
  nextButtonType = "button",
  hideGoBackButton,
  hideNextButton,
  disableBackButton,
  disableNextButton,
}) {
  return (
    <S.StyledNavigationButtonsContainer>
      {!hideGoBackButton && (
        <CustomButton
          type="button"
          color="black"
          size="xs"
          onClick={onGoBackClick}
          disabled={disableBackButton}
        >
          go back
        </CustomButton>
      )}
      {!hideNextButton && (
        <CustomButton
          onClick={onNextClick}
          color="pink"
          size="xs"
          type={nextButtonType}
          disabled={disableNextButton}
        >
          next
        </CustomButton>
      )}
    </S.StyledNavigationButtonsContainer>
  );
}

export default NavigationButtons;
