import { TableRow } from "admin/adminComponents/CustomTable/CustomTable";
import { TableData } from "admin/adminComponents/CustomTable/CustomTable";
import CustomButton from "components/CustomButton/CustomButton";
import React, { Fragment } from "react";
import { useState } from "react";
import {
  cancelOrder as cancelOrderFromDB,
  fulfillOrderByAdmin,
  replaceOrderByAdmin,
} from "firebase/orders.utils";
import API from "api";
import { connect } from "react-redux";
import {
  cancelOrder,
  fulfillOrder,
  replaceOrder,
  setOrderForOperation,
  toggleShowOrderDialog,
} from "redux/admin/orders/orders.actions";
import { createStructuredSelector } from "reselect";
import { selectIsOrdersLoading } from "redux/admin/orders/orders.selectors";

function OrderInfoRow({
  order,
  cancelOrder,
  fulfillOrder,
  setOrderForOperation,
  toggleShowOrderDialog,
  isOrdersLoading,
  replaceOrder,
}) {
  const {
    id: orderId,
    items,
    status,
    paymentDetails,
    contactDetails,
    purchasedBy,
  } = order;
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const [isFulfillingOrder, setIsFulfillingOrder] = useState(false);
  const [isReplacingOrder, setIsReplacingOrder] = useState(false);

  const cancelOrderAsync = async () => {
    let isMoneyRefunded = false;

    try {
      setIsCancellingOrder(true);
      if (paymentDetails.mode === "card") {
        const { paymentId, amount } = paymentDetails;
        // cancel money first

        // refund money
        const { data } = await API.post("/payments/refund", {
          amount,
          paymentId,
        });
        if (data.status === "success") {
          isMoneyRefunded = true;
        } else {
          throw new Error("payment is not successful");
        }
      }
      const updatedDetails = await cancelOrderFromDB(
        orderId,
        items,
        isMoneyRefunded,
        "cancelled by admin",
        paymentDetails
      );

      cancelOrder(orderId, updatedDetails);
      setIsCancellingOrder(false);
    } catch (error) {
      setIsCancellingOrder(false);
      console.log(error);
    }
  };

  const fulfillOrderAsync = async () => {
    try {
      setIsFulfillingOrder(true);
      const dataToUpdate = await fulfillOrderByAdmin(orderId);
      fulfillOrder(orderId, dataToUpdate);
      setIsFulfillingOrder(false);
    } catch (error) {
      console.log(error);
      setIsFulfillingOrder(false);
    }
  };

  const replaceOrderAsync = async () => {
    try {
      setIsReplacingOrder(true);
      const [dataToUpdate, error] = await replaceOrderByAdmin(orderId, items);
      if (error) throw new Error(error);
      replaceOrder(orderId, dataToUpdate);
      setIsReplacingOrder(false);
    } catch (error) {
      console.log("erro from syn ", error);
      setIsReplacingOrder(false);
    }
  };

  const disableButtonCondition =
    isCancellingOrder ||
    isFulfillingOrder ||
    isReplacingOrder ||
    isOrdersLoading;

  return (
    <TableRow key={orderId}>
      <TableData>{orderId}</TableData>
      <TableData>{items && Object.keys(items).length}</TableData>
      <TableData>{status}</TableData>
      <TableData>{paymentDetails.mode}</TableData>
      <TableData>RS .{paymentDetails.amount}</TableData>
      <TableData>{`${purchasedBy} (${contactDetails.name})`}</TableData>
      <TableData>
        <CustomButton
          size="xs"
          color="black"
          isActive
          align="center"
          onClick={() => {
            setOrderForOperation(orderId);
            toggleShowOrderDialog();
          }}
          disabled={disableButtonCondition}
        >
          See details
        </CustomButton>
      </TableData>

      <TableData style={{ minWidth: "150px" }}>
        {(status === "pending" && (
          <CustomButton
            size="xs"
            color="red"
            isActive
            align="center"
            onClick={cancelOrderAsync}
            hasLoading={true}
            isLoading={isCancellingOrder}
            disabled={disableButtonCondition}
            loadingText="cancelling"
          >
            cancel
          </CustomButton>
        )) ||
          ""}
      </TableData>
      <TableData style={{ minWidth: "150px" }}>
        {(status === "pending" && (
          <CustomButton
            size="xs"
            color="green"
            isActive
            align="center"
            loadingText="fulfilling..."
            hasLoading={true}
            isLoading={isFulfillingOrder}
            disabled={disableButtonCondition}
            onClick={fulfillOrderAsync}
          >
            fulfill
          </CustomButton>
        )) ||
          ""}
      </TableData>

      <TableData style={{ minWidth: "150px" }}>
        {(status === "cancelled" && paymentDetails.mode === "cod" && (
          <CustomButton
            size="xs"
            color="skyblue"
            isActive
            align="center"
            onClick={replaceOrderAsync}
            hasLoading={true}
            isLoading={isReplacingOrder}
            disabled={disableButtonCondition}
            loadingText="replacing"
          >
            replace
          </CustomButton>
        )) ||
          ""}
      </TableData>
    </TableRow>
  );
}

const mapStateToProps = createStructuredSelector({
  isOrdersLoading: selectIsOrdersLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cancelOrder: (orderId, dataToUpdate) =>
    dispatch(cancelOrder(orderId, dataToUpdate)),
  fulfillOrder: (orderId, dataToUpdate) =>
    dispatch(fulfillOrder(orderId, dataToUpdate)),
  replaceOrder: (orderId, dataToUpdate) =>
    dispatch(replaceOrder(orderId, dataToUpdate)),
  setOrderForOperation: (orderId) => dispatch(setOrderForOperation(orderId)),
  toggleShowOrderDialog: () => dispatch(toggleShowOrderDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfoRow);
