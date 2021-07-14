import { addItemImage, getItemNextImageNo } from "admin/admin.utils";
import FileInput from "admin/adminComponents/FileInput/FileInput";
import CustomButton from "components/CustomButton/CustomButton";
import React, { useEffect, useRef, useState } from "react";
import ItemImage from "./ItemImage/ItemImage";
import { addItemImage as addItemImageFromFirebase } from "firebase/items.utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  toggleIsOperationRunning,
  addItemImage as addItemImageFromStore,
} from "redux/admin/items/items.actions";
import {
  selectIsOperationRunning,
  selectItemForOperation,
} from "redux/admin/items/items.selectors";
import DeleteItemImageDialog from "./DeleteItemImageDialog/DeleteItemImageDialog";

function EditItemImages({
  itemForOperation: item,
  isOperationRunning,
  toggleIsOperationRunning,
  addItemImageFromStore,
}) {
  const [clearAddImagePreview, setClearAddImagePreview] = useState(false);
  const addImageInputRef = useRef();

  useEffect(() => {
    if (clearAddImagePreview) setClearAddImagePreview(!clearAddImagePreview);
  }, [clearAddImagePreview]);

  const handleAddImageSubmit = async (e) => {
    e.preventDefault();
    const file = addImageInputRef.current.files[0];
    if (!file) return;
    toggleIsOperationRunning();
    try {
      const newImageNo = getItemNextImageNo(item);
      //  updload new image to cloudinary
      const newImage = await addItemImage(item.id, newImageNo, file);
      //  make change to firebase
      await addItemImageFromFirebase(item.id, item.images, newImage);
      // add item image to store
      addItemImageFromStore(item.id, newImage.publicId, newImage.src);
      toggleIsOperationRunning();
      addImageInputRef.current.value = "";
      setClearAddImagePreview(!clearAddImagePreview);
    } catch (error) {
      console.log(error);
      toggleIsOperationRunning();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      {item &&
        Object.keys(item.images).map((imageId, idx) =>
          idx ? (
            <ItemImage
              key={idx}
              imageIdx={idx}
              image={{ publicId: imageId, ...item.images[imageId] }}
            />
          ) : (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "45rem",
                height: "50rem",
                border: "1px solid var(--color-gray-light)",
              }}
            >
              <b style={{ fontSize: "var(--font-md-big)" }}>image 1</b>
              <img
                src={item.images[imageId].small.url}
                style={{ height: "80%", objectFit: "contain" }}
                alt="demo"
              />
              <b
                style={{
                  fontSize: "var(--font-md)",
                  color: "var(--color-red)",
                }}
              >
                You can't change first image of item
              </b>
            </div>
          )
        )}
      <form
        onSubmit={handleAddImageSubmit}
        style={{
          border: "1px solid var(--color-gray-light)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          flex: 0.45,
          maxWidth: "45rem",
          height: "50rem",
        }}
      >
        <FileInput
          clearPreview={clearAddImagePreview}
          ref={addImageInputRef}
          isInputRequired
        />
        <CustomButton disabled={isOperationRunning} color="pink" size="small">
          add new image
        </CustomButton>
      </form>

      <DeleteItemImageDialog />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  itemForOperation: selectItemForOperation,
  isOperationRunning: selectIsOperationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  addItemImageFromStore: (itemId, imageId, imageData) =>
    dispatch(addItemImageFromStore(itemId, imageId, imageData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditItemImages);
