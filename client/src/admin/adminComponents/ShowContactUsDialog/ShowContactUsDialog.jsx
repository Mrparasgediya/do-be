import API from "api";
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import CustomTextArea from "components/CustomTextArea/CustomTextArea";
import InputField from "components/InputField/InputField";
import { updateContactUsDetails } from "firebase/contactus.utils";
import { updateContactUsDetails as updateContactUsDetailsRedux } from "redux/admin/contactus/contactus.actions";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import {
  setContactUsForOperation,
  toggleReplayContactUsDialog,
} from "redux/admin/contactus/contactus.actions";
import {
  selectContactUsForOperation,
  selectReplayConactUsDialog,
} from "redux/admin/contactus/contactus.selectors";
import { createStructuredSelector } from "reselect";
import { getContactUsReplayHTML } from "utils/admin.utils";
import { showNotification } from "redux/notification/notification.actions";

function ShowContactUsDialog({
  toggleReplayContactUsDialog,
  setContactUsForOperation,
  contactUsForOperation,
  replayContactUsDialog,
  updateContactUsDetailsRedux,
  showNotification,
}) {
  const {
    id,
    senderName,
    senderEmail,
    problemOption,
    probleDescription,
    isReplied,
  } = contactUsForOperation || {};

  const closeDialogHandler = () => {
    toggleReplayContactUsDialog();
    setContactUsForOperation(undefined);
  };

  const [openReplayForm, setOpenReplayForm] = useState(false);
  const [isReplayigContactUs, setIsReplayginConactUs] = useState(false);
  const replayInputRef = useRef();

  const sendReplaySubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const currentReplyText = replayInputRef.current.value;
      setIsReplayginConactUs(true);
      const {
        data: { accepted, rejected, status },
      } = await API.post("/contactus/reply", {
        recieverEmail: senderEmail,
        subject: `About your ${problemOption} proble.`,
        name: senderName,
        reply: currentReplyText,
      });
      if (status !== "ok" || !accepted.includes(senderEmail))
        throw new Error("Can't send email to user,try later.");

      const [updatedData, error] = await updateContactUsDetails(id, {
        isReplied: true,
        reply: currentReplyText,
      });
      if (error) throw new Error(`replied successfully but ${error.message}`);
      updateContactUsDetailsRedux(id, updatedData);

      setIsReplayginConactUs(false);
      replayInputRef.current.value = "";
      setOpenReplayForm(false);
      closeDialogHandler();
      showNotification(`replied to ${senderEmail} successfully`, "success");
    } catch (error) {
      const { response } = error;
      if (response && response.data.message) {
        showNotification(error.response.data.message, "error");
      } else {
        showNotification(error.message, "error");
      }
      setIsReplayginConactUs(false);
    }
  };

  return (
    <CustomDialog
      heading={"replay contact us"}
      open={replayContactUsDialog}
      handleClose={!isReplayigContactUs ? closeDialogHandler : null}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          flexDirection: "column",
          paddingBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            fontSize: "var(--font-md)",
            textTransform: "capitalize",
          }}
        >
          <span>Sender name :</span>
          <span>{senderName}</span>
        </div>{" "}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            fontSize: "var(--font-md)",
            textTransform: "capitalize",
          }}
        >
          <span>sender Email :</span>
          <span>{senderEmail}</span>
        </div>{" "}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            fontSize: "var(--font-md)",
            textTransform: "capitalize",
          }}
        >
          <span>selected problem :</span>
          <span>{problemOption}</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "flex-start",
            fontSize: "var(--font-md)",
            textTransform: "capitalize",
          }}
        >
          <span>description :</span>
          <p style={{ maxWidth: "75%" }}>{probleDescription}</p>
        </div>
        <CustomButton
          size="xs"
          color={openReplayForm ? "red" : "skyblue"}
          isActive
          onClick={() => setOpenReplayForm(!openReplayForm)}
          disabled={isReplayigContactUs}
        >
          {openReplayForm ? "cancel" : isReplied ? "replay again" : "replay"}
        </CustomButton>
      </div>
      {openReplayForm && (
        <form
          onSubmit={sendReplaySubmitHandler}
          style={{ marginBottom: "1rem" }}
        >
          <CustomTextArea
            ref={replayInputRef}
            placeholder="enter your replay"
            rows="5"
            style={{ marginBottom: "1rem" }}
          ></CustomTextArea>
          <CustomButton
            disabled={isReplayigContactUs}
            hasLoading={true}
            isLoading={isReplayigContactUs}
            loadingText="sending replay"
            align="center"
            size="xs"
            color="skyblue"
            isActive
          >
            {isReplied ? "Send replay again" : "Send replay"}
          </CustomButton>
        </form>
      )}
    </CustomDialog>
  );
}

const mapStateToProps = createStructuredSelector({
  contactUsForOperation: selectContactUsForOperation,
  replayContactUsDialog: selectReplayConactUsDialog,
});
const mapDispatchToProps = (dispatch) => ({
  toggleReplayContactUsDialog: () => dispatch(toggleReplayContactUsDialog()),
  setContactUsForOperation: (contactUsId) =>
    dispatch(setContactUsForOperation(contactUsId)),
  updateContactUsDetailsRedux: (contactUsId, dataToUpdate) =>
    dispatch(updateContactUsDetailsRedux(contactUsId, dataToUpdate)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowContactUsDialog);
