import React, { useEffect } from "react";
// styles
import * as S from "./Notification.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { hideNotification } from "redux/notification/notification.actions";
import {
  selectNotificationDisplay,
  selectNotificationMessage,
  selectNotificationType,
} from "redux/notification/notification.selectors";

function Notification({
  notificationMessage,
  displayNotification,
  hideNotification,
  notificationType,
}) {
  useEffect(() => {
    let timer;
    if (displayNotification) {
      timer = setTimeout(() => {
        hideNotification();
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [displayNotification, hideNotification]);

  return (
    <S.StyledNotification
      severity={notificationType || "info"}
      onClose={hideNotification}
      open={displayNotification}
      type={notificationType}
    >
      {notificationMessage}
    </S.StyledNotification>
  );
}

const mapStateToProps = createStructuredSelector({
  notificationMessage: selectNotificationMessage,
  displayNotification: selectNotificationDisplay,
  notificationType: selectNotificationType,
});
const mapDispatchToProps = (dispatch) => ({
  hideNotification: () => dispatch(hideNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
