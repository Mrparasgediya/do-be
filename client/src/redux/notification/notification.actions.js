import notificationActionsTypes from "./notification.types";

export const showNotification = (message, type) => ({
  type: notificationActionsTypes.SHOW_NOFITICATION,
  payload: { message, type },
});

export const hideNotification = () => ({
  type: notificationActionsTypes.HIDE_NOTIFICATION,
});
