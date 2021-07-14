import styled from "styled-components";
import FileInput from "../FileInput/FileInput";

export const StyledForm = styled.form`
  min-width: 35rem;
  padding: 0rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`;

export const StyledFileInput = styled(FileInput)`
  min-height: 30rem;
`;

export const StyleFileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const StyledLabel = styled.label`
  font-size: var(--font-md);
  text-transform: capitalize;
  font-weight: 700;
`;
