import styled from "styled-components";

export const AddBrandVideoForm = styled.form`
  position: relative;
  display: flex;
  width: 40rem;
  flex-direction: column;
  gap: 2rem;
`;

export const StyledLabel = styled.label`
  font-size: var(--font-md);
`;

export const StyledLabelInfoText = styled.b`
  font-size: var(--font-md);
  color: ${(props) => (props.color === "red" ? "var(--color-red)" : "black")};
`;

export const StyledSelectLabel = styled.label`
  font-size: var(--font-md);
  margin-right: 3rem;
`;
