import InputField from "components/InputField/InputField";
import styled from "styled-components";

export const SendOTPForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1.6rem;
`;

export const SendOTPInputContainer = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 75%;
`;

export const SendOTPInputPrefixNoContainer = styled.span`
  font-size: var(--font-md);
`;

export const StyledSendOTPInputField = styled(InputField)`
  width: 95%;
`;

export const SendOTPCaptchContainer = styled.div`
  position: relative;
  min-width: 30rem;
  min-height: 8rem;
  width: max-content;
`;

export const SendOTPButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SendOTPHeadingText = styled.b`
  font-size: var(--font-md);
  margin-bottom: 1rem;
`;
