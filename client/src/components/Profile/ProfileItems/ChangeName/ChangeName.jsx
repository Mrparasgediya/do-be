import React, { useEffect, useState } from "react";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  updateCurrentUserName,
  toggleIsOperationRunning,
} from "redux/user/user.actions";
import {
  selectCurrentUser,
  selectIsOperationRunning,
} from "redux/user/user.selectors";
import { showNotification } from "redux/notification/notification.actions";
// components
import ProfileItemInput from "../../ProfileItemInput/ProfileItemInput";
// utils
import { updateUserAuthNameAndProfile } from "firebase/users.utils";

function ChangeName({
  currentUser,
  isOperationRunning,
  updateCurrentUserName,
  toggleIsOperationRunning,
  showNotification,
}) {
  const [toggleInput, setToggleInput] = useState(false);

  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    setNewName(currentUser.name);
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newName !== currentUser.name) {
      toggleIsOperationRunning();
      try {
        // update name to firestore and auth
        await updateUserAuthNameAndProfile(currentUser.id, newName);
        // update name to redux
        updateCurrentUserName(newName);
        toggleIsOperationRunning();
        setToggleInput(false);
        showNotification("you have changed name successfully.", "success");
      } catch (error) {
        toggleIsOperationRunning();
        showNotification("Something gone wrong, try again.", "error");
      }
    }
  };

  return (
    <ProfileItemInput
      displayText={newName}
      buttonText="change name"
      hasForm
      handleFormSubmit={handleSubmit}
      handleInputChange={(e) => setNewName(e.target.value)}
      disabledButton={isOperationRunning}
      toggleInput={toggleInput}
      setToggleInput={() => setToggleInput(!toggleInput)}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isOperationRunning: selectIsOperationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  updateCurrentUserName: (newName) => dispatch(updateCurrentUserName(newName)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName);
