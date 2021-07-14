import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 960px) {
    padding-bottom: 3rem;
  }
`;

export const ProfileHeading = styled.h3`
  font-size: var(--font-md-big);
  font-family: var(--font-family-body) !important;
  align-self: flex-start;
`;

export const ProfileContentContainer = styled.div`
  flex: 1;
  width: 100%;
`;

export const ProfileButtonsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;
