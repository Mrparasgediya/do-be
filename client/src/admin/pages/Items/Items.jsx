import AddItemDialog from "admin/adminComponents/AddItemDialog/AddItemDialog";
import CustomButton from "components/CustomButton/CustomButton";
import React, { useEffect } from "react";

import { getItemsForAdmin, getNextItemsForAdmin } from "firebase/items.utils";

import {
  Table,
  TableRow,
  TableData,
  TableHead,
  TableBody,
} from "admin/adminComponents/CustomTable/CustomTable";
import DeleteItemDialog from "admin/adminComponents/DeleteItemDialog/DeleteItemDialog";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentItems,
  selectCurrentItemsIds,
  selectCurrentItemsPage,
  selectIsItemsLoading,
  selectItemsIds,
  selectLastItemDoc,
  selectNoOfItemsPages,
} from "redux/admin/items/items.selectors";

import {
  setItems,
  toggleAddItemDialog,
  setLastItemDoc,
  toggleIsItemsLoading,
  setCurrentItemsPage,
  addItems,
} from "redux/admin/items/items.actions";

import ShowItemDialog from "admin/adminComponents/ShowItemDialog/ShowItemDialog";
import EditItemDialog from "admin/adminComponents/EditItemDialog/EditItemDialog";
import DataContainer from "admin/adminComponents/DataContainer/DataContainer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import AdminNotFoundText from "admin/adminComponents/AdminNotFoundText/AdminNotFoundText";
import ItemInfoRow from "./ItemInfoRow";
import CustomPagination from "components/CustomPagination/CustomPagination";
import { Fragment } from "react";
import { showNotification } from "redux/notification/notification.actions";
function Items({
  isItemsLoading,
  lastItemDoc,
  setItems,
  toggleAddItemDialog,
  toggleIsItemsLoading,
  setLastItemDoc,
  currentPage,
  setCurrentItemsPage,
  noOfPages,
  currentItems,
  currentItemsIds,
  itemsIds,
  addItems,
  showNotification,
}) {
  const setItemsData = (itemsData, isInitialLoad) => {
    let { lastItemDoc, items } = itemsData;
    if (isInitialLoad) {
      setItems(items);
      setCurrentItemsPage(1);
    } else {
      addItems(items);
    }
    setLastItemDoc(lastItemDoc);
  };

  const loadItems = async () => {
    toggleIsItemsLoading();
    try {
      const [itemsData, error] = await getItemsForAdmin();
      if (error) throw new Error(error);
      setItemsData(itemsData, true);
      toggleIsItemsLoading();
    } catch (error) {
      showNotification(error.message, "error");
      toggleIsItemsLoading();
    }
  };

  const loadNextItems = async () => {
    try {
      const [itemsData, error] = await getNextItemsForAdmin(lastItemDoc);
      if (error) throw new Error(error);

      setItemsData(itemsData);
    } catch (error) {
      showNotification(`can't load items, ${error.message}`, "error");
    }
  };

  useEffect(() => {
    if (itemsIds.length === 0) {
      loadItems();
    }
  }, []);

  useEffect(() => {
    if (currentPage > 0 && currentPage === noOfPages && !!lastItemDoc) {
      loadNextItems();
    }
  }, [currentPage]);

  return (
    <Fragment>
      <h3>Items</h3>
      <CustomButton
        color="black"
        size="xs"
        isActive
        onClick={toggleAddItemDialog}
        disabled={isItemsLoading}
      >
        add item
      </CustomButton>
      <DataContainer>
        {isItemsLoading && (
          <LoadingSpinner
            placeCenter
            hasLoadingText
            displayText="Loading Items"
          />
        )}
        <Table hasDarkFonts>
          <TableHead>
            <TableRow>
              <TableData>Name</TableData>
              <TableData>image</TableData>
              <TableData>brand</TableData>
              <TableData>collection</TableData>
              <TableData>price</TableData>
              <TableData>item discountRate</TableData>
              <TableData>total Discount Rate</TableData>
              <TableData>see full item</TableData>
              <TableData>edit</TableData>
              <TableData>delete</TableData>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isItemsLoading ? (
              currentItemsIds.length > 0 ? (
                currentItemsIds.map((itemId, idx) => (
                  <ItemInfoRow
                    key={idx}
                    item={{ id: itemId, ...currentItems[itemId] }}
                  />
                ))
              ) : (
                <AdminNotFoundText>items not found :(</AdminNotFoundText>
              )
            ) : null}
          </TableBody>
        </Table>
      </DataContainer>
      <CustomPagination
        disabled={isItemsLoading}
        currentPage={currentPage}
        noOfPages={noOfPages}
        onChange={(_, selectedPage) => setCurrentItemsPage(selectedPage)}
      />

      <AddItemDialog />
      <ShowItemDialog />
      <EditItemDialog />
      <DeleteItemDialog />
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  itemsIds: selectItemsIds,
  currentItemsIds: selectCurrentItemsIds,
  currentItems: selectCurrentItems,
  currentPage: selectCurrentItemsPage,
  noOfPages: selectNoOfItemsPages,
  isItemsLoading: selectIsItemsLoading,
  lastItemDoc: selectLastItemDoc,
});
const mapDispatchToProps = (dispatch) => ({
  setItems: (items) => dispatch(setItems(items)),
  toggleAddItemDialog: () => dispatch(toggleAddItemDialog()),
  toggleIsItemsLoading: () => dispatch(toggleIsItemsLoading()),
  setLastItemDoc: (lastItemDOc) => dispatch(setLastItemDoc(lastItemDOc)),
  setCurrentItemsPage: (currentPage) =>
    dispatch(setCurrentItemsPage(currentPage)),
  addItems: (items) => dispatch(addItems(items)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
