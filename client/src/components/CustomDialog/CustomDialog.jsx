import React from "react";
// styles
import * as S from "./CustomDialog.styles";
// components
import { Slide } from "@material-ui/core";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import CustomButton from "../CustomButton/CustomButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomDialog({
  handleClose,
  open,
  isDeleteDialog,
  handleDeleteClick,
  disableButton,
  disableDeleteButton,
  heading,
  children,
  deleteButtonProps,
  ...otherProps
}) {
  return (
    <S.StyledCustomDialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      disableBackdropClick
      role="dialog"
      aria-labelledby="dialog-title"
      {...otherProps}
    >
      <S.StyledCustomDialogTitle id="dialog-title">
        {heading}
        <S.StyledCustomDialogIconButton
          name="close"
          role="button"
          onClick={handleClose}
        >
          <CloseIcon />
        </S.StyledCustomDialogIconButton>
      </S.StyledCustomDialogTitle>
      <S.StyledCustomDialogContent type={isDeleteDialog && "deleteDialog"}>
        {children}
        {isDeleteDialog && (
          <S.CustomDialogButtonsContainer>
            <CustomButton
              color="black"
              size="xs"
              isActive
              disabled={disableButton}
              onClick={handleClose}
            >
              Go back
            </CustomButton>
            <CustomButton
              color="red"
              size="xs"
              isActive
              onClick={handleDeleteClick}
              disabled={disableDeleteButton || disableButton}
              {...deleteButtonProps}
            >
              Delete now
            </CustomButton>
          </S.CustomDialogButtonsContainer>
        )}
      </S.StyledCustomDialogContent>
    </S.StyledCustomDialog>
  );
}

export default CustomDialog;
