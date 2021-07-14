import React, { useState, useEffect } from "react";
import { updateItem } from "firebase/items.utils";
import InputField from "components/InputField/InputField";
import CustomAutoCompleteSelect from "admin/adminComponents/CustomAutoCompleteSelect/CustomAutoCompleteSelect";
import CustomButton from "components/CustomButton/CustomButton";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  toggleIsOperationRunning,
  updateItem as updateItemFromStore,
  setUpdateItemPanel,
  setBrandsOptions,
  setCollectionsOptions,
} from "redux/admin/items/items.actions";
import {
  selectItemForOperation,
  selectIsOperationRunning,
  selectBrandsOptionsForItem,
  selectCollectionsOptionsForItem,
  selectUpdateItemPanel,
} from "redux/admin/items/items.selectors";

import { getBrandForItem, getBrandsOptions } from "firebase/brands.utils";
import {
  getCollectionForItem,
  getCollectionsOptions,
} from "firebase/collections.utils";

function EditItemData({
  updateItemPanel,
  itemForOperation: item,
  isOperationRunning,
  toggleIsOperationRunning,
  collectionsOptions,
  brandsOptions,
  updateItemFromStore,
  setIsDataUpdated,
  setUpdateItemPanel,
  setBrandsOptions,
  setCollectionsOptions,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [price, setPrice] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);

  const [isCollectionOptionsLoading, setIsCollectionOptionsLoading] =
    useState(false);
  const [isBrandsOptionsLoading, setIsBrandsOptionsLoading] = useState(false);

  useEffect(() => {
    if (updateItemPanel === "info" && brandsOptions.length === 0) {
      const fetchOptions = async () => {
        try {
          setIsBrandsOptionsLoading(true);
          const [brandsOptions, error] = await getBrandsOptions();
          if (error) throw new Error(error);
          setBrandsOptions(brandsOptions);
          setIsBrandsOptionsLoading(false);
        } catch (error) {
          console.log(error);
          setIsBrandsOptionsLoading(false);
        }
      };
      fetchOptions();
    }
  }, [brandsOptions, updateItemPanel, setBrandsOptions]);

  useEffect(() => {
    if (updateItemPanel === "info" && collectionsOptions.length === 0) {
      const fetchOptions = async () => {
        try {
          setIsCollectionOptionsLoading(true);
          const [collectionsOptions, error] = await getCollectionsOptions();
          if (error) throw new Error(error);
          setCollectionsOptions(collectionsOptions);
          setIsCollectionOptionsLoading(false);
        } catch (error) {
          console.log(error);
          setIsCollectionOptionsLoading(false);
        }
      };
      fetchOptions();
    }
  }, [updateItemPanel, collectionsOptions, setCollectionsOptions]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setQty(
        Object.keys(item.quantity).reduce(
          (qty, key, idx) => ({
            ...qty,
            [idx]: { name: key, value: item.quantity[key] },
          }),
          {}
        )
      );
      setSelectedGroup(item.group);
      setPrice(item.price);
      setDiscountRate(item.discountRate);
      setSelectedBrand(item.brand);
      setSelectedCollection(item.collection);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleIsOperationRunning();
    const dataToUpdate = {};

    const newBrandId = selectedBrand.id;
    const newCollectionId = selectedCollection.id;

    if (item.name !== name) {
      dataToUpdate.name = name;
    }
    if (item.group !== selectedGroup) {
      dataToUpdate.group = selectedGroup;
    }
    if (item.description !== description) {
      dataToUpdate.description = description;
    }
    if (item.brand.id !== newBrandId) {
      dataToUpdate.brand = newBrandId;
    }
    if (item.collection.id !== newCollectionId) {
      dataToUpdate.collection = newCollectionId;
    }
    if (item.price !== price) {
      dataToUpdate.price = price;
    }

    if (item.discountRate !== discountRate) {
      dataToUpdate.discountRate = discountRate;
    }
    // quantity
    const quantity = Object.keys(qty).reduce(
      (quantity, idx) => ({
        ...quantity,
        [qty[idx].name.toUpperCase()]: qty[idx].value,
      }),
      {}
    );
    const itemQtyKeys = Object.keys(item.quantity);
    const qtyKeys = Object.keys(quantity);

    if (itemQtyKeys.length !== qtyKeys.length) {
      dataToUpdate.quantity = quantity;
    } else {
      let needToUpdate = false;

      for (let i = 0; i < itemQtyKeys.length; i++) {
        if (item.quantity[itemQtyKeys[i]] !== quantity[itemQtyKeys[i]]) {
          needToUpdate = true;
          break;
        }
      }

      if (needToUpdate) {
        dataToUpdate.quantity = quantity;
      }
    }

    if (!Object.keys(dataToUpdate).length) return toggleIsOperationRunning();

    try {
      // update item to firestore
      await updateItem(item.id, dataToUpdate, {
        group: item.group,
        brand: item.brand.id,
        collection: item.collection.id,
      });
      // get data according to updated brand id
      if (dataToUpdate.hasOwnProperty("brand")) {
        const [foundBrand, error] = await getBrandForItem(dataToUpdate.brand);
        if (error) throw new Error(error);
        dataToUpdate.brand = foundBrand;
      }
      // get data according to updated collection id
      if (dataToUpdate.hasOwnProperty("collection")) {
        const [foundCollection, error] = await getCollectionForItem(
          dataToUpdate.collection
        );
        if (error) throw new Error(error);
        dataToUpdate.collection = foundCollection;
      }
      // update item to redux
      updateItemFromStore(item.id, dataToUpdate);
      toggleIsOperationRunning();
      setIsDataUpdated(true);
      setUpdateItemPanel("images");
    } catch (error) {
      console.log(error);
      toggleIsOperationRunning();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-start",
      }}
    >
      <InputField
        style={{ width: "50rem" }}
        type="text"
        label="item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <InputField
        style={{ width: "50rem" }}
        type="number"
        label="Total Price"
        inputProps={{ min: 0 }}
        value={price}
        onChange={(e) => setPrice(e.target.value && parseInt(e.target.value))}
        required
      />
      <InputField
        style={{ width: "50rem" }}
        type="number"
        label="Discount Rate"
        inputProps={{
          min: 0,
          max:
            selectedBrand && selectedCollection
              ? 100 -
                selectedCollection.discountRate -
                selectedBrand.discountRate
              : 100,
        }}
        value={discountRate}
        onChange={(e) =>
          setDiscountRate(e.target.value && parseInt(e.target.value))
        }
        required
      />
      <CustomAutoCompleteSelect
        style={{ width: "50rem" }}
        id="select-group"
        options={["mens", "womens", "girls", "boys"]}
        autoHighlight
        value={selectedGroup || null}
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
        getOptionLabel={(option) => `${option.name}-${option.discountRate}`}
        value={selectedCollection || null}
        loading={isCollectionOptionsLoading}
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
        autoHighlight
        defaultValue={item.brand || ""}
        loading={isBrandsOptionsLoading}
        value={selectedBrand || null}
        getOptionLabel={(option) => `${option.name}-${option.discountRate}`}
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
            disabled={isOperationRunning}
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
                value={(qty[key] && qty[key].value) || ""}
                onChange={(e) =>
                  setQty({
                    ...qty,
                    [key]: {
                      ...qty[key],
                      value: e.target.value && parseInt(e.target.value),
                    },
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
      <div
        style={{
          fontSize: "var(--font-md)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <label htmlFor="description">Description</label>
        <textarea
          style={{ resize: "none", width: "30rem", height: "22rem" }}
          required
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description}
        />
      </div>
      <CustomButton
        align="center"
        size="small"
        color="pink"
        isActive
        disabled={isOperationRunning}
      >
        Edit now
      </CustomButton>
    </form>
  );
}

const mapStateToProps = createStructuredSelector({
  itemForOperation: selectItemForOperation,
  isOperationRunning: selectIsOperationRunning,
  brandsOptions: selectBrandsOptionsForItem,
  collectionsOptions: selectCollectionsOptionsForItem,
  updateItemPanel: selectUpdateItemPanel,
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  updateItemFromStore: (itemId, dataToUpdate) =>
    dispatch(updateItemFromStore(itemId, dataToUpdate)),
  setUpdateItemPanel: (panelName) => dispatch(setUpdateItemPanel(panelName)),
  setBrandsOptions: (brandsOptions) =>
    dispatch(setBrandsOptions(brandsOptions)),
  setCollectionsOptions: (collectionsOptions) =>
    dispatch(setCollectionsOptions(collectionsOptions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItemData);
