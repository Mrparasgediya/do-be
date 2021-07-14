import CustomDialog from "components/CustomDialog/CustomDialog";
import InputField from "components/InputField/InputField";
import React, { useRef, useState } from "react";
import API from "api";
import CustomButton from "components/CustomButton/CustomButton";
import { AES } from "crypto-js";
import { addUserFromAdmin } from "firebase/users.utils";
import { connect } from "react-redux";
import {
  addNewUser,
  toggleAddUserDialog,
  toggleIsOperationRunning,
} from "redux/admin/users/users.actions";
import { createStructuredSelector } from "reselect";
import {
  selectAddUserDialog,
  selectIsOperationRunning,
} from "redux/admin/users/users.selectors";
import { showNotification } from "redux/notification/notification.actions";

function AddUserDialog({
  isOperationRunning,
  toggleIsOperationRunning,
  toggleAddUserDialog,
  addUserDialog,
  addNewUser,
  showNotification,
}) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [hasPasswordErrored, setHasPasswordErrored] = useState(false);
  const [passwordError, setPassowrdError] = useState("");
  const [hasEmailErrored, setHasEmailErrored] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const CRYPTO_SECRET =
    process.env.NODE_ENV === "production"
      ? process.env.CRYPTO_SECRET
      : "103paras2001";

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const currentEmail = emailRef.current.value;
    const currentPassword = passwordRef.current.value;
    const currentConfirmPassowrd = confirmPasswordRef.current.value;
    const passwordLength = currentPassword.length;
    if (
      currentConfirmPassowrd === currentPassword &&
      passwordLength >= 8 &&
      passwordLength <= 12
    ) {
      try {
        toggleIsOperationRunning();

        const encryptedUserInfo = AES.encrypt(
          JSON.stringify({
            email: currentEmail,
            password: currentPassword,
          }),
          CRYPTO_SECRET
        ).toString();

        const res = await API.post("/firebase/admin/auth/users", {
          userInfo: encryptedUserInfo,
        });

        console.log(res);
        const { data } = res || {};
        const { user } = data || {};
        if (Object.keys(user).length > 0)
          throw new Error("user is not created");

        const { id, ...otherUserData } = await addUserFromAdmin(user);
        addNewUser(id, otherUserData);
        toggleIsOperationRunning();

        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
        toggleAddUserDialog();
        showNotification(`user ${otherUserData.email} is added.`, "info");
      } catch (error) {
        const { response } = error;
        if (response.data) {
          if (response.data.code.includes("email")) {
            setEmailError(response.data.message);
            setHasEmailErrored(true);
          } else if (response.data.code.includes("password")) {
            setPassowrdError(response.data.message);
            setHasPasswordErrored(true);
          } else {
            setErrorMessage(response.data.message);
            setHasError(true);
          }
        } else {
          setErrorMessage(error.message);
          setHasError(true);
        }
        toggleIsOperationRunning();
      }
    } else {
      if (passwordLength < 8 && passwordLength > 12) {
        setPassowrdError("password length must be between 8 to 12.");
      } else {
        setPassowrdError("password do not matched");
      }
      setHasPasswordErrored(true);
    }
  };

  return (
    <CustomDialog
      open={addUserDialog}
      handleClose={!isOperationRunning ? toggleAddUserDialog : null}
      heading={"add new user"}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        onSubmit={submitFormHandler}
      >
        <InputField
          type="email"
          label="email"
          ref={emailRef}
          required
          error={hasEmailErrored}
          onChange={() => {
            if (hasEmailErrored) {
              setEmailError("");
              setHasEmailErrored(false);
            }
            if (hasError) {
              setErrorMessage("");
              setHasError(false);
            }
          }}
          helperText={(hasEmailErrored && emailError) || ""}
        />

        <InputField
          type="password"
          label="password"
          ref={passwordRef}
          required
          error={hasPasswordErrored}
          helperText={(hasPasswordErrored && passwordError) || ""}
          onChange={() => {
            if (hasPasswordErrored) {
              setPassowrdError("");
              setHasPasswordErrored(false);
            }
            if (hasError) {
              setErrorMessage("");
              setHasError(false);
            }
          }}
        />

        <InputField
          type="password"
          label="confirm password"
          ref={confirmPasswordRef}
          required
        />
        {hasError && (
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
          color="pink"
          size="sm"
          align="center"
          disabled={isOperationRunning}
        >
          add user
        </CustomButton>
      </form>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  addUserDialog: selectAddUserDialog,
});
const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  toggleAddUserDialog: () => dispatch(toggleAddUserDialog()),
  addNewUser: (userId, userData) => dispatch(addNewUser(userId, userData)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserDialog);
