import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import React, { useRef } from "react";
import FileInput from "../FileInput/FileInput";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectNewsletterImage,
  selectUpdateNewsletterImageDialog,
  selectIsOperationRunning,
  selectNewsletterImageId,
} from "redux/admin/static/newsletter/newsletter.selectors";
import {
  updateNewsletterImage as updateNewsletterImageToStore,
  toggleIsOperationRunning,
  toggleUpdateNewsletterImageDialog,
} from "redux/admin/static/newsletter/newsletter.actions";

import { updateNewsletterImage as updateNewsletterImageFromCloudinary } from "admin/admin.utils";

import { updateNewsletterImage } from "firebase/newsletter.utils";

function EditNewsletterImageDialog({
  newsletterImage,
  newsletterImageId,
  updateNewsletterImageDialog,
  toggleUpdateNewsletterImageDialog,
  isOperationRunning,
  toggleIsOperationRunning,
  updateNewsletterImageToStore,
}) {
  const FileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageFile = FileInputRef.current.files[0];
    if (!imageFile) return;
    try {
      toggleIsOperationRunning();
      const newImage = await updateNewsletterImageFromCloudinary(imageFile); // update imgae in cloudinary
      await updateNewsletterImage(newsletterImageId, newImage);
      updateNewsletterImageToStore(newImage); // update to redux
      toggleIsOperationRunning();
      toggleUpdateNewsletterImageDialog();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomDialog
      open={updateNewsletterImageDialog}
      handleClose={
        !isOperationRunning ? toggleUpdateNewsletterImageDialog : null
      }
      heading="Edit newsletter image"
    >
      <form onSubmit={handleSubmit}>
        <FileInput
          ref={FileInputRef}
          defaultPreview={newsletterImage && newsletterImage.src.med.url}
        />

        <CustomButton
          type="submit"
          color="pink"
          align="center"
          disabled={isOperationRunning}
        >
          edit now
        </CustomButton>
      </form>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  newsletterImage: selectNewsletterImage,
  updateNewsletterImageDialog: selectUpdateNewsletterImageDialog,
  isOperationRunning: selectIsOperationRunning,
  newsletterImageId: selectNewsletterImageId,
});

const mapDispatchToProps = (dispatch) => ({
  updateNewsletterImageToStore: (newsletterImage) =>
    dispatch(updateNewsletterImageToStore(newsletterImage)),
  toggleUpdateNewsletterImageDialog: () =>
    dispatch(toggleUpdateNewsletterImageDialog()),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNewsletterImageDialog);
