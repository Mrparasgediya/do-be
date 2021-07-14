import api from "api";
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import InputField from "components/InputField/InputField";
import { updateUserDoc } from "firebase/users.utils";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  editUser,
  setUserForOperation,
  toggleEditUserDialog,
  toggleIsOperationRunning,
} from "redux/admin/users/users.actions";
import {
  selectEditUserDialog,
  selectIsOperationRunning,
  selectUserForOperation,
} from "redux/admin/users/users.selectors";
import { showNotification } from "redux/notification/notification.actions";
import { createStructuredSelector } from "reselect";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";

function EditUserDialog({
  editUserDialog,
  toggleEditUserDialog,
  setUserForOperation,
  userForOperation,
  isOperationRunning,
  toggleIsOperationRunning,
  editUser,
  showNotification,
}) {
  const { email, name, role, provider } = userForOperation;
  const [userEmail, setUserEmail] = useState(email || "");
  const [userName, setUserName] = useState(name || "");
  const [userRole, setUserRole] = useState(role);
  const isEmailUpdateable = !(
    provider === "google.com" || provider === "facebook.com"
  );

  const [hasEmailErrored, setHasEmailErrored] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearInputs = () => {
    setUserName("");
    setUserRole("");
    setUserEmail("");
  };
  const closeDialogHandler = () => {
    clearInputs();
    toggleEditUserDialog();
    setUserForOperation(null);
  };

  const editUserFormHandler = async (e) => {
    e.preventDefault();
    const dataToUpdate = {};
    const { email, name, role } = userForOperation;
    if (email !== userEmail) {
      dataToUpdate.email = userEmail;
    }
    if (userName.length > 0 && name !== userName) {
      dataToUpdate.name = userName;
    }
    if (role !== userRole) {
      dataToUpdate.role = userRole;
    }
    const dataToUpdateKeys = Object.keys(dataToUpdate);
    // if there is not any changes
    if (dataToUpdateKeys.length === 0) {
      clearInputs();
      return closeDialogHandler();
    }

    try {
      const { id } = userForOperation;
      const { role, ...otherData } = dataToUpdate;
      toggleIsOperationRunning();
      if (otherData) {
        const { name, ...restData } = otherData;
        const convertedData = { ...restData };
        if (name) {
          convertedData.displayName = name;
        }
        // update auth user by admin
        const { data } = await api.put(
          `/firebase/admin/auth/users/${id}`,
          convertedData
        );
        if (data.result !== "ok") {
          throw new Error("User auth is not updated");
        }
      }
      // update firebase user
      await updateUserDoc(id, dataToUpdate);
      // update redux user
      editUser(id, dataToUpdate);
      toggleIsOperationRunning();
      showNotification(`user ${userEmail} is updated.`, "info");
      closeDialogHandler();
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.code.includes("email")) {
          setErrorMessage(data.message);
          setHasEmailErrored(true);
        } else {
          setErrorMessage(data);
          setHasErrored(true);
        }
      } else {
        setErrorMessage(error.message);
        setHasErrored(true);
      }
      toggleIsOperationRunning();
    }

    console.log(dataToUpdate);
  };

  return (
    <CustomDialog
      open={editUserDialog}
      handleClose={!isOperationRunning ? closeDialogHandler : null}
      heading={"edit user"}
    >
      <form
        onSubmit={editUserFormHandler}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <InputField
          type="email"
          label={"user email"}
          value={userEmail}
          onChange={(e) => {
            if (hasEmailErrored) {
              setErrorMessage("");
              setHasEmailErrored(false);
            }
            if (hasErrored) {
              setErrorMessage("");
              setHasErrored(false);
            }
            setUserEmail(e.target.value);
          }}
          required
          fullWidth
          disabled={!isEmailUpdateable}
          helperText={
            (!isEmailUpdateable &&
              "You can only change email whose provider is password") ||
            (hasEmailErrored && errorMessage)
          }
          error={hasEmailErrored}
        />
        <InputField
          type="text"
          label={"user name"}
          value={userName}
          onChange={(e) => {
            if (hasErrored) {
              setErrorMessage("");
              setHasErrored(false);
            }
            setUserName(e.target.value);
          }}
          fullWidth
        />

        <CustomSelect
          fullWidth
          options={["viewer", "admin"]}
          value={userRole}
          onChange={(e) => {
            if (hasErrored) {
              setErrorMessage("");
              setHasErrored(false);
            }
            setUserRole(e.target.value);
          }}
          required
        />
        {hasErrored && (
          <b
            style={{
              fontSize: "var(--font-sm)",
              maxWidth: "280px",
              color: "var(--color-red)",
              textTransform: "capitalize",
            }}
          >
            {errorMessage}
          </b>
        )}
        <CustomButton
          hasLoading
          isLoading={isOperationRunning}
          disabled={isOperationRunning}
          color="pink"
          size="sm"
        >
          edit user
        </CustomButton>
      </form>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  editUserDialog: selectEditUserDialog,
  userForOperation: selectUserForOperation,
  isOperationRunning: selectIsOperationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEditUserDialog: () => dispatch(toggleEditUserDialog()),
  setUserForOperation: (userId) => dispatch(setUserForOperation(userId)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  editUser: (userId, dataToUpdate) => dispatch(editUser(userId, dataToUpdate)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserDialog);
