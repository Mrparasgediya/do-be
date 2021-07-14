import React, { useState, useRef, useEffect } from "react";
// styles
import * as S from "./ChangeEmailDialog.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  toggleUpdateEmailDialog,
  toggleIsOperationRunning,
} from "redux/user/user.actions";
import {
  selectUpdateEmailDialog,
  selectIsOperationRunning,
} from "redux/user/user.selectors";
// utils
import { auth } from "firebase/firebase.utils";
import { getAuthRedirectUrlDomain } from "utils/app.utils";
// components
import InputField from "components/InputField/InputField";
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";

function ChangeEmailDialog({
  updateEmaildialog,
  toggleUpdateEmailDialog,
  isOperationRunnig,
  toggleIsOperationRunning,
}) {
  const [newEmail, setNewEmail] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [inputHasError, setInputHasError] = useState(false);
  const inputErrorText = useRef();

  useEffect(() => {
    if (updateEmaildialog) return;
    // prevent error while open dialog for second time
    inputErrorText.current = "";
    setInputHasError(false);
    setIsFormSubmitted(false); //to prevent content when one time form is sent
  }, [updateEmaildialog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toggleIsOperationRunning(); // set process is runnig to prevent dialog close
      await auth.currentUser.verifyBeforeUpdateEmail(newEmail, {
        //update email and send verification link
        url: `${getAuthRedirectUrlDomain()}/users/signin`,
      });
      setIsFormSubmitted(!isFormSubmitted); //toggle form is submitted or not
      toggleIsOperationRunning();
    } catch (error) {
      // toggle input errror
      setInputHasError(true);
      // update error message on different errors
      if (error.code === "auth/requires-recent-login") {
        inputErrorText.current =
          "you logged in for long time, so logged in again to change email.";
      } else if (error.code === "auth/email-already-in-use") {
        inputErrorText.current =
          "this email is already use by another account.";
      } else {
        console.log(error);
        inputErrorText.current = error.message;
      }
      // set toggle operation runnning to prevent close dialog on error
      toggleIsOperationRunning();
    }
  };
  return (
    <CustomDialog
      open={updateEmaildialog}
      handleClose={!isOperationRunnig ? toggleUpdateEmailDialog : null}
    >
      <S.ChangeEmailDialogContent>
        <S.ChangeEmailHeading>Change Email</S.ChangeEmailHeading>
        {!isFormSubmitted ? (
          <S.ChangeEmailForm onSubmit={handleSubmit}>
            <InputField
              type="email"
              label="Enter new email"
              helperText={inputErrorText.current}
              error={inputHasError}
              required
              fullWidth
              onChange={(e) => {
                setNewEmail(e.target.value);
                if (inputHasError) {
                  setInputHasError(!inputHasError);
                  inputErrorText.current = "";
                }
              }}
            />
            <CustomButton
              type="submit"
              color="skyblue"
              size="xs"
              isActive
              disabled={isOperationRunnig}
            >
              Change Email
            </CustomButton>
          </S.ChangeEmailForm>
        ) : (
          <S.ChangeEmailMessageText>
            We've send verification link to your new email {newEmail}. after
            your new email verification your email will updated successfully
          </S.ChangeEmailMessageText>
        )}
      </S.ChangeEmailDialogContent>
      <S.ChangeEmailGoBackButton
        onClick={toggleUpdateEmailDialog}
        color="pink"
        align="center"
        size="xs"
        disabled={isOperationRunnig}
      >
        Go Back
      </S.ChangeEmailGoBackButton>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  updateEmaildialog: selectUpdateEmailDialog,
  isOperationRunnig: selectIsOperationRunning,
});
const mapDispatchToProps = (dispatch) => ({
  toggleUpdateEmailDialog: () => dispatch(toggleUpdateEmailDialog()),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailDialog);
