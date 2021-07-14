import React, { Fragment, useEffect, useRef, useState } from "react";
// firebase
import {
  getBrandsForAdmin,
  getBrandsFromSearchQueryAdmin,
  getNextBrandsForAdmin,
} from "firebase/brands.utils";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  setBrands,
  toggleAddBrandDialog,
  setLastBrandDoc,
  toggleIsBrandsLoading,
  setBrandsCurrentPage,
  addBrands,
} from "redux/admin/brands/brands.actions";
import {
  selectBrandsCurrentPage,
  selectBrandsIds,
  selectCurrentBrands,
  selectCurrentBrandsIds,
  selectIsBrandsLoading,
  selectLastBrandDoc,
  selectNoOfBrandsPages,
} from "redux/admin/brands/brands.selectors";

// components
import CustomButton from "components/CustomButton/CustomButton";
import AddBrandDialog from "admin/adminComponents/AddBrandDialog/AddBrandDialog";
import EditBrandDialog from "admin/adminComponents/EditBrandDialog/EditBrandDialog";
import DeleteBrandDialog from "admin/adminComponents/DeleteBrandDialog/DeleteBrandDialog";

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "../../adminComponents/CustomTable/CustomTable";
import InputField from "components/InputField/InputField";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import DataContainer from "admin/adminComponents/DataContainer/DataContainer";
import BrandInfoRow from "./BrandInfoRow";
import CustomPagination from "components/CustomPagination/CustomPagination";
import { setCurrentPage } from "redux/admin/orders/orders.actions";
import { showNotification } from "redux/notification/notification.actions";
import AdminNotFoundText from "admin/adminComponents/AdminNotFoundText/AdminNotFoundText";

function Brand({
  setBrands,
  isBrandsLoading,
  lastBrandDoc,
  toggleAddBrandDialog,
  setLastBrandDoc,
  toggleIsBrandsLoading,
  currentPage,
  setBrandsCurrentPage,
  currentBrands,
  currentBrandsIds,
  noOfBrandsPages,
  addBrands,
  brandsIds,
  showNotification,
}) {
  const searchQueryRef = useRef();
  const [searchBrandNotFound, setSearchBrandNotFound] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const disableButtonCondition = isRefreshing || isBrandsLoading || isSearching;

  const setBrandsData = (brandsData, isInitialData) => {
    const { lastBrandDoc, brands } = brandsData;
    if (isInitialData) {
      setBrands(brands);
    } else {
      addBrands(brands);
    }
    setLastBrandDoc(lastBrandDoc);
  };

  const loadBrands = async (isRefreshLoad) => {
    toggleIsBrandsLoading();
    try {
      if (isRefreshLoad) setIsRefreshing(true);
      const [brandsData, error] = await getBrandsForAdmin();
      if (error) throw error;
      setBrandsData(brandsData, true);
      setBrandsCurrentPage(1);
      toggleIsBrandsLoading();
      if (isRefreshLoad) setIsRefreshing(false);
    } catch (error) {
      let notificationMessage = error.message;
      if (isRefreshLoad)
        notificationMessage = `Can't refresh, ${error.message}`;
      showNotification(notificationMessage, "error");
      toggleIsBrandsLoading();
      if (isRefreshLoad) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (brandsIds.length === 0) {
      loadBrands();
    }
  }, []);

  const loadNextBrands = async () => {
    try {
      const [brandsData, error] = await getNextBrandsForAdmin(lastBrandDoc);
      if (error) throw error;
      setBrandsData(brandsData);
    } catch (error) {
      showNotification(`Can't load next brands, ${error.message}`, "error");
    }
  };

  useEffect(() => {
    if (currentPage > 0 && currentPage === noOfBrandsPages && !!lastBrandDoc) {
      loadNextBrands();
    }
  }, [currentPage]);

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(0);
    const searchText = searchQueryRef.current.value.toLowerCase();
    toggleIsBrandsLoading();
    try {
      setIsSearching(true);
      const [brandsData, error] = await getBrandsFromSearchQueryAdmin(
        searchText
      );
      if (error) throw error;
      if (Object.keys(brandsData.brands).length === 0) {
        setSearchBrandNotFound(true);
        toggleIsBrandsLoading();
        return;
      }
      setBrandsData(brandsData, true);
      toggleIsBrandsLoading();
      searchQueryRef.current.value = "";
      setIsSearching(false);
    } catch (error) {
      showNotification(
        `can't search brand ${searchText}, ${error.message}`,
        "error"
      );
      toggleIsBrandsLoading();
      setIsSearching(false);
    }
  };

  return (
    <Fragment>
      <h3>Brands</h3>
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
            color="black"
            isActive
            size="xs"
            onClick={toggleAddBrandDialog}
            disabled={disableButtonCondition}
          >
            add brand
          </CustomButton>
          <CustomButton
            onClick={() => {
              setCurrentPage(0);
              loadBrands(true);
            }}
            size="xs"
            isActive
            color="black"
            hasLoading
            isLoading={isRefreshing}
            disabled={disableButtonCondition}
            loadingText="Refreshing brands"
          >
            refresh all brands
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
            label="search Brand"
            type="text"
            required
            error={searchBrandNotFound}
            helperText={searchBrandNotFound ? "brand not found" : ""}
            onChange={() => {
              if (searchBrandNotFound) setSearchBrandNotFound(false);
            }}
          />
          <CustomButton
            color="black"
            size="xs"
            isActive
            hasLoading
            isLoading={isSearching}
            disabled={disableButtonCondition}
            loadingText="Searching"
            style={{ minWidth: "120px" }}
          >
            search
          </CustomButton>
        </form>
      </div>
      <AddBrandDialog />
      <EditBrandDialog />
      <DeleteBrandDialog />
      <DataContainer>
        {isBrandsLoading && (
          <LoadingSpinner
            hasLoadingText
            displayText="Loading Brands"
            placeCenter
          />
        )}
        <Table hasDarkFonts>
          <TableHead>
            <TableRow>
              <TableData>Name</TableData>
              <TableData>Logo</TableData>
              <TableData>Image</TableData>
              <TableData>DiscountRate</TableData>
              <TableData>Edit </TableData>
              <TableData>Delete </TableData>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isBrandsLoading ? (
              currentBrandsIds.length > 0 ? (
                currentBrandsIds.map((brandId, idx) => (
                  <BrandInfoRow
                    key={idx}
                    brand={{ id: brandId, ...currentBrands[brandId] }}
                  />
                ))
              ) : (
                <AdminNotFoundText>Brands not found :(</AdminNotFoundText>
              )
            ) : null}
          </TableBody>
        </Table>
      </DataContainer>
      <CustomPagination
        disabled={isBrandsLoading}
        noOfPages={noOfBrandsPages}
        currentPage={currentPage}
        onChange={(_, selectedPage) => setBrandsCurrentPage(selectedPage)}
      />
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  brandsIds: selectBrandsIds,
  lastBrandDoc: selectLastBrandDoc,
  isBrandsLoading: selectIsBrandsLoading,
  currentPage: selectBrandsCurrentPage,
  currentBrandsIds: selectCurrentBrandsIds,
  currentBrands: selectCurrentBrands,
  noOfBrandsPages: selectNoOfBrandsPages,
});

const mapDispatchToProps = (dispatch) => ({
  setBrandsCurrentPage: (currentPage) =>
    dispatch(setBrandsCurrentPage(currentPage)),
  addBrands: (brands) => dispatch(addBrands(brands)),
  setBrands: (brands) => dispatch(setBrands(brands)),
  toggleAddBrandDialog: () => dispatch(toggleAddBrandDialog()),
  setLastBrandDoc: (lastBrandDoc) => dispatch(setLastBrandDoc(lastBrandDoc)),
  toggleIsBrandsLoading: () => dispatch(toggleIsBrandsLoading()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Brand);
