import CustomDialog from "components/CustomDialog/CustomDialog";
import React from "react";

import { deleteItemImage } from "admin/admin.utils";
import { deleteItemImage as deleteItemImageFromFirebase } from "firebase/items.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsOperationRunning,
  selectDeleteItemImageDialog,
  selectItemImageForOperation,
  selectItemForOperation,
} from "redux/admin/items/items.selectors";

import {
  toggleDeleteItemImageDialog,
  toggleIsOperationRunning,
  setItemImageForOperation,
  deleteItemImage as deleteItemImageFromStore,
} from "redux/admin/items/items.actions";

function DeleteItemImageDialog({
  itemForOperation: item,
  imageForOperation,
  deleteItemImageDialog,
  isOperationRunning,
  toggleIsOperationRunning,
  toggleDeleteItemImageDialog,
  setItemImageForOperation,
  deleteItemImageFromStore,
}) {
  const handleDialogClose = () => {
    toggleDeleteItemImageDialog();
    setItemImageForOperation(null);
  };

  const handleDeleteClick = async () => {
    const { publicId } = imageForOperation;

    toggleIsOperationRunning();
    try {
      // delete image from firebase
      await deleteItemImageFromFirebase(item.id, item.images, publicId);
      //  delete image from cloudinary
      await deleteItemImage(publicId);
      // delete image from store
      deleteItemImageFromStore(item.id, publicId);
      toggleIsOperationRunning();
      handleDialogClose();
    } catch (error) {
      toggleIsOperationRunning();
      console.log(error);
    }
  };

  return (
    <CustomDialog
      open={deleteItemImageDialog}
      disableButton={isOperationRunning}
      handleDeleteClick={handleDeleteClick}
      handleClose={!isOperationRunning ? handleDialogClose : null}
      isDeleteDialog
      heading="delete item image"
    >
      {imageForOperation && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <img
            style={{ flex: 0.5, height: "35rem", objectFit: "contain" }}
            src={imageForOperation.small.url}
            alt={`img-${imageForOperation.no}`}
          />
          <p style={{ flex: 0.5, fontSize: "var(--font-md)" }}>
            Are you sure, you want to delete <b>{item.name} </b>
            image no <b>{imageForOperation.no}</b> ?
          </p>
        </div>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  itemForOperation: selectItemForOperation,
  imageForOperation: selectItemImageForOperation,
  isOperationRunning: selectIsOperationRunning,
  deleteItemImageDialog: selectDeleteItemImageDialog,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  toggleDeleteItemImageDialog: () => dispatch(toggleDeleteItemImageDialog()),
  setItemImageForOperation: (image) =>
    dispatch(setItemImageForOperation(image)),
  deleteItemImageFromStore: (itemId, imageId) =>
    dispatch(deleteItemImageFromStore(itemId, imageId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteItemImageDialog);
