import styled from "styled-components";
import { Dialog } from "@material-ui/core";
import InputField from "components/InputField/InputField";

export const StyledDialog = styled(Dialog)`
  .MuiDialogContent-root {
    padding: 2.4rem !important;
  }
`;

export const StyledCancelDialogInputField = styled(InputField)`
  margin-bottom: 1rem;
`;

export const CancelDialogForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const CancelDialogDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  font-size: var(--font-md);
`;
