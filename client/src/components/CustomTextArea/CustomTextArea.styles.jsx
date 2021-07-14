import styled from "styled-components";

export const StyledCustomTextArea = styled.textarea`
  resize: none;
  width: 100%;
  font-size: var(--font-md);
  font-family: var(--font-family-body);
  padding: 1rem;
  &:focus {
    outline: none;
  }
`;
