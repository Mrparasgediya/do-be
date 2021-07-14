import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;

export const StyledText = styled.b`
  font-size: var(--font-md);
  text-transform: capitalize;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const StyledImage = styled.img`
  height: 5rem;
  max-width: 10rem;
  object-fit: contain;
`;

export const StyledVideo = styled.video`
  width: 480px;
`;
