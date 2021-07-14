import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
// styles
import * as S from "./ForgotPassword.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsOperationRunning,
  selectIsPasswordChangelinkSent,
} from "redux/user/user.selectors";
import {
  toggleIsOperationRunning,
  togglePasswordChangeLinkSent,
} from "redux/user/user.actions";
// components
import CustomContainer from "components/CustomContainer/CustomContainer";
import InputField from "components/InputField/InputField";
// utils
import { auth } from "firebase/firebase.utils";
import { getAuthRedirectUrlDomain, scrollWindowToTop } from "utils/app.utils";

function ForgotPassword({
  history,
  isOperationRunning,
  isPasswordChangeLinkSent,
  toggleIsOperationRunning,
  togglePasswordChangeLinkSent,
  currentUser,
}) {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    scrollWindowToTop();
  }, []);

  useEffect(() => {
    if (selectIsPasswordChangelinkSent) togglePasswordChangeLinkSent();
    if (currentUser) {
      setEmail(currentUser.email);
      sendChangePasswordToEmail(currentUser.email);
    }
  }, [currentUser]);

  const sendChangePasswordToEmail = async (emailToSend) => {
    toggleIsOperationRunning();
    try {
      await auth.sendPasswordResetEmail(emailToSend, {
        url: `${getAuthRedirectUrlDomain()}/users/signin`,
      });
      togglePasswordChangeLinkSent();
      toggleIsOperationRunning();
    } catch (error) {
      console.log(error);
      toggleIsOperationRunning();
      setHasError(true);
      if (error.code === "auth/user-not-found") {
        setErrorMessage("Entered email not found so enter valid email.");
      } else {
        setErrorMessage(error.message);
      }
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendChangePasswordToEmail(email);
  };

  return (
    <CustomContainer size="small">
      <S.ForgotPasswordContainer>
        <S.ForgotPasswordHeading>Forgot password</S.ForgotPasswordHeading>
        {!isPasswordChangeLinkSent && !currentUser ? (
          <Fragment>
            <S.ForgotPasswordInputLabel htmlFor="email">
              Enter your account email to change password
            </S.ForgotPasswordInputLabel>
            <S.ForgotPasswordForm onSubmit={handleSubmit}>
              <InputField
                id="email"
                label="Enter Your Email"
                value={email}
                onChange={(e) => {
                  if (hasError) {
                    setHasError(false);
                    setErrorMessage("");
                  }
                  setEmail(e.target.value);
                }}
                type="email"
                helperText={errorMessage}
                error={hasError}
                required
                fullWidth
              />
              <S.StyledForgotPasswordCustomButton
                color="skyblue"
                size="xs"
                isActive
                disabled={isOperationRunning}
              >
                submit
              </S.StyledForgotPasswordCustomButton>
            </S.ForgotPasswordForm>
          </Fragment>
        ) : (
          <S.ForgotPasswordMessageSentText>
            {/* {hasError
              ? errorMessage.current
              : `We've send change password link to email {email}. Check your email
            now!`} */}
            We've send change password link to email {email}. Check your email
            now!
            <br />
            <br />
            Thank you.
          </S.ForgotPasswordMessageSentText>
        )}

        <S.StyledForgotPasswordGoBackButton
          color="skyblue"
          size="xs"
          align="center"
          onClick={() => history.push("/users/signin")}
          disabled={isOperationRunning}
        >
          go back
        </S.StyledForgotPasswordGoBackButton>
      </S.ForgotPasswordContainer>
    </CustomContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  isPasswordChangeLinkSent: selectIsPasswordChangelinkSent,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  togglePasswordChangeLinkSent: () => dispatch(togglePasswordChangeLinkSent()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgotPassword));
