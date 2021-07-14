import styled from "styled-components";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

export const HomeContainer = styled.div`
  margin-top: 10rem;
`;

export const StyledList = styled(List)`
  width: 20rem;
`;

export const StyledListItem = styled(ListItem)`
  text-align: center;
`;

export const StyledListItemText = styled(ListItemText)`
  .MuiListItemText-primary {
    font-size: 2rem !important;
    text-transform: capitalize;
  }
`;

export const WindowContainer = styled.div`
  padding-left: 22rem;
`;

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    margin-top: 8rem;
  }
`;
