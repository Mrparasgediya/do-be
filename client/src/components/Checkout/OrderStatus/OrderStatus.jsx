import React, { Fragment, useEffect, useState } from "react";
// styles
import * as S from "./OrderStatus.styles";
// assets
import successPaymentAnimation from "assets/videos/success-payment.json";
import unsuccessFullPaymentAnimation from "assets/videos/unsuccessfull-payment.json";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCheckoutInfoForOrder,
  selectIsOrderPlacedSuccessfully,
  selectIsOrderPlacing,
  selectPaymentDetails,
} from "redux/checkout/checkout.selectors";
import {
  setCheckoutPaymentDetails,
  setIsOrderPlacedSuccessfully,
  setIsPaymentSuccessfull,
  toggleIsOrderPlacing,
} from "redux/checkout/checkout.actions";
import { selectCurrentUserId } from "redux/user/user.selectors";
import { removeItemFromBag } from "redux/user/user.actions";
import { removeBagItem } from "redux/user/bag/bag.actions";
import { addOrder } from "redux/user/orders/orders.actions";
import { addOrderToUser } from "redux/user/user.actions";
// components
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
// utils
import {
  cancelUnsuccessfullOrder,
  createNewOrder,
  updateOrderPaymentDetails,
} from "firebase/orders.utils";
// api
import API from "api";

function OrderStatus({
  onNextClick,
  isOrderPlacedSuccessfully,
  setIsPaymentSuccessfull,
  setIsOrderPlacedSuccessfully,
  orderInfo,
  currentUserId,
  removeBagItem,
  removeItemFromBag,
  setPaymentDetails,
  paymentDetails,
  addOrder,
  addOrderToUser,
  toggleIsOrderPlacing,
  isOrderPlacing,
}) {
  const [currentProgressStatus, setCurrentProgressStatus] = useState("");

  useEffect(() => {
    const makeOrder = async () => {
      let newOrder;
      let isPaymentPaid = false;
      let isOrderPlaced = false;
      let lastestPaymentDetails = paymentDetails;
      let hasError = false;
      try {
        toggleIsOrderPlacing();
        setCurrentProgressStatus("making order");
        // make order
        newOrder = await createNewOrder(orderInfo, currentUserId);
        isOrderPlaced = true;

        if (paymentDetails.mode === "card") {
          setCurrentProgressStatus("making payment");
          const {
            data: { paymentId },
          } = await API.post("/payments/charge", {
            amount: paymentDetails.amount + paymentDetails.fees,
            tokenId: paymentDetails.token,
            customerId: currentUserId,
            orderId: newOrder.id,
          });
          setIsPaymentSuccessfull(true);
          const updatedPaymentDetails = {
            amount: paymentDetails.amount,
            isPaid: true,
            paymentId,
            mode: "card",
            fees: paymentDetails.fees,
          };
          lastestPaymentDetails = updatedPaymentDetails;

          isPaymentPaid = true;
          setPaymentDetails(updatedPaymentDetails);
          setCurrentProgressStatus("updating payment details");
          await updateOrderPaymentDetails(newOrder.id, updatedPaymentDetails);

          newOrder = {
            ...newOrder,
            paymentDetails: updatedPaymentDetails,
          };
        }
        setIsOrderPlacedSuccessfully(true);
        toggleIsOrderPlacing();
      } catch (error) {
        hasError = true;
        // cancel payment
        if (isOrderPlaced) {
          const { amount, mode, paymentId } = lastestPaymentDetails;
          await setTimeout(() => {}, 3999);
          if (isPaymentPaid && mode === "card") {
            // update refund order payments
            await API.post("/payments/refund", {
              amount,
              paymentId,
            });
            setIsPaymentSuccessfull(false);
            setPaymentDetails({});
          }
          await cancelUnsuccessfullOrder(
            newOrder.id,
            currentUserId,
            newOrder.items
          );
        }

        setIsOrderPlacedSuccessfully(false);
        toggleIsOrderPlacing();
      }
      if (!hasError) {
        // remove all items from bag and user
        for (let itemId of Object.keys(newOrder.items)) {
          // remove from currentuser
          removeItemFromBag(itemId);
          // remove from bag
          removeBagItem(itemId);
        }
      }

      const { id: newOrderId, ...otherOrderDetails } = newOrder;
      addOrderToUser(newOrderId);
      addOrder({ [newOrderId]: otherOrderDetails });
    };
    makeOrder();
  }, []);

  const defaultOptions = {
    loop: !isOrderPlacedSuccessfully,
    autoplay: true,
    animationData: isOrderPlacedSuccessfully
      ? successPaymentAnimation
      : unsuccessFullPaymentAnimation,
  };

  return (
    <S.OrderStatusContainer>
      {isOrderPlacing ? (
        <LoadingSpinner
          placeCenter
          hasLoadingText
          displayText={currentProgressStatus}
        />
      ) : (
        <Fragment>
          <S.OrderStatusHeading>
            {isOrderPlacedSuccessfully
              ? "Order placed successfully."
              : "Order was unsuccessfull."}
          </S.OrderStatusHeading>
          <S.StyledOrderStatusLottiePlayer options={defaultOptions} />
          <NavigationButtons onNextClick={onNextClick} hideGoBackButton />
        </Fragment>
      )}
    </S.OrderStatusContainer>
  );
}

const mapStaeToProps = createStructuredSelector({
  isOrderPlacedSuccessfully: selectIsOrderPlacedSuccessfully,
  orderInfo: selectCheckoutInfoForOrder,
  currentUserId: selectCurrentUserId,
  paymentDetails: selectPaymentDetails,
  isOrderPlacing: selectIsOrderPlacing,
});

const mapDispatchToProps = (dispatch) => ({
  setPaymentDetails: (paymentDetails) =>
    dispatch(setCheckoutPaymentDetails(paymentDetails)),
  setIsPaymentSuccessfull: (isPaymentSuccessFull) =>
    dispatch(setIsPaymentSuccessfull(isPaymentSuccessFull)),
  setIsOrderPlacedSuccessfully: (isOrderPlaced) =>
    dispatch(setIsOrderPlacedSuccessfully(isOrderPlaced)),
  removeBagItem: (itemId) => dispatch(removeBagItem(itemId)),
  removeItemFromBag: (itemId) => dispatch(removeItemFromBag(itemId)),
  addOrder: (order) => dispatch(addOrder(order)),
  addOrderToUser: (orderId) => dispatch(addOrderToUser(orderId)),
  toggleIsOrderPlacing: () => dispatch(toggleIsOrderPlacing()),
});

export default connect(mapStaeToProps, mapDispatchToProps)(OrderStatus);
