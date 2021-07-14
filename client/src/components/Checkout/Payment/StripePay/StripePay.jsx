import React, { Fragment, useMemo, useState } from "react";
// styles
import * as S from "./StripePay.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsPaymentLoading,
  selectTotalOrderAmount,
} from "redux/checkout/checkout.selectors";
import { toggleIsPaymentLoading } from "redux/checkout/checkout.actions";
import { showNotification } from "redux/notification/notification.actions";
// components
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import NavigationButtons from "../../NavigationButtons/NavigationButtons";

const useOptions = () => {
  const options = useMemo(
    () => ({
      hidePostalCode: true,
      style: {
        base: {
          fontSize: "16px",
          color: "var(--color-gray)",
          letterSpacing: "0.025em",
          fontFamily: "var(--font-family-body)",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

const getStripeAmountWithTaxAndFees = (amount) => {
  const finalAmount = (amount * 100) / 96.46;

  return {
    amount: finalAmount,
    fees: parseFloat((finalAmount - amount).toFixed(2)),
  };
};

const StripePay = ({
  onPaymentSuccess,
  isPaymentLoading,
  toggleIsPaymentLoading,
  totalAmount,
  onGoBackClick,
  showNotification,
}) => {
  const [isStripeReady, setIsStripeReady] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const currentDate = new Date();
  const stripeAmount = getStripeAmountWithTaxAndFees(totalAmount);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return showNotification("stripe or card  not found", "error");
    }

    toggleIsPaymentLoading();

    try {
      const card = elements.getElement(CardElement);
      const data = await stripe.createToken(card);
      const { token } = data;
      if (!token) throw new Error("Can't create token please try later.");
      onPaymentSuccess({
        mode: "card",
        token: token.id,
        isPaid: false,
        amount: totalAmount,
        fees: stripeAmount.fees,
      });
      toggleIsPaymentLoading();
    } catch (error) {
      showNotification(error.message, "error");
      toggleIsPaymentLoading();
    }
  };

  return (
    <Fragment>
      <S.StripePayCardForm displayform={isStripeReady} onSubmit={handleSubmit}>
        <S.StripePayCardElementContainer>
          <CardElement
            options={options}
            onReady={() => {
              setIsStripeReady(true);
            }}
          />
        </S.StripePayCardElementContainer>
        <S.StyledStripePayButton
          color="skyblue"
          size="xs"
          type="submit"
          isActive
          disabled={isPaymentLoading}
          isLoading={isPaymentLoading}
          hasLoading
        >
          {isPaymentLoading ? (
            `Processing...`
          ) : (
            <p>
              Pay Rs.{totalAmount} + Rs.{stripeAmount.fees}
              <S.StripePaySmallText> (fees)</S.StripePaySmallText>
            </p>
          )}
        </S.StyledStripePayButton>
      </S.StripePayCardForm>
      {!isStripeReady && <S.StyledStripePayLoadingSpinner placeCenter />}
      <S.StripePayNoticeContainer>
        <b>Use this card details</b>
        <b>card No: 4242 4242 4242 4242</b>
        <b>
          exp date:
          {` ${
            currentDate.getMonth() + 2 < 12
              ? currentDate.getMonth() + 2
              : currentDate.getMonth()
          }/${(currentDate.getFullYear() + 2).toString().substring(2, 4)}`}
        </b>
        <b>cvv: 103</b>
        <b>
          Note: if order unsuccessfull then <br />
          fees will not be refunded.
        </b>
      </S.StripePayNoticeContainer>
      <NavigationButtons
        onGoBackClick={onGoBackClick}
        hideNextButton
        disableBackButton={isPaymentLoading}
      />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isPaymentLoading: selectIsPaymentLoading,
  totalAmount: selectTotalOrderAmount,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsPaymentLoading: () => dispatch(toggleIsPaymentLoading()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripePay);
