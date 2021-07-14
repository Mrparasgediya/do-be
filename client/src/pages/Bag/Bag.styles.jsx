import { Container, Grid } from "@material-ui/core";
import styled from "styled-components";

export const StyledBagContainer = styled(Container)`
  margin-top: 12vh;
  min-height: 80vh;
`;

export const BagHeading = styled.h3`
  text-align: left;
  font-family: var(--font-family-body) !important;
  text-transform: uppercase;
`;

export const BagItemsCountContainer = styled.span`
  margin-left: 1rem;
  font-size: var(--font-md-big);
  color: var(--color-gray-light);
  text-transform: lowercase;
`;

export const StyledBagGridContainer = styled(Grid)`
  flex-basis: 70% !important;
  margin: 2rem auto 1rem !important;
`;

export const StyledBagGridItem = styled(Grid)`
  position: relative;
`;

export const NoBagItemsText = styled.b`
  text-transform: capitalize;
  font-size: var(--font-md);
`;
