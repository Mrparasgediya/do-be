import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const SignInAndSignUpContainer = styled.div`
  min-height: 80vh;
  width: 100%;
  display: flex;

  @media (max-width: 375px) {
    padding: 4rem 0;
  }

  @media (max-width: 768px) {
    min-height: 60vh;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    min-height: 70vh;
  }
`;

const imageContainerLeftSideStyle = css`
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
`;
const imageContainerRightSideStyle = css`
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const getImageContainerSizeStyle = ({ side }) => {
  return side === "right"
    ? imageContainerRightSideStyle
    : imageContainerLeftSideStyle;
};

export const SignInAndSignUpImageContainer = styled.div`
  flex: 0.5;
  overflow: hidden;
  position: relative;
  ${(props) => getImageContainerSizeStyle(props)} @media
    (max-width: 768px) {
    display: none;
  }
`;

export const SignInAndSignUpContentContainer = styled.div`
  display: flex;
  flex: 0.5;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 3rem;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const SignInAndSignUpHeadingText = styled.h3`
  font-family: var(--font-family-body) !important;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;
export const SignInAndSignUpHeadingSubText = styled.span`
  font-size: var(--font-md);
`;

export const SignInAndSignUpForm = styled.form`
  width: 65%;
  height: max-content;
  text-align: left;
  display: flex;
  flex-direction: column;

  @media (max-width: 375px) {
    width: 100%;
  }

  @media (min-width: 321px) and (max-width: 768px) {
    width: 60%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 70%;
  }
`;
export const SignInAndSignUpVerifyEmailMessage = styled.div`
  font-size: var(--font-md);
  color: var(--color-green);
`;

export const SignInAndSignUpOrLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  width: 75%;
`;

export const SignInAndSignUpOrLine = styled.span`
  height: 0.1rem;
  width: 40%;
  background-color: var(--color-black);
`;

export const SignInAndSignUpOrText = styled.span`
  font-size: var(--font-md);
`;

export const SignInAndSignUpOauthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: max-content;
`;

export const SignInAndSignUpAlternateLinkContainer = styled.div`
  font-size: var(--font-sm);
`;

export const SignInAndSignUpAlternateLink = styled(Link)`
  margin-left: 0.5rem;
  color: var(--color-skyblue) !important;
  font-size: var(--font-md);
  border-color: var(--color-skyblue);
`;

export const SignInAndSignUpForgotPasswordLink = styled(Link)`
  font-size: var(--font-md);
  margin-right: auto;
  margin: 1.5rem 0 1rem;
  color: var(--color-skyblue) !important;
`;
