import styled from "styled-components";

export const EditBrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 2rem;
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
`;

export const EditBrandForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 2rem;
  margin-top: 2.5rem;
`;

export const FileInputLabel = styled.label`
  font-size: var(--font-md);
  font-weight: 700;
  text-transform: capitalize;
`;
