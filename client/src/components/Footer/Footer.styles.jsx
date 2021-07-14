import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: var(--color-gray-footer);
`;

export const FooterContainer = styled(Grid)`
  width: 75% !important;
  margin: 0 auto !important;

  @media (max-width: 425px) {
    width: 100% !important;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    width: 90% !important;
  }
`;

export const FooterListContainer = styled(Grid)`
  padding: 2rem !important;
`;
