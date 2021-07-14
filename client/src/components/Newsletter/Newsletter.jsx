import React, { useRef, useState } from "react";
// styles
import * as S from "./Newsletter.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectNewsletter } from "redux/static/static.selectors";
import { toggleIsOperationRunning } from "redux/user/user.actions";
import { selectIsOperationRunning } from "redux/user/user.selectors";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "components/CustomImage/CustomImage";
// utils
import {
  isNewsletterEmailExists,
  addNewsletterEmail,
} from "firebase/newsletter.utils";
import { getResourceSize } from "utils/app.utils";

function Newsletter({
  newsletterData,
  isOperationRunning,
  toggleIsOperationRunning,
  showNotification,
}) {
  const emailRef = useRef();
  const errorMessageRef = useRef();
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    toggleIsOperationRunning();
    try {
      const isEmailExists = await isNewsletterEmailExists(email); // check newletter email is exists or not
      if (isEmailExists) throw new Error("email exists");
      await addNewsletterEmail(email);
      toggleIsOperationRunning();
      emailRef.current.value = "";
      showNotification("You have subscribed to our newsletter.", "success");
    } catch (error) {
      if (error.message === "email exists") {
        errorMessageRef.current = "this is newsletter email exists.";
        setHasError(!hasError);
      }
      setHasError(!hasError);
      toggleIsOperationRunning();
    }
  };

  return (
    <S.NewsletterContainer>
      <S.NewsletterImageOverlay />
      {newsletterData && (
        <CustomImage
          type="newsletterImage"
          isObservedImage
          src={newsletterData.src.org.url}
          srcSet={newsletterData.src[getResourceSize()].url}
          placeholderSrc={newsletterData.src.xs.url}
        />
      )}
      <S.NewsletterContentContainer>
        <S.NewsletterForm onSubmit={handleSubmit}>
          <S.NewsletterLabel htmlFor="emailInput">
            Subscribe to our newsletter to get information about new collection
            and events first.
          </S.NewsletterLabel>
          <S.NewsletterInputContainer>
            <S.StyledNewsletterInputField
              ref={emailRef}
              id="emailInput"
              type="email"
              label="Enter Your Email"
              fullWidth
              color="secondary"
              required
              onChange={() => {
                if (hasError) {
                  setHasError(!hasError);
                  errorMessageRef.current = "";
                }
              }}
              error={hasError}
              helperText={hasError && errorMessageRef.current}
            />
            <CustomButton size="small" disabled={isOperationRunning}>
              Subscribe now
            </CustomButton>
          </S.NewsletterInputContainer>
        </S.NewsletterForm>
      </S.NewsletterContentContainer>
    </S.NewsletterContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  newsletterData: selectNewsletter,
  isOperationRunning: selectIsOperationRunning,
});
const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Newsletter);
