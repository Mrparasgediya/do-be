import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";

export const StyledSearchContainer = styled(Container)`
  margin: 12vh auto 3rem !important;
  max-width: 75% !important;
  position: relative !important;
  @media (min-width: 1025px) and (max-width: 1440px) {
    max-width: 80% !important;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 90% !important;
  }
  @media (max-width: 768px) {
    margin: 0 !important;
    margin: 8rem 0 0 !important;
    max-width: 100% !important;
  }
`;
export const SearchInfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.2rem;
`;
export const SearchInfoName = styled.h4`
  font-size: var(--font-md-big) !important;
`;

export const StyledSearchGridContainer = styled(Grid)`
  width: 100%;
`;
export const StyledSearchGridItemsContainerWithLoadingSpinner = styled(Grid)`
  width: 100%;
  position: relative;
  min-height: 85vh;
  margin: 0 auto;
  align-items: flex-start;
  margin-bottom: ${window.screen.width < 769 ? "3rem" : "inherit"};
`;

export const StyledSearchGridItem = styled(Grid)`
  padding: 1rem !important;
  @media (max-width: 425px) {
    padding: 0rem !important;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    padding: 0.5rem !important;
  }
`;

export const SearchItemsNotFoundText = styled.h4`
  text-transform: capitalize;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const StyledSearchGridItemsContainer = styled(Grid)`
  min-height: 75vh;
`;
