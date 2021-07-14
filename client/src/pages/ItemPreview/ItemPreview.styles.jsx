import { Container, Grid } from "@material-ui/core";
import styled from "styled-components";

export const ItemPreviewContainer = styled(Container)`
  margin-bottom: 1.6rem;
  max-width: 80% !important;
  margin-top: 12vh !important;
  min-height: 90vh !important;
  @media (max-width: 768px) {
    margin-top: 8rem !important;
    max-width: 100% !important;
  }

  @media (min-width: 768px) and (max-width: 1440px) {
    max-width: 98% !important;
  }
`;

export const ItemPreviewDetailsGrid = styled(Grid)`
  margin-bottom: 5rem !important;
  padding: 1rem 2rem 0 !important;
`;
