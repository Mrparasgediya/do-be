import { TableData } from "admin/adminComponents/CustomTable/CustomTable";
import { TableRow } from "admin/adminComponents/CustomTable/CustomTable";
import CustomButton from "components/CustomButton/CustomButton";
import React from "react";
import { connect } from "react-redux";
import {
  setContactUsForOperation,
  toggleReplayContactUsDialog,
} from "redux/admin/contactus/contactus.actions";

function ContactUsInfoRow({
  contactUsDetails,
  toggleReplayContactUsDialog,
  setContactUsForOperation,
}) {
  const { id, problemOption, senderName, senderEmail, isReplied } =
    contactUsDetails || {};

  return (
    <TableRow>
      <TableData>{id}</TableData>
      <TableData>{senderName || ""}</TableData>
      <TableData>{senderEmail || ""}</TableData>
      <TableData>{problemOption || ""}</TableData>
      <TableData>{isReplied ? "Yes" : "No"}</TableData>
      <TableData>
        <CustomButton
          onClick={() => {
            setContactUsForOperation(id);
            toggleReplayContactUsDialog();
          }}
          isActive
          color="black"
          size="xs"
          align="center"
        >
          see and reply
        </CustomButton>
      </TableData>
    </TableRow>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggleReplayContactUsDialog: () => dispatch(toggleReplayContactUsDialog()),
  setContactUsForOperation: (contactUsId) =>
    dispatch(setContactUsForOperation(contactUsId)),
});

export default connect(null, mapDispatchToProps)(ContactUsInfoRow);
