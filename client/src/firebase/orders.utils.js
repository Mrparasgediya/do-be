import { db } from "./firebase.utils";
import { addItemQty, reduceItemQuantity } from "./items.utils";
import {
  addItemToUserBag,
  addOrderToUser,
  deleteItemFromUserBag,
  removeOrderFromUser,
} from "./users.utils";
const ORDERS_PER_PAGE_FOR_ADMIN = 10;

const ordersRef = db.collection("orders");

export const createNewOrder = async (newOrderInfo, userId) => {
  const newOrder = {
    ...newOrderInfo,
    purchasedBy: userId,
    createdAt: Date.now(),
  };

  try {
    const orderItemsIds = Object.keys(newOrder.items);
    //  reduce qty of items
    await Promise.all(
      orderItemsIds.map(async (itemId) => {
        const { size, quantity } = newOrder.items[itemId];
        return await reduceItemQuantity(itemId, size, quantity);
      })
    );
    // make order first
    const newOrderSnapshot = await ordersRef.add(newOrder);
    const orderId = newOrderSnapshot.id;

    // after making order update user

    const [, error] = await addOrderToUser(userId, orderId);
    if (error) throw new Error(error);
    // remove all orderitems from bag
    for (let itemId of orderItemsIds) {
      const [, error] = await deleteItemFromUserBag(userId, itemId);
      if (error) throw new Error(error);
    }

    return {
      id: orderId,
      ...newOrder,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderPaymentDetails = async (orderId, paymentDetails) => {
  const orderRef = ordersRef.doc(orderId);
  try {
    await orderRef.update({
      paymentDetails,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (orderId) => {
  const orderRef = ordersRef.doc(orderId);
  try {
    const orderSnapshot = await orderRef.get();
    return [
      {
        id: orderSnapshot.id,
        ...orderSnapshot.data(),
      },
      null,
    ];
  } catch (error) {
    return [null, error];
  }
};

export const cancelUnsuccessfullOrder = async (
  orderId,
  customrId,
  orderItems
) => {
  const orderRef = ordersRef.doc(orderId);
  try {
    const orderItemsIds = Object.keys(orderItems);
    // remove order from user
    const [, error] = await removeOrderFromUser(customrId, orderId);
    if (error) throw new Error(error);
    // add bag items to user

    for (let itemId of orderItemsIds) {
      const [, error] = await addItemToUserBag(customrId, itemId);
      if (error) throw new Error(error);
    }

    // add qty to item
    await Promise.all(
      orderItemsIds.map(async (itemId) => {
        const { quantity, size } = orderItems[itemId];
        return await addItemQty(itemId, size, quantity);
      })
    );
    // delete order
    await orderRef.delete();
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = async (
  orderId,
  orderItems,
  isMoneyRefunded,
  reasonToCancel,
  paymentDetails
) => {
  const orderRef = ordersRef.doc(orderId);
  try {
    const orderItemsIds = Object.keys(orderItems);
    const dataToUpdate = { status: "cancelled" };
    if (reasonToCancel) dataToUpdate["reasonToCancel"] = reasonToCancel;
    if (paymentDetails.mode === "card")
      dataToUpdate["paymentDetails"] = { ...paymentDetails, isMoneyRefunded };

    // add qty to item
    await Promise.all(
      orderItemsIds.map(async (itemId) => {
        const { quantity, size } = orderItems[itemId];
        return await addItemQty(itemId, size, quantity);
      })
    );
    await orderRef.update(dataToUpdate);
    return dataToUpdate;
  } catch (error) {
    console.log(error);
  }
};

const getOrdersFromDocs = (docs) =>
  docs.reduce((allDocs, doc) => ({ ...allDocs, [doc.id]: doc.data() }), {});

const getOrdersForAdminByQuery = async (query) => {
  try {
    const querySnapshot = await query.get();

    return [
      {
        orders: getOrdersFromDocs(querySnapshot.docs),
        lastDoc:
          querySnapshot.docs.length === ORDERS_PER_PAGE_FOR_ADMIN
            ? querySnapshot.docs[querySnapshot.docs.length - 1]
            : undefined,
      },
      null,
    ];
  } catch (error) {
    return [null, error];
  }
};

export const getNextOrders = (lastDoc, status) => {
  let query = ordersRef
    .orderBy("createdAt", "desc")
    .startAfter(lastDoc)
    .limit(ORDERS_PER_PAGE_FOR_ADMIN);
  if (status && status !== "all") {
    query = query.where("status", "==", status);
  }

  return getOrdersForAdminByQuery(query);
};

export const getOrdersForAdmin = (lastDoc, status) => {
  if (lastDoc) {
    return getNextOrders(lastDoc, status);
  } else {
    let query = ordersRef
      .orderBy("createdAt", "desc")
      .limit(ORDERS_PER_PAGE_FOR_ADMIN);
    if (status && status !== "all") {
      query = query.where("status", "==", status);
    }

    return getOrdersForAdminByQuery(query);
  }
};

export const fulfillOrderByAdmin = async (orderId) => {
  const orderRef = ordersRef.doc(orderId);
  try {
    const dataToUpdate = { status: "fulfilled", deliveredAt: Date.now() };
    await orderRef.update(dataToUpdate);
    return dataToUpdate;
  } catch (error) {
    console.log(error);
  }
};

export const replaceOrderByAdmin = async (orderId, items) => {
  const orderDocRef = ordersRef.doc(orderId);
  let isItemsUpdated = false;
  try {
    // items updated
    for (let itemId of Object.keys(items)) {
      await reduceItemQuantity(
        itemId,
        items[itemId].size,
        items[itemId].quantity
      );
    }
    isItemsUpdated = true;
    // order is upadint
    const dataToUpdate = {
      status: "pending",
      reasonToCancel: null,
      isReplaced: true,
      replacedAt: Date.now(),
    };
    await orderDocRef.update(dataToUpdate);
    return [dataToUpdate, null];
  } catch (error) {
    if (isItemsUpdated) {
      console.log("updating itmes");
      for (let itemId of Object.keys(items)) {
        await addItemQty(itemId, items[itemId].size, items[itemId].quantity);
      }
    }
    return [null, error];
  }
};
