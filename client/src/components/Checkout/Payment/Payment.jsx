import React, { Fragment } from "react";
// styles
import * as S from "./Payment.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setCheckoutPaymentDetails,
  setCurrentPaymentOption,
  setIsPaymentSuccessfull,
} from "redux/checkout/checkout.actions";
import {
  selectCurrentPaymentOption,
  selectIsPaymentLoading,
  selectTotalOrderAmount,
} from "redux/checkout/checkout.selectors";
// components
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import StripePay from "./StripePay/StripePay";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(); // stripe public key

function Payment({
  onGoBackClick,
  onNextClick,
  setCheckoutPaymentDetails,
  setCurrentPaymentOption,
  currentPaymentOption,
  isPaymentLoading,
  totalAmount,
}) {
  const paymentSuccessHandler = (paymentInfo) => {
    setCheckoutPaymentDetails(paymentInfo);
    onNextClick();
  };

  return (
    <S.StyledPaymentContainer>
      <h4>Select Payment Option</h4>
      <S.StyledPaymentSelectContainer currentoption={currentPaymentOption}>
        <S.StyledPaymentSelectInput
          disabled={isPaymentLoading}
          type="checkbox"
          onClick={(e) =>
            setCurrentPaymentOption(e.target.checked ? "card" : "cod")
          }
        />
        <S.StyledPaymentSelectTextContainer>
          <S.StyledPaymentSelectText
            isselected={currentPaymentOption === "cod"}
          >
            COD
          </S.StyledPaymentSelectText>
          <S.StyledPaymentSelectText
            isselected={currentPaymentOption === "card"}
          >
            Pay With Stripe
          </S.StyledPaymentSelectText>
        </S.StyledPaymentSelectTextContainer>
      </S.StyledPaymentSelectContainer>
      <S.StyledPaymentDetailsContainer>
        {currentPaymentOption === "cod" && (
          <Fragment>
            <S.StyledPaymenCODContainer>
              <S.StyledPaymentCODHeading>{`Total Price : Rs.${totalAmount}`}</S.StyledPaymentCODHeading>
              <S.StyledPaymentCODText>
                You can pay via Cash/Card. Ask your delivery executive for these
                options
              </S.StyledPaymentCODText>
            </S.StyledPaymenCODContainer>
            <NavigationButtons
              onGoBackClick={onGoBackClick}
              onNextClick={() => {
                paymentSuccessHandler({ mode: "cod", amount: totalAmount });
              }}
            />
          </Fragment>
        )}

        {currentPaymentOption === "card" && (
          <Elements stripe={stripePromise}>
            <StripePay
              onPaymentSuccess={paymentSuccessHandler}
              onGoBackClick={onGoBackClick}
            />
          </Elements>
        )}
      </S.StyledPaymentDetailsContainer>
    </S.StyledPaymentContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentPaymentOption: selectCurrentPaymentOption,
  isPaymentLoading: selectIsPaymentLoading,
  totalAmount: selectTotalOrderAmount,
});

const mapDispatchToProps = (dispatch) => ({
  setCheckoutPaymentDetails: (paymentDetails) =>
    dispatch(setCheckoutPaymentDetails(paymentDetails)),
  setCurrentPaymentOption: (paymentOption) =>
    dispatch(setCurrentPaymentOption(paymentOption)),
  setIsPaymentSuccessfull: (isPaymentSuccessfull) =>
    dispatch(setIsPaymentSuccessfull(isPaymentSuccessfull)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
