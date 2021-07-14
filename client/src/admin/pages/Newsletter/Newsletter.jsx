import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableData,
} from "admin/adminComponents/CustomTable/CustomTable";
import CustomButton from "components/CustomButton/CustomButton";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import AddNewsletterImageDialog from "admin/adminComponents/AddNewsletterImageDialog/AddNewsletterImageDialog";
import DeleteNewsletterImageDialog from "admin/adminComponents/DeleteNewsletterImageDialog/DeleteNewsletterImageDialog";
import EditNewsletterImageDialog from "admin/adminComponents/EditNewsletterImageDialog/EditNewsletterImageDialog";
import AddNewsletterEmailDialog from "admin/adminComponents/AddNewsletterEmailDialog/AddNewsletterEmailDialog";
import DeleteNewsletterEmailDialog from "admin/adminComponents/DeleteNewsletterEmailDialog/DeleteNewsletterEmailDialog";
import * as S from "./Newsletter.styles";

import {
  setNewsletterImage,
  toggleAddNewsletterImageDialog,
  toggleUpdateNewsletterImageDialog,
  toggleDeleteNewsletterImageDialog,
  setNewsletterEmails,
  toggleAddNewsletterEamilDialog,
  toggleDeleteNewsletterEmailDialog,
  setNewsletterEmailForOperation,
} from "redux/admin/static/newsletter/newsletter.actions";
import {
  selectNewsletterImage,
  selectNewsletterEmails,
} from "redux/admin/static/newsletter/newsletter.selectors";

import {
  getNewsletterImage,
  getNewsletterEmails,
} from "firebase/newsletter.utils";

function Newsletter({
  newsletterImage,
  setNewsletterImage,
  toggleAddNewsletterImageDialog,
  toggleUpdateNewsletterImageDialog,
  toggleDeleteNewsletterImageDialog,
  newsletterEmails,
  setNewsletterEmails,
  toggleAddNewsletterEamilDialog,
  toggleDeleteNewsletterEmailDialog,
  setNewsletterEmailForOperation,
}) {
  useEffect(() => {
    if (!newsletterImage) {
      const fetchNewsletterImage = async () => {
        const newsletterImage = await getNewsletterImage();
        setNewsletterImage(newsletterImage);
      };
      fetchNewsletterImage();
    }
  }, [newsletterImage]);

  useEffect(() => {
    if (!newsletterEmails) {
      const fetchNewsletterEmails = async () => {
        const newsletterEmails = await getNewsletterEmails();
        setNewsletterEmails(newsletterEmails);
      };
      fetchNewsletterEmails();
    }
  }, [newsletterEmails]);

  return (
    <div>
      <h3>Newsletter</h3>
      <div>
        <S.NewsletterImageContainer>
          {newsletterImage ? (
            <S.NewsletterImage
              src={newsletterImage.src.med.url}
              alt="newletter"
            />
          ) : (
            <S.NewsletterPlaceHolderText>
              image not entered
            </S.NewsletterPlaceHolderText>
          )}
        </S.NewsletterImageContainer>
        <S.ButtonsContainer>
          <CustomButton
            color="black"
            size="xs"
            isActive
            onClick={toggleAddNewsletterImageDialog}
            disabled={!!newsletterImage}
          >
            add Image
          </CustomButton>
          <CustomButton
            color="black"
            size="xs"
            isActive
            onClick={toggleUpdateNewsletterImageDialog}
            disabled={!!!newsletterImage}
          >
            edit Image
          </CustomButton>
          <CustomButton
            color="red"
            size="xs"
            isActive
            onClick={toggleDeleteNewsletterImageDialog}
            disabled={!!!newsletterImage}
          >
            delete image
          </CustomButton>
        </S.ButtonsContainer>
      </div>
      <AddNewsletterImageDialog />
      <DeleteNewsletterImageDialog />
      <EditNewsletterImageDialog />

      <S.StyledHR />
      <CustomButton
        color="black"
        isActive
        size="xs"
        onClick={toggleAddNewsletterEamilDialog}
      >
        add newsletter
      </CustomButton>

      <AddNewsletterEmailDialog />
      <DeleteNewsletterEmailDialog />
      <Table hasDarkFonts>
        <TableHead>
          <TableRow>
            <TableData>email</TableData>
            <TableData>Delete</TableData>
          </TableRow>
        </TableHead>
        <TableBody>
          {newsletterEmails &&
            Object.keys(newsletterEmails).map((newsletterId) => {
              const newsletter = newsletterEmails[newsletterId];
              return (
                <TableRow key={newsletterId}>
                  <TableData>{newsletter.email}</TableData>

                  <TableData>
                    <CustomButton
                      onClick={() => {
                        // set newsletter id to delete
                        setNewsletterEmailForOperation(newsletterId);
                        // open dialog
                        toggleDeleteNewsletterEmailDialog();
                      }}
                      color="red"
                      align="center"
                      size="xs"
                      isActive
                    >
                      delete
                    </CustomButton>
                  </TableData>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  // newsletters: selectAllNewsletters,
  // newletterData: selectNewsletterData,
  newsletterImage: selectNewsletterImage,
  newsletterEmails: selectNewsletterEmails,
});
const mapDispatchToProps = (dispatch) => ({
  setNewsletterImage: (image) => dispatch(setNewsletterImage(image)),
  toggleAddNewsletterImageDialog: () =>
    dispatch(toggleAddNewsletterImageDialog()),
  toggleUpdateNewsletterImageDialog: () =>
    dispatch(toggleUpdateNewsletterImageDialog()),
  toggleDeleteNewsletterImageDialog: () =>
    dispatch(toggleDeleteNewsletterImageDialog()),

  setNewsletterEmails: (emails) => dispatch(setNewsletterEmails(emails)),
  toggleAddNewsletterEamilDialog: () =>
    dispatch(toggleAddNewsletterEamilDialog()),
  toggleDeleteNewsletterEmailDialog: () =>
    dispatch(toggleDeleteNewsletterEmailDialog()),
  setNewsletterEmailForOperation: (emailId) =>
    dispatch(setNewsletterEmailForOperation(emailId)),
  // setNewsletters: (newsletters) => dispatch(setNewsletters(newsletters)),
  // toggleAddNewsletterDialog: () => dispatch(toggleAddNewsletterDialog()),
  // toggleDeleteNewsletterDialog: () => dispatch(toggleDeleteNewsletterDialog()),
  // setNewsletterData: (newsletterData) =>
  //   dispatch(setNewsletterData(newsletterData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Newsletter);
