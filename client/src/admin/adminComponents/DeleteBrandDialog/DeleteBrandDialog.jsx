import React, { useEffect, useState } from "react";
// style
import * as S from "./DeleteBrandDialog.styles";
// utils
import { deleteBrandImage, deleteBrandLogo } from "admin/admin.utils";
// firebase
import {
  deleteBrand as deleteBrandFromFirebase,
  getBrandItemsCount,
} from "firebase/brands.utils";
import { getBrandVideo } from "firebase/brandVideo.utils";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setBrandForOperation,
  toggleDeleteBrandDialog,
  deleteBrand,
  toggleIsOperationRunning,
} from "redux/admin/brands/brands.actions";
import {
  selectBrandForOperation,
  selectDeleteBrandDialog,
  selectIsOperationRunning,
} from "redux/admin/brands/brands.selectors";

import { deleteBrandItems } from "redux/admin/items/items.actions";

import { setBrandVideo } from "redux/admin/static/brandVideo/brandVideo.actions";
import { selectBrandVideo } from "redux/admin/static/brandVideo/brandVideo.selectors";

// components
import CustomDialog from "components/CustomDialog/CustomDialog";
import { showNotification } from "redux/notification/notification.actions";

function DeleteBrand({
  deleteBrandDialog,
  toggleDeleteBrandDialog,
  brandForOperation: brand,
  setBrandForOperation,
  deleteBrand,
  isOperationRunning,
  toggleIsOperationRunning,
  brandVideo,
  setBrandVideo,
  deleteBrandItems,
  showNotification,
}) {
  const [brandItemsCount, setBrandItemsCount] = useState();
  const [currentProgressStatus, setCurrentProgressStatus] =
    useState("Deleting Brand");
  const [isValidOpertion, setIsValidOperation] = useState(true);

  const { logo, image } = brand || {};
  const { src: logoSrc } = logo || {};

  const hasItems = (brand) => {
    if (brand.items) {
      for (let key of Object.keys(brand.items)) {
        if (brand.items[key].length > 0) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!brandVideo) {
      const fetchBrandVidoe = async () => {
        const brandVideo = await getBrandVideo();
        setBrandVideo(brandVideo);
      };
      fetchBrandVidoe();
    }
  }, [brandVideo, setBrandVideo]);

  useEffect(() => {
    if (brand) {
      const fetchItemsCount = async () => {
        try {
          const [itemsCount, error] = await getBrandItemsCount(brand.id);
          if (error) throw new Error(error);
          setBrandItemsCount(itemsCount);
        } catch (error) {
          showNotification(`can't get items count, ${error.message}`, "error");
          setIsValidOperation(false);
        }
      };
      fetchItemsCount();
    }
  }, [brand]);

  const closeDialog = () => {
    setBrandForOperation(null);
    toggleDeleteBrandDialog();
  };

  const handleDeleteClick = async () => {
    const { id, logo, image, name } = brand;
    toggleIsOperationRunning();
    let error, isBrandDeleted;
    try {
      // delete images from cloudinary
      // delete logo
      if (logo && logo.publicId) {
        setCurrentProgressStatus("Deleting Brand Logo");
        [, error] = await deleteBrandLogo(logo.publicId);
        if (error) throw new Error(`can't delete brand logo. ${error.message}`);
      }
      // delete image
      if (image && image.publicId) {
        setCurrentProgressStatus("Deleting Brand Image");
        [, error] = await deleteBrandImage(image.publicId);
        if (error)
          throw new Error(`can't delete brand image. ${error.message}`);
      }

      // delete data from firebase
      setCurrentProgressStatus("Deleting Brand");
      [isBrandDeleted, error] = await deleteBrandFromFirebase(
        id,
        setCurrentProgressStatus
      );
      if (error) throw new Error(error);
      //deleete brand items from redux
      if (hasItems(brand)) deleteBrandItems(id);

      // 3. delete data from redux
      deleteBrand(id);
      // toggle operation is running
      toggleIsOperationRunning();
      showNotification(`Brand ${name} is Deleted successfully`, "success");
      // close the dialog
      closeDialog();
    } catch (error) {
      if (!isBrandDeleted) {
        showNotification(error.message, "error");
        toggleIsOperationRunning();
      }
      if (isBrandDeleted) {
        showNotification(
          `Brand ${name} is deleted, please refresh${error.message}`,
          "error"
        );
        toggleIsOperationRunning();
        closeDialog();
      }
    }
  };

  return (
    brand && (
      <CustomDialog
        open={deleteBrandDialog}
        handleClose={!isOperationRunning ? closeDialog : null}
        heading="Delete Brand"
        isDeleteDialog
        handleDeleteClick={handleDeleteClick}
        disableButton={isOperationRunning}
        disableDeleteButton={
          (brandVideo && brandVideo.brand.id === brand.id) || !isValidOpertion
        }
        deleteButtonProps={{
          hasLoading: true,
          isLoading: isOperationRunning,
          loadingText: currentProgressStatus,
        }}
      >
        {console.log(brand)}
        <S.DeleteBrandContainer>
          <S.DeleteBrandContentContainer>
            <S.BrandInfoContainer>
              <S.BrandLogo
                src={(logoSrc && logoSrc.org.url) || ""}
                alt="brand logo"
              />
              <S.BrandInfoTextContainer>
                <S.BrandInfoText>Name: {brand.name}</S.BrandInfoText>
                <S.BrandInfoText>
                  Discount Rate: {brand.discountRate}%
                </S.BrandInfoText>
                {brandItemsCount > 0 && (
                  <S.BrandInfoText color="red">
                    this brand has {brandItemsCount} items
                  </S.BrandInfoText>
                )}
              </S.BrandInfoTextContainer>
            </S.BrandInfoContainer>
            <S.DeleteMessageHeading>
              {(brandVideo && brandVideo.brand.id === brand.id && (
                <S.BrandInfoText color="red">
                  this brand has brand video so you can't delete this brand
                  <br />
                  Hint: to delete this brand delete brand video first
                </S.BrandInfoText>
              )) || (
                <S.BrandInfoText>
                  Are you want to delete {brand && brand.name} brand?
                </S.BrandInfoText>
              )}
            </S.DeleteMessageHeading>
          </S.DeleteBrandContentContainer>
        </S.DeleteBrandContainer>
      </CustomDialog>
    )
  );
}

const mapStateToProps = createStructuredSelector({
  deleteBrandDialog: selectDeleteBrandDialog,
  brandForOperation: selectBrandForOperation,
  isOperationRunning: selectIsOperationRunning,
  brandVideo: selectBrandVideo,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDeleteBrandDialog: () => dispatch(toggleDeleteBrandDialog()),
  setBrandForOperation: (brand) => dispatch(setBrandForOperation(brand)),
  deleteBrand: (brandId) => dispatch(deleteBrand(brandId)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  setBrandVideo: (brandVideo) => dispatch(setBrandVideo(brandVideo)),
  deleteBrandItems: (brandId) => dispatch(deleteBrandItems(brandId)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBrand);
