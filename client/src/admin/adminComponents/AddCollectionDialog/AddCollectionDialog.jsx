import {
  deleteCollectionImage,
  uploadCollectionImage,
} from "admin/admin.utils";
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import InputField from "components/InputField/InputField";
import { createCollection } from "firebase/collections.utils.js";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import FileInput from "../FileInput/FileInput";

import * as S from "./AddCollectionDialog.styles";

import {
  toggleAddCollectionDialog,
  toggleIsOperationRunning,
  addCollection,
} from "redux/admin/collections/collections.actions";
import {
  selectAddCollectionDialog,
  selectIsOperationRunning,
} from "redux/admin/collections/collections.selectors";
import { showNotification } from "redux/notification/notification.actions";

function AddCollectionDialog({
  addCollectionDialog,
  toggleAddCollectionDialog,
  isOperationRunning,
  toggleIsOperationRunning,
  addCollection,
  showNotification,
}) {
  const nameInputRef = useRef();
  const discountRateInputRef = useRef();
  const imageInputRef = useRef();
  const [clearPreview, setClearPreview] = useState(false);
  const [currentProgressStatus, setCurrentProgressStatus] =
    useState("Adding collection");

  useEffect(() => {
    if (clearPreview) setClearPreview(!clearPreview);
  }, [clearPreview]);

  const clearValuesAndCloseDialog = () => {
    // clear inputs
    nameInputRef.current.value = "";
    discountRateInputRef.current.value = "";
    imageInputRef.current.value = "";
    setClearPreview(!clearPreview);
    // toggle add collection dialog
    toggleAddCollectionDialog();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const discountRate = parseInt(discountRateInputRef.current.value);
    const imageFile = imageInputRef.current.files[0];
    toggleIsOperationRunning();
    let error, image, newCollection;

    try {
      setCurrentProgressStatus("Uploading Image");
      [image, error] = await uploadCollectionImage(imageFile);
      if (error) throw new Error(error);

      setCurrentProgressStatus("Creating Collection");
      [newCollection, error] = await createCollection(
        name,
        discountRate,
        image
      );
      if (error) throw new Error(error);
      addCollection(newCollection);
      toggleIsOperationRunning();

      clearValuesAndCloseDialog();
      showNotification(`Collection ${name} added successfully`, "success");
    } catch (error) {
      if (!newCollection) {
        showNotification(error.message, "error");
        if (image) {
          setCurrentProgressStatus("Deleting Image");
          const [, error] = await deleteCollectionImage(image.publicId);
          if (error) showNotification(error.message, "error");
        }
        toggleIsOperationRunning();
      }
      // this catches redux errors
      if (newCollection) {
        showNotification(
          `Collection ${name} created, Please refresh.${error.message}`,
          "error"
        );
        toggleIsOperationRunning();
        clearValuesAndCloseDialog();
      }
    }
  };

  return (
    <CustomDialog
      heading="add collection"
      open={addCollectionDialog}
      handleClose={!isOperationRunning ? toggleAddCollectionDialog : null}
    >
      <S.AddCollectionForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          ref={nameInputRef}
          label="Enter Collection name"
          required
          fullWidth
        />
        <InputField
          type="number"
          ref={discountRateInputRef}
          label="Enter Discount Rate"
          inputProps={{ min: 0, max: 100 }}
          required
          fullWidth
        />
        <S.CollectionImageInputContainer>
          <S.StyledLabel htmlFor="collectionImage">
            Collection image
          </S.StyledLabel>
          <FileInput
            ref={imageInputRef}
            isInputRequired
            label="collection image"
            clearPreview={clearPreview}
          />
        </S.CollectionImageInputContainer>
        <CustomButton
          color="pink"
          size="small"
          align="center"
          disabled={isOperationRunning}
          hasLoading
          isLoading={isOperationRunning}
          loadingText={currentProgressStatus}
        >
          Add Collection
        </CustomButton>
      </S.AddCollectionForm>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  addCollectionDialog: selectAddCollectionDialog,
  isOperationRunning: selectIsOperationRunning,
});
const mapDispatchToProps = (dispatch) => ({
  toggleAddCollectionDialog: () => dispatch(toggleAddCollectionDialog()),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  addCollection: (collection) => dispatch(addCollection(collection)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCollectionDialog);
