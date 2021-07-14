import React, { Fragment } from "react";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleUpdateEmailDialog } from "redux/user/user.actions";
import {
  selectCurrentUser,
  selectIsOperationRunning,
} from "redux/user/user.selectors";
// components
import ProfileItemInput from "../../ProfileItemInput/ProfileItemInput";
import ChangeEmailDialog from "../../ChangeEmailDialog/ChangeEmailDialog";

function ProfileItemEmail({
  currentUser,
  isOperationRunning,
  toggleUpdateEmailDialog,
}) {
  return (
    <Fragment>
      <ProfileItemInput
        displayText={currentUser && currentUser.email}
        handleClick={toggleUpdateEmailDialog}
        buttonText="change email"
        disabledButton={isOperationRunning}
      />
      <ChangeEmailDialog />
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isOperationRunning: selectIsOperationRunning,
});
const mapDispatchToProps = (dispatch) => ({
  toggleUpdateEmailDialog: () => dispatch(toggleUpdateEmailDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItemEmail);
