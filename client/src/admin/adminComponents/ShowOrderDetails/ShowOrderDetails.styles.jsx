import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { OrderItemContainer } from "components/Orders/OrderItem/OrderItem.styles";

export const StyledShowOrderDetailsGridContainer = styled(Grid)`
  ${OrderItemContainer} {
    height: 200px;
  }
`;
