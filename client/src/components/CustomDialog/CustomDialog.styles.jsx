import styled, { css } from "styled-components";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";

const deleteDialogStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledCustomDialog = styled(Dialog)`
  min-height: 30rem !important;
  min-width: 50rem !important;
`;

export const StyledCustomDialogIconButton = styled(IconButton)`
  position: absolute !important;
  top: 0.5rem;
  right: 0.5rem;
  color: var(--color-pink) !important;

  &:hover {
    background-color: var(--color-pink-light) !important ;
  }
`;

export const StyledCustomDialogTitle = styled(DialogTitle)`
  margin-right: 2.5rem;
  text-transform: capitalize;
  min-width: 30rem;
  max-height: 50rem;

  @media (max-width: 768px) {
    padding: 1rem !important;
  }

  @media (min-width: 768px) {
    padding-top: 1rem;
  }

  ${(props) => props.type === "deleteDialog" && deleteDialogStyle}

  & {
    .MuiTypography-h6 {
      font-size: var(--font-heading-lg) !important;
    }
  }
`;

export const CustomDialogButtonsContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const StyledCustomDialogContent = styled(DialogContent)`
  @media (max-width: 768px) {
    padding: 1.2rem !important;
  }
`;
