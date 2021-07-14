import React, { useEffect, useState } from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
} from "admin/adminComponents/CustomTable/CustomTable";
import { getOrderById, getOrdersForAdmin } from "firebase/orders.utils";
import CustomButton from "components/CustomButton/CustomButton";
import { Fragment } from "react";
import ShowOrderDetails from "admin/adminComponents/ShowOrderDetails/ShowOrderDetails";
import CustomPagination from "components/CustomPagination/CustomPagination";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentOrders,
  selectCurrentPage,
  selectLastOrderDoc,
  selectNoOfPages,
  selectOrdersIdsArr,
  selectOrderPerPage,
  selectIsRefreshingOrders,
  selectIsOrdersLoading,
} from "redux/admin/orders/orders.selectors";
import {
  addOrders,
  setRefreshOrders,
  setCurrentPage,
  setLastOrderDoc,
  updateOrderInfo,
  toggleIsOrdersLoading,
} from "redux/admin/orders/orders.actions";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import OrderInfoRow from "./OrderInfoRow";
import { showNotification } from "redux/notification/notification.actions";

function Orders({
  ordersPerPage,
  noOfPages,
  addOrders,
  setCurrentPage,
  currentPage,
  setLastOrderDoc,
  lastOrderDoc,
  ordersIdsArr,
  currentOrders,
  isRefreshing,
  setRefreshOrders,
  updateOrderInfo,
  toggleIsOrdersLoading,
  isOrdersLoading,
  showNotification,
}) {
  const [isRefresingPage, setIsRefreshingPage] = useState(false);

  const setOrdersData = (ordersData) => {
    const { orders, lastDoc } = ordersData;
    addOrders(orders);
    setLastOrderDoc(lastDoc);
    if (currentPage === 0) setCurrentPage(1);
  };

  const fetchOrders = async (isInitialLoading = false) => {
    try {
      if (ordersIdsArr.length === 0 || lastOrderDoc) {
        if (isInitialLoading) toggleIsOrdersLoading();
        const [ordersData, error] = await getOrdersForAdmin(
          isInitialLoading ? undefined : lastOrderDoc
        );
        if (error) throw new Error(error);
        setOrdersData(ordersData);
        if (isInitialLoading) toggleIsOrdersLoading();
        if (isRefreshing) setRefreshOrders(false);
      }
    } catch (error) {
      console.log(error);
      if (isInitialLoading) toggleIsOrdersLoading();
    }
  };

  useEffect(() => {
    if (ordersIdsArr.length === 0) {
      fetchOrders(true);
    }
  }, []);

  useEffect(() => {
    if (isRefreshing) fetchOrders(true);
  }, [isRefreshing]);

  useEffect(() => {
    // fetch new orders if there is last page and orders length is equal to orders per page limit
    if (
      currentPage > 0 &&
      currentPage === noOfPages &&
      Object.keys(currentOrders).length === ordersPerPage
    ) {
      fetchOrders();
    }
  }, [currentPage]);

  const refreshCurrentPage = async () => {
    // get all pending orders from current redux orders
    const currentPendingOrders = Object.keys(currentOrders).filter(
      (orderId) => currentOrders[orderId].status === "pending"
    );
    if (currentPendingOrders.length > 0) {
      const orders = {};
      // get order from db
      setIsRefreshingPage(true);
      toggleIsOrdersLoading();
      for (let orderId of currentPendingOrders) {
        try {
          const [{ id, ...restData }, error] = await getOrderById(orderId);
          if (error) throw new Error(error);
          orders[id] = restData;
        } catch (error) {
          setIsRefreshingPage(false);
          console.log("can't update order ", orderId);
        }
      }

      //  get not pending orders from lastes orders
      const ordersIdsToUpdate = Object.keys(orders).filter(
        (orderId) => orders[orderId].status !== "pending"
      );
      // update current orders
      ordersIdsToUpdate.forEach((orderId) => {
        updateOrderInfo(orderId, orders[orderId]);
      });
      toggleIsOrdersLoading();
      setIsRefreshingPage(false);
    } else {
      showNotification("current orders are up to date.", "info");
    }
  };
  return (
    <Fragment>
      <div style={{ minHeight: "75vh", position: "relative" }}>
        <h3>Order</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            height: "5rem",
          }}
        >
          <CustomButton
            size="xs"
            color="black"
            isActive
            onClick={() => setRefreshOrders(true)}
            disabled={isRefreshing}
            hasLoading={true}
            isLoading={isRefreshing}
          >
            Refresh orders
          </CustomButton>
          <CustomButton
            onClick={refreshCurrentPage}
            size="xs"
            color="black"
            isActive
            hasLoading={true}
            disabled={isRefresingPage}
            isLoading={isRefresingPage}
          >
            refresh current page
          </CustomButton>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableData>Id</TableData>
              <TableData>items</TableData>
              <TableData>status</TableData>
              <TableData>payment mode</TableData>
              <TableData>total price</TableData>
              <TableData>puchased by</TableData>
              <TableData>see details</TableData>
              <TableData>cancel</TableData>
              <TableData>fulfill</TableData>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isOrdersLoading &&
              !isRefreshing &&
              currentOrders &&
              (Object.keys(currentOrders).length > 0 ? (
                Object.keys(currentOrders).map((orderId) => (
                  <OrderInfoRow
                    key={orderId}
                    order={{ id: orderId, ...currentOrders[orderId] }}
                  />
                ))
              ) : (
                <tr
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  {(isOrdersLoading || isRefreshing) && (
                    <td>
                      <h4>you don't have problems yet</h4>
                    </td>
                  )}
                </tr>
              ))}
          </TableBody>
        </Table>
        {isOrdersLoading && <LoadingSpinner placeCenter />}
      </div>

      <CustomPagination
        disabled={isOrdersLoading}
        currentPage={currentPage}
        noOfPages={noOfPages}
        onChange={(_, selectedPage) => setCurrentPage(selectedPage)}
      />
      <ShowOrderDetails />
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentPage: selectCurrentPage,
  noOfPages: selectNoOfPages,
  lastOrderDoc: selectLastOrderDoc,
  ordersPerPage: selectOrderPerPage,
  ordersIdsArr: selectOrdersIdsArr,
  currentOrders: selectCurrentOrders,
  isRefreshing: selectIsRefreshingOrders,
  isOrdersLoading: selectIsOrdersLoading,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
  setLastOrderDoc: (lastDoc) => dispatch(setLastOrderDoc(lastDoc)),
  addOrders: (orders) => dispatch(addOrders(orders)),
  setRefreshOrders: (isRefreshing) => dispatch(setRefreshOrders(isRefreshing)),

  updateOrderInfo: (orderId, dataToUpdate) =>
    dispatch(updateOrderInfo(orderId, dataToUpdate)),
  toggleIsOrdersLoading: () => dispatch(toggleIsOrdersLoading()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
