import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import React from "react";
import { connect } from "react-redux";

import {
  toggleShowItemDialog,
  setItemForOperation,
} from "redux/admin/items/items.actions";
import {
  selectShowItemDialog,
  selectItemForOperation,
} from "redux/admin/items/items.selectors";
import { createStructuredSelector } from "reselect";

function ShowItemDialog({
  showItemDialog,
  toggleShowItemDialog,
  itemForOperation: item,
  setItemForOperation,
}) {
  const createdAtDate = item && new Date(item.createdAt);

  const handleClose = () => {
    toggleShowItemDialog();
    setItemForOperation(null);
  };

  return (
    <CustomDialog
      open={showItemDialog}
      heading="show item"
      handleClose={handleClose}
      fullScreen
    >
      {item && (
        <div
          style={{
            textTransform: "capitalize",
            fontSize: "var(--font-md)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Name :
            </h5>
            <b style={{ textTransform: "none" }}> {item.name}</b>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Group :
            </h5>
            <b>{item.group}</b>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Brand :
            </h5>
            <b>{item.brand.name}</b>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Collection :
            </h5>
            <b>{item.collection.name}</b>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Price :
            </h5>
            <b>Rs.{item.price}</b>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Item Discount Rate :
            </h5>
            <b>{item.discountRate}%</b>
          </div>

          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Total Discount :
            </h5>
            <b>{` ${item.brand.discountRate}% ( Brand ) + ${
              item.collection.discountRate
            }% ( Collection ) + ${item.discountRate}% ( Item ) = ${
              item.brand.discountRate +
              item.collection.discountRate +
              item.discountRate
            }%`}</b>
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Quantity :
            </h5>
            <div
              style={{
                broder: "1px solid blue",
                display: "flex",
                flexDirection: "column",
                marginLeft: "2rem",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "20rem",
                }}
              >
                <b style={{ flex: 0.4 }}>size</b>
                <b style={{ flex: 0.6 }}>No Of items</b>
              </div>
              {Object.keys(item.quantity).map((qtyName, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minWidth: "20rem",
                  }}
                >
                  <b style={{ flex: 0.4 }}>{qtyName} :</b>
                  <span style={{ flex: 0.6 }}>
                    <b>{item.quantity[qtyName]}</b> items
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Images :
            </h5>
            <div
              style={{
                broder: "1px solid blue",
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
              }}
            >
              {Object.keys(item.images).map((imageId, idx) => (
                <img
                  key={idx}
                  style={{
                    height: "280px",
                    width: "210px",
                    backgroundColor: "var(--color-gray-light)",
                  }}
                  src={item.images[imageId].small.url}
                  alt={`img-${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Description :
            </h5>
            <b style={{ maxWidth: "75%", textTransform: "none" }}>
              {item.description}
            </b>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h5
              style={{
                fontSize: "var(--font-md-big)",
                fontFamily: "var(--body-font)",
              }}
            >
              Created at :
            </h5>

            <b
              style={{ maxWidth: "75%" }}
            >{`${createdAtDate.getDate()}-${createdAtDate.getMonth()}-${createdAtDate.getFullYear()}`}</b>
          </div>
        </div>
      )}
      <CustomButton
        onClick={handleClose}
        align="center"
        size="small"
        color="pink"
        isActive
      >
        Go Back
      </CustomButton>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  itemForOperation: selectItemForOperation,
  showItemDialog: selectShowItemDialog,
});

const mapDispatchToProps = (dispatch) => ({
  setItemForOperation: (item) => dispatch(setItemForOperation(item)),
  toggleShowItemDialog: () => dispatch(toggleShowItemDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowItemDialog);
