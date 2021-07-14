import styled, { css } from "styled-components";
import { Container, Grid } from "@material-ui/core";

const homepageListContainerStyle = css`
  @media (min-width: 1024px) and (max-width: 1441px) {
    min-height: 75vh !important;
  }
  @media (max-width: 768px) {
    min-height: 90vh !important;
  }
  @media (min-width: 1441px) {
    min-height: 80vh !important;
  }
`;

export const CollectionListContainer = styled(Container)`
  text-align: center;
  margin-bottom: 1.5rem !important;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${(props) => props.listfor === "homepage" && homepageListContainerStyle}
`;

export const CollectionListHeading = styled.h2`
  font-weight: 400;
  margin-top: 3rem;
  margin-bottom: auto;
`;

export const CollectionListGridContainer = styled(Grid)`
  margin: 2rem auto 1rem !important;
  flex: 1;
  position: relative;
`;

export const CollectionListItemContainer = styled(Grid)`
  height: max-content;
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
