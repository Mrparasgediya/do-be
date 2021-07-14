import React, { useEffect, useRef, useState } from "react";
import CustomDialog from "components/CustomDialog/CustomDialog";
import InputField from "components/InputField/InputField";
import CustomButton from "components/CustomButton/CustomButton";
import FileInput from "admin/adminComponents/FileInput/FileInput";
import CustomAutoCompleteSelect from "admin/adminComponents/CustomAutoCompleteSelect/CustomAutoCompleteSelect";
import { addImagesToItem, addNewItem, deleteItem } from "firebase/items.utils";
import { addItemImage, deleteAllItemImages } from "admin/admin.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  toggleAddItemDialog,
  addItem,
  toggleIsOperationRunning,
  setBrandsOptions,
  setCollectionsOptions,
} from "redux/admin/items/items.actions";
import {
  selectAddItemDialog,
  selectIsOperationRunning,
  selectBrandsOptionsForItem,
  selectCollectionsOptionsForItem,
} from "redux/admin/items/items.selectors";
import {
  addItemToBrand,
  deleteItemFromBrand,
  getBrandForItem,
  getBrandsOptions,
} from "firebase/brands.utils";
import {
  addItemToCollection,
  deleteItemFromCollection,
  getCollectionForItem,
  getCollectionsOptions,
} from "firebase/collections.utils";
import { showNotification } from "redux/notification/notification.actions";

function AddItemDialog({
  addItemDialog,
  toggleAddItemDialog,
  isOperationRunning,
  toggleIsOperationRunning,
  addItem,
  collectionsOptions,
  brandsOptions,
  setBrandsOptions,
  setCollectionsOptions,
  showNotification,
}) {
  const nameRef = useRef();
  const priceRef = useRef();
  const discountRateRef = useRef();
  const itemImagesRef = useRef();
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedCollection, setSelectedCollection] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const descriptionRef = useRef();

  const [isCollectionsOptionsLoading, setIsCollectionsOptionsLoading] =
    useState(false);
  const [isBrandsOptionsLoading, setIsBrandsOptionsLoading] = useState(false);
  const [currentProgressStatus, setCurrentProgressStatus] =
    useState("Adding item");
  const [isValidOperation, setIsValidOperation] = useState(true);

  const [qty, setQty] = useState({
    0: { name: "", value: 0 },
  });

  const fetchOptions = async () => {
    try {
      let brandsOptions, error, collectionsOptions;

      setIsBrandsOptionsLoading(true);
      [brandsOptions, error] = await getBrandsOptions();
      if (error) throw new Error(`can't load brands options. ${error.message}`);
      setBrandsOptions(brandsOptions);
      setIsBrandsOptionsLoading(false);

      setIsCollectionsOptionsLoading(true);
      [collectionsOptions, error] = await getCollectionsOptions();
      if (error)
        throw new Error(`can't load collections options. ${error.message}`);
      setCollectionsOptions(collectionsOptions);
      setIsCollectionsOptionsLoading(false);
    } catch (error) {
      showNotification(error.message, "error");
      setIsValidOperation(false);
      if (isBrandsOptionsLoading) setIsBrandsOptionsLoading(false);
      if (isCollectionsOptionsLoading) setIsCollectionsOptionsLoading(false);
    }
  };

  useEffect(() => {
    if (addItemDialog) {
      fetchOptions();
    }
  }, [addItemDialog]);

  const clearValuesAndCloseDialog = () => {
    setSelectedBrand(null);
    setSelectedCollection(null);
    setSelectedGroup(null);
    nameRef.current.value = "";
    priceRef.current.value = "";
    discountRateRef.current.value = "";
    itemImagesRef.current.value = "";
    descriptionRef.current.value = "";
    setQty({ 0: { name: "", value: "" } });
    toggleAddItemDialog();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleIsOperationRunning();
    const name = nameRef.current.value;
    const price = parseInt(priceRef.current.value);
    const discountRate = parseInt(discountRateRef.current.value);
    const imageFilesArr = Array.from(itemImagesRef.current.files);
    const brand = selectedBrand.id;
    const collection = selectedCollection.id;
    const description = descriptionRef.current.value;
    const group = selectedGroup;
    const quantity = Object.keys(qty).reduce(
      (acc, qtyId) =>
        qty[qtyId].name !== "" && qty[qtyId].value > 0
          ? {
              ...acc,
              [qty[qtyId].name]: qty[qtyId].value,
            }
          : acc,
      {}
    );

    let newItem,
      isItemAdded,
      isAddedToBrand,
      isAddedToCollection,
      brandInfo,
      collectionInfo,
      error,
      imagesArr,
      currentImageCounter;
    try {
      // create item
      setCurrentProgressStatus("creating item");
      [newItem, error] = await addNewItem(
        name,
        price,
        discountRate,
        quantity,
        group,
        brand,
        collection,
        description
      );
      if (error) throw new Error(error);
      // add to brand
      setCurrentProgressStatus("adding to brand");
      [isAddedToBrand, error] = await addItemToBrand(brand, newItem.id, group);
      if (error) throw new Error(error);
      // add to collection
      setCurrentProgressStatus("adding to collection");
      [isAddedToCollection, error] = await addItemToCollection(
        collection,
        newItem.id,
        group
      );
      if (error) throw new Error(error);

      const {
        id: itemId,
        brand: itemBrandId,
        collection: itemCollectionId,
        ...otherData
      } = newItem;

      imagesArr = [];
      currentImageCounter = 1;

      for (let file of imageFilesArr) {
        try {
          setCurrentProgressStatus(`uploading image ${currentImageCounter}`);

          const [image, error] = await addItemImage(
            itemId,
            currentImageCounter,
            file
          );

          if (error) throw new Error(error);

          imagesArr.push(image);
          currentImageCounter++;
        } catch (error) {
          showNotification(
            `can't upload image from image ${currentImageCounter}, ${error.message}`,
            "error"
          );
          break;
        }
      }

      let imagesObj = imagesArr.reduce(
        (allImgs, { publicId, src }) => ({
          ...allImgs,
          [publicId]: src,
        }),
        {}
      );

      setCurrentProgressStatus("adding images");
      [, error] = await addImagesToItem(itemId, imagesObj);
      if (error) throw new Error(error);
      isItemAdded = true;

      setCurrentProgressStatus("getting brand");
      [brandInfo, error] = await getBrandForItem(itemBrandId);
      if (error) throw new Error(error);

      setCurrentProgressStatus("getting collection");
      [collectionInfo, error] = await getCollectionForItem(itemCollectionId);
      if (error) throw new Error(error);

      // add item to redux
      addItem({
        [itemId]: {
          ...otherData,
          brand: brandInfo,
          collection: collectionInfo,
          images: imagesObj,
        },
      }); // add item to dialog

      toggleIsOperationRunning();
      //  set to default vlues
      clearValuesAndCloseDialog();
    } catch (error) {
      if (isItemAdded) {
        showNotification(
          `item is added, please refresh. ${error.message}`,
          "error"
        );
        toggleIsOperationRunning();
        clearValuesAndCloseDialog();
      }

      if (!isItemAdded && newItem) {
        const { id, brand, collection, group } = newItem;
        let newError;

        // show initial error message
        showNotification(error.message, "error");

        if (isAddedToBrand) {
          // remove item from brand if brand is added
          setCurrentProgressStatus("deleting from brand");
          [, newError] = await deleteItemFromBrand(brand, id, group);
          if (newError)
            showNotification(
              `can't remove item from selected brand, ${newError.message}`,
              "error"
            );
        }
        if (isAddedToCollection) {
          // remove item from collection
          setCurrentProgressStatus("deleting from collection");
          [, newError] = await deleteItemFromCollection(collection, id, group);
          if (newError)
            showNotification(
              `can't remove item from selected collection, ${newError.message}`,
              "error"
            );
        }
        if (imagesArr.length > 0) {
          setCurrentProgressStatus("deleting item images");
          [, newError] = await deleteAllItemImages(id);
          if (newError)
            showNotification(
              `can't delete item images, ${newError.message}`,
              "error"
            );
        }
        setCurrentProgressStatus("deleting item");
        [, newError] = await deleteItem(id, collection, brand, group);
        if (newError) showNotification(newError.message, "error");
        toggleIsOperationRunning();
      }
    }
  };
  return (
    <CustomDialog
      fullScreen
      heading="add item"
      open={addItemDialog}
      handleClose={!isOperationRunning ? toggleAddItemDialog : null}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <InputField
          style={{ width: "50rem" }}
          fullWidth
          type="text"
          label="Name"
          InputLabelProps={{ htmlFor: "name" }}
          inputRef={nameRef}
          inputProps={{ id: "name" }}
          required
        />
        <InputField
          style={{ width: "50rem" }}
          fullWidth
          type="number"
          label="Total Price"
          InputLabelProps={{ htmlFor: "price" }}
          inputRef={priceRef}
          inputProps={{
            id: "price",
            min: 0,
          }}
          required
        />
        <InputField
          style={{ width: "50rem" }}
          fullWidth
          type="number"
          label="Discount Rate"
          InputLabelProps={{ htmlFor: "discountRate" }}
          inputRef={discountRateRef}
          inputProps={{
            id: "discountRate",
            min: 0,
            max:
              selectedBrand && selectedCollection
                ? 100 -
                  selectedCollection.discountRate -
                  selectedBrand.discountRate
                : 100,
          }}
          required
        />
        <CustomAutoCompleteSelect
          style={{ width: "50rem" }}
          id="select-group"
          options={["mens", "womens", "girls", "boys"]}
          autoHighlight
          getOptionLabel={(option) => option}
          getOptionSelected={(option, value) => option.value === value.id}
          onChange={(_, seletedGroup) => setSelectedGroup(seletedGroup)}
          label="Select Group"
          required
        />
        <CustomAutoCompleteSelect
          style={{ width: "50rem" }}
          id="select-collections"
          options={collectionsOptions}
          autoHighlight
          loading={isCollectionsOptionsLoading}
          getOptionLabel={(option) => `${option.name}-${option.discountRate}%`}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={(_, selectedCollection) =>
            setSelectedCollection(selectedCollection)
          }
          label="Select collection"
          required
        />
        <CustomAutoCompleteSelect
          style={{ width: "50rem" }}
          id="select-brand"
          options={brandsOptions}
          loading={isBrandsOptionsLoading}
          autoHighlight
          getOptionLabel={(option) => `${option.name}-${option.discountRate}%`}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={(_, selectedBrand) => setSelectedBrand(selectedBrand)}
          label="Select Brand"
          required
        />
        <div style={{ margin: "2rem 0" }}>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <span style={{ fontSize: "var(--font-md)" }}>Quantity:</span>
            <CustomButton
              color="pink"
              isActive
              type="button"
              size="xs"
              onClick={() => {
                const qtyLength = Object.keys(qty).length;
                setQty({ ...qty, [qtyLength]: { name: "", value: "" } });
              }}
            >
              add qty
            </CustomButton>
          </div>
          {Object.keys(qty).map((key, idx) => {
            return (
              <div
                key={idx}
                style={{ display: "flex", alignItems: "center", gap: "2rem" }}
              >
                <InputField
                  style={{ width: "50rem" }}
                  type="text"
                  label="qtyName"
                  value={(qty[key] && qty[key].name) || ""}
                  onChange={(e) =>
                    setQty({
                      ...qty,
                      [key]: { ...qty[key], name: e.target.value },
                    })
                  }
                  required
                />
                <InputField
                  style={{ width: "50rem" }}
                  type="number"
                  label="qtyValue"
                  inputProps={{
                    min: 0,
                  }}
                  value={(qty[key] && qty[key].value) || ""}
                  onChange={(e) =>
                    setQty({
                      ...qty,
                      [key]: { ...qty[key], value: parseInt(e.target.value) },
                    })
                  }
                  required
                />
                <CustomButton
                  type="button"
                  color="red"
                  size="xs"
                  onClick={() => {
                    delete qty[key];
                    setQty({ ...qty });
                  }}
                  isActive
                  disabled={isOperationRunning || Object.keys(qty).length <= 1}
                >
                  Delete
                </CustomButton>
              </div>
            );
          })}
        </div>
        <label htmlFor="itemImages" style={{ fontSize: "1.4rem" }}>
          images ( rename images name with numbers for order ):
        </label>
        <FileInput
          label="item images"
          ref={itemImagesRef}
          acceptMultiple
          inputId="itemImages"
          isAcceptMultipleFiles
          isInputRequired
        />
        <h4>description:</h4>
        <textarea
          style={{ resize: "none", width: "30rem", height: "22rem" }}
          ref={descriptionRef}
          required
        />
        <CustomButton
          color="black"
          size="small"
          align="center"
          disabled={isOperationRunning || !isValidOperation}
          hasLoading
          isLoading={isOperationRunning}
          loadingText={currentProgressStatus}
        >
          Add Item
        </CustomButton>
      </form>
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
  addItemDialog: selectAddItemDialog,
  brandsOptions: selectBrandsOptionsForItem,
  collectionsOptions: selectCollectionsOptionsForItem,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAddItemDialog: () => dispatch(toggleAddItemDialog()),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  addItem: (item) => dispatch(addItem(item)),
  setBrandsOptions: (brandsOptions) =>
    dispatch(setBrandsOptions(brandsOptions)),
  setCollectionsOptions: (collectionsOptions) =>
    dispatch(setCollectionsOptions(collectionsOptions)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItemDialog);
