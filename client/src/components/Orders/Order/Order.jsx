import React from "react";
// styles
import * as S from "./Order.styles";
// redux
import { connect } from "react-redux";
import {
  setOrderToCancel,
  toggleCancelOrderDialog,
} from "redux/user/orders/orders.actions";
// components
import OrderItem from "../OrderItem/OrderItem";

function Order({ order, setOrderToCancel, toggleCancelOrderDialog }) {
  const { id: orderId, status, paymentDetails } = order;

  let statusInfo;
  if (status === "cancelled") {
    statusInfo = (
      <S.OrderStatusContainer status="cancelled">
        <S.OrderStautsText color="red">Cancelled</S.OrderStautsText>
        <S.OrderStautsText color="gray">
          {order.reasonToCancel}.
        </S.OrderStautsText>
      </S.OrderStatusContainer>
    );
  }

  if (status === "fulfilled") {
    statusInfo = (
      <S.OrderStatusContainer status="fulfilled">
        <S.OrderStautsText color="green">
          Delivered on{" "}
          {(order.deliveredAt && new Date(order.deliveredAt).toDateString()) ||
            ""}
        </S.OrderStautsText>
        <S.OrderStautsText color="gray">
          Your order has been delivered.
        </S.OrderStautsText>
      </S.OrderStatusContainer>
    );
  }

  if (status === "pending") {
    statusInfo = (
      <S.OrderStatusContainer status="pending">
        <S.OrderStautsText color="skyblue">Pending</S.OrderStautsText>
        <S.StyledOrderStatusPendingCustomButton
          onClick={() => {
            setOrderToCancel(orderId);
            toggleCancelOrderDialog();
          }}
          color="red"
          size="small"
        >
          {window.innerWidth > 768 ? "Cancel Order" : "Cancel"}
        </S.StyledOrderStatusPendingCustomButton>
      </S.OrderStatusContainer>
    );
  }
  return (
    <S.OrderContainer key={orderId}>
      <S.OrderStatusOrderIdHeading>
        Order Id : {orderId}
      </S.OrderStatusOrderIdHeading>
      <S.OrderStatusPaymentModeHeading>
        Payment Mode: {(paymentDetails && paymentDetails.mode) || ""}
      </S.OrderStatusPaymentModeHeading>
      <S.OrderStatusPaymentModeHeading>
        Order Items :
      </S.OrderStatusPaymentModeHeading>
      <S.OrderStatusItemsContainer container spacing={3}>
        {order.items &&
          Object.keys(order.items).map((itemId, idx) => (
            <OrderItem
              item={{ id: itemId, ...order.items[itemId] }}
              key={idx}
            />
          ))}
      </S.OrderStatusItemsContainer>
      <S.OrderStatusInfoContainer>
        <S.OrderStatusHeading>Order Status :</S.OrderStatusHeading>
        {statusInfo}
      </S.OrderStatusInfoContainer>
    </S.OrderContainer>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setOrderToCancel: (orderId) => dispatch(setOrderToCancel(orderId)),
  toggleCancelOrderDialog: () => dispatch(toggleCancelOrderDialog()),
});
export default connect(null, mapDispatchToProps)(Order);
