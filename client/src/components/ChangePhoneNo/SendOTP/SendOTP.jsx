import React, { useEffect, useRef, useState } from "react";
// styles
import * as S from "./SendOTP.styles";
// redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomButton from "components/CustomButton/CustomButton";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
// utils
import firebase from "firebase/firebase.utils";

function SendOTP({ showNotification, onNext, setVerificationId, setPhoneNo }) {
  const phoneNumberInputRef = useRef();
  const recaptchaRef = useRef();
  const recaptchaVerifierRef = useRef();
  const recaptchaResponse = useRef();
  const [disableSendOTP, setDisableSendOTP] = useState(true);
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initAndRenderCaptcha = async () => {
    // create captcha verifier
    recaptchaVerifierRef.current = new firebase.auth.RecaptchaVerifier(
      recaptchaRef.current,
      {
        size: "normal",
        callback: (response) => {
          recaptchaResponse.current = response;
          setDisableSendOTP(false);
        },
        "expired-callback": () => {
          showNotification("Verify captcha again", "error");
        },
      }
    );
    setIsRecaptchaLoading(true);
    try {
      await recaptchaVerifierRef.current.render();
      setIsRecaptchaLoading(false);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  useEffect(() => {
    initAndRenderCaptcha();
    return () => {
      recaptchaRef.current = null;
      recaptchaVerifierRef.current = null;
      recaptchaResponse.current = null;
    };
  }, []);

  const sendOTPSubmitHandler = async (e) => {
    e.preventDefault();

    if (recaptchaResponse.current) {
      const phoneNumber = `+91${phoneNumberInputRef.current.value}`;
      const appVerifier = recaptchaVerifierRef.current;
      setPhoneNo(`+91${phoneNumberInputRef.current.value}`);
      setIsLoading(true);
      try {
        // confirmation result of auth with captcha
        const confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier);
        // set verification id to check otp
        setVerificationId(confirmationResult.verificationId);
        setIsLoading(false);

        onNext();
      } catch (error) {
        showNotification(error.message, "error");
        setIsLoading(false);
      }
    } else {
      showNotification("Verify captcha first", "error");
    }
  };

  return (
    <S.SendOTPForm onSubmit={sendOTPSubmitHandler}>
      <S.SendOTPHeadingText>Confirm Phone No</S.SendOTPHeadingText>
      <S.SendOTPInputContainer>
        <S.SendOTPInputPrefixNoContainer>+91</S.SendOTPInputPrefixNoContainer>
        <S.StyledSendOTPInputField
          type="tel"
          label="Contact No"
          ref={phoneNumberInputRef}
          inputProps={{
            title: "Please enter valid indian contact no",
            pattern: "^[6789]\\d{9}$",
          }}
          helperText="must be valid indian no"
          required
        />
      </S.SendOTPInputContainer>
      <S.SendOTPCaptchContainer>
        <div ref={recaptchaRef} />
        {isRecaptchaLoading && <LoadingSpinner placeCenter />}
      </S.SendOTPCaptchContainer>
      <S.SendOTPButtonsContainer>
        <Link to="/user/profile">
          <CustomButton
            disabled={isLoading}
            size="small"
            color="black"
            type="button"
            isActive
          >
            go back
          </CustomButton>
        </Link>
        <CustomButton
          disabled={disableSendOTP || isLoading}
          type="submit"
          color="pink"
          size="small"
          isActive
          hasLoading
          isLoading={isLoading}
        >
          send otp
        </CustomButton>
      </S.SendOTPButtonsContainer>
    </S.SendOTPForm>
  );
}

const mapDispatchToProps = (dispatch) => ({
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});
export default connect(null, mapDispatchToProps)(SendOTP);
