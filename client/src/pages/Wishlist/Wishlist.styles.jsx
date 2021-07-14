import { Container, Grid } from "@material-ui/core";
import styled from "styled-components";

export const StyledWishlistGridItem = styled(Grid)`
  text-align: center;
  margin-bottom: 1.5rem !important;
  height: min-content !important;
  padding: 2rem;
  @media (max-width: 425px) {
    padding: 1rem;
  }

  @media (min-width: 426px) and (max-width: 1440px) {
    padding: 1.5rem;
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    max-width: 20% !important;
    flex-basis: 20% !important;
  }
`;

export const StyledWishlistContainer = styled(Container)`
  margin-top: 12vh !important;
  min-height: 80vh;
`;

export const WishlistHeading = styled.h3`
  text-align: left;
  font-family: var(--font-family-body) !important;
  text-transform: uppercase;
`;

export const WishlistItemsCountText = styled.span`
  margin-left: 1rem;
  font-size: var(--font-md-big);
  color: var(--color-gray-light);
  text-transform: lowercase;
`;

export const StyledWishlistGridContainer = styled(Grid)`
  flex-basis: 70% !important;
  margin: 2rem auto 1rem !important;
`;
