import React, { useRef, useState } from "react";
import API from "api";
// styles
import * as S from "./CancelDialog.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCancelOrderDialog,
  selectOrderToCancel,
} from "redux/user/orders/orders.selectors";
import {
  setOrderToCancel,
  toggleCancelOrderDialog,
  cancelOrder as cancelOrderFromRedux,
} from "redux/user/orders/orders.actions";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
// utils
import { cancelOrder } from "firebase/orders.utils";

function CancelDialog({
  cancelOrderDialog,
  setOrderToCancel,
  toggleCancelOrderDialog,
  selectedOrder,
  cancelOrderFromRedux,
  showNotification,
}) {
  const inputRef = useRef();
  const { id: orderId, paymentDetails, items } = selectedOrder;
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setOrderToCancel(undefined);
    toggleCancelOrderDialog();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { amount, paymentId, mode } = paymentDetails;
    const cancelReason = inputRef.current.value;
    let isMoneyRefunded = false;
    try {
      console.log(amount, paymentId);
      if (mode === "card") {
        const { data } = await API.post("/payments/refund", {
          amount,
          paymentId,
        });
        const { status } = data;
        if (status === "success") {
          isMoneyRefunded = true;
        }
      }
      // cancel from firebase
      await cancelOrder(
        orderId,
        items,
        isMoneyRefunded,
        cancelReason,
        paymentDetails
      );
      // cancel from redux
      cancelOrderFromRedux(orderId, cancelReason, isMoneyRefunded);
      setIsLoading(false);
      handleClose();
      showNotification("Order is cancelled successfully.", "success");
    } catch (error) {
      setIsLoading(false);
      showNotification(error.message, "error");
    }
  };
  return (
    <CustomDialog
      open={cancelOrderDialog}
      handleClose={!isLoading ? handleClose : null}
      aria-describedby="cancel-item-dialog-description"
      heading={"cancel order"}
    >
      <S.CancelDialogDescriptionContainer>
        <p>
          Your order id is <b>{orderId}</b>.
        </p>
        <p>
          This order has <b>{items && Object.keys(items).length}</b> items.
        </p>
        {paymentDetails && paymentDetails.mode === "card" && (
          <p>
            Your amount <b>Rs.{paymentDetails && paymentDetails.amount}</b> will
            be refunded soon
          </p>
        )}
        <b>Are you sure you want to cancel Order ? </b>
      </S.CancelDialogDescriptionContainer>

      <br />
      <S.CancelDialogForm onSubmit={handleSubmit}>
        <S.StyledCancelDialogInputField
          type="text"
          ref={inputRef}
          required
          label="Reason for cancel"
        />
        <CustomButton
          hasLoading
          disabled={isLoading}
          isLoading={isLoading}
          isActive
          size="small"
          color="red"
        >
          Cancel Now
        </CustomButton>
      </S.CancelDialogForm>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  cancelOrderDialog: selectCancelOrderDialog,
  selectedOrder: selectOrderToCancel,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCancelOrderDialog: () => dispatch(toggleCancelOrderDialog()),
  setOrderToCancel: (orderId) => dispatch(setOrderToCancel(orderId)),
  cancelOrderFromRedux: (orderId, reasonToCancel, isMoneyRefunded) =>
    dispatch(cancelOrderFromRedux(orderId, reasonToCancel, isMoneyRefunded)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CancelDialog);
