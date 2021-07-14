import { deleteAllItemImages } from "admin/admin.utils";
import CustomDialog from "components/CustomDialog/CustomDialog";
import { deleteItem } from "firebase/items.utils";
import React from "react";
import { connect } from "react-redux";

import {
  toggleIsOperationRunning,
  toggleDeleteItemDialog,
  setItemForOperation,
  deleteItem as deleteItemFromStore,
} from "redux/admin/items/items.actions";

import {
  selectIsOperationRunning,
  selectItemForOperation,
  selectDeleteItemDialog,
} from "redux/admin/items/items.selectors";
import { createStructuredSelector } from "reselect";

function DeleteItemDialog({
  deleteItemDialog,
  toggleDeleteItemDialog,
  itemForOperation: item,
  setItemForOperation,
  isOperationRunning,
  toggleIsOperationRunning,
  deleteItemFromStore,
}) {
  const closeDialog = () => {
    toggleDeleteItemDialog();
    setItemForOperation(null);
  };

  const handleDeleteClick = async () => {
    toggleIsOperationRunning();
    try {
      // delete images of item
      const [, error] = await deleteAllItemImages(item.id);
      if (error) throw new Error(error);
      //  delete item from firebase
      await deleteItem(item.id, item.collection.id, item.brand.id, item.group);
      // delete item from redux
      deleteItemFromStore(item.id);
      toggleIsOperationRunning();
      closeDialog();
    } catch (error) {
      console.log(error);
      toggleIsOperationRunning();
    }
  };

  return (
    <CustomDialog
      open={deleteItemDialog}
      handleClose={!isOperationRunning ? closeDialog : null}
      heading="Delete Item"
      isDeleteDialog
      disableButton={isOperationRunning}
      handleDeleteClick={handleDeleteClick}
    >
      {item && (
        <div style={{ display: "flex", gap: "1.2rem" }}>
          <div
            style={{
              height: "280px",
              width: "210px",
            }}
          >
            <img
              style={{
                height: "280px",
                width: "210px",
                objectFit: "contain",
              }}
              src={
                (item.images[Object.keys(item.images)[0]] &&
                  item.images[Object.keys(item.images)[0]].small.url) ||
                ""
              }
              alt={`item-${item.name}-img`}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2rem",
              }}
            >
              <b style={{ fontSize: "var(--font-md)", flex: ".5" }}>name</b>
              <p style={{ fontSize: "var(--font-md)", flex: "1" }}>
                {item.name}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2rem",
              }}
            >
              <b style={{ fontSize: "var(--font-md)", flex: ".5" }}>Group</b>
              <p style={{ fontSize: "var(--font-md)", flex: "1" }}>
                {item.group}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2rem",
              }}
            >
              <b style={{ fontSize: "var(--font-md)", flex: ".5" }}>name</b>
              <p style={{ fontSize: "var(--font-md)", flex: "1" }}>
                {item.brand.name}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2rem",
              }}
            >
              <b style={{ fontSize: "var(--font-md)", flex: ".5" }}>
                collection
              </b>
              <p style={{ fontSize: "var(--font-md)", flex: "1" }}>
                {item.collection.name}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2rem",
              }}
            >
              <b style={{ fontSize: "var(--font-md)", flex: ".5" }}>price</b>
              <p style={{ fontSize: "var(--font-md)", flex: "1" }}>
                Rs.{item.price}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2rem",
              }}
            >
              <b style={{ fontSize: "var(--font-md)", flex: ".5" }}>
                discount Rate
              </b>
              <p style={{ fontSize: "var(--font-md)", flex: "1" }}>
                {item.discountRate}%
              </p>
            </div>
          </div>
        </div>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  deleteItemDialog: selectDeleteItemDialog,
  itemForOperation: selectItemForOperation,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDeleteItemDialog: () => dispatch(toggleDeleteItemDialog()),
  setItemForOperation: (item) => dispatch(setItemForOperation(item)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  deleteItemFromStore: (itemId) => dispatch(deleteItemFromStore(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemDialog);
