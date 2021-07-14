import { uploadNewsletterImage } from "admin/admin.utils";
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import { addNewsletterImage } from "firebase/newsletter.utils";
import React, { useRef } from "react";
import FileInput from "../FileInput/FileInput";

import {
  addNewsletterImage as addNewsletterImageToStore,
  toggleAddNewsletterImageDialog,
  toggleIsOperationRunning,
} from "redux/admin/static/newsletter/newsletter.actions";
import {
  selectIsOperationRunning,
  selectAddNewsletterImageDialog,
} from "redux/admin/static/newsletter/newsletter.selectors";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import * as S from "./AddNewsletterImageDialog.styles";

function AddNewsletterImageDialog({
  isOperationRunning,
  toggleIsOperationRunning,
  addNewsletterImageDialog,
  toggleAddNewsletterImageDialog,
  addNewsletterImageToStore,
}) {
  const imageRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleIsOperationRunning();
    try {
      const imageFile = imageRef.current.files[0];
      const imageRes = await uploadNewsletterImage(imageFile); // store to cloudinary
      const newletterData = await addNewsletterImage({
        image: imageRes,
      }); // store to firbease
      addNewsletterImageToStore(newletterData); // store to redux
      toggleIsOperationRunning();
      toggleAddNewsletterImageDialog();
    } catch (error) {
      console.log(error);
      toggleIsOperationRunning();
    }
  };
  return (
    <CustomDialog
      heading="add newsletter image"
      open={addNewsletterImageDialog}
      handleClose={isOperationRunning ? null : toggleAddNewsletterImageDialog}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <S.StyledInputContainer htmlFor="newletterImage">
            select newsletter image
          </S.StyledInputContainer>
          <FileInput
            label={"select newletter image"}
            ref={imageRef}
            isInputRequired
            inputId={"newletterImage"}
          />
        </div>
        <CustomButton disabled={isOperationRunning} color="pink" align="center">
          add image
        </CustomButton>
      </form>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  addNewsletterImageDialog: selectAddNewsletterImageDialog,
});
const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  addNewsletterImageToStore: (newletterData) =>
    dispatch(addNewsletterImageToStore(newletterData)),
  toggleAddNewsletterImageDialog: () =>
    dispatch(toggleAddNewsletterImageDialog()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewsletterImageDialog);
