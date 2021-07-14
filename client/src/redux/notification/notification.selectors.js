import { createSelector } from "reselect";

const selectNotificationState = (state) => state.notification;

export const selectNotificationMessage = createSelector(
  [selectNotificationState],
  (notification) => notification.message
);
export const selectNotificationType = createSelector(
  [selectNotificationState],
  (notification) => notification.type
);
export const selectNotificationDisplay = createSelector(
  [selectNotificationState],
  (notification) => notification.display
);
