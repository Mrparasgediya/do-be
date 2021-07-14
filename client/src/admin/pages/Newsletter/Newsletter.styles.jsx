import styled from "styled-components";

export const NewsletterImageContainer = styled.div`
  height: 25rem;
  max-width: 100rem;
  max-height: 25rem;
  border: 1px solid black;
`;

export const NewsletterImage = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;

export const NewsletterPlaceHolderText = styled.b`
  font-size: var(--font-md);
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  gap: 2rem;
  align-items: center;
`;

export const StyledHR = styled.hr`
  margin-bottom: 2rem;
`;
