import styled, { css } from "styled-components";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { Dialog, DialogContent } from "@material-ui/core";

export const PreviewDialogSmallImagesContainer = styled.div`
  position: absolute;
  top: 2%;
  left: 2%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 5rem;
`;

const activePreviewDialogSmallImageStyle = css`
  transform: scale(0.85);
  border: 1px solid var(--color-pink);
`;

export const PreviewDialogSmallImage = styled.img`
  height: 5rem;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s;
  border: 1px solid $gray-font;
  ${(props) => props.isactive && activePreviewDialogSmallImageStyle}

  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const PreviewDialogLargeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: contain;
`;

export const PreviewDialogCloseIcon = styled(CancelPresentationIcon)`
  height: 5rem !important;
  width: 5rem !important;
  position: absolute;
  z-index: 3;
  right: 3%;
  top: 2%;
  cursor: pointer;
  fill: var(--color-gray-light) !important;

  &:hover {
    fill: var(--color-pink) !important;
  }
`;

export const StyledPreviewDialogContent = styled(DialogContent)`
  position: relative;
  padding: 0 !important;
  height: 100vh;
  min-height: 50vh;
  min-width: 50vw;
  display: flex;
  align-items: center;

  @media (max-width: 425px) {
    width: 100% !important;
  }
  @media (max-width: 768px) {
    width: 85vw;
  }
`;

export const StyledPreviewDialog = styled(Dialog)`
  @media (max-width: 768px) {
    & {
      .MuiPaper-root {
        margin: 1rem !important;
        height: 95vh;
      }
      .MuiDialog-paperScrollPaper {
        height: 90vh !important;
        max-height: min-content !important;
      }
    }
  }
`;
