import { deleteCollectionImage } from "admin/admin.utils";
import CustomDialog from "components/CustomDialog/CustomDialog";
import {
  deleteCollection,
  getCollectionItemsCount,
} from "firebase/collections.utils.js";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { deleteCollectionItems } from "redux/admin/items/items.actions";

import {
  deleteCollection as deleteCollectionFromStore,
  toggleIsOperationRunning,
  toggleDeleteCollectionDialog,
  setCollectionForOperation,
} from "redux/admin/collections/collections.actions";
import {
  selectIsOperationRunning,
  selectCollectionForOperation,
  selectDeleteCollectionDialog,
} from "redux/admin/collections/collections.selectors";

import * as S from "./DeleteCollectionDialog.styles";
import { showNotification } from "redux/notification/notification.actions";

function DeleteCollectionDialog({
  collectionForOperation: collection,
  toggleDeleteCollectionDialog,
  deleteCollectionDialog,
  setCollectionForOperation,
  isOperationRunning,
  toggleIsOperationRunning,
  deleteCollectionFromStore,
  deleteCollectionItems,
  showNotification,
}) {
  const [collectionItemsCount, setCollectionItemsCount] = useState(0);
  const [currentProgressStatus, setCurrentProgressStatus] = useState(
    "Deleting Collection"
  );
  const [isValidOperation, setIsValidOperation] = useState(true);
  const { image } = collection || {};
  const { src: imageSrc } = image || {};

  const hasItems = (collection) => {
    if (collection.items) {
      for (let key of Object.keys(collection.items)) {
        if (collection.items[key].length > 0) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (collection) {
      let fetchData = async () => {
        try {
          const [itemsCount, error] = await getCollectionItemsCount(
            collection.id
          );
          if (error) throw new Error(error);
          setCollectionItemsCount(itemsCount);
        } catch (error) {
          showNotification(`can't get items count, ${error.message}`, "error");
          setIsValidOperation(false);
        }
      };

      fetchData();
    }
  }, [collection]);

  const closeDialog = () => {
    setCollectionForOperation(null);
    toggleDeleteCollectionDialog();
  };

  const handleDeleteClick = async () => {
    const collectionId = collection.id;
    toggleIsOperationRunning();
    let error, isCollectionDeleted;
    try {
      setCurrentProgressStatus("Deleting image");

      if (collection.image && collection.image.publicId) {
        [, error] = await deleteCollectionImage(collection.image.publicId);
        if (error)
          throw new Error(`can't delete collection image, ${error.message}`);
      }

      [isCollectionDeleted, error] = await deleteCollection(
        collectionId,
        setCurrentProgressStatus
      );
      if (error) throw new Error(error);

      if (hasItems(collection)) deleteCollectionItems(collectionId);
      deleteCollectionFromStore(collectionId);

      toggleIsOperationRunning();
      showNotification(
        `Collection ${collection.name} is deleted successfully.`,
        "success"
      );
      closeDialog();
    } catch (error) {
      toggleIsOperationRunning();
      if (!isCollectionDeleted) {
        showNotification(error.message, "error");
      }
      if (isCollectionDeleted) {
        showNotification(
          `collection ${collection.name} is deleted, please refresh. ${error.message}`,
          "error"
        );
        closeDialog();
      }
    }
  };

  const handleClose = () => {
    toggleDeleteCollectionDialog();
    setCollectionForOperation(null);
  };

  return (
    <CustomDialog
      isDeleteDialog
      heading="delete Collection"
      open={deleteCollectionDialog}
      disableButton={isOperationRunning}
      handleDeleteClick={handleDeleteClick}
      handleClose={!isOperationRunning ? handleClose : null}
      deleteButtonProps={{
        disabled: !isValidOperation,
        hasLoading: true,
        isLoading: isOperationRunning,
        loadingText: currentProgressStatus,
      }}
    >
      {collection && (
        <S.StyledContainer>
          <S.StyledImage
            src={(imageSrc && imageSrc.small.url) || ""}
            alt={`${collection.name}-img`}
          />
          <S.StyledInfoContainer>
            <S.StyledInfoText>name: {collection.name}</S.StyledInfoText>
            <S.StyledInfoText>
              discount rate: {collection.discountRate}%
            </S.StyledInfoText>
            {collectionItemsCount > 0 && (
              <S.StyledInfoText color="red">
                This collection has {collectionItemsCount} items.
              </S.StyledInfoText>
            )}
          </S.StyledInfoContainer>
        </S.StyledContainer>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  collectionForOperation: selectCollectionForOperation,
  deleteCollectionDialog: selectDeleteCollectionDialog,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  deleteCollectionFromStore: (collectionId) =>
    dispatch(deleteCollectionFromStore(collectionId)),
  setCollectionForOperation: (collectionId) =>
    dispatch(setCollectionForOperation(collectionId)),
  toggleDeleteCollectionDialog: () => dispatch(toggleDeleteCollectionDialog()),
  deleteCollectionItems: (collectionId) =>
    dispatch(deleteCollectionItems(collectionId)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteCollectionDialog);
