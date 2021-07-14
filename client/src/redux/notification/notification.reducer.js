import notificationActionsTypes from "./notification.types";

const INITIAL_STATE = {
  message: "",
  display: false,
  type: "",
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case notificationActionsTypes.SHOW_NOFITICATION:
      const { message, type } = action.payload;
      return {
        ...state,
        message,
        type,
        display: true,
      };
    case notificationActionsTypes.HIDE_NOTIFICATION:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default notificationReducer;
