import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import InputField from "components/InputField/InputField";

import {
  addNewsletterEmail,
  isNewsletterEmailExists,
} from "firebase/newsletter.utils";

import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import * as S from "./AddNewsletterEmailDialog.styles";

import {
  addNewsletterEmail as addNewsletterEmailToStore,
  toggleIsOperationRunning,
  toggleAddNewsletterEamilDialog,
} from "redux/admin/static/newsletter/newsletter.actions";
import {
  selectIsOperationRunning,
  selectAddNewsletterEmailDialog,
} from "redux/admin/static/newsletter/newsletter.selectors";

import { createStructuredSelector } from "reselect";

function AddNewsletterEmailDialog({
  addNewsletterEmailToStore,
  addNewsletterEmailDialog,
  toggleAddNewsletterEamilDialog,
  isOperationRunning,
  toggleIsOperationRunning,
}) {
  const emailRef = useRef();
  const [hasError, setHasError] = useState(false);
  const errorMessageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    toggleIsOperationRunning();
    try {
      const isNewsletterExists = await isNewsletterEmailExists(email); // check newletter email is exists or not
      if (isNewsletterExists) throw new Error("email exists");
      const newNewsletter = await addNewsletterEmail(emailRef.current.value);
      addNewsletterEmailToStore(newNewsletter);
      toggleIsOperationRunning();
      emailRef.current.value = "";
      toggleAddNewsletterEamilDialog();
    } catch (error) {
      if (error.message === "email exists") {
        errorMessageRef.current = "this is newsletter email exists.";
        setHasError(!hasError);
      }
      setHasError(!hasError);
      console.log(error);
      toggleIsOperationRunning();
    }
  };
  return (
    <CustomDialog
      open={addNewsletterEmailDialog}
      handleClose={!isOperationRunning ? toggleAddNewsletterEamilDialog : null}
      heading="add newsletter"
    >
      <S.StyledContainer>
        <form onSubmit={handleSubmit}>
          <S.StyledInputContainer>
            <S.StyledLabel htmlFor="newsletterEmail">
              Enter Newsletter email
            </S.StyledLabel>
            <InputField
              ref={emailRef}
              type="email"
              id="newsletterEmail"
              label="newsletter email"
              helperText={hasError ? errorMessageRef.current : ""}
              error={hasError}
              onChange={() => {
                if (hasError) {
                  errorMessageRef.current = "";
                  setHasError(!hasError);
                }
              }}
              required
            />
          </S.StyledInputContainer>
          <CustomButton
            disabled={isOperationRunning}
            align="center"
            type="submit"
            color="pink"
            size="xs"
          >
            Add now
          </CustomButton>
        </form>
      </S.StyledContainer>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  addNewsletterEmailDialog: selectAddNewsletterEmailDialog,
});

const mapDispatchToProps = (dispatch) => ({
  addNewsletterEmailToStore: (email) =>
    dispatch(addNewsletterEmailToStore(email)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  toggleAddNewsletterEamilDialog: () =>
    dispatch(toggleAddNewsletterEamilDialog()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewsletterEmailDialog);
