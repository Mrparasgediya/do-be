import React from "react";
// firebase
import { disableUserAccount, enableUserAccount } from "firebase/users.utils";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  updateUserRole as updateRole,
  toggleIsOperationRunning,
  disableUser,
  enableUser,
  toggleDeleteUserDialog,
  setUserForOperation,
  toggleEditUserDialog,
} from "redux/admin/users/users.actions";
import { selectIsOperationRunning } from "redux/admin/users/users.selectors";
// components
import {
  TableData,
  TableRow,
} from "admin/adminComponents/CustomTable/CustomTable";
import CustomButton from "components/CustomButton/CustomButton";
import API from "api";
import { showNotification } from "redux/notification/notification.actions";

function UserInfoRow({
  userInfo,
  isOperationRunnig,
  toggleIsOperationRunning,
  disableUser,
  enableUser,
  showNotification,
  toggleDeleteUserDialog,
  setUserForOperation,
  toggleEditUserDialog,
}) {
  const { id, email, role, disabled, provider } = userInfo;

  const toggleDisable = async () => {
    try {
      if (disabled) {
        toggleIsOperationRunning();
        const { data } = await API.put(
          `/firebase/admin/auth/users/${id}/enable`
        );
        if (data.result === "ok") {
          await enableUserAccount(id);
          enableUser(id);
          toggleIsOperationRunning();
          showNotification(`user ${email} is enabled.`, "info");
        } else {
          throw new Error("user is not enabled try again later");
        }
      } else {
        toggleIsOperationRunning();
        const { data } = await API.put(
          `/firbease/admin/auth/users/${id}/disable`
        );
        if (data.result === "ok") {
          await disableUserAccount(id);
          disableUser(id);
          toggleIsOperationRunning();
          showNotification(`user ${email}  is disabled`, "info");
        } else {
          throw new Error("user is not disabled try again later");
        }
      }
    } catch (error) {
      showNotification(error.message, "error");
      toggleIsOperationRunning();
    }
  };

  return (
    <TableRow>
      <TableData>{email}</TableData>
      <TableData defaultWidth={"200px"}>{role}</TableData>
      <TableData>{provider}</TableData>
      <TableData>
        <CustomButton
          disabled={isOperationRunnig}
          align="center"
          size="xs"
          color="black"
          isActive
          onClick={() => {
            setUserForOperation(id);
            toggleEditUserDialog();
          }}
        >
          edit
        </CustomButton>
      </TableData>
      <TableData>
        <CustomButton
          disabled={isOperationRunnig}
          align="center"
          size="xs"
          color="red"
          isActive
          onClick={() => {
            setUserForOperation(id);
            toggleDeleteUserDialog();
          }}
        >
          delete
        </CustomButton>
      </TableData>
      <TableData>
        <CustomButton
          onClick={toggleDisable}
          align="center"
          size="xs"
          color={disabled ? "green" : "red"}
          isActive
          disabled={isOperationRunnig}
        >
          {disabled ? "enable" : "disable"}
        </CustomButton>
      </TableData>
    </TableRow>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunnig: selectIsOperationRunning,
});
const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  updateRole: (userId, newRole) => dispatch(updateRole(userId, newRole)),
  disableUser: (userId) => dispatch(disableUser(userId)),
  enableUser: (userId) => dispatch(enableUser(userId)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  toggleDeleteUserDialog: () => dispatch(toggleDeleteUserDialog()),
  toggleEditUserDialog: () => dispatch(toggleEditUserDialog()),
  setUserForOperation: (userId) => dispatch(setUserForOperation(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoRow);
