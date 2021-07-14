import { TableHead } from "admin/adminComponents/CustomTable/CustomTable";
import { TableRow } from "admin/adminComponents/CustomTable/CustomTable";
import { TableBody } from "admin/adminComponents/CustomTable/CustomTable";
import { TableData } from "admin/adminComponents/CustomTable/CustomTable";
import { Table } from "admin/adminComponents/CustomTable/CustomTable";
import ShowContactUsDialog from "admin/adminComponents/ShowContactUsDialog/ShowContactUsDialog";
import CustomButton from "components/CustomButton/CustomButton";
import CustomPagination from "components/CustomPagination/CustomPagination";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { getContactUsDetails } from "firebase/contactus.utils";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  addContactUsItems,
  setContactUsItems,
  setCurrentContactUsPage,
  setLastContactUsDoc,
  toggleIsContactUsItemsLoading,
} from "redux/admin/contactus/contactus.actions";
import {
  selectCurrentContactUsItems,
  selectCurrentContactUsItemsIdsArr,
  selectCurrentContactUsPage,
  selectIsContactUsItemsLoading,
  selectLastContactUsDoc,
  selectNoOfContactUsPages,
} from "redux/admin/contactus/contactus.selectors";
import { showNotification } from "redux/notification/notification.actions";
import { createStructuredSelector } from "reselect";
import ContactUsInfoRow from "./ContactUsInfoRow";

function ContactUs({
  showNotification,
  setContactUsItems,
  currentContactUsItems,
  currentContactUsItemsIds,
  setCurrentContactUsPage,
  noOfContactUsPages,
  currentContactUsPage,
  setLastContactUsDoc,
  lastContactUsDoc,
  addContactUsItems,
  toggleIsContactUsItemsLoading,
  isContactUsItemsLoading,
}) {
  const setContactUsData = (contactUsData, isInitialLoading) => {
    const { contactUsItems, lastDoc } = contactUsData;
    if (currentContactUsItemsIds.length === 0 || isInitialLoading) {
      setContactUsItems(contactUsItems);
    } else {
      addContactUsItems(contactUsItems);
    }
    setLastContactUsDoc(lastDoc);
  };

  const fetchContactUsData = async (isInitialLoading = false) => {
    try {
      if (isInitialLoading) toggleIsContactUsItemsLoading();
      const [contactUsData, error] = await getContactUsDetails(
        lastContactUsDoc
      );
      if (error) throw new Error(error);
      setContactUsData(contactUsData, isInitialLoading);

      if (isInitialLoading) {
        setCurrentContactUsPage(1);
        toggleIsContactUsItemsLoading();
      }
    } catch (error) {
      showNotification(error.message, "error");
      if (isInitialLoading) toggleIsContactUsItemsLoading();
    }
  };

  useEffect(() => {
    if (currentContactUsItemsIds.length === 0) {
      fetchContactUsData(true);
    }
  }, []);

  useEffect(() => {
    if (
      currentContactUsPage > 0 &&
      currentContactUsPage === noOfContactUsPages &&
      lastContactUsDoc
    ) {
      fetchContactUsData();
    }
  }, [currentContactUsPage]);

  const refreshContactUsHandler = () => {
    setContactUsItems({});
    setCurrentContactUsPage(0);
    setLastContactUsDoc(undefined);
    fetchContactUsData(true);
  };

  return (
    <Fragment>
      <div
        style={{
          minHeight: "75vh",
          position: "relative",
        }}
      >
        <h3>Contact us</h3>
        <CustomButton
          color="black"
          size="xs"
          isActive
          onClick={refreshContactUsHandler}
        >
          refresh
        </CustomButton>
        <Table hasDarkFonts>
          <TableHead>
            <TableRow>
              <TableData>id</TableData>
              <TableData>sender name</TableData>
              <TableData>sender email</TableData>
              <TableData>selected problem</TableData>
              <TableData>replied</TableData>
              <TableData>see and reply</TableData>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentContactUsItemsIds.length > 0 ? (
              Object.keys(currentContactUsItems).map((contactUsId) => (
                <ContactUsInfoRow
                  key={contactUsId}
                  contactUsDetails={{
                    id: contactUsId,
                    ...currentContactUsItems[contactUsId],
                  }}
                />
              ))
            ) : (
              <tr
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <td>
                  <h4>you don't have problems yet</h4>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
        {isContactUsItemsLoading && <LoadingSpinner placeCenter />}
      </div>
      <CustomPagination
        noOfPages={noOfContactUsPages}
        currentPage={currentContactUsPage}
        onChange={(_, selectedPage) => setCurrentContactUsPage(selectedPage)}
      />

      <ShowContactUsDialog />
    </Fragment>
  );
}
const mapStateToProps = createStructuredSelector({
  currentContactUsItems: selectCurrentContactUsItems,
  currentContactUsItemsIds: selectCurrentContactUsItemsIdsArr,
  noOfContactUsPages: selectNoOfContactUsPages,
  currentContactUsPage: selectCurrentContactUsPage,
  lastContactUsDoc: selectLastContactUsDoc,
  isContactUsItemsLoading: selectIsContactUsItemsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  setContactUsItems: (contactUsItems) =>
    dispatch(setContactUsItems(contactUsItems)),
  setCurrentContactUsPage: (currentPage) =>
    dispatch(setCurrentContactUsPage(currentPage)),
  setLastContactUsDoc: (lastDoc) => dispatch(setLastContactUsDoc(lastDoc)),
  addContactUsItems: (contactUsItems) =>
    dispatch(addContactUsItems(contactUsItems)),
  toggleIsContactUsItemsLoading: () =>
    dispatch(toggleIsContactUsItemsLoading()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
