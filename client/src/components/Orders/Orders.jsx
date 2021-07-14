import React, { useEffect, useState, Fragment } from "react";
// styles
import * as S from "./Orders.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
import {
  selectOrders,
  selectUnSubscribeUserOrdersMethod,
} from "redux/user/orders/orders.selectors";
import {
  setOrders,
  setUnSubscribeUserOrdersMethod,
  updateOrderInfo,
} from "redux/user/orders/orders.actions";
// components
import Order from "./Order/Order";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import CancelDialog from "./CancelDialog/CancelDialog";
// utils
import { getOrderById } from "firebase/orders.utils";
import { getFirstImageOfItemById } from "firebase/items.utils";
import { db } from "firebase/firebase.utils";
import { showNotification } from "redux/notification/notification.actions";
import { useRef } from "react";
import { getOrderDetailsForUpdate } from "utils/orders.utils";

function Orders({
  currentUser,
  orders,
  setOrders,
  updateOrderInfo,
  showNotification,
  unSubscribeUserOrdersMethod,
  setUnSubscribeUserOrdersMethod,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const setOrdersObserverCurrentOrdersRef = useRef();

  const observeOrders = (initialOrders) => {
    let orders = initialOrders || {};
    return [
      (newOrders) => {
        orders = newOrders;
      },
      () => {
        const unSubscibeListener = db
          .collection("orders")
          .where("purchasedBy", "==", currentUser.id)
          .onSnapshot(async (snapshot) => {
            //  get change value of doc [added,modified,removed]
            snapshot.docChanges().forEach((change) => {
              const { type, doc } = change;
              const order = doc.data();
              if (type === "added") {
                // update redux orders after first initial load all users orders
                if (orders[doc.id] && orders[doc.id].status !== order.status) {
                  updateOrderInfo(doc.id, getOrderDetailsForUpdate(order));
                }
              }
              if (type === "modified") {
                // display if admin cancelled order
                if (
                  order.status === "cancelled" &&
                  order.reasonToCancel === "cancelled by admin"
                ) {
                  showNotification(
                    `order ${doc.id} is cancelled by admin`,
                    "error"
                  );
                }

                // display if admin fulfilled order
                if (order.status === "fulfilled")
                  showNotification(`order ${doc.id} is fulfilled`, "success");

                updateOrderInfo(doc.id, getOrderDetailsForUpdate(order));
              }
            });
          });
        return () => {
          unSubscibeListener();
          orders = null;
        };
      },
    ];
  };

  const fetchOrders = async () => {
    const allOrders = {};
    setIsLoading(true);
    try {
      for (let orderId of currentUser.orders) {
        let foundOrder;
        if (orders[orderId]) {
          foundOrder = { id: orderId, ...orders[orderId] };
        } else {
          let error;
          [foundOrder, error] = await getOrderById(orderId);
          if (error) throw new Error(error);
        }

        const { id, items, ...otherOrderData } = foundOrder;
        const orderItems = {};

        for (let itemId of Object.keys(items)) {
          // use existing image
          let image = orders[orderId] && orders[orderId].items[itemId].image;

          if (!image) {
            // if image is not exists then fetch it from firebase
            let error;
            [image, error] = await getFirstImageOfItemById(itemId);
            if (error) throw new Error(error);
          }

          orderItems[itemId] = {
            ...items[itemId],
            image,
          };
        }

        allOrders[id] = {
          ...otherOrderData,
          items: orderItems,
        };
      }
      setOrders(allOrders);
      if (!unSubscribeUserOrdersMethod) {
        const [setObserverOrdersData, unsubscribeFromOrders] =
          observeOrders(allOrders);
        setOrdersObserverCurrentOrdersRef.current = setObserverOrdersData;
        setUnSubscribeUserOrdersMethod(unsubscribeFromOrders());
      }
      setIsLoading(false);
    } catch (error) {
      showNotification(error.message, "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      currentUser &&
      currentUser.orders &&
      Object.keys(currentUser.orders).length > 0
    ) {
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    // update redux order for listener if listener is active
    if (setOrdersObserverCurrentOrdersRef.current) {
      setOrdersObserverCurrentOrdersRef.current(orders);
    }
  }, [orders]);

  // useEffect(() => {
  //   const unSubscribeOrdersListener =
  //       // const updatedOrders = snapshot.docs.reduce(
  //       //   (allDocs, doc) => ({ ...allDocs, [doc.id]: doc.data() }),
  //       //   {}
  //       // );

  //       // const ordersToUpdate = Object.keys(orders).filter(
  //       //   (orderId) => orders[orderId].status !== updatedOrders[orderId].status
  //       // );

  //       // update order if order is update to db
  //     });
  //   return () => {
  //     unSubscribeOrdersListener();
  //   };
  // }, []);

  return (
    <Fragment>
      <S.OrdersContainer aligntextcenter={Object.keys(orders).length === 0}>
        {isLoading ? (
          <LoadingSpinner placeCenter />
        ) : Object.keys(orders).length > 0 ? (
          Object.keys(orders).map((orderId) => (
            <Order order={{ id: orderId, ...orders[orderId] }} key={orderId} />
          ))
        ) : (
          <S.OrdersNotPlaced>You Have not placed order yet!</S.OrdersNotPlaced>
        )}
      </S.OrdersContainer>
      <CancelDialog />
    </Fragment>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  orders: selectOrders,
  unSubscribeUserOrdersMethod: selectUnSubscribeUserOrdersMethod,
});

const mapDispatchToProps = (dispatch) => ({
  setOrders: (orders) => dispatch(setOrders(orders)),
  updateOrderInfo: (orderId, dataToUpdate) =>
    dispatch(updateOrderInfo(orderId, dataToUpdate)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  setUnSubscribeUserOrdersMethod: (method) =>
    dispatch(setUnSubscribeUserOrdersMethod(method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
