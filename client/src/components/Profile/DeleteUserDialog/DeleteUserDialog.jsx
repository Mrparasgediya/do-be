import React from "react";
import { withRouter } from "react-router-dom";
// styles
import * as S from "./DeleteUserDialog.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectDeleteUserDialog,
  selectIsOperationRunning,
} from "redux/user/user.selectors";
import {
  toggleDeleteUserDialog,
  toggleIsOperationRunning,
} from "redux/user/user.actions";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomDialog from "components/CustomDialog/CustomDialog";
import CustomButton from "components/CustomButton/CustomButton";
// utils
import { auth } from "firebase/firebase.utils";
import { deleteUserAccount } from "firebase/users.utils";

function DeleteUserDialog({
  deleteUserDialog,
  isOperationRunning,
  toggleDeleteUserDialog,
  toggleIsOperationRunning,
  history,
  showNotification,
}) {
  const handleDeleteButtonClick = async () => {
    toggleIsOperationRunning();
    const user = auth.currentUser;
    try {
      const userId = user.uid;
      await deleteUserAccount(userId); // delete user from firebase firestore
      const data = await user.delete(); //delete user from firebase auth
      console.log(data);
      showNotification("Your account has deleted successfully.", "success");
      deleteUserAccount(); //delete user from redux
      toggleIsOperationRunning();
      toggleDeleteUserDialog();
      history.push("/");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        showNotification(
          "You logged in for long time, so logged in again to delete your account.",
          "error"
        );
      } else {
        showNotification(error.message, "error");
      }
      toggleIsOperationRunning();
      toggleDeleteUserDialog();
    }
  };

  return (
    <CustomDialog
      open={deleteUserDialog}
      handleClose={!isOperationRunning ? toggleDeleteUserDialog : null}
      heading="delete user"
    >
      <S.DeleteUserDialogContainer>
        <S.DeleteUserDialogMessage>
          Are you sure you want to delete your DO&BE account?
        </S.DeleteUserDialogMessage>
        <S.DeleteUserDialogButtonsContainer>
          <CustomButton
            color="black"
            isActive
            size="xs"
            disabled={isOperationRunning}
          >
            go back
          </CustomButton>
          <CustomButton
            color={"red"}
            isActive
            size="xs"
            onClick={handleDeleteButtonClick}
            disabled={isOperationRunning}
          >
            delete now
          </CustomButton>
        </S.DeleteUserDialogButtonsContainer>
      </S.DeleteUserDialogContainer>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  deleteUserDialog: selectDeleteUserDialog,
  isOperationRunning: selectIsOperationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDeleteUserDialog: () => dispatch(toggleDeleteUserDialog()),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeleteUserDialog));
