import { deleteBrandVideoImage } from "admin/admin.utils";
import CustomDialog from "components/CustomDialog/CustomDialog";
import {
  deleteBrandVideo,
  deleteBrandVideosFromStorage,
} from "firebase/brandVideo.utils";

import React from "react";
import { connect } from "react-redux";

import {
  toggleIsOperationRunning,
  deleteBrandVideo as deleteBrandVideoFromStore,
  toggleDeleteBrandVideoDialog,
} from "redux/admin/static/brandVideo/brandVideo.actions";
import {
  selectIsOperationRunning,
  selectDeleteBrandVideoDialog,
  selectBrandVideo,
} from "redux/admin/static/brandVideo/brandVideo.selectors";

import { createStructuredSelector } from "reselect";
import * as S from "./DeleteBrandVideoDialog.styles";

function DeleteBrandVideoDialog({
  isOperationRunning,
  toggleDeleteBrandVideoDialog,
  deleteBrandVideoFromStore,
  deleteBrandVideoDialog,
  toggleIsOperationRunning,
  brandVideo,
}) {
  const handleDeleteClick = async () => {
    const { image, id } = brandVideo;
    toggleIsOperationRunning();
    try {
      // delete brand video and image from cloudinary
      await deleteBrandVideoImage(image.publicId);
      // delete brand video from storage
      await deleteBrandVideosFromStorage();
      // delete brandvideo from firebase
      await deleteBrandVideo(id);
      // delete brandvideo from redux
      deleteBrandVideoFromStore();
      toggleIsOperationRunning();
      toggleDeleteBrandVideoDialog();
    } catch (error) {
      console.log(error);
      toggleIsOperationRunning();
    }
  };

  return (
    <CustomDialog
      heading="Delete brand video"
      open={deleteBrandVideoDialog}
      handleClose={!isOperationRunning ? toggleDeleteBrandVideoDialog : null}
      handleDeleteClick={handleDeleteClick}
      disableButton={isOperationRunning}
      isDeleteDialog
    >
      {brandVideo && (
        <S.StyledContainer>
          <S.StyledText>
            brand:
            <S.StyledImage
              src={brandVideo.brand.logo.src.small.url}
              alt={`${brandVideo.brand.name}`}
            />
            <p>({brandVideo.brand.name})</p>
          </S.StyledText>
          <S.StyledVideo src={brandVideo.video.src.large.url} controls />
        </S.StyledContainer>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  deleteBrandVideoDialog: selectDeleteBrandVideoDialog,
  brandVideo: selectBrandVideo,
});
const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  deleteBrandVideoFromStore: () => dispatch(deleteBrandVideoFromStore()),
  toggleDeleteBrandVideoDialog: () => dispatch(toggleDeleteBrandVideoDialog()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteBrandVideoDialog);
