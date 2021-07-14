import CustomButton from "components/CustomButton/CustomButton";
import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  min-height: 28rem;
  @media (max-width: 425px) {
    min-height: 30rem;
  }
`;

export const ForgotPasswordHeading = styled.h3`
  font-family: var(--font-family-body);
  text-transform: capitalize;
  margin: 0 0 1.2rem;
`;

export const ForgotPasswordInputLabel = styled.label`
  font-size: var(--font-md);
  margin: 1.5rem 0;
`;

export const ForgotPasswordForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 425px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

export const ForgotPasswordMessageSentText = styled.b`
  font-size: var(--font-md);
  margin: auto;
  line-height: 2.2rem;
  letter-spacing: 0.5px;
`;

export const StyledForgotPasswordCustomButton = styled(CustomButton)`
  max-width: 10rem;
`;

export const StyledForgotPasswordGoBackButton = styled(CustomButton)`
  margin-top: 5rem !important;
  max-width: 10rem;
`;
