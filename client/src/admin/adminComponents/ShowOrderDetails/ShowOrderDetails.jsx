import { Grid } from "@material-ui/core";
import CustomDialog from "components/CustomDialog/CustomDialog";
import OrderItem from "components/Orders/OrderItem/OrderItem";
import { getFirstImageOfItemById } from "firebase/items.utils";
import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import {
  setOrderForOperation,
  toggleShowOrderDialog,
  updateOrderInfo,
} from "redux/admin/orders/orders.actions";
import {
  selectOrderForOperation,
  selectShowOrderDialog,
} from "redux/admin/orders/orders.selectors";
import { createStructuredSelector } from "reselect";
import * as S from "./ShowOrderDetails.styles";

function ShowOrderDetails({
  orderForOperation,
  showOrderDialog,
  toggleShowOrderDialog,
  setOrderForOperation,
  updateOrderInfo,
}) {
  const {
    id,
    contactDetails,
    paymentDetails,
    items,
    status,
    createdAt,
    purchasedBy,
    deliveredAt,
    shippingAddress,
    reasonToCancel,
    isReplaced,
    replacedAt,
  } = orderForOperation || {};

  const fetchOrderItemsImages = async () => {
    const itemsToUpdate = {};
    const updatedItems = items;
    for (let itemId of Object.keys(updatedItems)) {
      // fetch image from db if item image is not exists
      if (!updatedItems[itemId].image) {
        try {
          const [itemImage, error] = await getFirstImageOfItemById(itemId);
          if (error) throw new Error(error);
          updatedItems[itemId].image = itemImage;
          itemsToUpdate[itemId] = updatedItems[itemId];
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (Object.keys(itemsToUpdate).length > 0) {
      updateOrderInfo(id, { items: { ...items, ...itemsToUpdate } });
    }
  };

  useEffect(() => {
    if (showOrderDialog && orderForOperation) {
      fetchOrderItemsImages();
    }
  }, [showOrderDialog]);

  return (
    <CustomDialog
      open={showOrderDialog}
      heading={"Order details"}
      handleClose={() => {
        toggleShowOrderDialog();
        setOrderForOperation(undefined);
      }}
      fullScreen
    >
      {orderForOperation && (
        <Fragment>
          <div
            style={{
              fontSize: "var(--font-md)",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <h4
              style={{
                textTransform: "capitalize",
                fontFamily: "var(--font-family-body)",
              }}
            >
              Order Id :
            </h4>
            <span>{id}</span>
          </div>
          <div
            style={{
              fontSize: "var(--font-md)",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              margin: "2rem 0",
            }}
          >
            <h4
              style={{
                textTransform: "capitalize",
                fontFamily: "var(--font-family-body)",
              }}
            >
              Order Status :
            </h4>
            <span
              style={{
                color:
                  status === "fulfilled"
                    ? "var(--color-green)"
                    : status === "cancelled"
                    ? "var(--color-red)"
                    : "var(--color-skyblue-light)",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  textTransform: "capitalize",
                  letterSpacing: ".5px",
                }}
              >
                {status}
              </span>
              {(status === "fulfilled" || status === "cancelled") && (
                <span style={{ marginLeft: "1.2rem" }}>
                  ({" "}
                  {status === "cancelled"
                    ? reasonToCancel
                    : `Delivered at ${new Date(
                        deliveredAt
                      ).toDateString()}`}{" "}
                  )
                </span>
              )}
              {status === "pending" && isReplaced && (
                <span style={{ marginLeft: "1.2rem" }}>
                  ( {status === "cancelled" ? reasonToCancel : `Replaced order`}{" "}
                  )
                </span>
              )}
            </span>
          </div>
          {isReplaced && (
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <h4
                style={{
                  textTransform: "capitalize",
                  fontFamily: "var(--font-family-body)",
                }}
              >
                Is Replaced:
              </h4>
              <span>Yes ( at {new Date(replacedAt).toDateString()} )</span>
            </div>
          )}
          <div
            style={{
              fontSize: "var(--font-md)",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-family-body)",
                textTransform: "capitalize",
              }}
            >
              User Id:
            </h4>
            <span>{purchasedBy} </span>
          </div>

          <div
            style={{
              fontSize: "var(--font-md)",
              display: "flex",
              flexDirection: "column",
              margin: "2rem 0",
              gap: "2rem",
            }}
          >
            <h4
              style={{
                textTransform: "capitalize",
                fontFamily: "var(--font-family-body)",
              }}
            >
              contact details:
            </h4>
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <span
                style={{
                  textTransform: "capitalize",
                  fontFamily: "var(--font-family-body)",
                }}
              >
                phone no :
              </span>
              <span>{contactDetails.contactNo} </span>
            </div>
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <span
                style={{
                  textTransform: "capitalize",
                  fontFamily: "var(--font-family-body)",
                }}
              >
                user name :
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                {contactDetails.name}{" "}
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: "var(--font-md)",
              display: "flex",
              flexDirection: "column",
              margin: "2rem 0",
              gap: "2rem",
            }}
          >
            <h4
              style={{
                textTransform: "capitalize",
                fontFamily: "var(--font-family-body)",
              }}
            >
              payment details :
            </h4>
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <span
                style={{
                  textTransform: "capitalize",
                  fontFamily: "var(--font-family-body)",
                }}
              >
                payment mode :
              </span>
              <span>{paymentDetails.mode} </span>
            </div>
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                amount:
              </span>
              <span>RS. {paymentDetails.amount} </span>
            </div>

            {paymentDetails.mode === "card" && (
              <Fragment>
                <div
                  style={{
                    fontSize: "var(--font-md)",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-body)",
                      textTransform: "capitalize",
                    }}
                  >
                    paid :
                  </span>
                  <span>{paymentDetails.isPaid ? "Yes" : "No"}</span>
                </div>
                <div
                  style={{
                    fontSize: "var(--font-md)",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-body)",
                      textTransform: "capitalize",
                    }}
                  >
                    fees :
                  </span>
                  <span>Rs. {paymentDetails.fees}</span>
                </div>
                {status === "cancelled" && (
                  <div
                    style={{
                      fontSize: "var(--font-md)",
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-family-body)",
                        textTransform: "capitalize",
                      }}
                    >
                      Money Refunded:
                    </span>
                    <span>{paymentDetails.isMoneyRefunded ? "Yes" : "No"}</span>
                  </div>
                )}
                <div
                  style={{
                    fontSize: "var(--font-md)",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-body)",
                      textTransform: "capitalize",
                    }}
                  >
                    payment id:
                  </span>
                  <span>{paymentDetails.paymentId} </span>
                </div>
              </Fragment>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                alignItems: "flex-start",
              }}
            >
              <h4
                style={{
                  textTransform: "capitalize",
                  fontFamily: "var(--font-family-body)",
                }}
              >
                items :
              </h4>
              {items && Object.keys(items).length > 0 ? (
                <S.StyledShowOrderDetailsGridContainer container spacing={2}>
                  {Object.keys(items).map((itemId) => (
                    <OrderItem
                      key={itemId}
                      isForAdmin
                      item={{ id: itemId, ...items[itemId] }}
                    />
                  ))}
                </S.StyledShowOrderDetailsGridContainer>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-family-body)",
                    textTransform: "capitalize",
                  }}
                >
                  Items not selected
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              fontSize: "var(--font-md)",
              display: "flex",
              flexDirection: "column",
              margin: "2rem 0",
              gap: "2rem",
            }}
          >
            <h4
              style={{
                textTransform: "capitalize",
                fontFamily: "var(--font-family-body)",
              }}
            >
              Shipping address :
            </h4>
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                address :
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                {shippingAddress.address}{" "}
              </span>
            </div>{" "}
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                city :
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                {shippingAddress.city}{" "}
              </span>
            </div>{" "}
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                state :
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                {shippingAddress.state}{" "}
              </span>
            </div>{" "}
            <div
              style={{
                fontSize: "var(--font-md)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                zipcode :
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  textTransform: "capitalize",
                }}
              >
                {shippingAddress.zipcode}{" "}
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: "var(--font-md)",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-family-body)",
                textTransform: "capitalize",
              }}
            >
              Created at:
            </h4>
            <span>{new Date(createdAt).toDateString()} </span>
          </div>
        </Fragment>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  showOrderDialog: selectShowOrderDialog,
  orderForOperation: selectOrderForOperation,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShowOrderDialog: () => dispatch(toggleShowOrderDialog()),
  setOrderForOperation: (orderId) => dispatch(setOrderForOperation(orderId)),
  updateOrderInfo: (orderId, dataToUpdate) =>
    dispatch(updateOrderInfo(orderId, dataToUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowOrderDetails);
