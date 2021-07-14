import { Grid } from "@material-ui/core";
import styled from "styled-components";
import zoomIcon from "assets/icons/cursor-zoom.svg";

export const ItemPreviewImageContainer = styled(Grid)`
  cursor: url(${zoomIcon}), pointer;
  @media (max-width: 768px) {
    height: 100%;
  }
`;
