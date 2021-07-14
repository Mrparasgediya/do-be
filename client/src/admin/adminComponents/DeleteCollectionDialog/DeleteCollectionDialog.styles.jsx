import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  min-width: 40rem;
  width: 45rem;
  max-width: 50rem;
  padding: 0 2rem;
  gap: 2rem;
`;

export const StyledImage = styled.img`
  height: 25rem;
  width: 20rem;
  object-fit: contain;
`;

export const StyledInfoContainer = styled.div`
  font-size: var(--font-md);
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledInfoText = styled.b`
  text-transform: capitalize;
  max-width: 18rem;
  color: ${(props) => (props.color === "red" ? "var(--color-red)" : "black")};
`;
