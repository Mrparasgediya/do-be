import React, { Fragment } from "react";
// styles
import * as S from "./ItemPreviewImage.styles";
// components
import { Grid } from "@material-ui/core";
import CustomSlider from "components/CustomSlider/CustomSlider";
import PreviewDialog from "../PreviewDialog/PreviewDialog";
import CustomImage from "components/CustomImage/CustomImage";
import { createStructuredSelector } from "reselect";
import { selectItemForPreview } from "redux/itemPreview/itemPreview.selectors";
import { connect } from "react-redux";
import {
  setCurrentImageForImagePreviewDialog,
  toggleItemImagePreviewDialog,
} from "redux/itemPreview/itemPreview.actions";

function ItemPreviewImage({
  itemForPreview,
  setCurrentImageForImagePreviewDialog,
  toggleItemImagePreviewDialog,
}) {
  const { images, imagesIds } = itemForPreview || {};
  const isSmallScreen = window.screen.width < 769 ? true : false;

  const getPreviewImages = () =>
    imagesIds.map((imageId, idx) => (
      <S.ItemPreviewImageContainer
        key={idx}
        item
        md={6}
        xs={12}
        onClick={() => {
          setCurrentImageForImagePreviewDialog(idx);
          toggleItemImagePreviewDialog();
        }}
      >
        <CustomImage
          type="itemPreviewImage"
          src={images[imageId].org.url}
          srcSet={images[imageId].med.url}
          placeholderSrc={images[imageId].med.blur}
        />
      </S.ItemPreviewImageContainer>
    ));

  return (
    <Fragment>
      <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
        {isSmallScreen ? (
          <CustomSlider slides={getPreviewImages()} isForItemPreview />
        ) : (
          <Grid container spacing={1}>
            {getPreviewImages()}
          </Grid>
        )}
        <PreviewDialog />
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  itemForPreview: selectItemForPreview,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentImageForImagePreviewDialog: (currentImage) =>
    dispatch(setCurrentImageForImagePreviewDialog(currentImage)),
  toggleItemImagePreviewDialog: () => dispatch(toggleItemImagePreviewDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPreviewImage);
