import React, { useRef, useEffect, useState } from "react";
// style
import * as S from "./EditBrandDialog.styles";
// utils
import {
  deleteBrandImage,
  deleteBrandLogo,
  updateBrandImage,
  updateBrandLogo,
  uploadBrandImage,
  uploadBrandLogo,
} from "admin/admin.utils";
// firebase
import { updateBrandById } from "firebase/brands.utils";
// redux
import { connect } from "react-redux";

import {
  toggleUpdateBrandDialog,
  setBrandForOperation,
  toggleIsOperationRunning,
  updateBrand,
} from "redux/admin/brands/brands.actions";
import {
  selectUpdateBrandDialog,
  selectBrandForOperation,
  selectIsOperationRunning,
} from "redux/admin/brands/brands.selectors";
// components
import InputField from "components/InputField/InputField";
import CustomDialog from "components/CustomDialog/CustomDialog";
import FileInput from "../FileInput/FileInput";
import CustomButton from "components/CustomButton/CustomButton";
import { createStructuredSelector } from "reselect";
import { updateItemsBrand } from "redux/admin/items/items.actions";
import { showNotification } from "redux/notification/notification.actions";

function EditBrand({
  brandForOperation: brand,
  updateBrandDialog,
  toggleUpdateBrandDialog,
  setBrandForOperation,
  updateBrand,
  isOperationRunning,
  toggleIsOperationRunning,
  updateItemsBrand,
  showNotification,
}) {
  const [brandName, setBrandName] = useState();
  const [brandDiscountRate, setBrandDiscountRate] = useState();
  const brandIconRef = useRef();
  const brandImageRef = useRef();
  const [clearPreviews, setClearPreviews] = useState(false);
  const [currentProgressStatus, setCurrentProgressStatus] =
    useState("Editing Brand");

  const { logo, image } = brand || {};
  const { src: logoSrc } = logo || {};
  const { src: imageSrc } = image || {};

  useEffect(() => {
    if (brand) {
      setBrandName(brand.name);
      setBrandDiscountRate(brand.discountRate);
    }
  }, [brand]);

  useEffect(() => {
    if (clearPreviews) setClearPreviews(!clearPreviews);
  }, [clearPreviews]);

  const cloaseDialog = () => {
    brandIconRef.current.value = "";
    brandImageRef.current.value = "";
    setBrandForOperation(null);
    toggleUpdateBrandDialog();
  };

  const handleSubmit = async (e) => {
    const { id: brandId, logo, image } = brand;
    e.preventDefault();

    const dataToUpdate = {};
    const dataToUpdateItem = {};
    let brandImage,
      brandLogo,
      error,
      isBrandUpdated,
      isLogoDeleted,
      isImageDeleted;
    const name = brandName.toLowerCase();
    const brandDiscount = parseInt(brandDiscountRate);
    const brandIconFile = brandIconRef.current.files[0];
    const brandImageFile = brandImageRef.current.files[0];

    try {
      toggleIsOperationRunning();

      if (brandIconFile) {
        setCurrentProgressStatus("Uploading New Logo");
        [brandLogo, error] = await uploadBrandLogo(brandIconFile);
        if (error) throw new Error(error);
        dataToUpdate.logo = brandLogo;
      }
      if (brandImageFile) {
        setCurrentProgressStatus("Uploading New Image");
        [brandImage, error] = await uploadBrandImage(brandImageFile);
        if (error) throw new Error(error);
        dataToUpdate.image = brandImage;
      }

      if (name !== brand.name) {
        dataToUpdate.name = name;
        dataToUpdateItem.name = name;
      }

      if (brandDiscount !== brand.discountRate) {
        dataToUpdate.discountRate = brandDiscount;
        dataToUpdateItem.discountRate = brandDiscount;
      }

      // if there is not data to update
      if (Object.keys(dataToUpdate).length === 0)
        return toggleIsOperationRunning();

      setCurrentProgressStatus("Updating Brand");
      // update data to firebase
      [isBrandUpdated, error] = await updateBrandById(brandId, dataToUpdate);
      if (error) throw new Error(error);

      // if brand is updated then delete image
      if (dataToUpdate.logo && logo && logo.publicId) {
        setCurrentProgressStatus("Deleting old Logo");
        [isLogoDeleted, error] = await deleteBrandLogo(logo.publicId);
        if (error)
          throw new Error(`can't delete old logo, Error: ${error.message}`);
      }
      if (dataToUpdate.image && image && image.publicId) {
        setCurrentProgressStatus("Deleting old Image");
        [isImageDeleted, error] = await deleteBrandImage(image.publicId);
        if (error)
          throw new Error(`can't delete old image, Error: ${error.message}`);
      }
      // update data to redux
      updateBrand(brandId, dataToUpdate);
      // update loaded items brand if needed
      if (Object.keys(dataToUpdateItem).length > 0) {
        updateItemsBrand(brandId, dataToUpdateItem);
      }
      toggleIsOperationRunning();
      showNotification(`Brand ${name} is updated successfully`, "success");
      cloaseDialog();
    } catch (error) {
      if (!isBrandUpdated) {
        showNotification(error.message, "error");
        let newError;
        if (dataToUpdate.logo) {
          setCurrentProgressStatus("Deleting New Logo");
          [, newError] = await deleteBrandLogo(dataToUpdate.logo.publicId);
          if (newError) showNotification(newError.message, "error");
        }
        if (dataToUpdate.image) {
          setCurrentProgressStatus("Deleting New Image");
          [, newError] = await deleteBrandImage(dataToUpdate.image.publicId);
          if (newError) showNotification(newError.message, "error");
        }
        toggleIsOperationRunning();
      }

      if (isBrandUpdated) {
        toggleIsOperationRunning();
        if ((brandImage && !isImageDeleted) || (brandLogo && !isLogoDeleted)) {
          showNotification(error.message, "error");
        } else {
          showNotification(
            `Brand ${name} is updated, Please Refresh. ${error.message}`,
            "error"
          );
          cloaseDialog();
        }
      }
    }
  };

  return (
    <CustomDialog
      open={updateBrandDialog}
      handleClose={!isOperationRunning ? cloaseDialog : null}
      heading="Edit brand"
    >
      {brand && (
        <S.EditBrandContainer>
          <S.EditBrandForm onSubmit={handleSubmit}>
            <InputField
              label="Brand Name"
              type="text"
              value={brandName}
              required
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
            />
            <InputField
              label="Discount Rate"
              type="number"
              inputProps={{ min: 0, max: 100 }}
              required
              value={brandDiscountRate}
              onChange={(e) => setBrandDiscountRate(e.target.value)}
            />
            <div>
              <S.FileInputLabel htmlFor="brandImage">
                brand Image:
              </S.FileInputLabel>
              <FileInput
                label="brand image preview"
                ref={brandImageRef}
                inputId="brandImage"
                defaultPreview={(imageSrc && imageSrc.org.url) || ""}
                clearPreview={clearPreviews}
              />
            </div>
            <div>
              <S.FileInputLabel htmlFor="brandIcon">
                brand Icon:
              </S.FileInputLabel>
              <FileInput
                label="brand icon preview"
                clearPreview={clearPreviews}
                inputId="brandIcon"
                defaultPreview={(logoSrc && logoSrc.org.url) || ""}
                ref={brandIconRef}
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
              Edit Brand
            </CustomButton>
          </S.EditBrandForm>
        </S.EditBrandContainer>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  brandForOperation: selectBrandForOperation,
  updateBrandDialog: selectUpdateBrandDialog,
  isOperationRunning: selectIsOperationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  toggleUpdateBrandDialog: () => dispatch(toggleUpdateBrandDialog()),
  setBrandForOperation: (brand) => dispatch(setBrandForOperation(brand)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  updateBrand: (brandId, update) => dispatch(updateBrand(brandId, update)),
  updateItemsBrand: (brandId, dataToUpdate) =>
    dispatch(updateItemsBrand(brandId, dataToUpdate)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBrand);
