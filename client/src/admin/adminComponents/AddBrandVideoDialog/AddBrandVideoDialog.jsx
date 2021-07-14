import { uploadBrandVideoImage } from "admin/admin.utils";
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import InputField from "components/InputField/InputField";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import {
  toggleAddBrandVideoDialog,
  toggleIsOperationRunning,
  addBrandVideo as addBrandVideoToStore,
  setBrandsOptions,
} from "redux/admin/static/brandVideo/brandVideo.actions";
import {
  selectAddBrandVideoDialog,
  selectIsOperationRunning,
  selectBrandsOptions,
} from "redux/admin/static/brandVideo/brandVideo.selectors";

import { createStructuredSelector } from "reselect";
import CustomAutoCompleteSelect from "../CustomAutoCompleteSelect/CustomAutoCompleteSelect";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import FileInput from "../FileInput/FileInput";

import * as S from "./AddBrandVideoDialog.styles";
import BrandVideoProgressOverlay from "../BrandVideoProgressOverlay/BrandVideoProgressOverlay";
// firebase
import { addBrandVideo, uploadBrandVideoFile } from "firebase/brandVideo.utils";
import { getBrandById, getBrandsOptions } from "firebase/brands.utils";

function AddBrandVideoDialog({
  brandsOptions,
  setBrandsOptions,
  isOperationRunning,
  addBrandVideoDialog,
  toggleIsOperationRunning,
  toggleAddBrandVideoDialog,
  addBrandVideoToStore,
}) {
  const largeVideoRef = useRef();
  const medVideoRef = useRef();
  const smallVideoRef = useRef();
  const imageInputRef = useRef();
  const headingTextRef = useRef();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentUploadStatus, setCurrentUploadStatus] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [displayBrandIconOption, setDisplayBrandIconOption] = useState(false);
  const [isBrandsOptionsLoading, setIsBrandsOptionsLoading] = useState(false);

  useEffect(() => {
    if (addBrandVideoDialog) {
      const fetchBranddOptions = async () => {
        setIsBrandsOptionsLoading(true);
        try {
          const [brandsOptions, error] = await getBrandsOptions();
          if (error) throw new Error(error);
          setBrandsOptions(brandsOptions);
          setIsBrandsOptionsLoading(false);
        } catch (error) {
          console.log(error);
          setIsBrandsOptionsLoading(false);
        }
      };
      fetchBranddOptions();
    }

    return () => {};
  }, [addBrandVideoDialog, setBrandsOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBrand) return console.log("enter brand");
    const largeVideoFile = largeVideoRef.current.files[0];
    const medVideoFile = medVideoRef.current.files[0];
    const smallVideoFile = smallVideoRef.current.files[0];
    const imageFile = imageInputRef.current.files[0];
    const heading = headingTextRef.current.value;

    toggleIsOperationRunning();
    try {
      setCurrentUploadStatus("uploading descktop size video");
      const largeVideoUrl = await uploadBrandVideoFile(
        largeVideoFile,
        "large",
        setProgressPercentage
      );
      setProgressPercentage(0);
      setCurrentUploadStatus("uploading tablet size video");
      const medVideoUrl = await uploadBrandVideoFile(
        medVideoFile,
        "med",
        setProgressPercentage
      );
      setProgressPercentage(0);
      setCurrentUploadStatus("uploading mobile size video");
      const smallVideoUrl = await uploadBrandVideoFile(
        smallVideoFile,
        "small",
        setProgressPercentage
      );
      setProgressPercentage(0);
      setCurrentUploadStatus("uploading video image");
      const image = await uploadBrandVideoImage(imageFile);
      setCurrentUploadStatus("uploading video to database");
      const video = {
        src: {
          large: { url: largeVideoUrl },
          med: { url: medVideoUrl },
          small: { url: smallVideoUrl },
        },
      };
      let newBrandVideoData = await addBrandVideo(
        video,
        image,
        selectedBrand.id,
        heading,
        displayBrandIconOption
      );
      const [foundBrand, error] = await getBrandById(newBrandVideoData.brand);
      if (error) throw new Error(error);
      newBrandVideoData.brand = foundBrand;
      addBrandVideoToStore(newBrandVideoData);
      toggleIsOperationRunning();
      toggleAddBrandVideoDialog();
    } catch (error) {
      console.log(error);
      setCurrentUploadStatus("Something went wrong,try again");
      setTimeout(() => {
        toggleIsOperationRunning();
      }, 3000);
    }
  };

  return (
    <CustomDialog
      heading="add brand video"
      open={addBrandVideoDialog}
      handleClose={!isOperationRunning ? toggleAddBrandVideoDialog : null}
    >
      <S.AddBrandVideoForm onSubmit={handleSubmit}>
        <div>
          <S.StyledLabel htmlFor="videoInput">
            select brand video
            <S.StyledLabelInfoText color="red">
              (max size should be less 50mb)
            </S.StyledLabelInfoText>
          </S.StyledLabel>
          <div>
            <S.StyledLabelInfoText>large screen video</S.StyledLabelInfoText>
            <FileInput
              ref={largeVideoRef}
              inputId="videoInput"
              isInputRequired
              isVideoInput
            />
          </div>
          <div>
            <S.StyledLabelInfoText>medium screen video</S.StyledLabelInfoText>
            <FileInput
              ref={medVideoRef}
              inputId="videoInput"
              isInputRequired
              isVideoInput
            />
          </div>
          <div>
            <S.StyledLabelInfoText>small screen video</S.StyledLabelInfoText>
            <FileInput
              ref={smallVideoRef}
              inputId="videoInput"
              isInputRequired
              isVideoInput
            />
          </div>
        </div>
        <div>
          <S.StyledLabel htmlFor="imageInput">
            select brand placeholder image (this image displayed until video is
            loaded in web)
          </S.StyledLabel>
          <FileInput ref={imageInputRef} inputId="imageInput" isInputRequired />
        </div>

        <CustomAutoCompleteSelect
          id="select-brand-name"
          options={brandsOptions}
          getOptionLabel={(option) => option.name}
          label="select brand"
          loading={isBrandsOptionsLoading}
          onChange={(_, selectedBrand) => setSelectedBrand(selectedBrand)}
          required
        />

        <InputField
          type="text"
          label="heading text"
          ref={headingTextRef}
          required
        />
        <div>
          <S.StyledSelectLabel htmlFor="brand-icon">
            display brand icon
          </S.StyledSelectLabel>
          <CustomSelect
            options={["yes", "no"]}
            defaultValue={"no"}
            handleChange={(e) =>
              setDisplayBrandIconOption(e.target.value === "yes" ? true : false)
            }
          />
        </div>
        <CustomButton color="pink" align="center" disabled={isOperationRunning}>
          add video
        </CustomButton>
        <BrandVideoProgressOverlay
          currentUploadStatus={currentUploadStatus}
          progressPercentage={progressPercentage}
        />
      </S.AddBrandVideoForm>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  addBrandVideoDialog: selectAddBrandVideoDialog,
  isOperationRunning: selectIsOperationRunning,
  brandsOptions: selectBrandsOptions,
});
const mapDispatchToProps = (dispatch) => ({
  toggleAddBrandVideoDialog: () => dispatch(toggleAddBrandVideoDialog()),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  addBrandVideoToStore: (brandVideo) =>
    dispatch(addBrandVideoToStore(brandVideo)),
  setBrandsOptions: (brandsOptions) =>
    dispatch(setBrandsOptions(brandsOptions)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBrandVideoDialog);
