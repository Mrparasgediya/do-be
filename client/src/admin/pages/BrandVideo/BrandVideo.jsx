import CustomButton from "components/CustomButton/CustomButton";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import AddBrandVideoDialog from "admin/adminComponents/AddBrandVideoDialog/AddBrandVideoDialog";

import DeleteBrandVideoDialog from "admin/adminComponents/DeleteBrandVideoDialog/DeleteBrandVideoDialog";
import EditBrandVideoDialog from "admin/adminComponents/EditBrandVideoDialog/EditBrandVideoDialog";
import { getBrandVideo } from "firebase/brandVideo.utils";

import * as S from "./BrandVideo.styles";

import {
  setBrandVideo,
  toggleAddBrandVideoDialog,
  toggleUpdateBrandVideoDialog,
  toggleDeleteBrandVideoDialog,
} from "redux/admin/static/brandVideo/brandVideo.actions";
import { selectBrandVideo } from "redux/admin/static/brandVideo/brandVideo.selectors";

function BrandVideo({
  brandVideo,
  setBrandVideo,
  toggleAddBrandVideoDialog,
  toggleUpdateBrandVideoDialog,
  toggleDeleteBrandVideoDialog,
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!brandVideo) {
      const fetchData = async () => {
        setIsLoading(true);
        const data = await getBrandVideo();
        setBrandVideo(data);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [brandVideo, setBrandVideo]);

  return (
    <div>
      <h3> Brand Video</h3>
      <S.ButtonsContainer>
        <CustomButton
          color="black"
          size="xs"
          onClick={toggleAddBrandVideoDialog}
          isActive
          disabled={isLoading || brandVideo}
        >
          Add brand video
        </CustomButton>
        <CustomButton
          color="black"
          size="xs"
          isActive
          disabled={isLoading || !brandVideo}
          onClick={toggleUpdateBrandVideoDialog}
        >
          edit brand video
        </CustomButton>
        <CustomButton
          color="red"
          size="xs"
          isActive
          onClick={toggleDeleteBrandVideoDialog}
          disabled={isLoading || !brandVideo}
        >
          delete brand video
        </CustomButton>
      </S.ButtonsContainer>

      <AddBrandVideoDialog />
      <DeleteBrandVideoDialog />
      <EditBrandVideoDialog />

      {brandVideo ? (
        <S.ContentContainer>
          <S.StyledBoldInfoText>brand video</S.StyledBoldInfoText>
          <S.BrandVideosContainer>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <S.StyledBoldInfoText>desktop screen video</S.StyledBoldInfoText>
              <S.BrandVideo
                controls
                src={brandVideo.video.src.large.url}
              ></S.BrandVideo>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <S.StyledBoldInfoText>tablet screen video</S.StyledBoldInfoText>
              <S.BrandVideo
                controls
                src={brandVideo.video.src.med.url}
              ></S.BrandVideo>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <S.StyledBoldInfoText>mobile screen video</S.StyledBoldInfoText>
              <S.BrandVideo
                controls
                src={brandVideo.video.src.small.url}
              ></S.BrandVideo>
            </div>
          </S.BrandVideosContainer>
          <S.StyledBoldInfoText>brand image</S.StyledBoldInfoText>
          <S.BrandResourceContainer>
            <S.BrandImage
              src={brandVideo.image.src.org.url}
              alt="brand-placeholder-img"
            />
          </S.BrandResourceContainer>
          <div>
            <S.StyledInfoText>video heading text</S.StyledInfoText>
            <S.StyledValueText>{brandVideo.headingText}</S.StyledValueText>
          </div>

          <div>
            <S.StyledInfoText>brand image</S.StyledInfoText>
            <S.StyledValueText>{brandVideo.brand.name}</S.StyledValueText>
          </div>
          <S.ItemContainer>
            <S.StyledInfoText>Display brand logo</S.StyledInfoText>
            <S.StyledValueText>
              {brandVideo.displayBrandIcon ? "Yes" : "No"}
            </S.StyledValueText>
          </S.ItemContainer>
        </S.ContentContainer>
      ) : (
        <S.StyledInfoText>there is no brand video.</S.StyledInfoText>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  brandVideo: selectBrandVideo,
});

const mapDispatchToProps = (dispatch) => ({
  setBrandVideo: (brandVideo) => dispatch(setBrandVideo(brandVideo)),
  toggleAddBrandVideoDialog: () => dispatch(toggleAddBrandVideoDialog()),
  toggleDeleteBrandVideoDialog: () => dispatch(toggleDeleteBrandVideoDialog()),
  toggleUpdateBrandVideoDialog: () => dispatch(toggleUpdateBrandVideoDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandVideo);
