import styled from "styled-components";
import { ButtonBase } from "@material-ui/core";

export const StyledButtonBase = styled(ButtonBase)`
  height: 100%;
  width: 100%;
  color: ${(props) => props.color};
`;
