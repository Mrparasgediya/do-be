import {
  deleteCollectionImage,
  updateCollectionImage,
  uploadCollectionImage,
} from "admin/admin.utils";
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import InputField from "components/InputField/InputField";
import { updateCollection } from "firebase/collections.utils.js";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  setCollectionForOperation,
  toggleUpdateCollectionDialog,
  toggleIsOperationRunning,
  updateCollection as updateCollectionFromStore,
} from "redux/admin/collections/collections.actions";

import {
  selectIsOperationRunning,
  selectCollectionForOperation,
  selectUpdateCollectionDialog,
} from "redux/admin/collections/collections.selectors";

import * as S from "./EditCollectionDialog.styles";
import { updateItemsCollection } from "redux/admin/items/items.actions";
import { showNotification } from "redux/notification/notification.actions";

function EditCollectionDialog({
  updateCollectionDialog,
  toggleUpdateCollectionDialog,
  collectionForOperation: collection,
  setCollectionForOperation,
  isOperationRunning,
  toggleIsOperationRunning,
  updateCollectionFromStore,
  updateItemsCollection,
  showNotification,
}) {
  const [collectionName, setCollectionName] = useState("");
  const [collectionDiscountRate, setCollectionDiscountRate] = useState(0);
  const collectionImageRef = useRef();
  const [currentProgresStatus, setCurrentProgressStatus] = useState(
    "Updating Collection"
  );
  const { image } = collection || {};
  const { src: imageSrc } = image || {};

  const handleClose = () => {
    toggleUpdateCollectionDialog();
    setCollectionForOperation(null);
  };

  useEffect(() => {
    if (collection) {
      setCollectionName(collection.name);
      setCollectionDiscountRate(collection.discountRate);
    }
  }, [collection]);

  const closeDialog = () => {
    collectionImageRef.current.value = "";
    setCollectionForOperation(null);
    toggleUpdateCollectionDialog();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldsToUpdate = {};
    const fieldsToUpdateItems = {};
    const collectionImageFile = collectionImageRef.current.files[0];
    const discountRate = parseInt(collectionDiscountRate);
    toggleIsOperationRunning();
    let newImage, error, isCollectionUpdated, isImageDeleted;
    try {
      if (collection.name !== collectionName) {
        fieldsToUpdate.name = collectionName;
        fieldsToUpdateItems.name = collectionName;
      }

      if (collection.discountRate !== discountRate) {
        fieldsToUpdate.discountRate = discountRate;
        fieldsToUpdateItems.discountRate = discountRate;
      }

      if (collectionImageFile) {
        setCurrentProgressStatus("Uploading New Image");
        [newImage, error] = await uploadCollectionImage(collectionImageFile);
        if (error) throw new Error(error);
        fieldsToUpdate.image = newImage;
      }

      if (Object.keys(fieldsToUpdate).length === 0)
        return toggleIsOperationRunning();

      setCurrentProgressStatus("Updating Collection");
      //   update to firebase
      [isCollectionUpdated, error] = await updateCollection(
        collection.id,
        fieldsToUpdate
      );
      if (error) throw new Error(error);

      // delete old image
      if (newImage && image && image.publicId) {
        setCurrentProgressStatus("deleting old image");
        [isImageDeleted, error] = await deleteCollectionImage(
          collection.image.publicId
        );
        if (error) throw new Error(`can't delete old image,${error.message}`);
      }

      //   update to redux
      updateCollectionFromStore(collection.id, fieldsToUpdate);
      // update all loaded items
      if (Object.keys(fieldsToUpdateItems).length > 0) {
        updateItemsCollection(collection.id, fieldsToUpdateItems);
      }
      toggleIsOperationRunning();
      showNotification(
        `Collection ${collection.name} is updated successfully.`,
        "success"
      );
      closeDialog();
    } catch (error) {
      if (!isCollectionUpdated) {
        showNotification(error.message, "error");
        if (newImage) {
          setCurrentProgressStatus("deleting new image");
          const [, error] = await deleteCollectionImage(newImage.publicId);
          if (error)
            showNotification(
              `can't delete new image, ${error.message}`,
              "error"
            );
          //  delete new image
        }
        toggleIsOperationRunning();
      }
      if (isCollectionUpdated) {
        toggleIsOperationRunning();
        if (newImage && !isImageDeleted) {
          showNotification(error.message, "error");
        } else {
          showNotification(
            `Collection ${collection.name} is updated, Please refresh. ${error.message}`,
            "error"
          );
          closeDialog();
        }
      }
    }
  };

  return (
    <CustomDialog
      open={updateCollectionDialog}
      handleClose={!isOperationRunning ? handleClose : null}
      heading="edit collection"
    >
      {collection && (
        <S.StyledForm onSubmit={handleSubmit}>
          <InputField
            type="text"
            label="Enter Collection name"
            required
            fullWidth
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
          <InputField
            type="number"
            label="Enter Discount Rate"
            inputProps={{ min: 0, max: 100 }}
            required
            fullWidth
            value={collectionDiscountRate}
            onChange={(e) => setCollectionDiscountRate(e.target.value)}
          />
          <S.StyleFileInputContainer>
            <S.StyledLabel htmlFor="collectionImage">
              Collection image
            </S.StyledLabel>
            <S.StyledFileInput
              ref={collectionImageRef}
              defaultPreview={(imageSrc && imageSrc.small.url) || ""}
              label="collection image"
            />
          </S.StyleFileInputContainer>
          <CustomButton
            color="pink"
            size="small"
            align="center"
            disabled={isOperationRunning}
            hasLoading
            isLoading={isOperationRunning}
            loadingText={currentProgresStatus}
          >
            edit Collection
          </CustomButton>
        </S.StyledForm>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  updateCollectionDialog: selectUpdateCollectionDialog,
  isOperationRunning: selectIsOperationRunning,
  collectionForOperation: selectCollectionForOperation,
});
const mapDispatchToProps = (dispatch) => ({
  toggleUpdateCollectionDialog: () => dispatch(toggleUpdateCollectionDialog()),
  setCollectionForOperation: (collectionId) =>
    dispatch(setCollectionForOperation(collectionId)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  updateCollectionFromStore: (collectionId, dataToUpdate) =>
    dispatch(updateCollectionFromStore(collectionId, dataToUpdate)),
  updateItemsCollection: (collectionId, dataToUpdate) =>
    dispatch(updateItemsCollection(collectionId, dataToUpdate)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCollectionDialog);
