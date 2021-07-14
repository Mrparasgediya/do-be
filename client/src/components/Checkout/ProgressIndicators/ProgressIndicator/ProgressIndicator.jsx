import React, { Fragment } from "react";
// styles
import * as S from "./ProgressIndicator.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCheckedCheckoutSteps,
  selectCurrentCheckoutStep,
  selectIsOrderPlacedSuccessfully,
  selectIsOrderPlacing,
} from "redux/checkout/checkout.selectors";

const ProgressIndicator = ({
  innerText,
  step,
  hasNextLine,
  checkedSteps,
  currentStep,
  isOrderPlacedSuccessfull,
  isOrderPlacing,
}) => {
  const isStepChecked = checkedSteps.includes(step);
  const shouldBeFilled = isStepChecked || currentStep === step;

  return (
    <Fragment>
      <S.ProgressDotContainer className="progress-dots__dot__container">
        <S.ProgressDot isfilled={shouldBeFilled} />
        <S.ProgressDotInfo isfilled={shouldBeFilled}>
          {step === "orderStatus" && shouldBeFilled && !isOrderPlacing
            ? isOrderPlacedSuccessfull
              ? "success"
              : "unsuccessful"
            : innerText}
        </S.ProgressDotInfo>
      </S.ProgressDotContainer>
      {hasNextLine && <S.ProgressDotLine isfilled={isStepChecked} />}
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isOrderPlacedSuccessfull: selectIsOrderPlacedSuccessfully,
  checkedSteps: selectCheckedCheckoutSteps,
  currentStep: selectCurrentCheckoutStep,
  isOrderPlacing: selectIsOrderPlacing,
});

export default connect(mapStateToProps)(ProgressIndicator);
