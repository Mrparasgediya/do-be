import { updateContactUsItems } from "./contactus.utils";
import contactUsActionsTypes from "./contactus.types";

const INITIAL_STATE = {
  items: {},
  ITEMS_PER_PAGE: 3,
  contactUsForOperation: undefined,
  replayContactUsDialog: false,
  currentPage: 0,
  lastDoc: undefined,
  isLoading: false,
};

const contactUsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case contactUsActionsTypes.SET_CONTACT_US_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case contactUsActionsTypes.ADD_CONTACT_US_ITEMS:
      return {
        ...state,
        items: { ...state.items, ...action.payload },
      };
    case contactUsActionsTypes.SET_CURRENT_CONTACT_US_PAGE:
      return { ...state, currentPage: action.payload };
    case contactUsActionsTypes.SET_CONTACT_US_FOR_OPERATION:
      return {
        ...state,
        contactUsForOperation: action.payload,
      };
    case contactUsActionsTypes.TOGGLE_REPLAY_CONTACT_US_DIALOG:
      return {
        ...state,
        replayContactUsDialog: !state.replayContactUsDialog,
      };
    case contactUsActionsTypes.UPDATE_CONTACT_US_DETAILS:
      return {
        ...state,
        items: { ...updateContactUsItems(state.items, action.payload) },
      };
    case contactUsActionsTypes.SET_LAST_CONTACT_US_DOC:
      return {
        ...state,
        lastDoc: action.payload,
      };
    case contactUsActionsTypes.TOGGLE_IS_CONTACT_US_ITEMS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};

export default contactUsReducer;
