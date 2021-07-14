import React from "react";
// styles
import * as S from "./PreviewDialog.styles";
// components
import CustomSlider from "../../../components/CustomSlider/CustomSlider";
import CustomImage from "components/CustomImage/CustomImage";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentImageForImagePreviewDialog,
  selectItemForPreview,
  selectItemImagePreviewDialog,
} from "redux/itemPreview/itemPreview.selectors";
import {
  setCurrentImageForImagePreviewDialog,
  toggleItemImagePreviewDialog,
} from "redux/itemPreview/itemPreview.actions";

function PreviewDialog({
  currentImageIdx,
  itemForPreview,
  setCurrentImageForImagePreviewDialog,
  toggleItemImagePreviewDialog,
  itemImagePreviewDialog,
}) {
  const { images, imagesIds, name } = itemForPreview || {};
  const isSmallScreen = window.screen.width < 769 ? true : false;

  let dialogData = null;

  if (isSmallScreen) {
    dialogData = (
      <CustomSlider
        slides={imagesIds.map((imageId, idx) => {
          return (
            <CustomImage
              key={idx}
              srcSet={images[imageId].med.url}
              src={images[imageId].org.url}
              placeholderSrc={images[imageId].med.blur}
            />
          );
        })}
        isForPreviewDialog
      />
    );
  } else {
    dialogData = (
      <React.Fragment>
        <S.PreviewDialogLargeImage
          src={
            (imagesIds[currentImageIdx] &&
              images[imagesIds[currentImageIdx]].large.url) ||
            ""
          }
          alt={`${name}-img-${currentImageIdx}`}
        />
        <S.PreviewDialogSmallImagesContainer>
          {imagesIds.map((imageId, idx) => (
            <S.PreviewDialogSmallImage
              isactive={idx === currentImageIdx}
              src={images[imageId].large.blur}
              key={imageId}
              alt="small"
              onClick={() => setCurrentImageForImagePreviewDialog(idx)}
            />
          ))}
        </S.PreviewDialogSmallImagesContainer>
      </React.Fragment>
    );
  }
  return (
    <S.StyledPreviewDialog open={itemImagePreviewDialog} maxWidth="lg">
      <S.StyledPreviewDialogContent>
        {dialogData}
        <S.PreviewDialogCloseIcon onClick={toggleItemImagePreviewDialog} />
      </S.StyledPreviewDialogContent>
    </S.StyledPreviewDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  itemForPreview: selectItemForPreview,
  currentImageIdx: selectCurrentImageForImagePreviewDialog,
  itemImagePreviewDialog: selectItemImagePreviewDialog,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentImageForImagePreviewDialog: (currentImage) =>
    dispatch(setCurrentImageForImagePreviewDialog(currentImage)),
  toggleItemImagePreviewDialog: () => dispatch(toggleItemImagePreviewDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewDialog);
