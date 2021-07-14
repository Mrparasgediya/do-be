import { AppBar, Toolbar } from "@material-ui/core";
import styled, { css } from "styled-components";

export const StyledBottomAppBar = styled(AppBar)`
  top: auto;
  bottom: 0;
  background-color: var(--color-white);
  height: 8rem;
  z-index: 1;
`;

const flexToolbarStyle = css`
  display: flex;
`;

export const StyledBottomAppBarToolbar = styled(Toolbar)`
  height: 100%;
  width: 100%;
  padding: 0;
  ${(props) => props.display === "flex" && flexToolbarStyle}
`;
