import styled from "styled-components";
export const ErrorContainer = styled.div`
  margin-top: 12rem;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  @media (max-width: 768px) {
    height: 60vh;
  }
`;

export const ErrorImage = styled.img`
  height: 80%;
  width: auto;
  object-fit: contain;
  @media (max-width: 768px) {
    height: 60%;
  }
`;

export const ErrorHeading = styled.h2`
  font-family: var(--font-family-body);
  text-transform: capitalize;
`;

export const ErrorText = styled.h4`
  font-family: var(--font-family-body);
  text-transform: capitalize;
`;
