import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import EditItemData from "./EditItemData/EditItemData";
import EditItemImages from "./EditItemImages/EditItemImages";

import {
  selectUpdateItemDialog,
  selectIsOperationRunning,
  selectUpdateItemPanel,
} from "redux/admin/items/items.selectors";
import {
  toggleUpdateItemDialog,
  setItemForOperation,
  setUpdateItemPanel,
  setBrandsOptions,
  setCollectionsOptions,
} from "redux/admin/items/items.actions";

function EditItemDialog({
  updateItemDialog,
  toggleUpdateItemDialog,
  isOperationRunning,
  setItemForOperation,
  updateItemPanel,
  setUpdateItemPanel,
  setBrandsOptions,
  setCollectionsOptions,
}) {
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    if (updateItemDialog) {
      setUpdateItemPanel("info");
    }

    if (!updateItemDialog) {
      setUpdateItemPanel(null);
      setCollectionsOptions([]);
      setBrandsOptions([]);
    }
  }, [
    updateItemDialog,
    setCollectionsOptions,
    setBrandsOptions,
    setUpdateItemPanel,
  ]);

  return (
    <CustomDialog
      heading="edit item"
      open={updateItemDialog}
      handleClose={
        !isOperationRunning
          ? () => {
              toggleUpdateItemDialog();
              setIsDataUpdated(false);
              setItemForOperation(null);
            }
          : null
      }
      fullScreen
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <CustomButton
          onClick={() =>
            updateItemPanel !== "info" ? setUpdateItemPanel("info") : null
          }
          color="black"
          size="small"
          isActive
          disabled={isOperationRunning || isDataUpdated}
        >
          edit info
        </CustomButton>

        <CustomButton
          color="black"
          size="small"
          isActive
          onClick={() =>
            updateItemPanel !== "images" ? setUpdateItemPanel("images") : null
          }
          disabled={isOperationRunning}
        >
          edit images
        </CustomButton>
      </div>
      {updateItemPanel === "info" && (
        <EditItemData setIsDataUpdated={setIsDataUpdated} />
      )}
      {updateItemPanel === "images" && <EditItemImages />}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  updateItemDialog: selectUpdateItemDialog,
  isOperationRunning: selectIsOperationRunning,
  updateItemPanel: selectUpdateItemPanel,
});

const mapDispatchToProps = (dispatch) => ({
  toggleUpdateItemDialog: () => dispatch(toggleUpdateItemDialog()),
  setItemForOperation: (item) => dispatch(setItemForOperation(item)),
  setUpdateItemPanel: (panelName) => dispatch(setUpdateItemPanel(panelName)),
  setBrandsOptions: (brandsOptions) =>
    dispatch(setBrandsOptions(brandsOptions)),
  setCollectionsOptions: (collectionsOptions) =>
    dispatch(setCollectionsOptions(collectionsOptions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItemDialog);
