import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const ProfileItemName = styled.b`
  text-transform: capitalize;
`;

export const ProfileItemHeadingContainer = styled(Grid)`
  height: 6rem;
  padding: 1.5rem 0 !important;
  font-size: var(--font-md);

  @media (max-width: 960px) {
    height: 2rem;
    padding: 0.5rem 0 !important;
  }
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const ProfileItemInfoContainer = styled(Grid)`
  padding: 1rem 0 !important;
  font-size: var(--font-md);
  max-height: 6rem;
  height: max-content;

  @media (max-width: 960px) {
    max-height: 4rem;
    min-height: max-content;
    margin-bottom: 2rem;
    padding: 0.5rem 0 !important;
  }
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;
