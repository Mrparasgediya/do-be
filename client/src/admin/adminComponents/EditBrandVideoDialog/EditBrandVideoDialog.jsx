import React, { useEffect, useRef, useState } from "react";

import * as S from "./EditBrandVideoDialog.styles";

import {
  updateBrandVideo,
  uploadBrandVideoFile,
} from "firebase/brandVideo.utils";
import { getBrandById, getBrandsOptions } from "firebase/brands.utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  toggleIsOperationRunning,
  setBrandsOptions,
  toggleUpdateBrandVideoDialog,
  updateBrandVideo as updateBrandVideoToStore,
} from "redux/admin/static/brandVideo/brandVideo.actions";
import {
  selectBrandVideo,
  selectUpdateBrandVideoDialog,
  selectIsOperationRunning,
  selectBrandsOptions,
} from "redux/admin/static/brandVideo/brandVideo.selectors";

import { updateBrandVideoImage as updateBrandVideoImageFromCloudinary } from "admin/admin.utils";

import BrandVideoProgressOverlay from "../BrandVideoProgressOverlay/BrandVideoProgressOverlay";
import FileInput from "../FileInput/FileInput";
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";

function EditBrandVideoDialog({
  brandVideo,
  brandsOptions,
  setBrandsOptions,
  updateBrandVideoDialog,
  toggleUpdateBrandVideoDialog,
  isOperationRunning,
  toggleIsOperationRunning,
  updateBrandVideoToStore,
}) {
  const largeVideoRef = useRef();
  const medVideoRef = useRef();
  const smallVideoRef = useRef();
  const imageInputRef = useRef();
  const [selectedBrand, setSelectedBrand] = useState();
  const [headingText, setHeadingText] = useState("");
  const [displayBrandIcon, setDisplayBrandIcon] = useState(false);

  const [currentUploadStatus, setCurrentUploadStatus] = useState();
  const [progressPercentage, setProgressPercentage] = useState();

  const [isBrandsOptionsLoading, setIsBrandsOptionsLoading] = useState(false);

  useEffect(() => {
    if (updateBrandVideoDialog) {
      const fetchOptions = async () => {
        try {
          setIsBrandsOptionsLoading(true);
          const [brandsOptions, error] = await getBrandsOptions();
          if (error) throw new Error(error);
          setBrandsOptions(brandsOptions);
          setIsBrandsOptionsLoading(true);
        } catch (error) {
          console.log(error);
          setIsBrandsOptionsLoading(true);
        }
      };
      fetchOptions();
    }
  }, [updateBrandVideoDialog, setBrandsOptions]);

  useEffect(() => {
    if (!updateBrandVideoDialog) return;
    if (brandVideo) {
      setSelectedBrand({
        id: brandVideo.brand.id,
        name: brandVideo.brand.name,
      });
      setHeadingText(brandVideo.headingText);
      setDisplayBrandIcon(brandVideo.displayBrandIcon);
    }
  }, [brandVideo, updateBrandVideoDialog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldsToUpdate = {};
    const largeScreenVideoFile = largeVideoRef.current.files[0];
    const medScreenVideoFile = medVideoRef.current.files[0];
    const smallScreenVideoFile = smallVideoRef.current.files[0];
    const imageFile = imageInputRef.current.files[0];

    try {
      toggleIsOperationRunning();
      // check is video is updated or not
      if (largeScreenVideoFile || medScreenVideoFile || smallScreenVideoFile) {
        fieldsToUpdate.video = brandVideo.video;
      }
      if (largeScreenVideoFile) {
        setCurrentUploadStatus("updating new large screen video");
        fieldsToUpdate.video.src.large.url = await uploadBrandVideoFile(
          largeScreenVideoFile,
          "large",
          setProgressPercentage
        );
      }
      if (medScreenVideoFile) {
        setCurrentUploadStatus("updating new med screen video");
        fieldsToUpdate.video.src.med.url = await uploadBrandVideoFile(
          medScreenVideoFile,
          "med",
          setProgressPercentage
        );
      }
      if (smallScreenVideoFile) {
        setCurrentUploadStatus("updating new small screen video");
        fieldsToUpdate.video.src.small.url = await uploadBrandVideoFile(
          smallScreenVideoFile,
          "small",
          setProgressPercentage
        );
      }
      if (imageFile) {
        setCurrentUploadStatus("uploading brand image");
        fieldsToUpdate.image = await updateBrandVideoImageFromCloudinary(
          brandVideo.image.publicId,
          imageFile
        );
      }

      if (selectedBrand.id !== brandVideo.brand.id)
        fieldsToUpdate.brand = selectedBrand.id;
      if (headingText !== brandVideo.headingText)
        fieldsToUpdate.headingText = headingText;
      if (displayBrandIcon !== brandVideo.displayBrandIcon) {
        fieldsToUpdate.displayBrandIcon = displayBrandIcon;
      }

      if (Object.keys(fieldsToUpdate).length === 0) return;

      // update to firebase
      await updateBrandVideo(brandVideo.id, fieldsToUpdate);
      // update to redux
      let brand = fieldsToUpdate["brand"];

      if (brand) {
        const [newBrand, error] = await getBrandById(brand);
        if (error) throw new Error(error);
        fieldsToUpdate.brand = newBrand;
      }

      setCurrentUploadStatus("updating database");
      updateBrandVideoToStore(fieldsToUpdate);
      toggleIsOperationRunning();
      toggleUpdateBrandVideoDialog();
    } catch (error) {
      console.log(error);
      setCurrentUploadStatus("something went wrong,try again");
      setTimeout(() => {
        toggleIsOperationRunning();
      }, 2000);
    }
  };
  return (
    <CustomDialog
      heading="edit brand video"
      open={updateBrandVideoDialog}
      handleClose={!isOperationRunning ? toggleUpdateBrandVideoDialog : null}
    >
      {brandVideo && (
        <form style={{ position: "relative" }} onSubmit={handleSubmit}>
          <S.StyledContainer>
            <S.StyledLable htmlFor="largeBrandVideo">
              largescreen brand video
            </S.StyledLable>
            <FileInput
              ref={largeVideoRef}
              defaultPreview={brandVideo.video.src.large.url}
              inputId="largeBrandVideo"
              isVideoInput
            />
          </S.StyledContainer>
          <S.StyledContainer>
            <S.StyledLable htmlFor="medBrandVideo">brand video</S.StyledLable>
            <FileInput
              ref={medVideoRef}
              defaultPreview={brandVideo.video.src.med.url}
              inputId="medBrandVideo"
              isVideoInput
            />
          </S.StyledContainer>
          <S.StyledContainer>
            <S.StyledLable htmlFor="smallBrandVideo">brand video</S.StyledLable>
            <FileInput
              ref={smallVideoRef}
              defaultPreview={brandVideo.video.src.small.url}
              inputId="smallBrandVideo"
              isVideoInput
            />
          </S.StyledContainer>
          <S.StyledContainer>
            <S.StyledLable htmlFor="brandImage">brand image</S.StyledLable>
            <FileInput
              ref={imageInputRef}
              defaultPreview={brandVideo.image.src.org.url}
            />
          </S.StyledContainer>
          <S.StyledContainer>
            <S.StyledLable htmlFor="selectBrand">select brand</S.StyledLable>
            <S.StyledCustomAutoComplete
              id="select-brand-name"
              value={selectedBrand}
              options={brandsOptions}
              loading={isBrandsOptionsLoading}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(data) => data.name === selectedBrand.name}
              onChange={(_, selectedBrand) => setSelectedBrand(selectedBrand)}
              required
            />
          </S.StyledContainer>
          <S.StyledContainer>
            <S.StyledLable htmlFor="heading text">heading text</S.StyledLable>
            <S.StyledInputField
              type="text"
              value={headingText}
              onChange={(e) => setHeadingText(e.target.value)}
              required
            />
          </S.StyledContainer>
          <S.StyledContainer>
            <S.StyledLable htmlFor="heading text">
              display brand video logo?
            </S.StyledLable>
            <S.StyledCustomSelect
              options={["yes", "no"]}
              value={displayBrandIcon ? "yes" : "no"}
              onChange={(e) =>
                setDisplayBrandIcon(e.target.value === "yes" ? true : false)
              }
            />
          </S.StyledContainer>
          <CustomButton
            disabled={isOperationRunning}
            size="small"
            align="center"
            color="pink"
            isActive
          >
            Edit now
          </CustomButton>
          <BrandVideoProgressOverlay
            currentUploadStatus={currentUploadStatus}
            progressPercentage={progressPercentage}
          />
        </form>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  updateBrandVideoDialog: selectUpdateBrandVideoDialog,
  isOperationRunning: selectIsOperationRunning,
  brandVideo: selectBrandVideo,
  brandsOptions: selectBrandsOptions,
});
const mapDispatchToProps = (dispatch) => ({
  toggleUpdateBrandVideoDialog: () => dispatch(toggleUpdateBrandVideoDialog()),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  updateBrandVideoToStore: (dataToUpdate) =>
    dispatch(updateBrandVideoToStore(dataToUpdate)),
  setBrandsOptions: (brandsOptions) =>
    dispatch(setBrandsOptions(brandsOptions)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBrandVideoDialog);
