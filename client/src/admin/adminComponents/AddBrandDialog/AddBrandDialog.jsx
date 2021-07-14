import React, { useRef, useEffect, useState } from "react";
// style
import * as S from "./AddBrandDialog.styles";
// utils
import {
  deleteBrandImage,
  deleteBrandLogo,
  uploadBrandImage,
  uploadBrandLogo,
} from "admin/admin.utils";
// firebase
import { createBrand } from "firebase/brands.utils";
// redux
import { connect } from "react-redux";

import {
  toggleIsOperationRunning,
  toggleAddBrandDialog,
  addBrand,
} from "redux/admin/brands/brands.actions";
import {
  selectAddBrandDialog,
  selectIsOperationRunning,
} from "redux/admin/brands/brands.selectors";

// components
import InputField from "components/InputField/InputField";
import CustomDialog from "components/CustomDialog/CustomDialog";
import FileInput from "../FileInput/FileInput";
import CustomButton from "components/CustomButton/CustomButton";
import { createStructuredSelector } from "reselect";
import { showNotification } from "redux/notification/notification.actions";

function AddBrandDialog({
  addBrandDialog,
  toggleAddBrandDialog,
  addBrand,
  isOperationRunning,
  toggleIsOperationRunning,
  showNotification,
}) {
  const brandNameRef = useRef();
  const discountRateRef = useRef();
  const brandLogoRef = useRef();
  const brandImageRef = useRef();
  const [clearPreviews, setClearPreviews] = useState(false);
  const [currentProgressStatus, setCurrentProgressStatus] =
    useState("Adding Brand");

  useEffect(() => {
    if (clearPreviews) setClearPreviews(!clearPreviews);
  }, [clearPreviews]);

  const clearValuesAndCloseDialog = () => {
    brandNameRef.current.value = "";
    discountRateRef.current.value = "";
    brandImageRef.current.value = "";
    brandLogoRef.current.value = "";
    setClearPreviews(true);
    toggleIsOperationRunning();
    toggleAddBrandDialog();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let brandLogo, brandImage, error, brand;
    const brandName = brandNameRef.current.value;
    const brandDiscount = parseInt(discountRateRef.current.value);

    const brandLogoFile = brandLogoRef.current.files[0];
    const brandImageFile = brandImageRef.current.files[0];

    if (!brandLogoFile || !brandImageFile) throw new Error("select Files");

    try {
      toggleIsOperationRunning();

      setCurrentProgressStatus("Uploading Logo");
      [brandLogo, error] = await uploadBrandLogo(brandLogoFile);
      if (error) throw new Error(error);

      setCurrentProgressStatus("Uploading Image");
      [brandImage, error] = await uploadBrandImage(brandImageFile);
      if (error) throw new Error(error);

      setCurrentProgressStatus("Creating Brand");
      [brand, error] = await createBrand({
        name: brandName,
        logo: brandLogo,
        image: brandImage,
        discountRate: brandDiscount,
      });

      if (error) throw new Error(error);

      // add brand to redux
      addBrand(brand);
      //  clear input values
      clearValuesAndCloseDialog();
      showNotification(`${brandName} added successfully.`, "success");
    } catch (error) {
      if (!brand) {
        showNotification(error.message, "error");
        if (brandLogo) {
          setCurrentProgressStatus("Deleting Logo");
          const [, error] = await deleteBrandLogo(brandLogo.publicId);
          if (error) showNotification(error.message, "error");
        }
        if (brandImage) {
          setCurrentProgressStatus("Deleting Image");
          const [, error] = await deleteBrandImage(brandImage.publicId);
          if (error) showNotification(error.message, "error");
        }
        toggleIsOperationRunning();
      }
      if (brand) {
        showNotification(
          `Brand ${brandName} created, Please refresh.${error.message}`,
          "error"
        );

        toggleIsOperationRunning();
        clearValuesAndCloseDialog();
      }
    }
  };

  return (
    <CustomDialog
      open={addBrandDialog}
      handleClose={!isOperationRunning ? toggleAddBrandDialog : null}
      heading="add brand"
    >
      <S.AddBrandContainer>
        <S.AddBrandForm onSubmit={handleSubmit}>
          <InputField
            label="Brand Name"
            type="text"
            ref={brandNameRef}
            required
          />
          <InputField
            label="Discount Rate"
            type="number"
            ref={discountRateRef}
            inputProps={{ min: 0, max: 100 }}
            required
          />
          <div>
            <S.FileInputLabel htmlFor="brandImage">
              brand Image:
            </S.FileInputLabel>
            <FileInput
              label="brand image preview"
              ref={brandImageRef}
              inputId="brandImage"
              clearPreview={clearPreviews}
              isInputRequired
            />
          </div>
          <div>
            <S.FileInputLabel htmlFor="brandLogo">brand Icon:</S.FileInputLabel>
            <FileInput
              label="brand logo preview"
              clearPreview={clearPreviews}
              ref={brandLogoRef}
              inputId="brandLogo"
              isInputRequired
            />
          </div>
          <CustomButton
            size="sm"
            color="pink"
            type="submit"
            align="center"
            disabled={isOperationRunning}
            hasLoading
            isLoading={isOperationRunning}
            loadingText={currentProgressStatus}
          >
            Add Brand
          </CustomButton>
        </S.AddBrandForm>
      </S.AddBrandContainer>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  addBrandDialog: selectAddBrandDialog,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAddBrandDialog: () => dispatch(toggleAddBrandDialog()),
  addBrand: (brand) => dispatch(addBrand(brand)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBrandDialog);
