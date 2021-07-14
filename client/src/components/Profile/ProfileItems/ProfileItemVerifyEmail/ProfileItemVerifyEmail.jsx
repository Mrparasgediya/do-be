import React, { useEffect, useState } from "react";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setIsEmailVerificationLinkSent,
  toggleIsOperationRunning,
} from "redux/user/user.actions";
import {
  selectCurrentUser,
  selectIsEmailVerificationLinkSent,
  selectIsOperationRunning,
} from "redux/user/user.selectors";
import { showNotification } from "redux/notification/notification.actions";
// components
import ProfileItemInput from "../../ProfileItemInput/ProfileItemInput";
// utils
import { auth } from "firebase/firebase.utils";
import { getAuthRedirectUrlDomain } from "utils/app.utils";

function ProfileItemVerifyEmail({
  currentUser,
  isOperationRunning,
  isEmailVerificationLinkSent,
  toggleIsOperationRunning,
  setIsEmailVerificationLinkSent,
  showNotification,
}) {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (!currentUser.emailVerified && isEmailVerificationLinkSent) {
      setIsEmailVerificationLinkSent(false);
    }
  }, [currentUser]);

  const sendEmailVerificationLink = async () => {
    try {
      toggleIsOperationRunning(); // to prevent multiple request
      await auth.currentUser.sendEmailVerification({
        url: `${getAuthRedirectUrlDomain()}/users/signin`,
      }); // send email verification link to user account
      setIsEmailVerificationLinkSent(true); //update redux that link sent successfully
      toggleIsOperationRunning();
      showNotification(
        "We have send email verification link to you email account.",
        "info"
      );
    } catch (error) {
      toggleIsOperationRunning();
      showNotification(error.message, "error");
      setHasError(true);
    }
  };

  return (
    <ProfileItemInput
      displayText={
        currentUser && currentUser.emailVerified
          ? "Your Email is verified"
          : !isEmailVerificationLinkSent
          ? hasError
            ? "something went wrong try later."
            : "Verify your email now"
          : "Verification link send to your email check your email"
      }
      buttonText="verify email"
      handleClick={sendEmailVerificationLink}
      displayButtonCondition={
        (currentUser && currentUser.emailVerified) ||
        isEmailVerificationLinkSent ||
        hasError // here we send true value so we update to
      }
      disabledButton={isOperationRunning}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isEmailVerificationLinkSent: selectIsEmailVerificationLinkSent,
  isOperationRunning: selectIsOperationRunning,
});
const mapDispatchToPops = (dispatch) => ({
  setIsEmailVerificationLinkSent: (isVerificationLinkSent) =>
    dispatch(setIsEmailVerificationLinkSent(isVerificationLinkSent)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToPops
)(ProfileItemVerifyEmail);
