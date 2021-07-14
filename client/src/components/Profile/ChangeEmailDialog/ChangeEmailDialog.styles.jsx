import CustomButton from "components/CustomButton/CustomButton";
import styled from "styled-components";

export const ChangeEmailDialogContent = styled.div`
  padding: 0 2.5rem;
  width: 35rem;
  min-height: 20rem;
`;

export const ChangeEmailHeading = styled.h3`
  font-family: var(--font-family-body);
`;

export const ChangeEmailForm = styled.form`
  margin: 2rem 0;
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ChangeEmailMessageText = styled.b`
  font-size: var(--font-md);
  margin-top: 3.5rem;
  letter-spacing: 0.5px;
  line-height: 20px;
`;

export const ChangeEmailGoBackButton = styled(CustomButton)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
