import AddCollectionDialog from "admin/adminComponents/AddCollectionDialog/AddCollectionDialog";
import { TableHead } from "admin/adminComponents/CustomTable/CustomTable";
import { TableRow } from "admin/adminComponents/CustomTable/CustomTable";
import { TableBody } from "admin/adminComponents/CustomTable/CustomTable";
import { TableData } from "admin/adminComponents/CustomTable/CustomTable";
import { Table } from "admin/adminComponents/CustomTable/CustomTable";
import CustomButton from "components/CustomButton/CustomButton";

import {
  getCollectionsForAdmin,
  getCollectionsFromSearchQueryAdmin,
  getNextCollectionsForAdmin,
} from "firebase/collections.utils.js";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  setCollections,
  toggleAddCollectionDialog,
  toggleIsCollectionLoading,
  setLastCollectionDoc,
  setCurrentCollectionsPage,
  addAdminCollections,
} from "redux/admin/collections/collections.actions";
import {
  selectCollectionsIds,
  selectCollectionsNoOfPages,
  selectCurrentCollectionPage,
  selectCurrentCollections,
  selectCurrentCollectionsIds,
  selectIsCollectionLoading,
  selectLastCollectionDoc,
} from "redux/admin/collections/collections.selectors";

import DeleteCollectionDialog from "admin/adminComponents/DeleteCollectionDialog/DeleteCollectionDialog";
import EditCollectionDialog from "admin/adminComponents/EditCollectionDialog/EditCollectionDialog";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import InputField from "components/InputField/InputField";
import DataContainer from "admin/adminComponents/DataContainer/DataContainer";
import { showNotification } from "redux/notification/notification.actions";
import CollectionInfoRow from "./CollectionInfoRow";
import CustomPagination from "components/CustomPagination/CustomPagination";
import AdminNotFoundText from "admin/adminComponents/AdminNotFoundText/AdminNotFoundText";

function Collections({
  isCollectionLoading,
  lastCollectionDoc,
  setCollections,
  toggleAddCollectionDialog,
  toggleIsCollectionLoading,
  setLastCollectionDoc,
  showNotification,
  collectionsNoOfPages,
  currentPage,
  setCurrentCollectionsPage,
  currentCollections,
  currentCollectionsIds,
  addAdminCollections,
  collectionsIds,
}) {
  const searchQueryRef = useRef();
  const [searchCollectionNotFound, setSearchCollectionNotFound] =
    useState(false);
  const [isRefreshingCollections, setIsRefreshingCollections] = useState(false);
  const [isSearchingCollection, setIsSearchingCollection] = useState(false);
  const disabledButtonsCondition =
    isCollectionLoading || isRefreshingCollections || isSearchingCollection;

  const setCollectionsData = (collectionsData, isInitialLoad) => {
    const { collections, lastCollectionDoc } = collectionsData;

    if (isInitialLoad) {
      setCollections({});
      setLastCollectionDoc(undefined);
      setCollections(collections);
    } else {
      addAdminCollections(collections);
    }
    setLastCollectionDoc(lastCollectionDoc);
  };

  const loadCollections = async (isRefreshingCollections) => {
    toggleIsCollectionLoading();
    try {
      if (isRefreshingCollections) setIsRefreshingCollections(true);
      const [collectionsData, error] = await getCollectionsForAdmin();
      if (error) throw new Error(error);
      setCollectionsData(collectionsData, true);
      toggleIsCollectionLoading();
      setCurrentCollectionsPage(1);
      if (isRefreshingCollections) setIsRefreshingCollections(false);
    } catch (error) {
      let errorMessage = error.message;
      if (isRefreshingCollections)
        errorMessage = `cant't refresh collections, ${errorMessage}`;

      showNotification(errorMessage, "error");
      toggleIsCollectionLoading();
      if (isRefreshingCollections) setIsRefreshingCollections(false);
    }
  };

  useEffect(() => {
    if (collectionsIds.length === 0) {
      loadCollections();
    }
  }, []);

  const loadNextCollections = async () => {
    try {
      const [collectionsData, error] = await getNextCollectionsForAdmin(
        lastCollectionDoc
      );
      if (error) throw new Error(error);
      setCollectionsData(collectionsData);
    } catch (error) {
      showNotification(`can't get next collections, ${error.message}`, "error");
    }
  };

  useEffect(() => {
    if (collectionsNoOfPages === currentPage && !!lastCollectionDoc)
      loadNextCollections();
  }, [currentPage]);

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();
    const searchText = searchQueryRef.current.value.toLowerCase();
    try {
      toggleIsCollectionLoading();
      setIsSearchingCollection(true);
      const [collectionData, error] = await getCollectionsFromSearchQueryAdmin(
        searchText
      );
      if (error) throw new Error(error);

      if (Object.keys(collectionData.collections).length === 0) {
        setSearchCollectionNotFound(true);
      } else {
        setCurrentCollectionsPage(1);
        setCollectionsData(collectionData, true);
        searchQueryRef.current.value = "";
        if (searchCollectionNotFound) {
          setSearchCollectionNotFound(false);
        }
      }
      toggleIsCollectionLoading();
      setIsSearchingCollection(false);
    } catch (error) {
      showNotification(error.message, "error");
      toggleIsCollectionLoading();
      setIsSearchingCollection(false);
    }
  };

  return (
    <Fragment>
      <h3>Collections</h3>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <CustomButton
            disabled={disabledButtonsCondition}
            size="xs"
            color="black"
            onClick={toggleAddCollectionDialog}
            isActive
          >
            add collection
          </CustomButton>
          <CustomButton
            onClick={loadCollections}
            size="xs"
            isActive
            color="black"
            disabled={disabledButtonsCondition}
            hasLoading
            isLoading={isRefreshingCollections}
            loadingText="Refreshing collections"
          >
            refresh all collections
          </CustomButton>
        </div>
        <form
          onSubmit={handleSearchFormSubmit}
          style={{
            marginRight: "10%",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <InputField
            ref={searchQueryRef}
            label="search collection"
            type="text"
            required
            error={searchCollectionNotFound}
            helperText={searchCollectionNotFound ? "collection not found" : ""}
            onChange={() => {
              if (searchCollectionNotFound) setSearchCollectionNotFound(false);
            }}
          />
          <CustomButton
            style={{ minWidth: "100px" }}
            color="black"
            size="xs"
            isActive
            hasLoading
            isLoading={isSearchingCollection}
            loadingText="searching"
            disabled={disabledButtonsCondition}
          >
            search
          </CustomButton>
        </form>
      </div>
      <AddCollectionDialog />
      <DeleteCollectionDialog />
      <EditCollectionDialog />
      <DataContainer>
        {isCollectionLoading && (
          <LoadingSpinner
            hasLoadingText
            placeCenter
            displayText="Loading Collections"
          />
        )}
        <Table hasDarkFonts>
          <TableHead>
            <TableRow>
              <TableData>Name</TableData>
              <TableData>image</TableData>
              <TableData>DiscountRate</TableData>
              <TableData>Edit </TableData>
              <TableData>Delete </TableData>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isCollectionLoading ? (
              collectionsIds.length > 0 ? (
                currentCollectionsIds.map((collectionId) => (
                  <CollectionInfoRow
                    key={collectionId}
                    collection={{
                      id: collectionId,
                      ...currentCollections[collectionId],
                    }}
                  />
                ))
              ) : (
                <AdminNotFoundText>Collections Not found :(</AdminNotFoundText>
              )
            ) : null}
          </TableBody>
        </Table>
      </DataContainer>
      <CustomPagination
        noOfPages={collectionsNoOfPages}
        currentPage={currentPage}
        onChange={(_, selectedPage) => setCurrentCollectionsPage(selectedPage)}
        disabled={isCollectionLoading}
      />
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  isCollectionLoading: selectIsCollectionLoading,
  lastCollectionDoc: selectLastCollectionDoc,
  collectionsNoOfPages: selectCollectionsNoOfPages,
  currentPage: selectCurrentCollectionPage,
  currentCollections: selectCurrentCollections,
  currentCollectionsIds: selectCurrentCollectionsIds,
  collectionsIds: selectCollectionsIds,
});
const mapDispatchToProps = (dispatch) => ({
  setCollections: (collections) => dispatch(setCollections(collections)),
  toggleAddCollectionDialog: () => dispatch(toggleAddCollectionDialog()),
  toggleIsCollectionLoading: () => dispatch(toggleIsCollectionLoading()),
  setLastCollectionDoc: (lastCollectionDoc) =>
    dispatch(setLastCollectionDoc(lastCollectionDoc)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  setCurrentCollectionsPage: (currentPage) =>
    dispatch(setCurrentCollectionsPage(currentPage)),
  addAdminCollections: (collections) =>
    dispatch(addAdminCollections(collections)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
