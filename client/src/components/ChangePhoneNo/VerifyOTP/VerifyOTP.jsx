import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
// styles
import * as S from "./VerifyOTP.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { showNotification } from "redux/notification/notification.actions";
import { setCurrentUserPhoneNo } from "redux/user/user.actions";
import { selectCurrentUserId } from "redux/user/user.selectors";
// components
import CustomButton from "components/CustomButton/CustomButton";
import InputField from "components/InputField/InputField";
// utils
import firebase, { auth } from "firebase/firebase.utils";
import { updateUserPhoneNumber } from "firebase/users.utils";

function VerifyOTP({
  verificationId,
  onGoBack,
  showNotification,
  setCurrentUserPhoneNo,
  currentUserId,
  phoneNo,
}) {
  const otpInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const otp = otpInputRef.current.value;
    setIsLoading(true);
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      // update phone no to auth
      await auth.currentUser.updatePhoneNumber(credential);
      // update phone no to user doc
      const [, error] = await updateUserPhoneNumber(currentUserId, phoneNo);
      if (error) throw new Error(error);
      // update phone no to redux user
      setCurrentUserPhoneNo(phoneNo);
      setIsLoading(false);
      showNotification("Your phone no is changed successfully.", "success");
      history.push("/user/profile");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/credential-already-in-use") {
        showNotification("This phone no is already in use.", "error");
      } else if (error.code === "auth/invalid-verification-code") {
        showNotification("Invalid OTP, try again.", "error");
      } else {
        showNotification(error.message, "error");
      }
      setIsLoading(false);
    }
  };

  return (
    <S.VerifyOTPForm onSubmit={handleVerifyCode}>
      <S.VerifyOTPHeadingText>Verify OTP</S.VerifyOTPHeadingText>
      <InputField
        type="text"
        label="Enter OTP"
        ref={otpInputRef}
        inputProps={{
          title: "Please enter valid OTP",
          pattern: "\\d{6}$",
          maxLength: "6",
        }}
        required
      />
      <S.VerifyOTPButtonsContainer>
        <CustomButton
          onClick={onGoBack}
          size="small"
          color="black"
          isActive
          type="button"
          disabled={isLoading}
        >
          go back
        </CustomButton>
        <CustomButton
          hasLoading
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
          color="pink"
          size="small"
          isActive
        >
          Verify otp
        </CustomButton>
      </S.VerifyOTPButtonsContainer>
    </S.VerifyOTPForm>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
});
const mapDispatchToProps = (dispatch) => ({
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  setCurrentUserPhoneNo: (phoneNo) => dispatch(setCurrentUserPhoneNo(phoneNo)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
