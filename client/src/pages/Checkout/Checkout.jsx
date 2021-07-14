import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
// styles
import * as S from "./Checkout.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCheckoutCartItems,
  selectCurrentCheckoutStep,
  selectNextCheckoutStep,
} from "redux/checkout/checkout.selectors";
import {
  checkCheckoutStep,
  setCheckoutToDefault,
  setCurrentCheckoutStep,
} from "redux/checkout/checkout.actions";
// components
import ProgressIndicators from "components/Checkout/ProgressIndicators/ProgressIndicators";
import CartItemsList from "components/Checkout/CartItemsList/CartItemsList";
import ShippingAddress from "components/Checkout/ShippingAddress/ShippingAddress";
import Payment from "components/Checkout/Payment/Payment";
import OrderStatus from "components/Checkout/OrderStatus/OrderStatus";

// utils
import { scrollWindowToTop } from "utils/app.utils";

function Checkout({
  cartItems,
  checkCheckoutStep,
  setCurrentStep,
  currentStep,
  nextStep,
  checkedSteps,
  setCheckoutToDefault,
}) {
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    setCurrentStep(match.params.checkoutOption);
  }, [match.params.checkoutOption]);

  const nextButtonHandler = () => {
    if (currentStep === "orderStatus") {
      history.push(`/`);
    } else {
      checkCheckoutStep(currentStep);
      history.push(`/checkout/${nextStep}`);
    }
  };

  useEffect(() => {
    scrollWindowToTop();
    return () => {
      setCheckoutToDefault();
    };
  }, []);
  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <S.StyledCheckoutCustomContainer size="large">
      <ProgressIndicators />
      <S.CheckoutPanelContainer>
        {currentStep === "items" && (
          <CartItemsList
            onNextClick={nextButtonHandler}
            onGoBackClick={goBackHandler}
            cartItems={cartItems}
          />
        )}
        {currentStep === "address" && (
          <ShippingAddress
            onNextClick={nextButtonHandler}
            onGoBackClick={goBackHandler}
          />
        )}
        {currentStep === "payment" && (
          <Payment
            onNextClick={nextButtonHandler}
            onGoBackClick={goBackHandler}
          />
        )}
        {currentStep === "orderStatus" && (
          <OrderStatus onNextClick={nextButtonHandler} />
        )}
      </S.CheckoutPanelContainer>
    </S.StyledCheckoutCustomContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCheckoutCartItems,
  currentStep: selectCurrentCheckoutStep,
  nextStep: selectNextCheckoutStep,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentStep: (currentStep) =>
    dispatch(setCurrentCheckoutStep(currentStep)),
  checkCheckoutStep: (checkedStep) => dispatch(checkCheckoutStep(checkedStep)),
  setCheckoutToDefault: () => dispatch(setCheckoutToDefault()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
