import React from "react";
import CustomDialog from "components/CustomDialog/CustomDialog";

import { deleteNewsletterImage } from "admin/admin.utils";
import { deleteNewsletterImage as deleteNewsletterImageFromFirebase } from "firebase/newsletter.utils";

import {
  deleteNewsletterImage as deleteNewsletterImageFromStore,
  toggleDeleteNewsletterImageDialog,
  toggleIsOperationRunning,
} from "redux/admin/static/newsletter/newsletter.actions";
import {
  selectDeleteNewsletterImageDialog,
  selectNewsletterImage,
  selectNewsletterImageId,
  selectIsOperationRunning,
} from "redux/admin/static/newsletter/newsletter.selectors";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import * as S from "./DeleteNewsletterImageDialog.styles";
import { Fragment } from "react";

function DeleteNewsletterImageDialog({
  newsletterImage,
  newsletterImageId,
  deleteNewsletterImageDialog,
  isOperationRunning,
  toggleIsOperationRunning,
  toggleDeleteNewsletterImageDialog,
  deleteNewsletterImageFromStore,
}) {
  const deleteImageClick = async () => {
    if (!newsletterImageId) return;
    try {
      toggleIsOperationRunning();
      //delete image from cloudinary
      await deleteNewsletterImage(newsletterImage.publicId);
      // delete newsletter image from firebase
      await deleteNewsletterImageFromFirebase(newsletterImageId);
      deleteNewsletterImageFromStore(); // set newletter data to redux store
      toggleIsOperationRunning();
      toggleDeleteNewsletterImageDialog();
    } catch (error) {
      console.log(error);
      toggleIsOperationRunning();
    }
  };

  return (
    <CustomDialog
      isDeleteDialog
      heading="delete newletter image"
      handleClose={
        !isOperationRunning ? toggleDeleteNewsletterImageDialog : null
      }
      open={deleteNewsletterImageDialog}
      handleDeleteClick={deleteImageClick}
      disableButton={isOperationRunning}
    >
      {newsletterImage && (
        <Fragment>
          <S.StyledImage src={newsletterImage.src.med.url} alt="newletter" />
          <S.StyledInfoText>
            Are You sure, you want to delete newsletter image ?
          </S.StyledInfoText>
        </Fragment>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  newsletterImage: selectNewsletterImage,
  newsletterImageId: selectNewsletterImageId,
  deleteNewsletterImageDialog: selectDeleteNewsletterImageDialog,
  isOperationRunning: selectIsOperationRunning,
});
const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  deleteNewsletterImageFromStore: () =>
    dispatch(deleteNewsletterImageFromStore()),
  toggleDeleteNewsletterImageDialog: () =>
    dispatch(toggleDeleteNewsletterImageDialog()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteNewsletterImageDialog);
