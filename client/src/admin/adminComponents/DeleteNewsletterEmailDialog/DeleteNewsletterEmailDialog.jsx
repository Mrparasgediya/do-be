import CustomDialog from "components/CustomDialog/CustomDialog";
import { deleteNewsLetterEmail } from "firebase/newsletter.utils";
import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  deleteNewsletterEmail as deleteNewsLetterEmailFromStore,
  toggleDeleteNewsletterEmailDialog,
  toggleIsOperationRunning,
  setNewsletterEmailForOperation,
} from "redux/admin/static/newsletter/newsletter.actions";
import {
  selectIsOperationRunning,
  selectDeleteNewsletterEmailDialog,
  selectNewsletterEmailForOperation,
} from "redux/admin/static/newsletter/newsletter.selectors";

import * as S from "./DeleteNewsletterEmailDialog.styles";

function DeleteNewsletterEmailDialog({
  deleteNewsletterEmailDialog,
  newsletterEmailForOperation,
  isOperationRunnig,
  toggleIsOperationRunning,
  toggleDeleteNewsletterEmailDialog,
  deleteNewsLetterEmailFromStore,
  setNewsletterEmailForOperation,
}) {
  const closeDialog = () => {
    setNewsletterEmailForOperation(null);
    toggleDeleteNewsletterEmailDialog();
  };

  const handleDeleteButton = async () => {
    if (!newsletterEmailForOperation) return;
    toggleIsOperationRunning(); // toggle operation to freeze close dialog
    await deleteNewsLetterEmail(newsletterEmailForOperation.id); //delete from firebase
    deleteNewsLetterEmailFromStore(newsletterEmailForOperation.id); // delete from redux
    toggleIsOperationRunning();
    closeDialog(); // close delete dialog
  };

  return (
    <CustomDialog
      open={deleteNewsletterEmailDialog}
      handleClose={!isOperationRunnig ? closeDialog : null}
      heading="delete newsletter"
      isDeleteDialog
      disableButton={isOperationRunnig}
      handleDeleteClick={handleDeleteButton}
    >
      <S.StyledContainer>
        <S.StyledInfoText>
          Are you sure, you want to stop newsletter service for email{" "}
          {newsletterEmailForOperation && newsletterEmailForOperation.email}
        </S.StyledInfoText>
      </S.StyledContainer>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  deleteNewsletterEmailDialog: selectDeleteNewsletterEmailDialog,
  isOperationRunnig: selectIsOperationRunning,
  newsletterEmailForOperation: selectNewsletterEmailForOperation,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  toggleDeleteNewsletterEmailDialog: () =>
    dispatch(toggleDeleteNewsletterEmailDialog()),
  deleteNewsLetterEmailFromStore: (newletterId) =>
    dispatch(deleteNewsLetterEmailFromStore(newletterId)),
  setNewsletterEmailForOperation: (emailId) =>
    dispatch(setNewsletterEmailForOperation(emailId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteNewsletterEmailDialog);
