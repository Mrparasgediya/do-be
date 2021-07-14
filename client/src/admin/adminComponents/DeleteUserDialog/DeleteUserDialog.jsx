import API from "api";
import CustomDialog from "components/CustomDialog/CustomDialog";
import { deleteUserAccount } from "firebase/users.utils";
import React from "react";
import { connect } from "react-redux";
import {
  deleteUser,
  setUserForOperation,
  toggleDeleteUserDialog,
  toggleIsOperationRunning,
} from "redux/admin/users/users.actions";
import {
  selectDeleteUserDialog,
  selectIsOperationRunning,
  selectUserForOperation,
} from "redux/admin/users/users.selectors";
import { showNotification } from "redux/notification/notification.actions";
import { createStructuredSelector } from "reselect";

function DeleteUserDialog({
  deleteUserDialog,
  toggleDeleteUserDialog,
  userForOperation,
  toggleIsOperationRunning,
  isOperationRunning,
  deleteUser,
  showNotification,
  setUserForOperation,
}) {
  const closeDialogHandler = () => {
    toggleDeleteUserDialog();
    setUserForOperation(null);
  };
  const deleteUserHandler = async () => {
    const { id, email } = userForOperation;
    try {
      toggleIsOperationRunning();
      const { data } = await API.delete(`/firebase/admin/auth/users/${id}`);
      if (data.result === "ok") {
        await deleteUserAccount(id);
        deleteUser(id);
        toggleIsOperationRunning();
        showNotification(`user ${email} is deleted`, "info");
        closeDialogHandler();
      } else {
        throw new Error("User is not deleted");
      }
    } catch (error) {
      showNotification(error.message, "error");
      toggleIsOperationRunning();
    }
  };
  return (
    <CustomDialog
      open={deleteUserDialog}
      heading={"delete user"}
      handleClose={closeDialogHandler}
      handleDeleteClick={deleteUserHandler}
      isDeleteDialog
      disableButton={isOperationRunning}
      deleteButtonProps={{ hasLoading: true, isLoading: isOperationRunning }}
    >
      <b style={{ fontSize: "var(--font-md)" }}>
        Are you sure you want delete user {userForOperation.email} ?
      </b>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  deleteUserDialog: selectDeleteUserDialog,
  userForOperation: selectUserForOperation,
  isOperationRunning: selectIsOperationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDeleteUserDialog: () => dispatch(toggleDeleteUserDialog()),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  setUserForOperation: (userId) => dispatch(setUserForOperation(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserDialog);
