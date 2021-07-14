import styled from "styled-components";

export const AddBrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 2rem;
  height: 500px;
`;

export const AddBrandForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 2rem;
  margin-top: 2.5rem;
`;

export const FileInputLabel = styled.label`
  font-size: var(--font-md);
  text-transform: capitalize;
  font-weight: 700;
`;
