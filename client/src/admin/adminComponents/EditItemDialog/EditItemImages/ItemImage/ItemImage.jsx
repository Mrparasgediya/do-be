import FileInput from "admin/adminComponents/FileInput/FileInput";
import CustomButton from "components/CustomButton/CustomButton";
import React, { useRef } from "react";
import { Fragment } from "react";
import { getItemNextImageNo, updateItemImage } from "admin/admin.utils";
import { updateItemImage as updateItemImagesFromFirebase } from "firebase/items.utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectItemForOperation,
  selectIsOperationRunning,
} from "redux/admin/items/items.selectors";
import {
  toggleIsOperationRunning,
  setItemImageForOperation,
  toggleDeleteItemImageDialog,
} from "redux/admin/items/items.actions";

function ItemImage({
  image,
  imageIdx,
  toggleIsOperationRunning,
  itemForOperation: item,
  isOperationRunning,
  setItemImageForOperation,
  toggleDeleteItemImageDialog,
}) {
  const imageInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = imageInputRef.current.files[0];
    if (!file) return;
    toggleIsOperationRunning();
    const imagePublicId = image.publicId;

    let nextImageCount = getItemNextImageNo(item);
    try {
      const newImage = await updateItemImage(
        imagePublicId,
        item.id,
        nextImageCount,
        file
      );

      await updateItemImagesFromFirebase(item.id, item.images, newImage, image);
      toggleIsOperationRunning();
    } catch (error) {
      console.log(error);
      toggleIsOperationRunning();
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid var(--color-gray-light)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 0.45,
          maxWidth: "45rem",
          height: "50rem",
        }}
      >
        <b style={{ fontSize: "var(--font-md-big)" }}>image {imageIdx + 1}</b>
        <FileInput
          ref={imageInputRef}
          style={{ flex: 1 }}
          defaultPreview={image.small.url}
          isInputRequired
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <CustomButton
            disabled={isOperationRunning}
            type="submit"
            color="pink"
            size="small"
            isActive
          >
            Change Image
          </CustomButton>

          <CustomButton
            disabled={isOperationRunning}
            type="button"
            color="red"
            size="small"
            isActive
            onClick={() => {
              setItemImageForOperation({ no: imageIdx, ...image });
              toggleDeleteItemImageDialog();
            }}
          >
            Delete image
          </CustomButton>
        </div>
      </form>
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  itemForOperation: selectItemForOperation,
  isOperationRunning: selectIsOperationRunning,
});
const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  toggleDeleteItemImageDialog: () => dispatch(toggleDeleteItemImageDialog()),
  setItemImageForOperation: (image) =>
    dispatch(setItemImageForOperation(image)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ItemImage);
