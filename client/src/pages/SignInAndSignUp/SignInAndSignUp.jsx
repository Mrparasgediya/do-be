import React from "react";
import { withRouter } from "react-router-dom";
// styles
import * as S from "./SignInAndSignUp.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setIsEmailVerificationLinkSent } from "redux/user/user.actions";
import {
  selectCurrentUser,
  selectIsEmailVerificationLinkSent,
} from "redux/user/user.selectors";
// components
import { ReactComponent as FacebookIcon } from "assets/icons/facebook.svg";
import { ReactComponent as GoogleIcon } from "assets/icons/google.svg";
import CustomButton from "components/CustomButton/CustomButton";
import CustomContainer from "components/CustomContainer/CustomContainer";
import InputField from "components/InputField/InputField";
import CustomImage from "components/CustomImage/CustomImage";
// utils
import {
  signInWithGoogle,
  signInWithFacebook,
  singinWithEmailAndPassword,
  createUserWithEmailAndPassword,
  auth,
} from "firebase/firebase.utils";
import { getAuthRedirectUrlDomain, scrollWindowToTop } from "utils/app.utils";
import { showNotification } from "redux/notification/notification.actions";
// static data
import content from "./content";

class SignInAndSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailHelperText: this.defaultEmailHelperText,
      passwordHelperText: this.defaultPasswordHelperText,
      confirmPasswordHelperText: this.defaultConfirmPasswordHelperText,
      confirmPasswordHasError: false,
      passwordHasError: false,
      emailHasError: false,
      isNewUser: false,
    };
  }

  emailRef = React.createRef();
  passwordRef = React.createRef();
  confirmPasswordRef = React.createRef();

  defaultPasswordHelperText = "Password must have min 8 chars";
  defaultConfirmPasswordHelperText = "Confirm password";
  defaultEmailHelperText = "Your email";

  componentDidMount() {
    scrollWindowToTop();
    const { currentUser, history } = this.props;
    if (currentUser) history.push("/"); // redirect user to home if user is already logged in

    const { isEmailVerificationLinkSent, setIsEmailVerificationLinkSent } =
      this.props;

    if (isEmailVerificationLinkSent) {
      setIsEmailVerificationLinkSent(false);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let currentEmail = this.emailRef.current;
    let currentPassword = this.passwordRef.current;
    let currentConfirmPassword = this.confirmPasswordRef.current;
    let isOperationsisSuccessful = false;
    const { showNotification } = this.props;

    const pageType = this.props.match.params.signInOrSignUp;
    // create new user with email and password if page type is signup

    const { setIsEmailVerificationLinkSent } = this.props;

    if (pageType === "signup") {
      // check password has valid length
      if (currentPassword.value.length < 8) {
        this.setState({
          passwordHasError: true,
          passwordHelperText: "Your password must be greater then 8 characters",
        });
      } else {
        //  check password and confirm password is same
        if (currentConfirmPassword.value !== currentPassword.value) {
          this.setState({
            confirmPasswordHasError: true,
            confirmPasswordHelperText: "password doesn't matched",
          });
          return;
        }
        // creating account to firebase with email and password
        try {
          const userAuth = await createUserWithEmailAndPassword(
            currentEmail.value,
            currentPassword.value
          );

          if (!userAuth.emailVerified) {
            await auth.currentUser.sendEmailVerification({
              url: `${getAuthRedirectUrlDomain()}/users/signin`,
            }); //send verification link to user email
            setIsEmailVerificationLinkSent(true);
          }
          isOperationsisSuccessful = true;
          showNotification("You have created account successfully.", "success");

          showNotification(
            "We have sent verification link to your email.",
            "info"
          );
          this.setState({
            isNewUser: true,
          });
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            this.setState({
              emailHasError: true,
              emailHelperText: "This email is already in use",
            });
          }
        }
      }
    }

    if (pageType === "signin") {
      // find user from firebase auth
      try {
        await singinWithEmailAndPassword(
          currentEmail.value,
          currentPassword.value
        );
        isOperationsisSuccessful = true;
        showNotification("You have signed in successfully.", "success");
      } catch (error) {
        // if user not found
        if (error.code === "auth/user-not-found") {
          this.setState({
            emailHasError: true,
            emailHelperText: "User not found, Enter valid email",
          });
        } else if (error.code === "auth/wrong-password") {
          this.setState({
            passwordHasError: true,
            passwordHelperText: "Wrong password, enter valid password",
          });
        } else {
          showNotification(error.message, "error");
        }
      }
    }
    // clear inputs
    if (isOperationsisSuccessful) {
      currentEmail.value = "";
      currentPassword.value = "";
      if (currentConfirmPassword) currentConfirmPassword.value = "";
    }
  };

  componentDidUpdate(prevState) {
    const { match: prevMatch } = prevState;

    const { isNewUser } = this.state;
    const { currentUser, history, match: currentMatch } = this.props;

    if (
      currentMatch.params.signInOrSignUp !== prevMatch.params.signInOrSignUp
    ) {
      this.setState({
        emailHasError: false,
        emailHelperText: this.defaultEmailHelperText,
        confirmPasswordHasError: false,
        confirmPasswordHelperText: this.defaultConfirmPasswordHelperText,
        passwordHasError: false,
        passwordHelperText: this.defaultPasswordHelperText,
        isEmailVerificationLinkSent: false,
      });
    }

    if (currentUser) {
      let path = "/";
      if (isNewUser) {
        path = "/user/profile";
      }
      history.push(path);
    }
  }

  render() {
    const { isEmailVerificationLinkSent, match, showNotification } = this.props;
    const pageType = match.params.signInOrSignUp;
    const {
      passwordHelperText,
      confirmPasswordHelperText,
      confirmPasswordHasError,
      passwordHasError,
      emailHasError,
      emailHelperText,
    } = this.state;
    return (
      <CustomContainer>
        <S.SignInAndSignUpContainer>
          {pageType === "signup" && (
            <S.SignInAndSignUpImageContainer side="left">
              <CustomImage
                type="signUpImage"
                src={content[pageType].imageSrc.org}
                placeholderSrc={content[pageType].imageSrc.blur}
              />
            </S.SignInAndSignUpImageContainer>
          )}
          <S.SignInAndSignUpContentContainer>
            <div>
              <S.SignInAndSignUpHeadingText>
                {content[pageType].heading}
              </S.SignInAndSignUpHeadingText>
              <S.SignInAndSignUpHeadingSubText>
                {content[pageType].caption}
              </S.SignInAndSignUpHeadingSubText>
            </div>
            <S.SignInAndSignUpForm onSubmit={this.handleSubmit}>
              {pageType === "signup" && isEmailVerificationLinkSent && (
                <S.SignInAndSignUpVerifyEmailMessage>
                  We've sent email verification link to your email. Please
                  verify now
                </S.SignInAndSignUpVerifyEmailMessage>
              )}
              <InputField
                fullWidth
                label="Email"
                InputLabelProps={{ htmlFor: "email" }}
                inputProps={{ id: "email" }}
                helperText={emailHelperText}
                required
                type="email"
                ref={this.emailRef}
                error={emailHasError}
                onChange={() => {
                  if (!emailHasError) return;
                  if (emailHasError) {
                    this.setState({
                      emailHasError: false,
                      emailHelperText: this.defaultEmailHelperText,
                    });
                  }
                }}
              />
              <InputField
                fullWidth
                label="Password"
                InputLabelProps={{ htmlFor: "password" }}
                inputProps={{ id: "password" }}
                helperText={passwordHelperText}
                required
                type="password"
                ref={this.passwordRef}
                error={passwordHasError}
                onChange={(e) => {
                  if (!passwordHasError) return;
                  if (
                    (pageType === "signup" && e.target.value.length > 7) ||
                    pageType === "signin"
                  ) {
                    this.setState({
                      passwordHasError: false,
                      passwordHelperText: this.defaultPasswordHelperText,
                    });
                  }
                }}
              />
              {pageType === "signup" && (
                <InputField
                  fullWidth
                  label="Confirm Password"
                  InputLabelProps={{ htmlFor: "confirmPassword" }}
                  inputProps={{ id: "confirmPassword" }}
                  helperText={confirmPasswordHelperText}
                  required
                  type="password"
                  ref={this.confirmPasswordRef}
                  error={confirmPasswordHasError}
                  onChange={(e) => {
                    if (!confirmPasswordHasError) return;
                    if (e.target.value === this.passwordRef.current.value) {
                      this.setState({
                        confirmPasswordHasError: false,
                        confirmPasswordHelperText:
                          this.defaultConfirmPasswordHelperText,
                      });
                    }
                  }}
                />
              )}
              {pageType === "signin" && (
                <S.SignInAndSignUpForgotPasswordLink to="/user/change/password">
                  Forgot Password ?
                </S.SignInAndSignUpForgotPasswordLink>
              )}
              <CustomButton
                type="submit"
                color="black"
                size="full"
                align="center"
              >
                {content[pageType].name}
              </CustomButton>
            </S.SignInAndSignUpForm>
            <S.SignInAndSignUpOrLineContainer>
              <S.SignInAndSignUpOrLine />
              <S.SignInAndSignUpOrText>OR</S.SignInAndSignUpOrText>
              <S.SignInAndSignUpOrLine />
            </S.SignInAndSignUpOrLineContainer>

            <S.SignInAndSignUpOauthContainer>
              <CustomButton
                type="submit"
                color="black"
                size="full"
                buttonType="oauth"
                onClick={async () => {
                  try {
                    await auth.signOut();
                    const user = await signInWithGoogle();
                    if (user) {
                      showNotification(
                        "You have signed in with google successfully.",
                        "success"
                      );
                    }
                  } catch (error) {
                    showNotification(error.message, "error");
                  }
                }}
              >
                <GoogleIcon /> continue with Google
              </CustomButton>
              <CustomButton
                type="submit"
                color="black"
                size="full"
                buttonType="oauth"
                onClick={async () => {
                  try {
                    await auth.signOut();
                    const user = await signInWithFacebook();
                    if (user) {
                      showNotification(
                        "You have signed in with facebook successfully.",
                        "success"
                      );
                    }
                  } catch (error) {
                    showNotification(error.message, "error");
                  }
                }}
              >
                <FacebookIcon /> continue with Facebook
              </CustomButton>

              <S.SignInAndSignUpAlternateLinkContainer>
                {content[pageType].alternate.text}
                <S.SignInAndSignUpAlternateLink
                  to={content[pageType].alternate.link}
                >
                  {content[pageType].alternate.name}
                </S.SignInAndSignUpAlternateLink>
              </S.SignInAndSignUpAlternateLinkContainer>
            </S.SignInAndSignUpOauthContainer>
          </S.SignInAndSignUpContentContainer>
          {pageType === "signin" && (
            <S.SignInAndSignUpImageContainer side="right">
              <CustomImage
                type="signInImage"
                src={content[pageType].imageSrc.org}
                placeholderSrc={content[pageType].imageSrc.blur}
              />
            </S.SignInAndSignUpImageContainer>
          )}
        </S.SignInAndSignUpContainer>
      </CustomContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isEmailVerificationLinkSent: selectIsEmailVerificationLinkSent,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setIsEmailVerificationLinkSent: () =>
    dispatch(setIsEmailVerificationLinkSent()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignInAndSignUp));
